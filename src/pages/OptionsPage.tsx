import React from 'react';
import { Dropdown } from "@nextui-org/react";

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
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          
          {/* Volume Slider Box */}
          <div className='flex w-full h-auto items-center justify-center  flex-col'>
            <h1 className='text-black mb-2'>Volume</h1>  
            <input type="range" min={0} max="100"  className="range text-black w-[25%]" />  
          </div>

          {/* Input Selection Box */}
          <div className='w-full border-2 flex items-center justify-center'>
            <h1 className='text-black items-center '> Input Selection</h1>
            

          </div>

        </div>
      </div>
    </div>
  );
};

export default OptionsPage;