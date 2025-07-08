'use client';

import styles from './ViewToggle.module.css';

export type ViewMode = 'byNote' | 'byClient';

export default function ViewToggle({
  view,
  onChange,
}: {
  view: ViewMode;
  onChange: (v: ViewMode) => void;
}) {
  return (
    <div className={styles.toggle}>
      <button
        className={view === 'byNote' ? styles.active : ''}
        onClick={() => onChange('byNote')}
      >
        All Sessions
      </button>
      <button
        className={view === 'byClient' ? styles.active : ''}
        onClick={() => onChange('byClient')}
      >
        By Client
      </button>
    </div>
  );
}
