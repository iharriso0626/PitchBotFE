import React, { useState } from 'react';
import * as PlayHT from 'playht';

PlayHT.init({
  apiKey: '047fd187d599437387a0c749b90cce20',
  userId: 'bOO358T2f7dPTNz1FM5w6UREUbw1',
  defaultVoiceId: 's3://peregrine-voices/oliver_narrative2_parrot_saad/manifest.json',
  defaultVoiceEngine: 'Play3.0-mini',
});

const TextToSpeech: React.FC = () => {
  const [text, setText] = useState('');

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleSpeak = () => {
    PlayHT.speak({
      text,
      voiceId: 's3://peregrine-voices/oliver_narrative2_parrot_saad/manifest.json',
      voiceEngine: 'Play3.0-mini',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <textarea
        value={text}
        onChange={handleTextChange}
        className="w-1/2 p-2 border rounded"
        rows={5}
        placeholder="Enter text to convert to speech"
      />
      <button onClick={handleSpeak} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Speak
      </button>
    </div>
  );
};

export default TextToSpeech;