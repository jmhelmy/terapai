'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

import StatusBanner from '@/components/session/recording/StatusBanner';
import ProgressBar from '@/components/session/recording/ProgressBar';
import Button from '@/components/Button';

import { useAudioRecorder } from '@/hooks/useAudioRecorder';
import { useAudioProcessor } from '@/hooks/useAudioProcessor';
import { makeRandomId } from '@/utils/makeRandomId';

import styles from '@/app/session/record/RecordSessionPage.module.css'; // Adjust path to styles

function formatDuration(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, '0')}`;
}

export default function RecordSessionClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [sessionId] = useState(() => {
    const param = searchParams.get('sessionId');
    return param && param.length > 0 ? param : makeRandomId(24);
  });

  const { user, loading: authLoading } = useAuth();

  const [hasStarted, setHasStarted] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [didAutoProcess, setDidAutoProcess] = useState(false);

  const {
    isRecording,
    recordingDuration,
    audioBlob,
    startRecording,
    stopRecording,
    statusMessage: recorderStatus,
    setStatusMessage: setRecorderStatus,
  } = useAudioRecorder();

  const {
    isProcessing,
    uploadProgress,
    processAudio,
    statusMessage: processorStatus,
  } = useAudioProcessor();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  const handleStart = () => {
    setHasStarted(true);
    setStartTime(new Date());
    setDidAutoProcess(false);
    startRecording();
  };

  const handleStop = () => {
    stopRecording();
    setEndTime(new Date());
  };

  useEffect(() => {
    if (!isRecording && audioBlob && user && !didAutoProcess) {
      setDidAutoProcess(true);
      user.getIdToken().then((token) => {
        processAudio(audioBlob, user.uid, sessionId, async (success, result, noteId, errorMsg) => {
          if (success && result && noteId) {
            console.log('✅ Saved therapySessionNote ID:', noteId);
            router.push('/dashboard');
          } else {
            console.error('❌ Audio processing or save failed:', errorMsg);
            setRecorderStatus('Audio processing failed. Please try again.');
          }
        });
      });
    }
  }, [isRecording, audioBlob, user, didAutoProcess, processAudio, router, sessionId, setRecorderStatus]);

  if (authLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.card}>
          <p>Loading authentication…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.card}>
          <p>Verifying session or redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.card}>
        <div className={styles.headerRow}>
          <Link href="/dashboard" className={styles.backLink}>
            ← Dashboard
          </Link>
          <h1 className={styles.pageTitle}>Record New Session</h1>
        </div>

        <StatusBanner
          message={
            isRecording
              ? `Recording… (${formatDuration(recordingDuration)})`
              : processorStatus || recorderStatus
          }
          baseClass={styles.statusMessage}
          successClass={styles.statusSuccess}
          errorClass={styles.statusError}
        />

        {!hasStarted && (
          <p className={styles.disclaimer}>
            By proceeding to record, you confirm you've obtained patient consent.
          </p>
        )}

        <div className={styles.controlsWrapper}>
          {!isRecording && !hasStarted && (
            <Button variant="primary" onClick={handleStart}>
              Start Recording
            </Button>
          )}

          {isRecording && (
            <Button variant="secondary" onClick={handleStop}>
              Stop Recording
            </Button>
          )}
        </div>

        {hasStarted && endTime && (
          <div className={styles.timeline}>
            {startTime?.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            &nbsp;–&nbsp;
            {endTime?.toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
            &nbsp;(Duration {formatDuration(recordingDuration)})
          </div>
        )}

        {isProcessing && <ProgressBar progress={uploadProgress} />}
      </div>
    </div>
  );
} 