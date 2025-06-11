export const runtime = 'nodejs';

import * as admin from 'firebase-admin';

export async function GET() {
  try {
    return new Response(JSON.stringify({ success: typeof admin }), { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), { status: 500 });
  }
}
