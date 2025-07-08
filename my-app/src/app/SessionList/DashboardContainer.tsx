'use client';

import { useState } from 'react';
import SessionList from './SessionList';
import styles from './DashboardPage.module.css';
import ViewToggle from './ViewToggle';
import EmptyState from './EmptyState';

// Mock data for sessions (replace with API call as needed)
const mockSessions = [
  {
    id: 'a',
    clientInitials: 'JD',
    sessionDate: new Date('2025-06-18'),
    transcript: 'Therapist: How was your week? ...',
    structuredContent: 'Subjective: Patient is improving.',
  },
  {
    id: 'b',
    clientInitials: 'JD',
    sessionDate: new Date('2025-06-11'),
    transcript: 'Therapist: Updates? ...',
    structuredContent: 'Subjective: Fewer symptoms.',
  },
  {
    id: 'c',
    clientInitials: 'AS',
    sessionDate: new Date('2025-05-27'),
    transcript: 'Therapist: Welcome ...',
    structuredContent: 'Subjective: Intake completed.',
  },
];

export default function DashboardContainer() {
  const [viewMode, setViewMode] = useState<'byNote' | 'byClient'>('byNote');

  // Empty state logic
  if (mockSessions.length === 0) return <EmptyState />;

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Your Sessions</h1>
        <ViewToggle view={viewMode} onChange={setViewMode} />
      </div>
      <SessionList
        notes={mockSessions}
        viewMode={viewMode}
        onUpdate={async () => {}}
        onDelete={async () => {}}
        onClick={id => alert(`Go to session ${id}`)}
      />
    </div>
  );
}
