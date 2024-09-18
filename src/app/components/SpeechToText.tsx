import React, { useEffect } from 'react';

interface SpeechToTextProps {
  onResult: (text: string) => void;
}

// Extend the window interface to include SpeechRecognition and webkitSpeechRecognition
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

// Define the SpeechRecognitionEvent and SpeechRecognitionErrorEvent types manually
interface SpeechRecognitionEvent {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
  };
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onResult }) => {
  useEffect(() => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      onResult(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error('Speech recognition error', event.error);
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [onResult]);

  return null;
};

export default SpeechToText;