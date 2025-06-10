export async function GET(request, { params }) {
  return Response.json({ success: true, sessionId: params.sessionId });
}
