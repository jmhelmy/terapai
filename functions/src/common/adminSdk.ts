import * as admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!;

let serviceAccount: admin.ServiceAccount | null = null;
let usingServiceAccount = false;

try {
  const credsPath = path.join(process.cwd(), 'firebase-admin-creds.json');
  serviceAccount = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
  usingServiceAccount = true;
} catch (e: any) {
  if (process.env.NODE_ENV !== 'production') {
    console.warn('⚠️ No local service account file found or failed to parse:', e.message);
  }
}

if (!admin.apps.length) {
  if (
    process.env.FIRESTORE_EMULATOR_HOST ||
    process.env.FIREBASE_AUTH_EMULATOR_HOST ||
    process.env.FIREBASE_STORAGE_EMULATOR_HOST
  ) {
    admin.initializeApp({ projectId, storageBucket });
  } else if (usingServiceAccount && serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket,
    });
  } else {
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        "Missing firebase-admin-creds.json! Download it from Firebase Console > Project Settings > Service Accounts."
      );
    }
    admin.initializeApp({ projectId, storageBucket });
  }
}

// Your original exports
export const dbAdmin = admin.firestore();
export const authAdmin = admin.auth();
export const storageAdmin = admin.storage();

// Additional exports for compatibility with old imports
export const db = dbAdmin;
export const adminApp = admin.app();
export const defaultBucket = admin.storage().bucket();
