import { NextApiRequest, NextApiResponse } from 'next';
import { VideoSDK } from '@videosdk.live/js-sdk';
import { spawn } from 'child_process';

const client = new VideoSDK({
  apiKey: 'aaea9e99-f8ed-4af7-adcb-eb96a7677465', // Replace with your VideoSDK API key
});

const transcriber = client.realtime.transcriber({
  sampleRate: 16000,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      transcriber.on('open', ({ sessionId }: { sessionId: string }) => {
        console.log(`Session opened with ID: ${sessionId}`);
      });

      transcriber.on('error', (error: Error) => {
        console.error('Transcriber error:', error);
      });

      transcriber.on('close', (code: number, reason: string) => {
        console.log('Session closed:', code, reason);
      });

      transcriber.on('transcript', (transcript: any) => {
        console.log('Received:', transcript);

        if (!transcript.text) return;

        if (transcript.isFinal) {
          res.write(JSON.stringify({ text: transcript.text, isFinal: true }));
        } else {
          res.write(JSON.stringify({ text: transcript.text, isFinal: false }));
        }
      });

      console.log('Connecting to real-time transcript service');
      await transcriber.connect();

      console.log('Starting recording with Sox');
      const soxPath = process.platform === 'win32' ? 'C:\\Program Files (x86)\\sox-14-4-2\\sox.exe' : 'sox';
      const sox = spawn(soxPath, [
        '-d', // Use the default audio device
        '-c', '1', // 1 channel (mono)
        '-r', '16000', // 16 kHz sample rate
        '-t', 'wav', // Output format
        '-'
      ]);

      sox.stdout.on('data', (data: Buffer) => {
        transcriber.sendAudio(data);
      });

      sox.stderr.on('data', (data: Buffer) => {
        console.error(`Sox error: ${data}`);
      });

      sox.on('close', (code) => {
        console.log(`Sox process exited with code ${code}`);
        res.end();
      });

      req.on('close', () => {
        console.log('Stopping recording');
        sox.kill();
        transcriber.close();
      });
    } catch (error) {
      console.error('Error:', error);
      const err = error as Error;
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}