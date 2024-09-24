declare module 'node-record-lpcm16' {
  interface Options {
    sampleRate?: number;
    threshold?: number;
    verbose?: boolean;
    recordProgram?: string;
    device?: string;
    audioType?: string;
    channels?: number;
  }

  class Record {
    static start(options?: Options): any;
    static stop(): void;
  }

  export = Record;
}