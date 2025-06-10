// src/lib/saveTherapySessionNote.ts

// Remove compat imports
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';

// Import firestore and other necessary modules from firebaseClient.ts
import { firestore } from '@/lib/firebaseClient';
// Import modular Firestore functions, including serverTimestamp
import { Timestamp, FieldValue, serverTimestamp, collection, doc, setDoc } from 'firebase/firestore'; // Add setDoc import

// Re-declare Timestamp and serverTimestamp if needed, using modular imports
// const Timestamp = firebase.firestore.Timestamp;
// const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;

export interface SoapNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface TherapySessionNoteData {
  therapistId: string; // This will now come from the argument
  createdAt: FieldValue; // Use modular FieldValue type
  sessionDate: Timestamp; // Use modular Timestamp type
  transcript: string;
  soapNote: SoapNote;
  originalAudioFileName: string;
  status: string;
  sessionId: string; // ← required by your Firestore rules
  structuredContent: string;
}

// Accept userId as an argument
export async function saveTherapySessionNote(
  userId: string, // Add userId parameter
  transcript: string,
  soapNote: SoapNote,
  sessionDate: Date,
  originalAudioFileName: string,
  sessionId: string // ← must be a non‐null string
): Promise<string> {
  // Remove internal auth access and user check
  // const auth = firebase.auth();
  // const firestore = firebase.firestore(); // Remove direct call to firebase.firestore()
  // const user = auth.currentUser;

  // Remove user check
  // if (!user) { ... }

  // Build the exact object that matches your Firestore rules:
  const noteData: TherapySessionNoteData = {
    therapistId: userId, // Use the userId argument
    createdAt: serverTimestamp(), // Use the imported modular serverTimestamp function
    sessionDate: Timestamp.fromDate(sessionDate), // Use modular Timestamp
    transcript,
    soapNote,
    structuredContent: '', // <-- this satisfies Firestore rules
    originalAudioFileName,
    status: 'complete',
    sessionId,
  };

  // ───────────────────────────────────────────────
  // Debug log: verifies that every required field is present and correctly typed
  console.log('▶️ About to write therapySessionNote:', {
    therapistId: noteData.therapistId,
    transcript: noteData.transcript,
    sessionDate: noteData.sessionDate,           // Firestore Timestamp
    createdAt: noteData.createdAt,               // FieldValue.serverTimestamp()
    originalAudioFileName: noteData.originalAudioFileName,
    status: noteData.status,
    sessionId: noteData.sessionId,
    // (You can also log soapNote if you want to inspect its contents here)
  });
  // ───────────────────────────────────────────────

  try {
    // Use the imported firestore instance
    // The .collection() method exists on the Firestore instance.
    // Use the modular collection and doc functions
    const docRef = doc(collection(firestore, 'therapySessionNotes'));
    await setDoc(docRef, noteData); // Use setDoc instead of docRef.set()

    console.log('✅ Therapy session note saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('❌ Error saving therapy session note to Firestore:', error);
    throw new Error('Failed to save therapy note. Please try again.');
  }
}
