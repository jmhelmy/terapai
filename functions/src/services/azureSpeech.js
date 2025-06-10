"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcribePCMWithAzure = transcribePCMWithAzure;
// functions/src/services/azureSpeech.ts
const functions = __importStar(require("firebase-functions"));
const SpeechSDK = __importStar(require("microsoft-cognitiveservices-speech-sdk"));
/**
 * Transcribes a 16kHz mono PCM buffer using Azure Speech Services.
 * @param pcmBuffer - Node.js Buffer containing raw PCM audio.
 * @returns Transcribed text as a Promise<string>.
 */
async function transcribePCMWithAzure(pcmBuffer) {
    const key = functions.config().azurespeech?.key;
    const region = functions.config().azurespeech?.region;
    if (!key || !region) {
        throw new Error('Azure Speech SDK credentials not configured.');
    }
    functions.logger.info('AzureSpeech: Starting transcription', {
        bufferLength: pcmBuffer.length,
    });
    const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(key, region);
    speechConfig.speechRecognitionLanguage = 'en-US';
    // Convert Node.js Buffer → ArrayBuffer
    const arrayBuffer = pcmBuffer.buffer.slice(pcmBuffer.byteOffset, pcmBuffer.byteOffset + pcmBuffer.byteLength);
    const pushStream = SpeechSDK.AudioInputStream.createPushStream(SpeechSDK.AudioStreamFormat.getWaveFormatPCM(16000, 16, 1));
    pushStream.write(arrayBuffer);
    pushStream.close();
    const audioConfig = SpeechSDK.AudioConfig.fromStreamInput(pushStream);
    const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig);
    return new Promise((resolve, reject) => {
        let transcript = '';
        // Partial results
        recognizer.recognized = (_s, e) => {
            if (e.result.reason === SpeechSDK.ResultReason.RecognizedSpeech) {
                transcript += e.result.text + ' ';
                functions.logger.info('AzureSpeech: Partial result', { text: e.result.text });
            }
        };
        // Session ended
        recognizer.sessionStopped = () => {
            recognizer.stopContinuousRecognitionAsync(() => {
                recognizer.close();
                const final = transcript.trim();
                functions.logger.info('AzureSpeech: Session stopped', {
                    transcriptLength: final.length,
                });
                resolve(final);
            }, (err) => {
                recognizer.close();
                functions.logger.error('AzureSpeech: Error stopping session', { error: err });
                reject(new Error(`Error stopping recognition: ${err}`));
            });
        };
        // Cancellation handling
        recognizer.canceled = (_s, e) => {
            recognizer.close();
            const reasonText = SpeechSDK.CancellationReason[e.reason];
            functions.logger.error('AzureSpeech: Recognition canceled', {
                reason: reasonText,
                detail: e.errorDetails,
            });
            reject(new Error(`Transcription canceled (${reasonText}): ${e.errorDetails}`));
        };
        // Start recognition
        recognizer.startContinuousRecognitionAsync(() => {
            functions.logger.info('AzureSpeech: Recognition started');
        }, (err) => {
            functions.logger.error('AzureSpeech: Failed to start recognition', { error: err });
            reject(new Error(`Failed to start recognition: ${err}`));
        });
    });
}
