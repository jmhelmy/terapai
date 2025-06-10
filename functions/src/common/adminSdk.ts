// functions/src/common/adminSdk.ts
import admin from "firebase-admin";

// Initialize Admin SDK only once
if (!admin.apps.length) {
  admin.initializeApp({
    storageBucket: process.env.GCLOUD_STORAGE_BUCKET || "therascript-45b62.appspot.com",
  });
  console.log("🔧 Admin SDK initialized. Bucket:", admin.app().options.storageBucket);
} else {
  console.log("🔧 Admin SDK already initialized. Bucket:", admin.app().options.storageBucket);
}

export const adminApp = admin;
export const db = admin.firestore();
export const defaultBucket = admin.storage().bucket();
