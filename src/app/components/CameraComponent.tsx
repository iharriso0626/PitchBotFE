import React, { useEffect, useRef } from 'react';

const CameraComponent: React.FC = () => {
  const userVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const startUserVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing user camera:', error);
      }
    };

    startUserVideo();
  }, []);

  return (
    <>
      {/* Box Containing Cameras */}
      <div className='flex flex-row'>
        {/* User Camera box */}
        <div className='w-[450px] h-[350px] border-[10px] border-[#6f04bd] rounded-2xl bg-black ml-5 text-white'>
          <video
            ref={userVideoRef}
            autoPlay
            className='flex items-center justify-center h-full w-full'
          />
        </div>

        {/* AI Camera box */}
        <div className='w-[450px] h-[350px] border-[10px] border-[#6f04bd] flex rounded-2xl bg-black ml-auto mr-5 text-white'>
          <h1 className='flex items-center justify-center h-full w-full'>AI Camera Here</h1>
        </div>
      </div>
    </>
  );
};

export default CameraComponent;
