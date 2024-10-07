import React from 'react';
import { Dropdown } from "@nextui-org/react";
import  VolumeSlider  from '../app/components/VolumeSlider';
import  ColorMode  from '../app/components/ColorMode';
import InputsSelection from '../app/components/InputsSelection';

const OptionsPage: React.FC = () => {
  return (
    <div className='overflow-hidden flex items-center justify-center h-screen'>
      {/* Box Containing Main Body */}
      <div className="p-5 flex h-fill w-full max-w-4xl rounded-2xl border-[8px] border-[#0C2340] flex-col bg-white mx-auto font-sans">
        <h1 className="text-2xl justify-center flex font-bold text-black mb-4">Options</h1>
        {/* Main Box */}
        <div className='flex w-full h-full space-y-2 flex-col'>

          {/* Light Mode/Dark Mode Box */}
          <div className='flex w-full h-auto items-center justify-center flex-col'>
            <h1 className='text-black mb-2'>Light Mode / Dark Mode</h1>  
            <ColorMode />
          </div>
          
          {/* Volume Slider Box */}
          <div className='flex w-full h-auto items-center justify-center  flex-col'>
            <h1 className='text-black mb-2'>Volume</h1>
            <VolumeSlider /> 
          </div>

          {/* Input Selection Box */}
          <div className='w-full border-2 flex flex-col items-center justify-center'>
            <h1 className='text-black items-center '> Input Selection</h1>
            {/* Input Selection */}
            <InputsSelection />

          </div>

        </div>
      </div>
    </div>
  );
};

export default OptionsPage;