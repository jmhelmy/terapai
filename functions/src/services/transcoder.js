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
exports.transcodeWebMtoPCM = transcodeWebMtoPCM;
// functions/src/services/transcoder.ts
const functions = __importStar(require("firebase-functions"));
const fluent_ffmpeg_1 = __importDefault(require("fluent-ffmpeg"));
const ffmpeg_static_1 = __importDefault(require("ffmpeg-static"));
const stream_1 = require("stream");
// guard against null
if (ffmpeg_static_1.default) {
    fluent_ffmpeg_1.default.setFfmpegPath(ffmpeg_static_1.default);
}
else {
    functions.logger.warn("transcoder: ffmpeg-static returned null, using system ffmpeg");
}
/**
 * Convert WebM buffer → raw PCM (16 kHz mono, s16le).
 */
async function transcodeWebMtoPCM(webmBuffer) {
    functions.logger.info("Transcoder: Starting WebM → PCM", {
        bufferLength: webmBuffer.length,
    });
    const inStream = new stream_1.PassThrough();
    inStream.end(webmBuffer);
    return new Promise((resolve, reject) => {
        const chunks = [];
        const cmd = (0, fluent_ffmpeg_1.default)(inStream)
            .inputFormat("webm")
            .audioChannels(1)
            .audioFrequency(16000)
            .format("s16le")
            .on("error", (err) => {
            functions.logger.error("Transcoder: FFmpeg error", { error: err.message });
            reject(new Error(`FFmpeg error: ${err.message}`));
        });
        const out = cmd.pipe();
        out.on("data", (c) => chunks.push(c));
        out.on("end", () => {
            const pcm = Buffer.concat(chunks);
            functions.logger.info("Transcoder: PCM ready", { pcmLength: pcm.length });
            resolve(pcm);
        });
        out.on("error", (err) => {
            functions.logger.error("Transcoder: Stream error", { error: err.message });
            reject(new Error(`Transcoder stream error: ${err.message}`));
        });
    });
}
