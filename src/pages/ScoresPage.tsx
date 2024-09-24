// src/pages/ScoresPage.tsx
import React, { useState } from 'react';
import Sidebar from '@/app/components/sidebar';


const ScoresPage: React.FC = () => {

  return (
    <div className='w-screen h-screen overflow-hidden flex items-center bg-gray-300'>
      <Sidebar />

      {/* Box Containing Main Body */}
      <div className="p-5 flex h-[90%] w-[80%] rounded-2xl border-[8px] border-[#cb88fc]  bg-white mx-auto font-sans">
        <div className='w-[60%] h-[20%] bg-gray-300 flex justify-center items-center text-black'> Welcome to the Scores Page</div>
      </div>

    </div>
  );
};

export default ScoresPage;