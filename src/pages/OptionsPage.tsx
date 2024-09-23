// src/pages/OptionsPage.tsx
import React, { useState } from 'react';
import Sidebar from '@/app/components/sidebar';


const OptionsPage: React.FC = () => {

  return (
    <div className='w-screen h-screen overflow-hidden flex items-center bg-gray-300'>
      <Sidebar />

      {/* Box Containing Main Body */}
      <div className="p-5 flex h-[90%] w-[80%] rounded-2xl border-[8px] border-[#cb88fc] flex-col bg-white mx-auto font-sans">
            <h1 className='text-black items-center justify-center flex'>Welcome to the Options Page</h1>
      </div>

    </div>
  );
};

export default OptionsPage;