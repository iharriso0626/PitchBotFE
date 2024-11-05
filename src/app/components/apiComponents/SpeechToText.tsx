"use client";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

type CommandFunction = () => void;
type Commands = {
  [key: string]: CommandFunction;
};

interface SpeechToTextProps {
  onTranscription: (text: string, isFinal: boolean) => void;
  listening: boolean;
}

const SpeechToText: React.FC<SpeechToTextProps> = ({ onTranscription, listening }) => {
  const recognitionRef = useRef<any>(null);
  const [transcript, setTranscript] = useState<string>('');

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
        setTranscript(finalTranscript);
      }
      if (interimTranscript) {
        onTranscription(interimTranscript, false);
        setTranscript(interimTranscript);
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

  return (
    <div className="flex items-center">
      
    </div>
  );
};

export default SpeechToText;