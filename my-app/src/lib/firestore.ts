// src/lib/firestore.ts

// —————————————————————————————————————————————————————————————
// 1) Import Firebase “compat” SDK so that firebase.firestore() is available
// —————————————————————————————————————————————————————————————
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// —————————————————————————————————————————————————————————————
// 2) Initialize Firebase App (only once)
// —————————————————————————————————————————————————————————————
if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
  });
}

// —————————————————————————————————————————————————————————————
// 3) Grab a Firestore instance
// —————————————————————————————————————————————————————————————
export const db = firebase.firestore();

// —————————————————————————————————————————————————————————————
// 4) Timestamp / FieldValue Utilities (existing exports, unchanged)
// —————————————————————————————————————————————————————————————
export const CompatTimestamp = firebase.firestore.Timestamp;
export const compatServerTimestamp = (): firebase.firestore.FieldValue => {
  return firebase.firestore.FieldValue.serverTimestamp();
};

export type FirestoreTimestamp = firebase.firestore.Timestamp;
export type FirestoreFieldValue = firebase.firestore.FieldValue;

// —————————————————————————————————————————————————————————————
// 5) TherapySessionNote Interface (unchanged, just for types elsewhere)
// —————————————————————————————————————————————————————————————
export interface TherapySessionNote {
  therapistId: string;
  createdAt: FirestoreTimestamp | FirestoreFieldValue;
  structuredContent: string;
  sessionDate: FirestoreTimestamp;
  id?: string;
}

// —————————————————————————————————————————————————————————————
// 6) CRUD Helpers for “notes” collection
//    (so you can import getNotes, updateNote, deleteNote in your dashboard code)
// —————————————————————————————————————————————————————————————

/**
 * Fetches all notes from Firestore, ordered by sessionDate descending.
 * Returns an array of plain JS objects where `sessionDate` is an ISO‐string.
 */
export async function getNotes(): Promise<
  Array<{
    id: string;
    therapistId?: string;
    clientInitials?: string;
    sessionDate: string;        // ISO string
    transcript?: string;
    structuredContent?: string;
    [key: string]: any;         // in case you add extra fields
  }>
> {
  const snapshot = await db
    .collection('notes')
    .orderBy('sessionDate', 'desc')
    .get();

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      // Spread any extra fields you have:
      ...data,
      // Ensure sessionDate is serialized as an ISO string:
      sessionDate:
        data.sessionDate instanceof firebase.firestore.Timestamp
          ? data.sessionDate.toDate().toISOString()
          : new Date(data.sessionDate).toISOString(),
    };
  });
}

/**
 * Updates a single note document (by ID) with the fields in `updates`.
 * `updates` might contain `transcript` and/or `structuredContent` (or any other field).
 */
export async function updateNote(
  id: string,
  updates: {
    transcript?: string;
    structuredContent?: string;
    sessionDate?: string | firebase.firestore.Timestamp;
    [key: string]: any;
  }
): Promise<void> {
  await db.collection('notes').doc(id).update(updates);
}

/**
 * Deletes a single note document (by ID).
 */
export async function deleteNote(id: string): Promise<void> {
  await db.collection('notes').doc(id).delete();
}

// —————————————————————————————————————————————————————————————
// 7) (Optional) Delete Helper if not needed—already above.
// 8) At the end, ensure this file is treated as a module (no extra exports).
// —————————————————————————————————————————————————————————————
export {};
