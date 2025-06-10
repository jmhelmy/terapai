// functions/src/services/whisperService.ts

import fetch from 'node-fetch';
import * as admin from 'firebase-admin';
import FormData from 'form-data';
import * as functions from 'firebase-functions';

export async function transcribeWithWhisper(firebasePath: string): Promise<string> {
  functions.logger.info(`whisperService: starting transcription for ${firebasePath}`);

  const bucket = admin.storage().bucket();
  const file = bucket.file(firebasePath);

  let buffer: Buffer;
  try {
    const [downloaded] = await file.download();
    buffer = downloaded;
    functions.logger.info(`whisperService: downloaded ${buffer.length} bytes`);
  } catch (err: unknown) {
    functions.logger.error(`whisperService: failed to download "${firebasePath}"`, err);
    throw new Error(
      `Failed to download audio: ${err instanceof Error ? err.message : String(err)}`
    );
  }

  const form = new FormData();
  form.append('file', buffer, {
    filename: 'audio.webm',
    contentType: 'audio/webm',
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    functions.logger.info('whisperService: calling remote Whisper API');
    const response = await fetch(
      'http://ec2-18-219-113-46.us-east-2.compute.amazonaws.com:8000/transcribe',
      {
        method: 'POST',
        body: form as any,
        headers: form.getHeaders(),
        signal: controller.signal,
      }
    );
    clearTimeout(timeout);

    functions.logger.info(
      `whisperService: remote API responded with status ${response.status}`
    );
    if (!response.ok) {
      const errorBody = await response.text().catch(() => '<no body>');
      functions.logger.error(
        `whisperService: non-OK HTTP ${response.status}: ${errorBody}`
      );
      throw new Error(`Whisper API failed (status ${response.status})`);
    }

    const data = await response.json().catch((err: any) => {
      throw new Error(
        `JSON parse error: ${err instanceof Error ? err.message : String(err)}`
      );
    });

    if (!data || typeof data.text !== 'string') {
      functions.logger.error('whisperService: unexpected response shape', data);
      throw new Error(`Unexpected response from Whisper: ${JSON.stringify(data)}`);
    }

    functions.logger.info(
      'whisperService: transcription succeeded',
      { length: data.text.length }
    );
    return data.text;
  } catch (err: unknown) {
    if (err instanceof Error && err.name === 'AbortError') {
      functions.logger.error('whisperService: request timed out');
      throw new Error('Whisper API request timed out after 15 s');
    }
    functions.logger.error('whisperService: transcription error', err);
    throw new Error(
      `Whisper transcription failed: ${err instanceof Error ? err.message : String(err)}`
    );
  }
}
