// src/app/dashboard/LoadingState.tsx
'use client';

import React from 'react';
import styles from './LoadingState.module.css';

export default function LoadingState() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner} />
      <p>Loading...</p>
    </div>
  );
}
