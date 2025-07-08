export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { dbAdmin } from "@/lib/adminFirebase";

export async function GET(request: NextRequest): Promise<NextResponse> {
  // Extract sessionId from the URL path
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  const sessionId = segments[segments.length - 1];

  if (!sessionId) {
    return NextResponse.json(
      { error: "Missing sessionId in URL" },
      { status: 400 }
    );
  }

  try {
    console.log(`🔎 GET session by id: ${sessionId}`);

    const doc = await dbAdmin
      .collection("therapySessionNotes")
      .doc(sessionId)
      .get();

    if (!doc.exists) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const data = doc.data()!;

    // --- Calculate duration if you have startTime and endTime ---
    let duration: string | null = null;
    try {
      const start = data.startTime?.toDate?.() ?? null;
      const end = data.endTime?.toDate?.() ?? null;
      if (start && end) {
        const mins = Math.round((end - start) / 60000);
        duration = mins > 0 ? `${mins} min` : "N/A";
      }
    } catch (err) {
      duration = null;
    }

    const soapNote = {
      subjective: data.soapNote?.subjective ?? "",
      objective: data.soapNote?.objective ?? "",
      assessment: data.soapNote?.assessment ?? "",
      plan: data.soapNote?.plan ?? "",
    };

    return NextResponse.json({
      id: doc.id,
      clientName: data.clientName ?? "", // <-- NEW: full name if present
      clientInitials: data.clientInitials ?? "—",
      sessionDate: data.createdAt?.toDate?.().toISOString() ?? "",
      duration: duration ?? "N/A",
      transcript: data.transcript ?? "",
      soapNote,
    });
  } catch (err: any) {
    console.error("🟥 GET /api/sessions/[sessionId] error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
