'use client';

import React from 'react';
import Link from 'next/link';
import CaduceusIcon from '@/components/CaduceusIcon';
import styles from './EmptyState.module.css';

export default function EmptyState() {
  return (
    <div className={styles.container}>
      <CaduceusIcon className={styles.icon} />
      <h2 className={styles.title}>No session notes yet</h2>
      <p className={styles.message}>
        When you finish your first recording, your notes will appear here.
      </p>
      <Link href="/session/record">
        <button className={styles.button}>Record a Session</button>
      </Link>
    </div>
  );
}
