import React, { useState } from 'react';
import MessageBox from '../app/components/MessageBox';
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
    <div className="flex items-center justify-center h-screen">
      {/* Box Containing Main Body */}
      <div className="p-5 flex flex-col w-full max-w-4xl h-full max-h-[90%] rounded-2xl border-[8px] border-[#0C2340] bg-white mx-auto font-sans">
        <h1 className="text-2xl justify-center flex font-bold mb-4">Pitch Your Ideas Here!</h1>

        <CameraComponent />

        {/* Message Box */}
        <MessageBox
          messages={messages}
          input={input}
          interimText={interimText}
          listening={listening}
          handleSend={handleSend}
          toggleListening={toggleListening}
          handleTranscription={handleTranscription}
          setInput={setInput}
        />
      </div>
    </div>
  );
};

export default ChatPage;