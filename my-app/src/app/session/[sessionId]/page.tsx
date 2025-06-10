// src/app/session/[sessionId]/page.tsx
'use client';  // ← mark this entire file as a Client Component

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import SoapNotesTab from '@/components/session/detail/SoapNotesTab';
import styles from './SessionDetail.module.css';

type SoapNote = {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
};

type TherapySessionNote = {
  id: string;
  transcript: string;
  soapNote: SoapNote;
  sessionDate: string; // ISO string
  clientInitials: string;
  originalAudioFileName: string;
};

export default function SessionDetailPage() {
  const { sessionId } = useParams() as { sessionId: string };
  const [note, setNote] = useState<TherapySessionNote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true);
      try {
        // If your API route returns a single note by doc id, you might fetch by doc id.
        // But if you want all notes with that sessionId and assume only one per session:
        const res = await fetch(`/api/sessions/${sessionId}`);
        if (!res.ok) throw new Error(`Failed: ${res.status}`);
        const data = await res.json();
        // Data shape: { id, transcript, soapNote, sessionDate, clientInitials, ... }
        setNote(data as TherapySessionNote);
      } catch (e: any) {
        console.error(e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [sessionId]);

  if (loading) return <p className={styles.loading}>Loading session…</p>;
  if (error) return <p className={styles.error}>Error: {error}</p>;
  if (!note) return <p className={styles.empty}>Session not found.</p>;

  const { transcript, soapNote, sessionDate, clientInitials } = note;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Session for {clientInitials}</h1>
      <p className={styles.date}>
        {new Date(sessionDate).toLocaleString([], {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })}
      </p>

      <section className={styles.transcriptSection}>
        <h2>Transcript</h2>
        <pre className={styles.transcript}>{transcript}</pre>
      </section>

      <section className={styles.soapSection}>
        <h2>SOAP Note (Editable)</h2>
        <SoapNotesTab sessionId={sessionId} initialSoap={soapNote} />
      </section>
    </div>
  );
}
