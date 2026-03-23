import { NextResponse } from 'next/server';
import { Database } from '@/lib/backend/db';

export async function POST(request: Request, context: { params: Promise<{ queueId: string }> }) {
  try {
    const { queueId } = await context.params;

    const queueItems = Database.getMatchQueue();
    const item = queueItems.find(q => q.id === queueId);

    if (!item) {
        return NextResponse.json({ error: 'Queue item not found' }, { status: 404 });
    }

    if (item.status !== 'PENDING') {
        return NextResponse.json({ error: 'Queue item already resolved' }, { status: 400 });
    }

    // Process the Confirmation Match (Merge!)
    // The target Master Patient is recordB.mrn based on our mapper
    const mpiId = item.recordB.mrn; 
    const masterPatients = Database.getMasterPatients();
    const mpiRecord = masterPatients.find(m => m.id === mpiId);

    if (mpiRecord) {
        Database.updateMasterPatient(mpiId, {
            updatedAt: new Date().toISOString(),
            links: [
                ...(mpiRecord.links || []),
                { 
                  facilityId: item.recordA.facilityId, 
                  sourceId: item.recordA.mrn, 
                  confidence: item.confidence, 
                  linkedAt: new Date().toISOString() 
                }
            ]
        });
    }

    // Merge Clinical Data: Move all encounters from the source MRN into the Master Patient ID
    Database.reassignEncounters(item.recordA.mrn, mpiId);

    // Mark Queue as Approved
    Database.resolveMatchQueueItem(queueId, 'MANUAL_MATCHED');

    return NextResponse.json({ success: true, message: 'Match confirmed and clinical records merged.' });

  } catch (error) {
     console.error("Match confirmation error:", error);
     return NextResponse.json({ error: 'Internal server error confirming match' }, { status: 500 });
  }
}
