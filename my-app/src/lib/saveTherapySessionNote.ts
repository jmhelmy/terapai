import { firestore } from "@/lib/firebaseClient";
import {
  Timestamp,
  FieldValue,
  serverTimestamp,
  collection,
  doc,
  setDoc,
} from "firebase/firestore";

export interface SoapNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}

export interface TherapySessionNoteData {
  therapistId: string;
  clientId: string;
  clientName: string;
  createdAt: FieldValue;
  sessionDate: Timestamp;
  transcript: string;
  soapNote: SoapNote;
  originalAudioFileName: string;
  status: string;
  sessionId: string;
  structuredContent: string;
}

export async function saveTherapySessionNote(
  userId: string,            // therapistId
  clientId: string,          // Firestore doc ID
  clientName: string,        // Client display name
  transcript: string,
  soapNote: SoapNote,
  sessionDate: Date,
  originalAudioFileName: string,
  sessionId: string
): Promise<string> {
  // ----- Type & value checks -----
  if (!clientId || typeof clientId !== "string") {
    throw new Error("clientId is required and must be a string");
  }
  if (!clientName || typeof clientName !== "string") {
    throw new Error("clientName is required and must be a string");
  }

  // Remove any html tags and trim whitespace
  const sanitizedClientName = clientName.replace(/<[^>]*>?/gm, "").trim();
  if (!sanitizedClientName) {
    throw new Error("clientName is required and must not be empty after sanitizing");
  }

  const normalizedSoapNote: SoapNote = {
    subjective: soapNote?.subjective ?? "",
    objective: soapNote?.objective ?? "",
    assessment: soapNote?.assessment ?? "",
    plan: soapNote?.plan ?? "",
  };

  const noteData: TherapySessionNoteData = {
    therapistId: userId,
    clientId,
    clientName: sanitizedClientName,
    createdAt: serverTimestamp(),
    sessionDate: Timestamp.fromDate(sessionDate),
    transcript,
    soapNote: normalizedSoapNote,
    structuredContent: "",
    originalAudioFileName,
    status: "complete",
    sessionId,
  };

  console.log("▶️ About to write therapySessionNote:", noteData);
  console.log("clientId typeof:", typeof clientId, clientId);
console.log("clientName typeof:", typeof clientName, clientName);


  try {
    const docRef = doc(collection(firestore, "therapySessionNotes"));
    await setDoc(docRef, noteData);
    console.log("✅ Therapy session note saved with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error saving therapy session note to Firestore:", error);
    throw new Error("Failed to save therapy note. Please try again.");
  }
}
