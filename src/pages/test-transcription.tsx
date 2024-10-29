import React, { useState, useEffect } from 'react';

const TestTranscription: React.FC = () => {
  const [listening, setListening] = useState(false);
  const [transcriptions, setTranscriptions] = useState<string[]>([]);
  const [SpeechToText, setSpeechToText] = useState<React.FC | null>(null);
  const [SpeechToTextAPI, setSpeechToTextAPI] = useState<React.FC | null>(null);

  useEffect(() => {
    // Dynamically import the components only in the browser environment
    if (typeof window !== 'undefined') {
      import('../app/components/SpeechToText').then((module) => setSpeechToText(() => module.default));
      import('../app/components/SpeechToTextAPI').then((module) => setSpeechToTextAPI(() => module.default));
    }
  }, []);

  const handleTranscription = (text: string, isFinal: boolean) => {
    setTranscriptions((prev) => [...prev, text]);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl mb-4">Test Transcription</h1>
      <button
        onClick={() => setListening(!listening)}
        className="p-2 bg-blue-500 text-white rounded"
      >
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>
      {SpeechToText && <SpeechToText onTranscription={handleTranscription} listening={listening} />}
      {SpeechToTextAPI && <SpeechToTextAPI onTranscription={handleTranscription} listening={listening} />}
      <div className="mt-4">
        <h2 className="text-xl">Transcriptions:</h2>
        <ul>
          {transcriptions.map((text, index) => (
            <li key={index}>{text}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TestTranscription;