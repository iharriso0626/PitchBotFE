import React, { useState } from 'react';

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
    <div className="p-5 flex absolute max-w-xl mx-auto font-sans ">
      <h1 className="text-2xl font-bold mb-4">AI Chat Bot</h1>
      <div className="border border-gray-300 p-3 h-96 overflow-y-scroll mb-4">
        {messages.map((message, index) => (
          <div key={index} className="mb-3">
            <strong>{message.sender}:</strong> <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 border border-gray-300 mr-2"
        />
        <button onClick={handleSend} className="p-2 bg-blue-500 text-white">Send</button>
      </div>
    </div>
  );
};

export default ChatPage;