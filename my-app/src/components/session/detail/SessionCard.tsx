// src/components/session/SessionCard.tsx
"use client";

import React from "react";
import styles from "./SessionCard.module.css";

export interface SessionItem {
  id: string;
  clientInitials: string;
  sessionDate: Date;
  transcript: string;
  structuredContent: string;
}

interface SessionCardProps {
  note: SessionItem;
  onClick?: (id: string) => void;
  onUpdate?: (
    id: string,
    updates: { transcript?: string; structuredContent?: string }
  ) => Promise<void> | void;
  onDelete?: (id: string) => Promise<void> | void;
}

export default function SessionCard({ note, onClick, onUpdate, onDelete }: SessionCardProps) {
  if (!note) {
    console.error('SessionCard received undefined note prop');
    return null;
  }

  const dateString = note.sessionDate instanceof Date 
    ? note.sessionDate.toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : new Date(note.sessionDate).toLocaleString([], {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });

  return (
    <div
      className={styles.card}
      onClick={() => onClick?.(note.id)}
      role="button"
      tabIndex={0}
    >
      <header className={styles.header}>
        <strong>{note.clientInitials}</strong>
        <span className={styles.date}>{dateString}</span>
      </header>
      <section className={styles.preview}>
        <p>{note.structuredContent?.slice(0, 120) || 'No content'}...</p>
      </section>
    </div>
  );
}