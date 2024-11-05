import React from 'react';

const VolumeSlider: React.FC = () => {
  return (
    <div className='flex w-[100%] h-auto items-center justify-center flex-col'>  
      <input type="range" min={0} max="100" className="range text-black w-[100%]" />  
    </div>
  );
};

export default VolumeSlider;