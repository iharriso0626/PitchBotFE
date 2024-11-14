import React from 'react';
import { Dropdown } from "@nextui-org/react";
import  VolumeSlider  from '../app/components/VolumeSlider';
import  ColorMode  from '../app/components/ColorMode';
import InputsSelection from '../app/components/InputsSelection';
import { useState } from "react";

const OptionsPage: React.FC = () => {

  function ChildComponent({ darkMode }) {
    return (
      <divstyle={{backgroundColor: darkMode ? '#333333' : '#f4f4f4',
          color: darkMode ? '#ffffff' : '#000000',
          padding: '20px',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
        }}
        ><p>This is a child component in {darkMode ? 'Dark' : 'Light'} Mode.</p></div>  );
      }export default ChildComponent;

  return (
    <div className='overflow-hidden flex items-center justify-center'>
      {/* Box Containing Main Body */}
      <div className="p-5 flex  rounded-2xl  flex-col bg-[#C1C6C8] dark:bg-grey-800 font-sans">
        <h1 className="text-2xl justify-center flex font-bold text-black mb-4">Options</h1>
        {/* Main Box */}
        <div className='flex  space-y-2 flex-col'>

          {/* Light Mode/Dark Mode Box */}
          <div className='flex w-full h-auto items-center justify-center flex-col'>
            <button onClick={toggleDarkMode} className="p-2 bg-gray-200 dark:bg-gray-800 rounded">
              Toggle Dark Mode
            </button>
            <ColorMode isDarkMode={isDarkMode} />
          </div>
          
          {/* Volume Slider Box */}
          <div className='flex w-full h-auto items-center justify-center  flex-col'>
            <h1 className='text-black mb-2'>Volume</h1>
            <VolumeSlider /> 
          </div>

          {/* Input Selection Box */}
          <div className='w-full flex flex-col items-center justify-center'>
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