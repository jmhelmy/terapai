// functions/src/services/azureSpeechService.ts

import * as functions from "firebase-functions";
import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";

const speechCfg = functions.config().azure?.speech || {};
functions.logger.info("Azure Speech Config:", speechCfg);

if (!speechCfg.key || !speechCfg.region) {
  functions.logger.error("Missing Azure Speech config:", speechCfg);
  throw new Error("Azure Speech service not configured.");
}

/**
 * Transcribes a 16kHz mono PCM buffer using Azure Speech Services (one‐shot).
 * @param pcmBuffer - Node.js Buffer containing raw PCM audio.
 * @returns Transcribed text as a Promise<string>.
 */
export async function transcribePCMWithAzure(pcmBuffer: Buffer): Promise<string> {
  const { key, region } = speechCfg;
  functions.logger.info(
    "AzureSpeech: Beginning transcription, bufferLength=",
    pcmBuffer.length
  );

  const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(key, region);
  speechConfig.speechRecognitionLanguage = "en-US";

  // Convert Node.js Buffer → ArrayBuffer
  const arrayBuffer = pcmBuffer.buffer.slice(
    pcmBuffer.byteOffset,
    pcmBuffer.byteOffset + pcmBuffer.byteLength
  ) as ArrayBuffer;

  const pushStream = SpeechSDK.AudioInputStream.createPushStream(
    SpeechSDK.AudioStreamFormat.getWaveFormatPCM(16000, 16, 1)
  );
  pushStream.write(arrayBuffer);
  pushStream.close();

  const audioConfig = SpeechSDK.AudioConfig.fromStreamInput(pushStream);
  const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);

  return new Promise<string>((resolve, reject) => {
    recognizer.recognizeOnceAsync(
      (result) => {
        recognizer.close();
        switch (result.reason) {
          case SpeechSDK.ResultReason.RecognizedSpeech: {
            const text = result.text.trim();
            functions.logger.info("AzureSpeech: Recognized text", {
              length: text.length,
            });
            resolve(text);
            break;
          }
          case SpeechSDK.ResultReason.NoMatch:
            functions.logger.warn("AzureSpeech: No speech recognized.");
            reject(new Error("No speech recognized in audio."));
            break;

          case SpeechSDK.ResultReason.Canceled: {
            const cancelDetails = SpeechSDK.CancellationDetails.fromResult(result);
            functions.logger.error("AzureSpeech: Recognition canceled", {
              reason: cancelDetails.reason,
              errorDetails: cancelDetails.errorDetails,
            });
            reject(new Error(`Transcription canceled: ${cancelDetails.errorDetails}`));
            break;
          }

          default:
            functions.logger.error("AzureSpeech: Unknown reason", {
              reason: result.reason,
            });
            reject(new Error(`Transcription failed with reason: ${result.reason}`));
        }
      },
      (err) => {
        recognizer.close();
        functions.logger.error("AzureSpeech: recognizeOnceAsync error", { error: err });
        reject(new Error(`Speech SDK error: ${err}`));
      }
    );
  });
}
