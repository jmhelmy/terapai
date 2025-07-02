// src/app/api/sessions/[sessionId]/route.ts

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/adminFirebase';

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Extract sessionId from the URL path
  const url = new URL(request.url);
  const segments = url.pathname.split('/');
  const sessionId = segments[segments.length - 1]; 

  if (!sessionId) {
    return NextResponse.json(
      { error: 'Missing sessionId in URL' },
      { status: 400 }
    );
  }

  try {
    console.log(`🔎 GET session by id: ${sessionId}`);

    const doc = await dbAdmin
      .collection('therapySessionNotes')
      .doc(sessionId)
      .get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: 'Session not found' },
        { status: 404 }
      );
    }

    const data = doc.data()!;
    const soapNote = {
      subjective: data.soapNote?.subjective ?? '',
      objective:  data.soapNote?.objective  ?? '',
      assessment: data.soapNote?.assessment ?? '',
      plan:       data.soapNote?.plan       ?? '',
    };

    return NextResponse.json({
      id:             doc.id,
      clientInitials: data.clientInitials ?? '—',
      sessionDate:    data.createdAt?.toDate().toISOString() ?? '',
      transcript:     data.transcript ?? '',
      soapNote,
    });
  } catch (err: any) {
    console.error('🟥 GET /api/sessions/[sessionId] error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
