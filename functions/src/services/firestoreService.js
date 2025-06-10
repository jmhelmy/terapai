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
exports.saveNote = saveNote;
// functions/src/services/firestoreService.ts
const functions = __importStar(require("firebase-functions"));
const adminSdk_1 = require("../common/adminSdk"); // Import adminApp and db
async function saveNote(details) {
    functions.logger.info("Attempting to save note to Firestore", {
        therapistId: details.therapistId,
        audioFile: details.originalAudioFileName,
    });
    // Validate sessionDate
    const tsMillis = details.sessionDate;
    if (typeof tsMillis !== 'number' || tsMillis <= 0) {
        functions.logger.error('Invalid sessionDate in saveNote:', { sessionDate: tsMillis });
        throw new Error('sessionDate must be a positive number (ms since Unix epoch)');
    }
    // Build Firestore document payload using adminApp
    const noteData = {
        therapistId: details.therapistId,
        sessionDate: adminSdk_1.adminApp.firestore.Timestamp.fromMillis(tsMillis), // Use adminApp
        transcript: details.transcript,
        structuredContent: details.structuredContent,
        originalAudioFileName: details.originalAudioFileName,
        createdAt: adminSdk_1.adminApp.firestore.FieldValue.serverTimestamp(), // Use adminApp
        status: 'completed',
    };
    try {
        const noteRef = await adminSdk_1.db.collection('therapySessionNotes').add(noteData);
        functions.logger.info('Note saved successfully to Firestore.', { noteId: noteRef.id });
        return noteRef.id;
    }
    catch (err) {
        let msg = 'Unknown error during Firestore save.';
        if (err instanceof Error) {
            msg = err.message;
        }
        functions.logger.error('Error saving note to Firestore in firestoreService:', { error: msg, originalError: err, details });
        throw new Error(`Failed to save note to Firestore: ${msg}`);
    }
}
