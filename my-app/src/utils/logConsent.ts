import { getFunctions, httpsCallable } from "firebase/functions";

/**
 * Logs therapist consent prior to recording.
 * @param userId The ID of the authenticated user logging consent.
 * @param consentVersion A string like "v1.0"
 * @param sessionId Optional session ID to associate with the consent
 */
export async function logConsent(userId: string, consentVersion: string, sessionId?: string): Promise<void> {
  if (!userId) {
    throw new Error("User ID must be provided to log consent.");
  }

  const functions = getFunctions();
  const logConsentFn = httpsCallable(functions, "logClientConsent");

  const result = await logConsentFn({
    userId: userId,
    consentVersion,
    sessionId: sessionId || `session_${Date.now()}`,
  });

  if (!result.data || !(result.data as any).success) {
    throw new Error("Consent logging failed.");
  }

  console.log("✅ Consent logged:", result.data);
}
