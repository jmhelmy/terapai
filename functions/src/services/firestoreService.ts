// functions/src/services/firestoreService.ts
import * as functions from 'firebase-functions';
import { adminApp, db } from '../common/adminSdk'; // Import adminApp and db

// Define the interface for the data passed to this service
export interface NoteToSaveData {
  therapistId: string;
  sessionDate: number; // Unix timestamp (ms) from client
  transcript: string;
  structuredContent: string;
  originalAudioFileName: string;
  // Extend with other optional fields if needed, e.g., status
}

export async function saveNote(details: NoteToSaveData): Promise<string> {
  functions.logger.info("Attempting to save note to Firestore", {
    therapistId: details.therapistId,
    audioFile: details.originalAudioFileName,
  });

  // Validate sessionDate
  const tsMillis = details.sessionDate;
  if (typeof tsMillis !== 'number' || tsMillis <= 0) {
    functions.logger.error('Invalid sessionDate in saveNote:', { sessionDate: tsMillis });
    throw new Error('sessionDate must be a positive number (ms since Unix epoch)');
  }

  // Build Firestore document payload using adminApp
  const noteData = {
    therapistId: details.therapistId,
    sessionDate: adminApp.firestore.Timestamp.fromMillis(tsMillis), // Use adminApp
    transcript: details.transcript,
    structuredContent: details.structuredContent,
    originalAudioFileName: details.originalAudioFileName,
    createdAt: adminApp.firestore.FieldValue.serverTimestamp(), // Use adminApp
    status: 'completed',
  };

  try {
    const noteRef = await db.collection('therapySessionNotes').add(noteData);
    functions.logger.info('Note saved successfully to Firestore.', { noteId: noteRef.id });
    return noteRef.id;
  } catch (err: unknown) {
    let msg = 'Unknown error during Firestore save.';
    if (err instanceof Error) {
      msg = err.message;
    }
    functions.logger.error('Error saving note to Firestore in firestoreService:', { error: msg, originalError: err, details });
    throw new Error(`Failed to save note to Firestore: ${msg}`);
  }
}