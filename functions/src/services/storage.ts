import * as functions from "firebase-functions";
import { defaultBucket } from "../common/adminSdk";

/** Download a buffer from Storage. */
export async function downloadAudio(fileName: string): Promise<Buffer> {
  try {
    const file = defaultBucket.file(fileName);
    const [contents] = await file.download();
    functions.logger.info("Storage: Downloaded audio", { fileName });
    return contents;
  } catch (err: any) {
    functions.logger.error("Storage: Download failed", { fileName, error: err });
    throw new Error(`Audio download failed for "${fileName}": ${err.message}`);
  }
}

/** Delete an object from Storage. */
export async function deleteAudio(fileName: string): Promise<void> {
  try {
    await defaultBucket.file(fileName).delete();
    functions.logger.info("Storage: Deleted audio", { fileName });
  } catch (err: any) {
    functions.logger.warn("Storage: Delete failed (continuing)", { fileName, error: err });
  }
}
