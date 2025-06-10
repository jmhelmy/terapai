'use client';

// Remove compat imports
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegisterPage.module.css';
import { auth } from '@/lib/firebaseClient';
// Import modular createUserWithEmailAndPassword function
import { createUserWithEmailAndPassword } from 'firebase/auth';

// Remove redundant initialization
// Initialize once (outside the component)
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
// const auth = firebase.auth(); // Remove local auth instance

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Use the imported modular function, passing the auth instance
      await createUserWithEmailAndPassword(auth, email, password);
      router.push('/legal');
    } catch (err: any) {
      console.error('Registration error:', err);
      setError(err.message || 'Something went wrong.');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.card}>
        <h1 className={styles.title}>Create Account</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={styles.input}
            />
          </label>
          <label className={styles.label}>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className={styles.input}
            />
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitBtn}>Sign Up</button>
        </form>
        <p className={styles.footer}>
          Already have an account?{' '}
          <a href="/login" className={styles.link}>Log in</a>
        </p>
      </main>
    </div>
  );
}
