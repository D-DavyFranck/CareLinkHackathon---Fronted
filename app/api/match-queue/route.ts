import { NextResponse } from 'next/server';
import { Database } from '@/lib/backend/db';

export async function GET() {
  try {
    const queue = Database.getMatchQueue();
    // Return only active pending items
    const pending = queue.filter(q => q.status === 'PENDING');
    return NextResponse.json(pending);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch match queue' }, { status: 500 });
  }
}
