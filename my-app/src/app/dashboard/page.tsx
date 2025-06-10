'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
// Remove direct firebase import as auth state is handled by context
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import DashboardContainer from './DashboardContainer';
import TopNav from '@/components/TopNav';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook

// Remove direct firebase initialization as it's handled by firebaseClient.ts
// ✅ Initialize Firebase if it isn't already
// if (!firebase.apps.length) {
//   firebase.initializeApp({
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
//     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
//     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
//     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
//     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
//     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
//   });
// }

export default function DashboardPage() {
  // Use the useAuth hook to get auth state
  const { user, loading } = useAuth();

  // Add console logs to check auth state
  console.log('DashboardPage: user from useAuth:', user);
  console.log('DashboardPage: loading from useAuth:', loading);

  const router = useRouter();

  // Removed local user and loading state definitions
  // const [user, setUser] = useState<firebase.User | null>(null);
  // const [loading, setLoading] = useState(true);

  // Removed Effect 1: Auth state listener is now in AuthProvider
  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
  //     setUser(firebaseUser);
  //     setLoading(false);
  //   });
  //   return () => unsubscribe();
  // }, []);

  // Keep Effect 2: Handle redirection based on user and loading from useAuth
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]); // Depend on user, loading from useAuth, and router

  // Render based on loading state from useAuth
  if (loading) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>Loading dashboard…</p>;
  }

  // Render content only if user is available (checked via !loading && !user above)
  if (!user) {
    // This fallback message is less likely to be seen due to the useEffect redirect
    return <p style={{ padding: '2rem', textAlign: 'center' }}>Authentication failed or redirecting…</p>;
  }

  return (
    <>
      <TopNav />
      {/* Pass the actual user if needed by TopNav or other components, but NOT DashboardContainer */}
      {/* <TopNav user={user} /> */}
      {/* DashboardContainer now gets user info internally if needed */}
      <DashboardContainer />
    </>
  );
}
