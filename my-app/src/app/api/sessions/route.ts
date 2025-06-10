// src/app/api/sessions/route.ts
export const dynamic = 'force-dynamic'; // <--- THIS LINE IS CRUCIAL FOR DYNAMIC ROUTES

import { NextRequest, NextResponse } from 'next/server';
import { authAdmin, dbAdmin } from '@/lib/adminFirebase';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    let decodedToken;
    try {
      decodedToken = await authAdmin.verifyIdToken(idToken);
    } catch (error: any) {
      return NextResponse.json({ error: 'Invalid token: ' + error.message }, { status: 401 });
    }

    const userId = decodedToken?.uid;
    if (!userId) {
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
    }

    const snapshot = await dbAdmin
      .collection('therapySessionNotes')
      .where('therapistId', '==', userId)
      .orderBy('createdAt', 'desc')
      .get();

    const sessions = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        clientInitials: data.clientInitials ?? '—',
        sessionDate: data.createdAt?.toDate?.().toISOString() ?? '',
        transcript: data.transcript ?? '',
        soapNote: {
          subjective: data.soapNote?.subjective ?? '',
          objective: data.soapNote?.objective ?? '',
          assessment: data.soapNote?.assessment ?? '',
          plan: data.soapNote?.plan ?? '',
        },
      };
    });

    return NextResponse.json(sessions);
  } catch (err) {
    console.error('GET /api/sessions error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}