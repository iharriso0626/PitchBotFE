import React, { useState } from 'react';
import MessageBox from '../app/components/MessageBox';
import CameraComponent from '../app/components/CameraComponent';
import SettingsButton from '../app/components/SideButtons/SettingsButton';
import RubricButton from '../app/components/SideButtons/RubricButton';
import ScoresButton from '../app/components/SideButtons/ScoresButton';
import StartModal from '../app/components/StartModal';
import CloseModal from '../app/components/CloseModal';

const Home: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string, text: string }[]>([]);
  const [input, setInput] = useState('');
  const [listening, setListening] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [isCloseModalVisible, setIsCloseModalVisible] = useState(false);

  const handleSend = (message: { sender: string, text: string }) => {
    setMessages((prevMessages) => [...prevMessages, message]);
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

  const handleOpenCloseModal = () => {
    setIsCloseModalVisible(true);
  };

  const handleCloseCloseModal = () => {
    setIsCloseModalVisible(false);
  };

  return (
    <div className="flex items-center justify-center mx-[10%] h-screen">
      <StartModal />

      <SettingsButton />
      <RubricButton />

      {/* Box Containing Main Body */}
      <div className="p-5 flex flex-col w-screen h-full rounded-2xl border-[#0C2340] border-4 bg-white mx-auto font-sans">
        <h1 className="text-2xl justify-center flex text-black font-bold mb-4">PitchBot: By Samford University</h1>

        <CameraComponent
          listening={listening}
          videoEnabled={videoEnabled}
          audioEnabled={audioEnabled}
          setVideoEnabled={setVideoEnabled}
          setAudioEnabled={setAudioEnabled}
          toggleListening={toggleListening}
        />

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
          onOpenCloseModal={handleOpenCloseModal} // Pass the function to open the CloseModal
        />
      </div>

      <CloseModal isVisible={isCloseModalVisible} onClose={handleCloseCloseModal} messages={messages} />
    </div>
  );
};

export default Home;