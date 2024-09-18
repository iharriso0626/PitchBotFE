import React, { useState } from 'react';
import Sidebar from '@/app/components/sidebar';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'User', text: input }, { sender: 'Bot', text: 'This is a bot response.' }]);
      setInput('');
    }
  };

  return (
    <div className='w-screen h-screen flex items-center  bg-gray-300'>
      <Sidebar />
    <div className="p-5 flex h-[90%] w-[80%]  rounded-2xl  border-2 flex-col bg-white mx-auto font-sans ">
      <h1 className="text-2xl justify-center flex font-bold mb-4">Pitch Your Ideas Here!</h1>

      {/* Box Containing Cameras*/}
      <div className='flex flex-row '>
        {/* User Camera box */}
        <div className='w-[450px] h-[350px] border-2 rounded-2xl bg-black ml-5 text-white'><h1 className='flex items-center justify-center h-full w-full'>User Camera Here</h1></div>

        {/* AI Camera box */}
        <div className='w-[450px] h-[350px] border-2 flex rounded-2xl bg-black ml-auto mr-5 text-white'><h1 className='flex items-center justify-center h-full w-full'>AI Camera Here</h1></div>
      </div>

      {/* Speech Box */}
      <div className="border border-gray-300 p-3 h-[20%] overflow-y-scroll mb-4 rounded-xl mt-auto">
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
          className="flex-grow p-2 rounded-l-lg border border-gray-300 "
        />
        <button onClick={handleSend} className="p-2 bg-blue-500 rounded-r-lg text-white">Send</button>
      </div>
    </div>
    </div>
  );
};

export default ChatPage;