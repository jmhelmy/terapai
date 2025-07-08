"use client";
import styles from './OtherNotesTab.module.css';

export default function OtherNotesTab({ notes }: { notes: string }) {
  return (
    <textarea
      className={styles.textarea}
      value={notes}
      readOnly
      placeholder="No other notes."
    />
  );
} 