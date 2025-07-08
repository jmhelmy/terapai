import { NextRequest, NextResponse } from "next/server";
import { authAdmin, dbAdmin } from "@/lib/adminFirebase";

export async function GET(
  request: NextRequest,
  { params }: { params: { clientId: string } }
) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const idToken = match[1];
    const decoded = await authAdmin.verifyIdToken(idToken);

    // Fetch the client document by ID
    const doc = await dbAdmin.collection("clients").doc(params.clientId).get();

    if (!doc.exists) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    const data = doc.data();
    // Optionally check ownership
    if (data.userId !== decoded.uid) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    return NextResponse.json({
      id: doc.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email || "",
      phone: data.phone || "",
    });
  } catch (err) {
    console.error("API /api/clients/[clientId] error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
