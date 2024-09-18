// components/sidebar.tsx
import React, { useCallback, useState } from 'react';
import { Button, Drawer, Menu } from 'react-daisyui';


const Sidebar = () => {
  return (
    <div className='w-[15%]  h-full bg-black   p-2 flex flex-col border-r-2 border-[#cb88fc]'>
       {/* Name Box */}
      <div className='flex h-[15%] w-fill rounded-xl border-[#6f04bd] border-[3px] bg-white items-center justify-center text-[50px]'>
          <h1 className='p-2 px-3  bg-white rounded-xl'>PitchBot</h1>
      </div>

      <div className='flex-col h-screen mt-2 bg-white border-[#6f04bd] border-[3px] rounded-xl flex w-full'>
        {/* Start Assignment Box */}
        <div className='flex h-[15%] w-fill  border-black  items-center justify-center text-[20px]'>
          <h1 className='p-2 px-3  rounded-xl'>Start Assignment</h1>
        </div>

        {/* Scores Box */}
        <div className='flex h-[15%] w-fill  border-black  items-center justify-center text-[20px]'>
          <h1 className='p-2 px-3   rounded-xl'>Scores</h1>
        </div>

        {/* Options Box */}
        <div className='flex h-[15%] w-fill mb-auto border-black bg-white items-center justify-center text-[20px]'>
          <h1 className='p-2 px-3 bg-white rounded-xl'>Options</h1>
        </div>

        {/* Account Box */}
        <div className='flex h-[15%] w-fill rounded-b-xl border-black bg-white items-center justify-center text-[20px]'>
          <h1 className='p-2 px-3  bg-white rounded-xl'>Account</h1>
        </div>
        </div>
    </div>
  );
};


export default Sidebar;