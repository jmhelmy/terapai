// src/components/clients/ClientSessionList.tsx
"use client";

import React from "react";
import styles from "./ClientSessionList.module.css";

export interface ClientSession {
  id: string;
  date: string; // ISO string
  summary: string;
  durationMinutes?: number; // <-- New optional prop
}

interface Props {
  sessions: ClientSession[];
  onSessionClick?: (sessionId: string) => void;
}

function formatDuration(mins?: number) {
  if (!mins || mins <= 0) return null;
  if (mins < 60) return `${mins} min${mins === 1 ? "" : "s"}`;
  const hours = Math.floor(mins / 60);
  const rest = mins % 60;
  return rest === 0 ? `${hours} hr${hours === 1 ? "" : "s"}` : `${hours} hr ${rest} min`;
}

export default function ClientSessionList({ sessions, onSessionClick }: Props) {
  if (!sessions.length) {
    return (
      <div className={styles.emptyState}>
        <p>No sessions for this client yet.</p>
      </div>
    );
  }

  return (
    <ul className={styles.sessionList}>
      {sessions.map((session) => (
        <li
          key={session.id}
          className={styles.sessionItem}
          onClick={() => onSessionClick?.(session.id)}
          tabIndex={0}
          style={{
            cursor: "pointer",
            padding: "1rem",
            borderBottom: "1px solid #f1f1f4",
            background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            transition: "background 0.15s",
          }}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") {
              onSessionClick?.(session.id);
            }
          }}
        >
          <div>
            <div style={{ fontWeight: 600, color: "#213650" }}>
              {new Date(session.date).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <div style={{ color: "#64748b", fontSize: "1.04em", marginTop: 4 }}>
              {session.summary}
            </div>
          </div>
          {session.durationMinutes && (
            <div style={{
              color: "#7e94b5",
              fontSize: "0.99em",
              fontWeight: 500,
              marginLeft: "1.5rem",
              flexShrink: 0,
              minWidth: 64,
              textAlign: "right"
            }}>
              {formatDuration(session.durationMinutes)}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
