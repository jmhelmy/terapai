// functions/src/utils/authenticate.ts
import { adminApp } from "../common/adminSdk"; // Use the exported adminApp
import * as functions from "firebase-functions/v1"; // For logger
import type { Request, Response, NextFunction } from "express"; // For Express types
import { GenerateNoteResult } from "../types"; // For consistent error response

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  functions.logger.info("Authenticating request...");
  const authorizationHeader = req.headers.authorization || "";
  if (!authorizationHeader.startsWith("Bearer ")) {
    functions.logger.warn("Auth token missing or malformed in header.");
    res.status(403).json({ success: false, error: "Unauthorized: Missing or malformed token." } as GenerateNoteResult);
    return;
  }
  const idToken = authorizationHeader.split("Bearer ")[1];
  try {
    const decodedToken = await adminApp.auth().verifyIdToken(idToken); // Use adminApp.auth()
    // @ts-ignore: attach decoded user to request object for use in the main handler
    req.user = decodedToken;
    functions.logger.info("User authenticated successfully", { uid: decodedToken.uid });
    next(); // Proceed to the main function logic
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Invalid token.";
    functions.logger.error("Error verifying Firebase ID token:", { error: errorMessage, originalError: error });
    res.status(403).json({ success: false, error: `Unauthorized: ${errorMessage}` } as GenerateNoteResult);
  }
}