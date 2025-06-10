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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transcribeWithWhisper = transcribeWithWhisper;
const node_fetch_1 = __importDefault(require("node-fetch"));
const admin = __importStar(require("firebase-admin"));
const form_data_1 = __importDefault(require("form-data"));
const functions = __importStar(require("firebase-functions"));
async function transcribeWithWhisper(firebasePath) {
    functions.logger.info(`whisperService: starting transcription for ${firebasePath}`);
    const bucket = admin.storage().bucket();
    const file = bucket.file(firebasePath);
    let buffer;
    try {
        const [downloaded] = await file.download();
        buffer = downloaded;
        functions.logger.info(`whisperService: downloaded ${buffer.length} bytes`);
    }
    catch (err) {
        functions.logger.error(`whisperService: failed to download "${firebasePath}"`, err);
        throw new Error(`Failed to download audio: ${err instanceof Error ? err.message : String(err)}`);
    }
    const form = new form_data_1.default();
    form.append('file', buffer, {
        filename: 'audio.webm',
        contentType: 'audio/webm',
    });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    try {
        functions.logger.info('whisperService: calling remote Whisper API');
        const response = await (0, node_fetch_1.default)('http://ec2-18-219-113-46.us-east-2.compute.amazonaws.com:8000/transcribe', {
            method: 'POST',
            body: form,
            headers: form.getHeaders(),
            signal: controller.signal,
        });
        clearTimeout(timeout);
        functions.logger.info(`whisperService: remote API responded with status ${response.status}`);
        if (!response.ok) {
            const errorBody = await response.text().catch(() => '<no body>');
            functions.logger.error(`whisperService: non-OK HTTP ${response.status}: ${errorBody}`);
            throw new Error(`Whisper API failed (status ${response.status})`);
        }
        const data = await response.json().catch((err) => {
            throw new Error(`JSON parse error: ${err instanceof Error ? err.message : String(err)}`);
        });
        if (!data || typeof data.text !== 'string') {
            functions.logger.error('whisperService: unexpected response shape', data);
            throw new Error(`Unexpected response from Whisper: ${JSON.stringify(data)}`);
        }
        functions.logger.info('whisperService: transcription succeeded', { length: data.text.length });
        return data.text;
    }
    catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
            functions.logger.error('whisperService: request timed out');
            throw new Error('Whisper API request timed out after 15 s');
        }
        functions.logger.error('whisperService: transcription error', err);
        throw new Error(`Whisper transcription failed: ${err instanceof Error ? err.message : String(err)}`);
    }
}
