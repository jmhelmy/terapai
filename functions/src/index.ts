// functions/src/index.ts
import { onRequest } from 'firebase-functions/v2/https';

export const nextServer = onRequest(async (req, res) => {
  // Load the Next.js handler at _request_ time, not at module import time.
  // That way you never call .listen() during Firebase's deploy “probe.”
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const handler: any = require('../standalone/server').default;

  return handler(req, res);
});
