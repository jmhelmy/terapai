'use client';

import { useState } from 'react';
import { saveTherapySessionNote } from '@/lib/saveTherapySessionNote';

type SoapNote = {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
};

type AudioResult = {
  transcript: string;
  soapNote: SoapNote;
};

export const useAudioProcessor = () => {
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');

  const processAudio = async (
    audioBlob: Blob,
    userId: string,
    sessionId?: string,
    onComplete?: (
      success: boolean,
      result?: AudioResult,
      noteId?: string | null,
      errorMessage?: string
    ) => void
  ) => {
    if (!audioBlob) {
      const err = 'Processing failed: audioBlob is missing.';
      console.error(err);
      setStatusMessage(err);
      onComplete?.(false, undefined, null, err);
      return;
    }

    if (!sessionId) {
      const err = 'Processing failed: sessionId is missing or invalid.';
      console.error(err);
      setStatusMessage(err);
      onComplete?.(false, undefined, null, err);
      return;
    }

    setIsProcessing(true);
    setUploadProgress(0);
    setStatusMessage('Sending audio to transcriber…');

    try {
      const defaultFileName = 'session-audio.mp3';
      const file = new File([audioBlob], defaultFileName, { type: audioBlob.type });

      console.log('📤 Uploading to Whisper with file.name:', file.name);
      setUploadProgress(10);

      const formData = new FormData();
      formData.append('file', file);

      const whisperBaseUrl = process.env.NEXT_PUBLIC_WHISPER_API_URL;
      if (!whisperBaseUrl) {
        throw new Error('Whisper API URL is not defined in environment variables.');
      }

      const whisperResponse = await fetch(`${whisperBaseUrl}/transcribe`, {
        method: 'POST',
        body: formData,
      });

      if (!whisperResponse.ok) {
        const errText = await whisperResponse.text();
        throw new Error(`Transcription error: ${whisperResponse.status} - ${errText}`);
      }

      const whisperResult = await whisperResponse.json();
      const transcript: string = whisperResult.text;
      console.log('✅ Whisper transcript:', transcript);

      setStatusMessage('Transcript received. Sending to OpenAI…');
      setUploadProgress(40);

      const aiResponse = await fetch('/api/generate-soap-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript }),
      });

      if (!aiResponse.ok) {
        const errText = await aiResponse.text();
        throw new Error(`SOAP note generation error: ${aiResponse.status} - ${errText}`);
      }

      const aiData = await aiResponse.json();
      const soapNote: SoapNote = aiData.soapNote;
      console.log('✅ Received SOAP note:', soapNote);

      setStatusMessage('Saving transcript and SOAP note…');
      setUploadProgress(70);

      const safeFilename = file.name ?? defaultFileName;
      console.log('▶️ Final originalAudioFileName to write:', safeFilename);

      const noteId = await saveTherapySessionNote(
        userId,
        transcript,
        soapNote,
        new Date(),
        safeFilename,
        sessionId
      );

      console.log('✅ Therapy session note saved with ID:', noteId);
      setStatusMessage('Saved successfully.');
      setUploadProgress(100);

      onComplete?.(true, { transcript, soapNote }, noteId);
    } catch (err: any) {
      const errorMsg = `Processing failed: ${err.message}`;
      console.error(errorMsg);
      setStatusMessage(errorMsg);
      onComplete?.(false, undefined, null, errorMsg);
    } finally {
      setIsProcessing(false);
      setUploadProgress(100);
    }
  };

  return {
    isProcessing,
    uploadProgress,
    statusMessage,
    processAudio,
    setStatusMessage,
  };
};
