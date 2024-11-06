import React, { useState, useEffect } from 'react';

const StartModal: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
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
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4 text-black">Welcome!</h2>
        <p className="mb-4 text-black">This is a start modal that appears on the first render only.</p>
        <button onClick={handleClose} className="bg-blue-500 text-white px-4 py-2 rounded">
          Close
        </button>
      </div>
    </div>
  );
};

export default StartModal;