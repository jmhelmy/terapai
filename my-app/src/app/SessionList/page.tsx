'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TopNav from '@/components/layout/DashboardNav/TopNav';
import { useAuth } from '@/context/AuthContext';
import EmptyState from './EmptyState';
import SessionList from './SessionList';

import type { NoteItem } from './SessionList';

type ApiSession = {
  id: string;
  clientInitials: string;
  clientName?: string;
  sessionDate: string; // ISO string
  transcript: string;
  structuredContent?: string;
};

export default function SessionListPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [sessions, setSessions] = useState<ApiSession[]>([]);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasClients = true;

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;

    async function fetchSessions() {
      setFetching(true);
      setError(null);
      try {
        if (!user) throw new Error('User not authenticated');
        const token = await user.getIdToken();
        const res = await fetch('/api/sessions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Failed to fetch sessions');
        const data = await res.json();
        setSessions(data);
      } catch (err: any) {
        setError(err.message || 'Unknown error');
        setSessions([]);
      } finally {
        setFetching(false);
      }
    }

    fetchSessions();
  }, [user]);

  if (loading || fetching) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>Loading sessions…</p>;
  }
  if (!user) {
    return <p style={{ padding: '2rem', textAlign: 'center' }}>Not authenticated. Redirecting…</p>;
  }

  // Convert API sessions to NoteItem[]
  const notes: NoteItem[] = sessions.map((s: ApiSession) => ({
    id: s.id,
    clientInitials: s.clientName
      ? s.clientName.split(' ').map((w: string) => w[0]).join('')
      : '-',
    clientName: s.clientName ?? '',
    sessionDate: new Date(s.sessionDate),
    transcript: s.transcript ?? '',
    structuredContent: s.structuredContent || 'No content...',
  }));

  // Dummy handlers (replace with real logic as needed)
  const handleUpdate = async (id: string, updates: any) => {
    // TODO: Implement update logic
  };
  const handleDelete = async (id: string) => {
    // TODO: Implement delete logic
  };
  const handleClick = (id: string) => {
    router.push(`/session/${id}`);
  };

  return (
    <>
      <TopNav />
      <div style={{ maxWidth: 900, margin: '2.5rem auto 0', padding: '0 1.5rem 2rem 1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Sessions</h1>
        {error && <div style={{ color: 'red', marginBottom: 24 }}>{error}</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.3rem' }}>
          {notes.length === 0 ? (
            <EmptyState hasClients={hasClients} />
          ) : (
            <SessionList
              notes={notes}
              viewMode="byNote" // or "byClient"
              onUpdate={handleUpdate}
              onDelete={handleDelete}
              onClick={handleClick}
            />
          )}
        </div>
      </div>
    </>
  );
}
