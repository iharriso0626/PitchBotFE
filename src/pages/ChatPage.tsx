// src/pages/ChatPage.tsx
import React, { useState } from 'react';
import Sidebar from '@/app/components/sidebar';
import SpeechToText from '../app/components/SpeechtoText';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);

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

  return (
    <div className='w-screen h-screen overflow-hidden flex items-center bg-black'>
      <Sidebar />

      {/* Box Containing Main Body */}
      <div className="p-5 flex h-[90%] w-[80%] rounded-2xl border-[8px] border-[#cb88fc] flex-col bg-white mx-auto font-sans">
        <h1 className="text-2xl justify-center flex font-bold mb-4">Pitch Your Ideas Here!</h1>

        {/* Box Containing Cameras */}
        <div className='flex flex-row'>
          {/* User Camera box */}
          <div className='w-[450px] h-[350px] border-[10px] border-[#6f04bd] rounded-2xl bg-black ml-5 text-white'>
            <h1 className='flex items-center justify-center h-full w-full'>User Camera Here</h1>
          </div>

          {/* AI Camera box */}
          <div className='w-[450px] h-[350px] border-[10px] border-[#6f04bd] flex rounded-2xl bg-black ml-auto mr-5 text-white'>
            <h1 className='flex items-center justify-center h-full w-full'>AI Camera Here</h1>
          </div>
        </div>

        {/* Speech Box */}
        <div className="border border-gray-300 custom-scrollbar-hide p-3 h-[20%] overflow-y-scroll mb-4 rounded-xl mt-auto">
          {messages.map((message, index) => (
            <div key={index} className="mb-3">
              <strong>{message.sender}:</strong> <span>{message.text}</span>
            </div>
          ))}
        </div>

        {/* Input box */}
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 rounded-l-lg border border-gray-300"
          />
          <button onClick={handleSend} className="p-2 bg-blue-500 rounded-r-lg text-white">Send</button>
        </div>

        {/* Toggle Speech to Text */}
        <button onClick={toggleListening} className="p-2 mt-2 bg-green-500 rounded text-white">
          {listening ? 'Stop Listening' : 'Start Listening'}
        </button>
      </div>

      {/* Speech to Text Component */}
      <SpeechToText onResult={(text) => setInput(text)} listening={listening} />
    </div>
  );
};

export default ChatPage;