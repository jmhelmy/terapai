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
exports.authenticate = authenticate;
// functions/src/utils/authenticate.ts
const adminSdk_1 = require("../common/adminSdk"); // Use the exported adminApp
const functions = __importStar(require("firebase-functions/v1")); // For logger
async function authenticate(req, res, next) {
    functions.logger.info("Authenticating request...");
    const authorizationHeader = req.headers.authorization || "";
    if (!authorizationHeader.startsWith("Bearer ")) {
        functions.logger.warn("Auth token missing or malformed in header.");
        res.status(403).json({ success: false, error: "Unauthorized: Missing or malformed token." });
        return;
    }
    const idToken = authorizationHeader.split("Bearer ")[1];
    try {
        const decodedToken = await adminSdk_1.adminApp.auth().verifyIdToken(idToken); // Use adminApp.auth()
        // @ts-ignore: attach decoded user to request object for use in the main handler
        req.user = decodedToken;
        functions.logger.info("User authenticated successfully", { uid: decodedToken.uid });
        next(); // Proceed to the main function logic
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Invalid token.";
        functions.logger.error("Error verifying Firebase ID token:", { error: errorMessage, originalError: error });
        res.status(403).json({ success: false, error: `Unauthorized: ${errorMessage}` });
    }
}
