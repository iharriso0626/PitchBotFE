"use client";

import { useEffect, useRef } from "react";

interface SpeechToTextAPIProps {
  onTranscription: (text: string, isFinal: boolean) => void;
  listening: boolean;
}

const SpeechToTextAPI: React.FC<SpeechToTextAPIProps> = ({ onTranscription, listening }) => {
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const startListening = async () => {
      try {
        const response = await fetch('/api/transcription', {
          method: 'POST',
        });

        if (response.ok) {
          eventSourceRef.current = new EventSource('/api/transcription');

          eventSourceRef.current.onmessage = (event) => {
            const { text, isFinal } = JSON.parse(event.data);
            onTranscription(text, isFinal);
          };

          eventSourceRef.current.onerror = (error) => {
            console.error('EventSource error:', error);
            eventSourceRef.current?.close();
          };
        } else {
          console.error('Failed to start transcription:', response.statusText);
        }
      } catch (error) {
        console.error('Error starting transcription:', error);
      }
    };

    const stopListening = () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
      }
    };

    if (listening) {
      startListening();
    } else {
      stopListening();
    }

    return () => {
      stopListening();
    };
  }, [listening, onTranscription]);

  return null;
};

export default SpeechToTextAPI;