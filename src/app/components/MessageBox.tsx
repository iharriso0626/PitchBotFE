import React from 'react';
import SpeechToTextAPI from './SpeechToTextAPI';

interface MessageBoxProps {
  messages: { sender: string, text: string }[];
  input: string;
  interimText: string;
  listening: boolean;
  handleSend: (userMessage: string, botResponse: string) => void;
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
    const sendMessageToAI = async (message: string) => {
        try {
            const response = await fetch('http://localhost:3000/generate', {  // Updated URL
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: message }),
            });
    
            const data = await response.json();
            return data.text;  // Ensure this matches the response structure
        } catch (error) {
            console.error('Error sending message to AI:', error);
            return 'Error communicating with AI';
        }
    };

  const handleSendWithAI = async () => {
    if (input.trim()) {
      const userMessage = input;
      setInput('');
      const botResponse = await sendMessageToAI(userMessage);
      handleSend(userMessage, botResponse);
    }
  };

  return (
    <div className="flex flex-col w-full h-full">
      {/* Speech Box */}
      <div className="border max-h-auto border-gray-300 custom-scrollbar-hide p-3 max-h-[150px] overflow-scroll flex-grow overflow-y-scroll mb-4 rounded-xl">
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
        <button onClick={handleSendWithAI} className="p-2 bg-blue-500 rounded-r-lg text-white">Send</button>
      </div>

      {/* Toggle Speech to Text */}
      <button onClick={toggleListening} className="p-2 mt-2 bg-green-500 rounded text-white">
        {listening ? 'Stop Listening' : 'Start Listening'}
      </button>

      {/* Speech to Text Component */}
      <SpeechToTextAPI onTranscription={handleTranscription} listening={listening} />
    </div>
  );
};

export default MessageBox;