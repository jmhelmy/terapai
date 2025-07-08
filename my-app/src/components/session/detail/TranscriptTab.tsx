// src/components/session/detail/TranscriptTab.tsx
"use client";

import styles from "./TranscriptTab.module.css";

export default function TranscriptTab({ transcript }: { transcript: string }) {
  if (!transcript) {
    return <p className={styles.empty}>No transcript available.</p>;
  }
  return <pre className={styles.transcript}>{transcript}</pre>;
}
