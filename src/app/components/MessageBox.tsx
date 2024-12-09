import React, { useState } from 'react';
import axios from 'axios';
import SpeechToText from '../components/apiComponents/SpeechToText';

interface MessageBoxProps {
  messages: { sender: string, text: string }[];
  input: string;
  interimText: string;
  listening: boolean;
  handleSend: (message: { sender: string, text: string }) => void;
  toggleListening: () => void;
  handleTranscription: (text: string, isFinal: boolean) => void;
  setInput: (value: string) => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  messages,
  input,
  interimText,
  listening,
  handleSend,
  toggleListening,
  handleTranscription,
  setInput,
}) => {
  const [loading, setLoading] = useState(false);

  const sendMessageToAI = async (message: string) => {
    try {
      const response = await axios.post('http://localhost:5001/generate', { prompt: message });
      const generatedTextArray = response.data.generated_text;
      if (generatedTextArray && generatedTextArray.length > 1) {
        return generatedTextArray[1].content;
      } else {
        return 'Error: Unexpected response format';
      }
    } catch (error) {
      console.error('Error generating text:', error);
      return 'Error generating response';
    }
  };

  const generateAudio = async (text: string) => {
    try {
      const response = await axios.post('http://localhost:5001/generate-audio-playht', {
        text,
        voice: 's3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json',  // Replace with the desired voice
        audioFormat: 'mp3'  // Replace with the desired audio format
      }, { responseType: 'blob' });

      const audioUrl = URL.createObjectURL(response.data);
      const audio = new Audio(audioUrl);
      audio.play();
    } catch (error) {
      console.error('Error generating audio:', error);
    }
  };

  const handleSendWithAI = async () => {
    if (input.trim()) {
      const userMessage = input;
      setInput('');
      handleSend({ sender: 'User', text: userMessage }); // Display user message immediately
      setLoading(true);
      const botResponse = await sendMessageToAI(userMessage);
      setLoading(false);
      handleSend({ sender: 'Bot', text: botResponse }); // Update with bot response
      generateAudio(botResponse); // Generate and play audio for the bot response
    }
  };

  return (
    <div className="flex flex-col w-full h-full ">
      {/* Speech Box */}
      <div className="border max-h-auto border-white bg-white max-h-[280px] custom-scrollbar-hide p-3 overflow-scroll flex-grow overflow-y-scroll mb-4 rounded-xl">
        {messages.map((message, index) => (
          <div key={index} className="mb-3 text-black">
            <strong>{message.sender}:</strong> <span>{message.text}</span>
          </div>
        ))}
        {loading && <div className="mb-3 text-black"><strong>Bot:</strong> <span>Loading...</span></div>}
      </div>

      {/* Input box */}
      <div className="flex items-center">
        <input
          type="text"
          value={input + interimText}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Type a message...'
          className="flex-grow p-2 rounded-l-lg border overflow-scroll custom-scroll-hidden text-black border-gray-300"
        />
        <button onClick={handleSendWithAI} className="p-2 rounded-r-lg bg-blue-500 text-white">
          Send
        </button>
        <button onClick={toggleListening} className="ml-2 p-2 rounded bg-green-500 text-white">
          {listening ? 'Stop' : 'Start'}
        </button>
      </div>

      {/* Speech to Text Component */}
      <SpeechToText onTranscription={handleTranscription} listening={listening} />
    </div>
  );
};

export default MessageBox;