// src/app/components/SpeechToTextAPI.tsx
"use client";
import { useEffect, useRef } from "react";
import { AssemblyAI, RealtimeTranscript } from 'assemblyai';
import recorder from 'node-record-lpcm16';

interface SpeechToTextAPIProps {
  onTranscription: (text: string, isFinal: boolean) => void;
  listening: boolean;
}

const SpeechToTextAPI: React.FC<SpeechToTextAPIProps> = ({ onTranscription, listening }) => {
  const transcriberRef = useRef<any>(null);
  const recordingRef = useRef<any>(null);

  useEffect(() => {
    const client = new AssemblyAI({
      apiKey: 'aab5f916e1e6415092486934f733aa28',
    });

    const transcriber = client.realtime.transcriber({
      sampleRate: 16_000,
    });

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
        onTranscription(transcript.text, true);
      } else {
        onTranscription(transcript.text, false);
      }
    });

    transcriberRef.current = transcriber;

    return () => {
      if (transcriberRef.current) {
        transcriberRef.current.close();
      }
    };
  }, [onTranscription]);

  useEffect(() => {
    const startRecording = async () => {
      if (!transcriberRef.current) return;

      console.log('Connecting to real-time transcript service');
      await transcriberRef.current.connect();

      console.log('Starting recording');
      const recording = recorder.record({
        channels: 1,
        sampleRate: 16_000,
        audioType: 'wav',
      });

      recording.stream().on('data', (buffer: Buffer) => {
        transcriberRef.current.sendAudio(buffer);
      });

      recordingRef.current = recording;
    };

    const stopRecording = async () => {
      if (recordingRef.current) {
        console.log('Stopping recording');
        recordingRef.current.stop();
      }

      if (transcriberRef.current) {
        console.log('Closing real-time transcript connection');
        await transcriberRef.current.close();
      }
    };

    if (listening) {
      startRecording();
    } else {
      stopRecording();
    }

    return () => {
      stopRecording();
    };
  }, [listening]);

  return null;
};

export default SpeechToTextAPI;