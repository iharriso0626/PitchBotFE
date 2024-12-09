import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import avatarimg from '../images/avatar.svg';
import microphone_mute from '../images/microphone_mute.svg';
import microphone_on from '../images/microphone_on.svg';
import camera_on from '../images/camera_on.svg';
import camera_off from '../images/camera_off.svg';
import Avatar from '../lotties/AvatarLottie.json';
import '../styles/styles.css';
import Lottie from 'react-lottie';

interface CameraComponentProps {
  listening: boolean;
  videoEnabled: boolean;
  audioEnabled: boolean;
  setVideoEnabled: (enabled: boolean) => void;
  setAudioEnabled: (enabled: boolean) => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({
  listening,
  videoEnabled,
  audioEnabled,
  setVideoEnabled,
  setAudioEnabled,
}) => {
  const userVideoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const startUserVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(stream);
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing user camera:', error);
      }
    };

    startUserVideo();
  }, []);

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setVideoEnabled(!videoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !track.enabled;
      });
      setAudioEnabled(!audioEnabled);
    }
  };

  return (
    <div className=''>
      {/* Box Containing Cameras */}
      <div className='flex flex-row relative justify-center items-center gap-1 pb-[1%]'>
        {/* User Camera box */}
        <div className='w-[450px] h-[350px] border-[5px] border-[#0C2340] rounded-2xl bg-black ml-5 text-white relative'>
          <video
            ref={userVideoRef}
            autoPlay
            className='flex items-center justify-center h-full w-full'
          />
          <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2'>
            <button onClick={toggleVideo} className={`p-3 rounded-full border-[#050505] border-2 ${videoEnabled ? 'bg-red-500' : 'bg-green-500'} text-white`} >
              <Image
                src={videoEnabled ? camera_off : camera_on}
                alt={videoEnabled ? 'Camera On' : 'Camera Off'}
                className='w-6 h-6'
              />
            </button>
            <button onClick={toggleAudio} className={`p-3 rounded-full border-[#050505] border-2 ${audioEnabled ? 'bg-red-500' : 'bg-green-500'} text-white`}>
              <Image
              src={audioEnabled ? microphone_mute : microphone_on}
              alt={audioEnabled ? 'Microphone On' : 'Microphone Mute'}
              className='w-6 h-6'
              />
            </button>
          </div>
        </div>

        {/* AI Camera box */}
        <div className='w-[450px] h-[350px] border-[5px] border-[#0C2340] flex rounded-2xl bg-black ml-auto mr-5 text-white' style={{ pointerEvents: 'none' }}>
          <Lottie 
            options={{
              loop: true,
              autoplay: false,
              animationData: Avatar,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
              }
            }}
            isStopped={!listening}
            isPaused={!listening}
          />
        </div>
      </div>
    </div>
  );
};

export default CameraComponent;