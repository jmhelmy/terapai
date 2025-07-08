"use client";
import { useState } from 'react';
import SessionTabs from '@/components/session/detail/SessionTabs';
import SoapNotesTab from '@/components/session/detail/SoapNotesTab';
import TranscriptTab from '@/components/session/detail/TranscriptTab';
import OtherNotesTab from '@/components/session/detail/OtherNotesTab';
import styles from './ClientDetailClient.module.css';
import Link from 'next/link';

interface SoapNote { subjective: string; objective: string; assessment: string; plan: string }
interface SessionItem {
  id: string;
  sessionDate: string;
  transcript: string;
  soapNote: SoapNote;
  otherNotes?: string;
}

interface ClientDetailClientProps {
  client: { id: string; name: string };
  sessions: SessionItem[];
}

export default function ClientDetailClient({ client, sessions }: ClientDetailClientProps) {
  const [selectedId, setSelectedId] = useState(sessions[0]?.id);
  const [activeTab, setActiveTab] = useState('SOAP Note');
  const session = sessions.find(s => s.id === selectedId)!;

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2 className={styles.clientName}>{client.name}</h2>
        <ul className={styles.sessionList}>
          {sessions.map(s => (
            <li
              key={s.id}
              className={s.id === selectedId ? styles.active : ''}
              onClick={() => setSelectedId(s.id)}
            >
              {new Date(s.sessionDate).toLocaleString([], {
                month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
              })}
            </li>
          ))}
        </ul>
      </aside>

      <main className={styles.main}>
        <Link href={`/session/record?clientId=${client.id}`}>
          <button style={{ marginBottom: '1rem' }}>Record New Session</button>
        </Link>
        <header className={styles.header}>
          {new Date(session.sessionDate).toLocaleString([], {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
          })}
        </header>

        <SessionTabs
          tabs={['SOAP Note','Transcript','Other notes']}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className={styles.content}>
          {activeTab === 'SOAP Note' && (
            <SoapNotesTab sessionId={session.id} initialSoap={session.soapNote} />
          )}
          {activeTab === 'Transcript' && (
            <TranscriptTab transcript={session.transcript.split('\n').map((text, i) => ({ speaker: 1, text }))} />
          )}
          {activeTab === 'Other notes' && (
            <OtherNotesTab notes={session.otherNotes ?? ''} />
          )}
        </div>
      </main>
    </div>
  );
} 