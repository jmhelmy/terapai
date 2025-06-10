// Payload for logClientConsent onCall
export interface LogClientConsentData {
    consentVersion: string;
    sessionId?: string;
  }
  // Return type for logClientConsent onCall
  export interface LogClientConsentResult {
    success: boolean;
    message: string;
    logId: string;
  }
  
  // Body for HTTP generateNote
  export interface GenerateNoteData {
    audioFileName: string;
    sessionDate: number; // Unix ms
  }
  // Response from HTTP generateNote
  export interface GenerateNoteResult {
    success: boolean;
    noteId?: string;
    message?: string;
    error?: string;
  }
  
  // Internal shape you save to Firestore
  export interface NoteData {
    therapistId: string;
    sessionDate: number;
    transcript: string;
    structuredContent: string;
    originalAudioFileName: string;
  }
  