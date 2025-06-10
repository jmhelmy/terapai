// src/hooks/useAudioRecorder.ts
import { useState, useRef, useCallback, useEffect } from 'react';

export const useAudioRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob|null>(null);
  const [statusMessage, setStatusMessage] = useState('');

  // new:
  const [startTime, setStartTime] = useState<number|null>(null);
  const [endTime,   setEndTime]   = useState<number|null>(null);

  const mediaRecorderRef = useRef<MediaRecorder|null>(null);
  const audioChunksRef   = useRef<Blob[]>([]);
  const intervalRef      = useRef<NodeJS.Timeout|null>(null);
  const streamRef        = useRef<MediaStream|null>(null);

  const cleanup = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const startRecording = async () => {
    if (isRecording) return;
    setAudioBlob(null);
    setEndTime(null);
    setStatusMessage('Requesting mic…');
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });
      setStatusMessage('Recording…');
      setStartTime(Date.now());              // ← record absolute start
      setRecordingDuration(0);

      const mr = new MediaRecorder(streamRef.current);
      mediaRecorderRef.current = mr;
      audioChunksRef.current = [];

      mr.ondataavailable = e => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: mr.mimeType });
        setAudioBlob(blob);
        setIsRecording(false);
        setStatusMessage('Stopped');
        setEndTime(Date.now());            // ← record absolute end
        cleanup();
      };

      mr.start();
      setIsRecording(true);
      intervalRef.current = setInterval(() => {
        setRecordingDuration(d => d + 1);
      }, 1000);
    } catch (err: any) {
      setStatusMessage('Mic error: ' + (err.message || err.name));
      cleanup();
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  return {
    isRecording,
    recordingDuration,
    audioBlob,
    statusMessage,
    setStatusMessage,
    startTime,
    endTime,
    startRecording,
    stopRecording,
  };
};
