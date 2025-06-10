// server-shim.d.ts
declare module 'standalone-server' {
  import { IncomingMessage, ServerResponse } from 'http';

  /** Next.js standalone exports an HTTP handler as default */
  function handler(
    req: IncomingMessage,
    res: ServerResponse
  ): Promise<void>;

  export default handler;
}