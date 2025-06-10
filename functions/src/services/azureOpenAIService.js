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
exports.generateSOAPNote = generateSOAPNote;
const functions = __importStar(require("firebase-functions"));
// The `import fetch from "node-fetch";` line has been completely removed.
// We will now use the native `fetch` provided by the Node.js 20 runtime.
/**
 * Generates a SOAP note from a transcript using Azure OpenAI via REST API.
 */
async function generateSOAPNote(transcript) {
    // Access Firebase runtime configuration for secrets and settings.
    const cfg = functions.config().azure?.openai;
    const apiKey = cfg?.key;
    const endpoint = cfg?.endpoint;
    const deploymentName = cfg?.deployment_name;
    const apiVersion = cfg?.api_version;
    // Validate that all necessary configuration is present.
    if (!apiKey || !endpoint || !deploymentName || !apiVersion) {
        functions.logger.error("Azure OpenAI configuration is missing in Firebase Functions config.", {
            // Log what is present for easier debugging, but don't log the key itself.
            endpoint: !!endpoint,
            deploymentName: !!deploymentName,
            apiVersion: !!apiVersion,
            apiKey: !!apiKey,
        });
        throw new functions.https.HttpsError("internal", "The Azure OpenAI service is not configured correctly on the server.");
    }
    // Define the prompts for the AI model.
    const systemPrompt = "You are an AI assistant helping a therapist write clinical session notes in SOAP format.";
    const userPrompt = `Transcript:\n"""${transcript}"""\n\nGenerate a SOAP note:`;
    const url = `${endpoint}/openai/deployments/${deploymentName}/chat/completions?api-version=${apiVersion}`;
    try {
        functions.logger.info("Calling Azure OpenAI for SOAP note generation...", {
            deploymentName,
        });
        // Use the native `fetch` command. No import is needed.
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userPrompt },
                ],
                max_tokens: 800,
                temperature: 0.5,
            }),
        });
        // ✅ THE FIX: Use a type assertion `as AzureResponse` to tell TypeScript to trust us.
        const data = await response.json();
        if (!response.ok) {
            functions.logger.error("Azure OpenAI API Error:", {
                status: response.status,
                statusText: response.statusText,
                errorBody: data,
            });
            throw new functions.https.HttpsError("internal", `Azure OpenAI API Error (${response.status}): ${data.error?.message || "An unknown error occurred"}`);
        }
        const note = data?.choices?.[0]?.message?.content?.trim();
        if (!note) {
            functions.logger.error("Azure OpenAI returned a valid response but with an empty note.", { responseData: data });
            throw new functions.https.HttpsError("internal", "The AI model returned an empty or invalid note.");
        }
        functions.logger.info("Successfully generated Azure OpenAI SOAP note.", {
            length: note.length,
        });
        return note;
    }
    catch (err) {
        const error = err;
        functions.logger.error("An unexpected error occurred during the Azure OpenAI API call:", error);
        // Avoid leaking internal implementation details in the error message sent to the client.
        throw new functions.https.HttpsError("internal", "An unexpected error occurred while generating the note.");
    }
}
