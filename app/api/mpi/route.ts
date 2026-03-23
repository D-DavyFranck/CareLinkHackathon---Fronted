import { NextResponse } from 'next/server';
import { Database } from '@/lib/backend/db';

export async function GET() {
  try {
    const records = Database.getMasterPatients();
    return NextResponse.json(records);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch Master Patients' }, { status: 500 });
  }
}
