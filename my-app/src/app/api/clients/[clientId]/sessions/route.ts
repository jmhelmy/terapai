// src/app/api/clients/[clientId]/sessions/route.ts

import { NextRequest, NextResponse } from "next/server";
import { dbAdmin, authAdmin } from "@/lib/adminFirebase"; // Note: add authAdmin

export async function GET(
  request: NextRequest,
  { params }: { params: { clientId: string } }
) {
  try {
    // 1. Require auth
    const authHeader = request.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const idToken = match[1];
    const decoded = await authAdmin.verifyIdToken(idToken);

    // 2. Validate clientId
    const { clientId } = params;
    if (!clientId) {
      return NextResponse.json({ error: "Missing clientId" }, { status: 400 });
    }

    // 3. Ensure client belongs to this therapist/user
    const clientDoc = await dbAdmin.collection("clients").doc(clientId).get();
    if (!clientDoc.exists) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }
    const clientData = clientDoc.data();
    if (clientData.userId !== decoded.uid) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // 4. Query sessions for this client
    const snapshot = await dbAdmin
      .collection("therapySessionNotes")
      .where("clientId", "==", clientId)
      .orderBy("createdAt", "desc")
      .get();

    const sessions = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        date: data.createdAt?.toDate?.() ? data.createdAt.toDate().toISOString() : "",
        summary: data.summary ?? "",
        durationMinutes: data.durationMinutes ?? null,
        // Add other session fields as needed
      };
    });

    return NextResponse.json(sessions);
  } catch (err) {
    console.error("API /api/clients/[clientId]/sessions error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
