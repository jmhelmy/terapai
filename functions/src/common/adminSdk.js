"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultBucket = exports.db = exports.adminApp = void 0;
// functions/src/common/adminSdk.ts
const firebase_admin_1 = __importDefault(require("firebase-admin"));
// Initialize Admin SDK only once
if (!firebase_admin_1.default.apps.length) {
    firebase_admin_1.default.initializeApp({
        storageBucket: process.env.GCLOUD_STORAGE_BUCKET || "therascript-45b62.appspot.com",
    });
    console.log("🔧 Admin SDK initialized. Bucket:", firebase_admin_1.default.app().options.storageBucket);
}
else {
    console.log("🔧 Admin SDK already initialized. Bucket:", firebase_admin_1.default.app().options.storageBucket);
}
exports.adminApp = firebase_admin_1.default;
exports.db = firebase_admin_1.default.firestore();
exports.defaultBucket = firebase_admin_1.default.storage().bucket();
