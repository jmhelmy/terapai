'use client';

import React, { useState } from 'react';
import styles from './RecordingControls.module.css';

interface RecordingControlsProps {
  isRecording: boolean;
  isProcessing: boolean;
  duration: number;
  onStart: () => void;
  onStop: () => void;
}

export function RecordingControls({
  isRecording,
  isProcessing,
  duration,
  onStart,
  onStop,
}: RecordingControlsProps) {
  const format = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = String(Math.floor(sec % 60)).padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStart = async () => {
    onStart();
  };

  const handleClick = isRecording ? onStop : handleStart;
  const disabled = isProcessing || isRecording;

  return (
    <div className={styles.wrapper}>
      <button
        onClick={handleClick}
        disabled={disabled}
        className={isRecording ? styles.stopButton : styles.startButton}
      >
        {isRecording
          ? 'Stop Recording'
          : isProcessing
          ? 'Processing…'
          : 'Start Recording'}
      </button>
      <span className={styles.timer}>
        {isRecording
          ? `Recording: ${format(duration)}`
          : `Duration: ${format(duration)}`}
      </span>
    </div>
  );
}
