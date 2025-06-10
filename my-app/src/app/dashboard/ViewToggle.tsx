// src/app/dashboard/ViewToggle.tsx
'use client';

import React from 'react';
import styles from './ViewToggle.module.css';

export type ViewMode = 'byNote' | 'byClient';

interface ViewToggleProps {
  view: ViewMode;
  onChange: (view: ViewMode) => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className={styles.toggleContainer}>
      <button
        type="button"
        className={`${styles.toggleButton} ${view === 'byNote' ? styles.active : ''}`}
        onClick={() => onChange('byNote')}
      >
        By Note
      </button>
      <button
        type="button"
        className={`${styles.toggleButton} ${view === 'byClient' ? styles.active : ''}`}
        onClick={() => onChange('byClient')}
      >
        By Client
      </button>
    </div>
  );
}
