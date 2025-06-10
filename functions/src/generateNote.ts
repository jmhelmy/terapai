// functions/src/generateNote.ts

import { onRequest } from "firebase-functions/v2/https";
import { logger } from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";
import corsMiddleware from "cors";

// Utility/service imports
import { authenticate } from "./utils/authenticate";
import { deleteAudio } from "./services/storage";
import { transcribeWithWhisper } from "./services/whisperService";
import { generateSOAPNote } from "./services/azureOpenAIService";
import { saveNote } from "./services/firestoreService";
import { logAudit } from "./services/auditService";
import { GenerateNoteData, GenerateNoteResult } from "./types";

const app = express();
app.use(corsMiddleware({ origin: true }));
app.use(express.json());

app.post(
  "/",
  authenticate,
  async (req: express.Request, res: express.Response): Promise<void> => {
    let therapistId: string | undefined;
    let audioFileName: string | undefined;

    try {
      // @ts-ignore — set by authenticate middleware
      const userToken = req.user as admin.auth.DecodedIdToken;
      therapistId = userToken.uid;

      const body = req.body as GenerateNoteData;
      audioFileName = body.audioFileName;
      const sessionDate = body.sessionDate;

      if (!therapistId) {
        logger.error("Auth failed: no UID");
        res
          .status(403)
          .json({ success: false, error: "Not authenticated." } as GenerateNoteResult);
        return;
      }

      logger.info(
        `Starting generateNote for ${therapistId}, file ${audioFileName}`
      );

      // 1. Transcribe via Whisper
      logger.info("Transcriber: calling Whisper service");
      const transcript = await transcribeWithWhisper(audioFileName);
      if (!transcript) throw new Error("Empty transcript");
      logger.info("Transcription complete.");

      // 2. Delete raw audio immediately
      await deleteAudio(audioFileName);
      logger.info(`Deleted original audio: ${audioFileName}`);

      // 3. Generate SOAP note via OpenAI
      const structuredContent = await generateSOAPNote(transcript);
      if (!structuredContent) throw new Error("Empty SOAP note");
      logger.info("SOAP note generated.");

      // 4. Persist note in Firestore
      const noteId = await saveNote({
        therapistId,
        sessionDate,
        transcript,
        structuredContent,
        originalAudioFileName: audioFileName,
      });

      // 5. Audit log
      await logAudit("generateNote", therapistId, noteId);

      logger.info("Note saved with ID:", noteId);
      res
        .status(200)
        .json({ success: true, noteId, message: "Note generated and saved." } as GenerateNoteResult);

    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Internal error";
      logger.error("generateNote error:", {
        msg,
        therapistId,
        audioFileName,
        err,
      });
      res.status(500).json({ success: false, error: msg } as GenerateNoteResult);
    }
  }
);

export const generateNoteHttpFunction = onRequest(
  { timeoutSeconds: 540, memory: "1GiB" },
  app
);
