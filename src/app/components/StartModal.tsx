import React, { useState, useEffect } from 'react';
import {Input} from "@nextui-org/input";
import Switch from '@mui/material/Switch';




const StartModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [username, setUsername] = useState('');
  const [transcript, setTranscript] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleTranscriptToggle = () => {
    setTranscript(!transcript);
  };

  useEffect(() => {
    // This effect runs only once on the first render
    setIsVisible(true);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6  flex-col rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 items-center flex justify-center text-black">Welcome!</h2>


        {/* Get username from user */}
        <div className=' flex border-b-2 flex-col border-black m-2 outline-none border-0'>
          <p className='text-black'>Please enter your Samford Username:</p>
          <Input placeholder='Example: bgatlin' className='text-black outline-none border-0' value={username} onChange={(e) => setUsername(e.target.value)}/>
        </div>


        {/* Toggle Getting Transcript */}
        <div className='flex flex-row items-center gap-2 justify-center'>
          <p className='text-black'>Recieve transcript?</p>
          <Switch checked={transcript} onChange={handleTranscriptToggle} className='bg-white' />
          
        </div>

        <button onClick={handleClose} className="bg-green-500 text-white px-4 py-2 rounded">
          Begin
        </button>
      </div>
    </div>
  );
};

export default StartModal;