// src/pages/ChatPage.tsx
import React, { useState } from 'react';
import Sidebar from '@/app/components/sidebar';
import SpeechToText2 from '../app/components/SpeechToText';
import CameraComponent from '@/app/components/CameraComponent';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [interimText, setInterimText] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      const newMessages = [
        ...messages,
        { sender: 'User', text: input },
        { sender: 'Bot', text: 'This is a bot response.' },
      ];
      setMessages(newMessages);
      setInput('');
    }
  };

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
    <div className='w-screen h-screen overflow-hidden flex items-center bg-gray-300'>
      <Sidebar />

      {/* Box Containing Main Body */}
      <div className="p-5 flex h-[90%] w-[80%] rounded-2xl border-[8px] border-[#cb88fc] flex-col bg-white mx-auto font-sans">
        <h1 className="text-2xl justify-center flex font-bold mb-4">Pitch Your Ideas Here!</h1>

        {/* Box Containing Cameras */}
        <CameraComponent />

        {/* Speech Box */}
        <div className="border border-gray-300 custom-scrollbar-hide p-3 h-[20%] overflow-y-scroll mb-4 rounded-xl mt-auto">
          {messages.map((message, index) => (
            <div key={index} className="mb-3 text-black">
              <strong>{message.sender}:</strong> <span>{message.text}</span>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="flex">
          <input
            type="text"
            value={input + interimText}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 rounded-l-lg border overflow-scroll custom-scroll-hidden text-black border-gray-300"
          />
          <button onClick={handleSend} className="p-2 bg-blue-500 rounded-r-lg text-white">Send</button>
        </div>

        {/* Toggle Speech to Text */}
        <button onClick={toggleListening} className="p-2 mt-2 bg-green-500 rounded text-white">
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>

      {/* Speech to Text Component */}
      <SpeechToText2 onTranscription={handleTranscription} listening={listening} />
      
    </div>
  );
};

export default ChatPage;