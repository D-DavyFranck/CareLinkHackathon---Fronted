import { NextResponse } from 'next/server';
import { Database } from '@/lib/backend/db';

export async function GET(request: Request, context: { params: Promise<{ mpiId: string }> }) {
  try {
    const { mpiId } = await context.params;
    const encounters = Database.getEncounters(mpiId);
    return NextResponse.json(encounters);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch encounters' }, { status: 500 });
  }
}
