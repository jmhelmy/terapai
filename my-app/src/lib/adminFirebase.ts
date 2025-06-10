import * as admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';

// These two exist whether dev or prod
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!;

let serviceAccount: admin.ServiceAccount | null = null;

try {
  // Allow dynamic path via env, fallback to default
  const credsPath = path.join(
    process.cwd(),
    process.env.FIREBASE_ADMIN_CREDENTIALS_PATH || 'firebase-admin-creds.json'
  );

  console.log('🔍 Looking for service account at:', credsPath);
  serviceAccount = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
  console.log('✅ Successfully loaded service account from file');
} catch (e: any) {
  console.warn('⚠️ No local service account file found or failed to parse:', e.message);
}

if (!admin.apps.length) {
  if (
    process.env.FIRESTORE_EMULATOR_HOST ||
    process.env.FIREBASE_AUTH_EMULATOR_HOST ||
    process.env.FIREBASE_STORAGE_EMULATOR_HOST
  ) {
    console.log('🔧 Initializing Firebase Admin with emulators');
    admin.initializeApp({ projectId, storageBucket });
  } else if (serviceAccount) {
    console.log('🔑 Initializing Firebase Admin with service account from file');
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket,
    });
  } else {
    console.log('⚠️ Initializing Firebase Admin with projectId only (no credentials)');
    admin.initializeApp({ projectId, storageBucket });
  }
}

export const dbAdmin = admin.firestore();
export const authAdmin = admin.auth();
export const storageAdmin = admin.storage();
