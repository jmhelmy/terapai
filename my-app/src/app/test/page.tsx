'use client';

import { useEffect } from "react";
import { initializeApp, getApps } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

export default function DebugTokenPage() {
  useEffect(() => {
    const fetchToken = async () => {
      const { getAuth } = await import("firebase/auth");
      const auth = getAuth();

      const user = auth.currentUser;
      if (!user) {
        console.log("⚠️ No user is signed in.");
        return;
      }

      const token = await user.getIdToken();
      console.log("🔥 Firebase ID Token:", token);
    };

    fetchToken();
  }, []);

  return <div>Debugging Firebase token... check the console.</div>;
}
