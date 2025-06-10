'use client';

import { useState, useEffect } from 'react';
import { auth } from '@/lib/firebaseClient';
import SessionList, { NoteItem } from './SessionList';
import styles from './DashboardPage.module.css';
import ViewToggle, { ViewMode } from './ViewToggle';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';
import { useRouter } from 'next/navigation';

export default function DashboardContainer() {
  const router = useRouter();
  const [sessions, setSessions] = useState<NoteItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('byNote');

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        router.push('/login');
        setLoading(false);
        return;
      }

      const token = await currentUser.getIdToken();
      console.log('Got token:', token.substring(0, 20) + '...');

      const response = await fetch('/api/sessions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('🔥 Raw sessions from API:', data);
      console.log('🔥 typeof data:', typeof data);
      console.log('🔥 Array.isArray(data):', Array.isArray(data));

      const parsed: NoteItem[] = data.map((session: any) => {
        console.log('👀 Individual session before parsing:', session);
        return {
          id: session.id,
          clientInitials: session.clientInitials ?? '—',
          sessionDate: session.sessionDate
            ? new Date(session.sessionDate)
            : new Date(),
          transcript: session.transcript ?? '',
          structuredContent: session.soapNote?.subjective ?? '',
        };
      });

      console.log('✅ Parsed sessions:', parsed);
      setSessions(parsed);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sessions:', error);
      setError('Failed to load sessions');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleUpdate = async (
    id: string,
    updates: { transcript?: string; structuredContent?: string }
  ) => {
    try {
      const res = await fetch(`/api/sessions/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transcript: updates.transcript,
          soapNote: { subjective: updates.structuredContent }
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to update session: ${res.status}`);
      }

      await fetchSessions();
    } catch (err: any) {
      console.error('Error updating session:', err);
      alert(err.message || 'Failed to save session');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/sessions/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete session: ${res.status}`);
      }

      await fetchSessions();
    } catch (err: any) {
      console.error('Error deleting session:', err);
      alert(err.message || 'Failed to delete session');
    }
  };

  const handleSessionClick = (id: string) => {
    router.push(`/session/${id}`);
  };

  if (loading) return <LoadingState />;
  if (error) return <div>Error: {error}</div>;
  if (sessions.length === 0) return <EmptyState />;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Your Sessions</h1>
        <ViewToggle view={viewMode} onChange={setViewMode} />
      </div>
      <SessionList
        notes={sessions}
        viewMode={viewMode}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onClick={handleSessionClick}
      />
    </div>
  );
}
