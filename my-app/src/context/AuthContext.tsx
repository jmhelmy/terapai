'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '@/lib/firebaseClient'; // Import your Firebase auth instance
import firebase from 'firebase/compat/app';
// You might need to import the User type if you use it directly in the context type
// import type { User } from 'firebase/auth';

interface AuthContextType {
  user: firebase.User | null; // Use firebase.User or your preferred User type
  loading: boolean;
  // Add any other auth-related functions you want to expose here (e.g., login, logout)
  signOut: () => Promise<void>; // Add signOut function to the context type
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for Firebase auth state changes
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser as firebase.User | null);
      setLoading(false);
    });

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []); // Empty dependency array means this runs once on mount

  // Add logout function to be provided by the context
  const handleSignOut = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 