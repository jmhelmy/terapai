export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextRequest, NextResponse } from 'next/server';
import { authAdmin, dbAdmin } from '@/lib/adminFirebase';

export async function GET(request: NextRequest) {
  console.log('🟢 [API] /api/sessions GET called');

  try {
    // AUTHENTICATION
    const authHeader = request.headers.get('Authorization');
    console.log('🔎 Auth header:', authHeader);

    if (!authHeader?.startsWith('Bearer ')) {
      console.warn('⛔ Missing or invalid Authorization header');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const idToken = authHeader.split('Bearer ')[1];
    console.log('🔑 idToken present:', !!idToken);

    let decodedToken;
    try {
      decodedToken = await authAdmin.verifyIdToken(idToken);
      console.log('✅ Decoded token:', decodedToken && decodedToken.uid);
    } catch (tokErr: any) {
      console.error('⛔ verifyIdToken error:', tokErr.message, tokErr.stack);
      return NextResponse.json(
        { error: 'Invalid token: ' + tokErr.message },
        { status: 401 }
      );
    }

    const userId = decodedToken?.uid;
    console.log('🧑 userId:', userId);

    if (!userId) {
      console.warn('⛔ Invalid token payload');
      return NextResponse.json({ error: 'Invalid token payload' }, { status: 401 });
    }

    // DATA FETCH WITH SAFE ORDERBY
    const baseQuery = dbAdmin
      .collection('therapySessionNotes')
      .where('therapistId', '==', userId);

    let snapshot;
    try {
      console.log('📥 Attempting orderBy(createdAt)...');
      snapshot = await baseQuery.orderBy('createdAt', 'desc').get();
      console.log('📦 orderBy succeeded, docs:', snapshot.docs.length);
    } catch (orderErr: any) {
      console.warn('⚠️ orderBy(createdAt) failed:', orderErr.message);
      snapshot = await baseQuery.get();
      console.log('📦 Unsorted fetch succeeded, docs:', snapshot.docs.length);
    }

    // MAP TO RESPONSE SHAPE
    const sessions = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        clientInitials: data.clientInitials ?? '—',
        sessionDate: data.createdAt?.toDate?.().toISOString() ?? '',
        transcript: data.transcript ?? '',
        soapNote: {
          subjective: data.soapNote?.subjective ?? '',
          objective:  data.soapNote?.objective  ?? '',
          assessment: data.soapNote?.assessment ?? '',
          plan:       data.soapNote?.plan       ?? '',
        },
      };
    });

    console.log('✅ Sessions mapped:', sessions.length);

    return NextResponse.json(sessions);
  } catch (err: any) {
    // full error logging for debugging
    console.error('🟥 GET /api/sessions error:', err.message, '\n', err.stack);
    // (dev) return the actual error message so you can inspect it in the browser
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
