// src/components/session/detail/TranscriptTab.tsx
"use client";

import styles from "./TranscriptTab.module.css";

interface TranscriptEntry {
  speaker: number;
  text: string;
}

export default function TranscriptTab({
  transcript,
}: {
  transcript: TranscriptEntry[];
}) {
  if (!transcript?.length) {
    return <p className={styles.empty}>No transcript available.</p>;
  }
  return (
    <div className={styles.transcriptContainer}>
      {transcript.map((entry, index) => (
        <div key={index} className={styles.entry}>
          <span className={styles.speaker}>Speaker {entry.speaker}:</span>{" "}
          <span className={styles.text}>{entry.text}</span>
        </div>
      ))}
    </div>
  );
}
