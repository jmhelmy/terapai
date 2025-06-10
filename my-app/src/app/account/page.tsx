// src/app/account/page.tsx
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from '@/components/TopNav';
import styles from './AccountPage.module.css';
// Remove direct auth import as auth state and signOut are handled by context
// import { auth } from '@/lib/firebaseClient';
import { useAuth } from '@/context/AuthContext'; // Import the useAuth hook

type SimpleUser = {
  email: string | null;
  // Add other relevant user properties if needed from firebase.User
  // For now, just using email as per the original SimpleUser type
};

export default function AccountPage() {
  // Use the useAuth hook to get auth state and signOut function
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  // Removed local user and loading state definitions
  // const [user, setUser] = useState<SimpleUser | null>(null);
  // const [loading, setLoading] = useState(true);

  // Removed Effect 1: Auth state listener is now in AuthProvider
  // useEffect(() => { ... }, []);

  // Keep Effect 2: Handle redirection based on user and loading from useAuth
  useEffect(() => {
    // Only redirect if loading is false and there is no user
    if (!loading && !user) {
      router.push('/login');
    }
    // Depend on user, loading from useAuth, and router
  }, [user, loading, router]); 

  // Use the signOut function from useAuth
  const handleLogout = useCallback(async () => {
    try {
      await signOut(); // Call signOut from the context
      console.log('User logged out successfully.');
      // The onAuthStateChanged listener in AuthProvider will detect the sign out
      // and the useEffect in this component will handle the redirect to /login.
    } catch (error: any) {
      console.error('Error logging out:', error);
      alert(`Logout failed: ${error.message}`);
    }
  }, [signOut]); // Depend on signOut from useAuth (it's stable but good practice)

  const handlePlaceholder = (what: string) => {
    alert(`${what} feature not implemented yet.`);
  };

  // Render based on loading state from useAuth
  if (loading) {
    return (
      <div className={styles.pageContainer}>
        <TopNav />
        <main className={styles.mainContent}>
          <p className={styles.loading}>Loading account…</p>
        </main>
      </div>
    );
  }

  // Render content only if user is authenticated (checked via !loading && !user above)
  // The useEffect handles the redirect, so this block is less likely to be fully rendered.
  if (!user) {
    // This fallback message is less likely to be seen due to the useEffect redirect
     return (
      <div className={styles.pageContainer}>
        <TopNav />
        <main className={styles.mainContent}>
          <p>Verifying session or redirecting...</p>
        </main>
      </div>
    );
  }

  // If we reach here, loading is false and user is not null.
  // We can safely assume user is a firebase.User object from the AuthContext.
  // We might need to map it to SimpleUser if SimpleUser has different properties.
  // For now, let's assume user from context is compatible or map it.
  // Let's map the user from context to SimpleUser.
  const simpleUser: SimpleUser = { email: user.email };

  return (
    <div className={styles.pageContainer}>
      <TopNav />
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.title}>My account</h1>
        </div>
        {/* Display the real user email from the mapped user */}
        <p className={styles.email}>{simpleUser.email}</p>
        <div className={styles.actions}>
          <button
            className={styles.actionButton}
            onClick={() => handlePlaceholder('Change Email')}
            aria-label="Change email address"
          >
            Change Email
          </button>
          <button
            className={styles.actionButton}
            onClick={() => handlePlaceholder('Change Password')}
            aria-label="Change password"
          >
            Change Password
          </button>
          <button
            className={styles.actionButton}
            onClick={() => handlePlaceholder('Manage Subscription')}
            aria-label="Manage subscription"
          >
            Manage Subscription
          </button>
        </div>
        <div className={styles.footer}>
          <button
            className={styles.buttonPrimary}
            onClick={() => handlePlaceholder('Get Help')}
            aria-label="Get help"
          >
            Get Help
          </button>
          {/* Call the signOut function from useAuth */}
          <button
            className={styles.buttonLogout}
            onClick={handleLogout}
            aria-label="Log out of account"
          >
            Logout
          </button>
          <button
            className={styles.buttonDanger}
            onClick={() => {
              if (confirm('Delete account permanently?')) {
                handlePlaceholder('Delete Account');
              }
            }}
            aria-label="Delete account"
          >
            Delete Account
          </button>
        </div>
      </main>
    </div>
  );
}
