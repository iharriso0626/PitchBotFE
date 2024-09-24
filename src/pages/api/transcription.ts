import { NextApiRequest, NextApiResponse } from 'next';
import { AssemblyAI, RealtimeTranscript } from 'assemblyai';
import record from 'node-record-lpcm16';

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
        console.error('Error:', error);
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

      console.log('Starting recording');
      const recording = record({
        channels: 1,
        sampleRate: 16_000,
        audioType: 'wav',
      });

      recording.stream().on('data', (buffer: Buffer) => {
        transcriber.sendAudio(buffer);
      });

      recording.on('close', () => {
        res.end();
      });

      req.on('close', () => {
        console.log('Stopping recording');
        recording.stop();
        transcriber.close();
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}