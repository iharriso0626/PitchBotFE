// components/sidebar.tsx
import React, { useCallback, useState } from 'react';
import { Button, Drawer, Menu } from 'react-daisyui';


const Sidebar = () => {
  return (
    <div className='w-[15%] h-screen bg-gray-500 border-r-2 border-black'>
        {/* Name Box */}
        <div className='flex h-[15%] w-fill border-b-2 border-black bg-gray-300 items-center justify-center text-[50px]'>
          <h1 className='p-2 px-3 border-2 bg-white rounded-xl'>PitchBot</h1>
        </div>

        {/* Start Assignment Box */}
        <div className='flex h-[15%] w-fill  border-black bg-gray-300 items-center justify-center text-[20px]'>
          <h1 className='p-2 px-3 border-2 bg-white rounded-xl'>Start Assignment</h1>
        </div>

        {/* Scores Box */}
        <div className='flex h-[15%] w-fill  border-black bg-gray-300 items-center justify-center text-[20px]'>
          <h1 className='p-2 px-3 border-2 bg-white rounded-xl'>Scores</h1>
        </div>

        {/* Options Box */}
        <div className='flex h-[15%] w-fill border-black bg-gray-300 items-center justify-center text-[20px]'>
          <h1 className='p-2 px-3 border-2 bg-white rounded-xl'>Options</h1>
        </div>

        {/* Account Box */}
        <div className='flex h-[15%] w-fill  border-black bg-gray-300 items-center justify-center text-[20px]'>
          <h1 className='p-2 px-3 border-2 bg-white rounded-xl'>Account</h1>
        </div>
    </div>
  );
};


export default Sidebar;