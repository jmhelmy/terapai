// src/lib/adminFirebase.ts
import { initializeApp, cert, getApp, AppOptions } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getStorage } from 'firebase-admin/storage';

// Use a real global singleton container
interface GlobalWithFirebase {
  _firebaseAdminApp?: ReturnType<typeof initializeApp>;
}
const globalWithFirebase = globalThis as unknown as GlobalWithFirebase;

console.log('🪵 [adminFirebase.ts] Loaded');
console.log('🪵 ENV FIRESTORE_EMULATOR_HOST:', process.env.FIRESTORE_EMULATOR_HOST);
console.log('🪵 ENV FIREBASE_SERVICE_ACCOUNT_KEY present:', !!process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
console.log('🪵 ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID:', process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);
console.log('🪵 ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:', process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
console.log('🪵 Existing app instance?', !!globalWithFirebase._firebaseAdminApp);

if (!globalWithFirebase._firebaseAdminApp) {
  // 1) Emulator
  if (process.env.FIRESTORE_EMULATOR_HOST) {
    console.log('🔥 Using Firestore emulator at', process.env.FIRESTORE_EMULATOR_HOST);
    globalWithFirebase._firebaseAdminApp = initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    });
    console.log('🔥 Initialized Admin SDK for emulator');
  }
  // 2) Service Account Key
  else if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
      console.log('🔑 Raw key slice:', rawKey.slice(0, 80));
      const serviceAccount = JSON.parse(rawKey);
      console.log('🔑 Parsed serviceAccount.client_email:', serviceAccount.client_email);
      globalWithFirebase._firebaseAdminApp = initializeApp({
        credential: cert(serviceAccount),
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      } as AppOptions);
      console.log('✅ Initialized Admin SDK with service account');
    } catch (err: any) {
      console.error('❌ Failed to parse SERVICE_ACCOUNT_KEY:', err.message, err.stack);
      throw new Error('Malformed FIREBASE_SERVICE_ACCOUNT_KEY; check escaping and newlines.');
    }
  }
  // 3) Default App (GCP)
  else {
    try {
      console.log('☁️ Trying default application credentials...');
      globalWithFirebase._firebaseAdminApp = initializeApp();
      console.log('☁️ Initialized Admin SDK with default credentials');
    } catch (err: any) {
      console.error('❌ Default credentials init failed:', err.message, err.stack);
      throw new Error('Firebase Admin SDK initialization failed: no credentials found.');
    }
  }
} else {
  console.log('📦 Reusing existing Firebase Admin SDK instance');
}

export const dbAdmin = getFirestore(globalWithFirebase._firebaseAdminApp!);
export const authAdmin = getAuth(globalWithFirebase._firebaseAdminApp!);
export const storageAdmin = getStorage(globalWithFirebase._firebaseAdminApp!);
