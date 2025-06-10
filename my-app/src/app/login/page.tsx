// src/app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebaseClient'; // Import the shared auth instance
import styles from './LoginPage.module.css'; // Import the CSS module
import Link from 'next/link'; // Import Link for the registration link
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Set loading state
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On successful login, redirect to the dashboard
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login error:', err);
      // Display a user-friendly error message
      setError(err.message || 'Login failed. Please try again.');
      setIsLoading(false); // Unset loading state on error
    }
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.card}>
        <h1 className={styles.title}>Log In</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>
            Email
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className={styles.input}
              disabled={isLoading} // Disable input while loading
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
              disabled={isLoading} // Disable input while loading
            />
          </label>
          {error && <p className={styles.error}>{error}</p>}
          <button type="submit" className={styles.submitBtn} disabled={isLoading}>
            {isLoading ? 'Logging In...' : 'Log In'} {/* Button text changes based on loading */}
          </button>
        </form>
        <p className={styles.footer}>
          Don't have an account?{' '}
          <Link href="/register" className={styles.link}>Sign Up</Link> {/* Use Link component */}
        </p>
      </main>
    </div>
  );
}