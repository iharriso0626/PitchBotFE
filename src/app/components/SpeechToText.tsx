// src/app/components/SpeechToText.tsx
"use client";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

type CommandFunction = () => void;
type Commands = {
  [key: string]: CommandFunction;
};

interface SpeecToTextProps {
  onTranscription: (text: string, isFinal: boolean) => void;
  listening: boolean;
}

const SpeecToText: React.FC<SpeecToTextProps> = ({ onTranscription, listening }) => {
  const recognitionRef = useRef<any>(null);

  const commands: Commands = {
    "hello": () => alert("Hello!"),
    "open google": () => window.open("https://www.google.com", "_blank")
  };

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.error('Speech recognition not supported in this browser.');
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        onTranscription(finalTranscript, true);
      }
      if (interimTranscript) {
        onTranscription(interimTranscript, false);
      }

      for (const command in commands) {
        if (finalTranscript.toLowerCase().includes(command)) {
          commands[command]();
          break;
        }
      }
    };

    recognitionRef.current.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
    };

    recognitionRef.current.onend = () => {
      console.log('Speech recognition ended');
      if (listening) {
        recognitionRef.current.start();
      }
    };

    return () => {
      recognitionRef.current.stop();
    };
  }, [onTranscription, listening]);

  useEffect(() => {
    if (recognitionRef.current) {
      if (listening) {
        recognitionRef.current.start();
      } else {
        recognitionRef.current.stop();
      }
    }
  }, [listening]);

  return null;
};

export default SpeecToText;