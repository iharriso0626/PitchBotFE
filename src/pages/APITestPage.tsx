import React, { useState } from 'react';
import SpeechToTextAPI from '@/app/components/apiComponents/SpeechToTextAPI';

const APITestPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [interimText, setInterimText] = useState('');

  const toggleListening = () => {
    setListening(!listening);
  };

  const handleTranscription = (text: string, isFinal: boolean) => {
    if (isFinal) {
      setInput((prevInput) => prevInput + ' ' + text);
      setInterimText('');
    } else {
      setInterimText(text);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Speech to Text API Test</h1>
      <div className="flex flex-col items-center">
        <input
          type="text"
          value={input + interimText}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border border-gray-300 rounded mb-4 w-80"
          placeholder="Speak something..."
        />
        <button
          onClick={toggleListening}
          className={`p-2 rounded text-white ${listening ? 'bg-red-500' : 'bg-green-500'}`}
        >
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>
      <SpeechToTextAPI onTranscription={handleTranscription} listening={listening} />
    </div>
  );
};

export default APITestPage;