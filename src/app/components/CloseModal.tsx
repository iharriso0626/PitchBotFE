import React, { useState } from 'react';
import { Input } from "@nextui-org/input";
import Switch from '@mui/material/Switch';
import { jsPDF } from 'jspdf';

interface CloseModalProps {
  isVisible: boolean;
  onClose: () => void;
  messages: { sender: string, text: string }[];
}

const CloseModal: React.FC<CloseModalProps> = ({ isVisible, onClose, messages }) => {
  const [username, setUsername] = useState('');
  const [transcript, setTranscript] = useState(false);

  const handleTranscriptToggle = () => {
    setTranscript(!transcript);
  };

  const handleExportToPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    messages.forEach(message => {
      doc.text(`${message.sender}: ${message.text}`, 10, y);
      y += 10;
    });
    doc.save('PitchBot.pdf');
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg items-center flex flex-col">
        <h2 className="text-2xl mb-4 text-black">Thank you for using PitchBot!</h2>
        <p className="mb-4 text-black flex items-center">Download your PDF here.</p>
            <div className='w-full items-center justify-center flex'>
                <button onClick={handleExportToPDF} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
                    Export to PDF
                </button>
            </div>
            <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded bottom-0 ml-[100%] flex">
                Close
            </button>
        

      </div>
    </div>
  );
};

export default CloseModal;