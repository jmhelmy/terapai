'use client';
import React, { useRef, useState } from 'react';
import styles from './AudioReview.module.css';

interface AudioReviewProps {
  audioBlob: Blob;
  isProcessing: boolean;
  uploadProgress: number;
  onProcess: () => void;
}

export function AudioReview({
  audioBlob,
  isProcessing,
  uploadProgress,
  onProcess,
}: AudioReviewProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [duration, setDuration] = useState<number>(0);

  const format = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = String(Math.floor(sec % 60)).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Review Audio</h2>
      <audio
        ref={audioRef}
        controls
        preload="metadata"
        src={URL.createObjectURL(audioBlob)}
        className={styles.player}
        onLoadedMetadata={() => {
          const d = audioRef.current?.duration || 0;
          setDuration(isNaN(d) ? 0 : d);
        }}
      />
      <div className={styles.timing}>
        <span>Start: 0:00</span>
        <span>End: {format(duration)}</span>
        <span>Length: {format(duration)}</span>
      </div>
      <button
        onClick={onProcess}
        disabled={isProcessing}
        className={styles.processButton}
      >
        {isProcessing
          ? `Processing (${Math.round(uploadProgress)}%)…`
          : 'Process & Generate Note'}
      </button>
    </div>
  );
}
