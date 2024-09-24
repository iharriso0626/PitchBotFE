declare module 'node-record-lpcm16' {
    const record: (options?: Record<string, unknown>) => NodeJS.ReadableStream;
    export = record;
  }