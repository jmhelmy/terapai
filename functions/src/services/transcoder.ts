// functions/src/services/transcoder.ts
import * as functions from "firebase-functions";
import ffmpeg from "fluent-ffmpeg";
import ffmpegStatic from "ffmpeg-static";
import { PassThrough } from "stream";

// guard against null
if (ffmpegStatic) {
  ffmpeg.setFfmpegPath(ffmpegStatic);
} else {
  functions.logger.warn("transcoder: ffmpeg-static returned null, using system ffmpeg");
}

/**
 * Convert WebM buffer → raw PCM (16 kHz mono, s16le).
 */
export async function transcodeWebMtoPCM(webmBuffer: Buffer): Promise<Buffer> {
  functions.logger.info("Transcoder: Starting WebM → PCM", {
    bufferLength: webmBuffer.length,
  });

  const inStream = new PassThrough();
  inStream.end(webmBuffer);

  return new Promise<Buffer>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const cmd = ffmpeg(inStream)
      .inputFormat("webm")
      .audioChannels(1)
      .audioFrequency(16000)
      .format("s16le")
      .on("error", (err) => {
        functions.logger.error("Transcoder: FFmpeg error", { error: err.message });
        reject(new Error(`FFmpeg error: ${err.message}`));
      });

    const out = cmd.pipe();
    out.on("data", (c: Buffer) => chunks.push(c));
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
