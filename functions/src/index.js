"use strict";
/// <reference path="./declarations.d.ts" />
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.nextServer = void 0;
// functions/src/index.ts
const https_1 = require("firebase-functions/v2/https");
// Import the Next.js standalone server handler
const server_1 = __importDefault(require("../standalone/server"));
// Define and export the 'nextServer' Cloud Function
exports.nextServer = (0, https_1.onRequest)((req, res) => (0, server_1.default)(req, res));
