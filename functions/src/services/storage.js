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
exports.downloadAudio = downloadAudio;
exports.deleteAudio = deleteAudio;
const functions = __importStar(require("firebase-functions"));
const adminSdk_1 = require("../common/adminSdk");
/** Download a buffer from Storage. */
async function downloadAudio(fileName) {
    try {
        const file = adminSdk_1.defaultBucket.file(fileName);
        const [contents] = await file.download();
        functions.logger.info("Storage: Downloaded audio", { fileName });
        return contents;
    }
    catch (err) {
        functions.logger.error("Storage: Download failed", { fileName, error: err });
        throw new Error(`Audio download failed for "${fileName}": ${err.message}`);
    }
}
/** Delete an object from Storage. */
async function deleteAudio(fileName) {
    try {
        await adminSdk_1.defaultBucket.file(fileName).delete();
        functions.logger.info("Storage: Deleted audio", { fileName });
    }
    catch (err) {
        functions.logger.warn("Storage: Delete failed (continuing)", { fileName, error: err });
    }
}
