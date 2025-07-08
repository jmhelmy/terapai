// functions/src/services/firestoreService.ts
import * as functions from 'firebase-functions';
import { adminApp, db } from '../common/adminSdk'; // adjust path if needed

interface SaveNoteDetails {
  therapistId: string;
  sessionDate: number;             // milliseconds since UNIX epoch
  transcript: unknown;             // whatever shape your transcript is
  structuredContent: unknown;      // if used elsewhere
  originalAudioFileName: string;
  soapNote?: {
    subjective?: string;
    objective?: string;
    assessment?: string;
    plan?: string;
  };
}

export async function saveNote(details: SaveNoteDetails): Promise<string> {
  functions.logger.info('Attempting to save note to Firestore', {
    therapistId: details.therapistId,
    audioFile: details.originalAudioFileName,
  });

  // Validate sessionDate
  const tsMillis = details.sessionDate;
  if (typeof tsMillis !== 'number' || tsMillis <= 0) {
    functions.logger.error('Invalid sessionDate in saveNote:', { sessionDate: tsMillis });
    throw new Error('sessionDate must be a positive number (ms since Unix epoch)');
  }

  // Normalize SOAP note so no field is ever undefined
  const soapNote = {
    subjective: details.soapNote?.subjective ?? '',
    objective: details.soapNote?.objective ?? '',
    assessment: details.soapNote?.assessment ?? '',
    plan: details.soapNote?.plan ?? ''
  };

  // Build Firestore document payload using adminApp
  const noteData = {
    therapistId: details.therapistId,
    sessionDate: adminApp.firestore.Timestamp.fromMillis(tsMillis),
    transcript: details.transcript,
    structuredContent: details.structuredContent,
    originalAudioFileName: details.originalAudioFileName,
    soapNote,                                         // ← NEW
    createdAt: adminApp.firestore.FieldValue.serverTimestamp(),
    status: 'completed',
  };

  try {
    const noteRef = await db.collection('therapySessionNotes').add(noteData);
    functions.logger.info('Note saved successfully to Firestore.', { noteId: noteRef.id });
    return noteRef.id;
  } catch (err: any) {
    const msg = err instanceof Error ? err.message : 'Unknown error during Firestore save.';
    functions.logger.error('Error saving note to Firestore:', {
      error: msg,
      originalError: err,
      details
    });
    throw new Error(`Failed to save note to Firestore: ${msg}`);
  }
}
