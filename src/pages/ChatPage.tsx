import React, { useState } from 'react';
import MessageBox from '../app/components/MessageBox';
import CameraComponent from '../app/components/CameraComponent';
import SettingsButton from '../app/components/SideButtons/SettingsButton';
import RubricButton from '@/app/components/SideButtons/RubricButton';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [interimText, setInterimText] = useState('');

  const handleSend = (userMessage: string, botResponse: string) => {
    const newMessages = [
      ...messages,
      { sender: 'User', text: userMessage },
      { sender: 'Bot', text: botResponse },
    ];
    setMessages(newMessages);
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
    <div className="flex items-center justify-center mx-[10%] h-screen">

  <SettingsButton />
  <RubricButton />

      {/* Box Containing Main Body */}
      <div className="p-5 flex flex-col w-screen  h-full rounded-2xl  bg-white mx-auto font-sans">
        <h1 className="text-2xl justify-center flex text-black font-bold mb-4">PitchBot: By Samford University</h1>

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