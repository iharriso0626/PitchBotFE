// components/sidebar.tsx
import React, { useCallback, useState } from 'react';
import { Button, Drawer, Menu } from 'react-daisyui';
import Link from  'next/link';


const Sidebar = () => {
  return (
    <div className='w-[15%]  h-full bg-gray-300   p-2 flex flex-col  border-[#cb88fc]'>
       {/* Name Box */}
      <div className='flex h-[15%] w-min rounded-xl border-[#6f04bd] border-[3px] bg-white items-center justify-center text-[50px]'>
          <h1 className='p-2 px-3  bg-white text-black rounded-xl'>PitchBot</h1>
      </div>

      <div className='flex-col h-screen mt-2 bg-white border-[#6f04bd] border-[3px] rounded-xl flex w-full'>
        {/* Start Assignment Box */}
        <div className='flex h-[15%] w-fill  border-black  items-center justify-center text-[20px]'>
        <Link href={'/ChatPage'} ><h1 className='p-2 px-3 rounded-xl text-black'>Start Assignment</h1></Link>
        </div>

        {/* Rubric Box */}
        <div className='flex h-[15%] w-fill  border-black  items-center justify-center text-[20px]'>
          <Link href={'/RubricPage'} ><h1 className='p-2 px-3 rounded-xl text-black'>Rubric</h1></Link>
        </div>

        {/* Scores Box */}
        <div className='flex h-[15%] w-fill  border-black  items-center justify-center text-[20px]'>
        <Link href={'/ScoresPage'} ><h1 className='p-2 px-3 rounded-xl text-black'>Scores</h1></Link>
        </div>

        {/* Options Box */}
        <div className='flex h-[15%] w-fill mb-auto border-black bg-white items-center justify-center text-[20px]'>
        <Link href={'/OptionsPage'} ><h1 className='p-2 px-3 bg-white rounded-xl text-black'>Options</h1></Link>
        </div>

        {/* Account Box */}
        <div className='flex h-[15%] w-fill rounded-b-xl border-black bg-white items-center justify-center text-[20px]'>
        <Link href={'/AccountPage'} ><h1 className='p-2 px-3  bg-white rounded-xl text-black'>Account</h1></Link>
        </div>
        </div>
    </div>
  );
};


export default Sidebar;