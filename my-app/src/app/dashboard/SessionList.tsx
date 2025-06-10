'use client';

import React, { useMemo } from 'react';
import styles from './SessionList.module.css';
import SessionCard from '@/components/session/detail/SessionCard';

export interface NoteItem {
  id: string;
  clientInitials: string;
  sessionDate: Date;
  transcript: string;
  structuredContent: string;
}

export type SessionListProps = {
  notes: NoteItem[];
  viewMode: 'byNote' | 'byClient';
  onUpdate: (
    id: string,
    updates: { transcript?: string; structuredContent?: string }
  ) => Promise<void> | void;
  onDelete: (id: string) => Promise<void> | void;
  onClick?: (id: string) => void;
};

export default function SessionList({
  notes,
  viewMode,
  onUpdate,
  onDelete,
  onClick,
}: SessionListProps) {
  const byClient = useMemo(() => {
    return notes.reduce((groups, note) => {
      (groups[note.clientInitials] ||= []).push(note);
      return groups;
    }, {} as Record<string, NoteItem[]>);
  }, [notes]);

  return (
    <div className={styles.container}>
      {viewMode === 'byNote' && (
        <div className={styles.list}>
          {notes
            .slice()
            .sort((a, b) => b.sessionDate.getTime() - a.sessionDate.getTime())
            .map((note) => (
              <SessionCard
                key={note.id}
                note={note}
                onClick={onClick}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
        </div>
      )}

      {viewMode === 'byClient' && (
        <div className={styles.list}>
          {Object.entries(byClient).map(([client, notesForClient]) => (
            <div key={client} className={styles.clientGroup}>
              <h3 className={styles.clientHeader}>{client}</h3>
              {notesForClient
                .slice()
                .sort((a, b) => b.sessionDate.getTime() - a.sessionDate.getTime())
                .map((note) => (
                  <SessionCard
                    key={note.id}
                    note={note}
                    onClick={onClick}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                  />
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
