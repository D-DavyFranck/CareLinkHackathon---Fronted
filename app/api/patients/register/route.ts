import { NextResponse } from 'next/server';
import { Database } from '@/lib/backend/db';
import { ResolutionEngine } from '@/lib/backend/resolution-engine';
import { SourcePatientRecord } from '@/types/patient';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic Validation
    if (!body.firstName || !body.lastName || !body.dateOfBirth) {
       return NextResponse.json({ error: 'Missing required demographic fields' }, { status: 400 });
    }

    // Construct the incoming Source Record
    const sourceRecord: SourcePatientRecord = {
       id: `src_${Date.now()}`,
       facilityId: body.facilityId || 'UNKNOWN_FACILITY',
       mrn: body.mrn || `MRN-${Math.floor(Math.random() * 10000)}`,
       patient: {
          firstName: body.firstName,
          lastName: body.lastName,
          nationalId: body.nationalId,
          dateOfBirth: body.dateOfBirth,
          gender: body.gender,
          phone: body.phone
       },
       createdAt: new Date().toISOString()
    };

    // Run Data through Identity Resolution Engine
    const result = ResolutionEngine.processNewRegistration(sourceRecord);

    return NextResponse.json({
       success: true,
       sourceId: sourceRecord.id,
       resolutionDecision: result.decision,
       // Support both single Auto-Match ID and Multiple Queue IDs
       targetId: (result as any).mpiId || (result as any).queueIds || (result as any).queueId
    }, { status: 201 });

  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
