// functions/src/services/auditService.ts

import * as admin from 'firebase-admin';
import { db } from '../common/adminSdk'; // ✅ FIXED: use `db`, not `dbAdmin`

export interface AuditLogEntry {
  action: string;          // e.g. "generateNote", "logConsent"
  userId: string;          // therapist UID
  targetId?: string;       // noteId, consentLogId, etc.
  timestamp: FirebaseFirestore.FieldValue;
}

/**
 * Writes an entry to the 'auditLogs' collection.
 */
export async function logAudit(
  action: string,
  userId: string,
  targetId?: string
): Promise<FirebaseFirestore.DocumentReference> {
  const entry: AuditLogEntry = {
    action,
    userId,
    targetId,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  };
  return db.collection('auditLogs').add(entry); // ✅ also renamed here
}
