declare module 'firebase-functions' {
  export interface FunctionBuilder {
    region(region: string): FunctionBuilder;
    runWith(options: { memory?: string }): FunctionBuilder;
    https: {
      onRequest(handler: (req: any, res: any) => void | Promise<void>): any;
    };
  }

  export const region: (region: string) => FunctionBuilder;
  export const runWith: (options: { memory?: string }) => FunctionBuilder;
  export const https: {
    onRequest: (handler: (req: any, res: any) => void | Promise<void>) => any;
  };
} 