// src/app/api/clients/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authAdmin, dbAdmin } from "@/lib/adminFirebase";

// POST: Add a client (HIPAA-safe, auth required)
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const idToken = match[1];
    const decoded = await authAdmin.verifyIdToken(idToken);

    const { firstName, lastName, email, phone } = await request.json();
    if (!firstName?.trim() || !lastName?.trim()) {
      return NextResponse.json({ error: "First and last name required" }, { status: 400 });
    }

    const docRef = await dbAdmin.collection("clients").add({
      userId: decoded.uid,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: (email || "").trim(),
      phone: (phone || "").trim(),
      createdAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id, firstName, lastName, email, phone });
  } catch (err) {
    // Safe to log the error itself, just not PHI
    console.error("API /api/clients POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// GET: List clients for therapist (auth required)
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization") || "";
    const match = authHeader.match(/^Bearer (.+)$/);
    if (!match) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const idToken = match[1];
    const decoded = await authAdmin.verifyIdToken(idToken);

    const snap = await dbAdmin
      .collection("clients")
      .where("userId", "==", decoded.uid)
      .orderBy("createdAt", "desc")
      .get();

    const clients = snap.docs.map(doc => {
      const d = doc.data();
      return {
        id: doc.id,
        firstName: d.firstName,
        lastName: d.lastName,
        email: d.email || "",
        phone: d.phone || "",
        createdAt: d.createdAt?.toDate?.() ? d.createdAt.toDate().toISOString() : "",
      };
    });

    return NextResponse.json(clients);
  } catch (err) {
    console.error("API /api/clients GET error:", err);
    return NextResponse.json({ error: err?.toString() || "Server error" }, { status: 500 });
  }
}
