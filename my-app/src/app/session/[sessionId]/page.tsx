// src/app/session/[sessionId]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SessionDetail, { Session } from '@/components/session/detail/SessionDetail';
import styles from './SessionDetail.module.css';

export default function SessionDetailPage() {
  const { sessionId } = useParams() as { sessionId: string };
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/sessions/${sessionId}`);
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();

        console.log('🔥 session from Firestore:', data);

        // Build correct Session type
        const sessionData: Session = {
          id: data.id,
          clientName: data.clientInitials ?? '—',
          transcript: data.transcript ?? '',
          soapNote: {
            subjective: data.soapNote?.subjective ?? '',
            objective: data.soapNote?.objective ?? '',
            assessment: data.soapNote?.assessment ?? '',
            plan: data.soapNote?.plan ?? '',
          },
        };

        setSession(sessionData);
      } catch (err: any) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [sessionId]);

  if (loading) return <p className={styles.loading}>Loading session…</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!session) return <p className={styles.empty}>Session not found.</p>;

  return (
    <SessionDetail
      session={session}
      initialTab="Notes"
    />
  );
}
