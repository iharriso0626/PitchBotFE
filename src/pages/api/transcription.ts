import { NextApiRequest, NextApiResponse } from 'next';
import { AssemblyAI, RealtimeTranscript } from 'assemblyai';
import { spawn } from 'child_process';
import path from 'path';

const client = new AssemblyAI({
  apiKey: 'aab5f916e1e6415092486934f733aa28',
});

const transcriber = client.realtime.transcriber({
  sampleRate: 16_000,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      transcriber.on('open', ({ sessionId }) => {
        console.log(`Session opened with ID: ${sessionId}`);
      });

      transcriber.on('error', (error: Error) => {
        console.error('Transcriber error:', error);
      });

      transcriber.on('close', (code: number, reason: string) => {
        console.log('Session closed:', code, reason);
      });

      transcriber.on('transcript', (transcript: RealtimeTranscript) => {
        console.log('Received:', transcript);

        if (!transcript.text) return;

        if (transcript.message_type === 'FinalTranscript') {
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
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}