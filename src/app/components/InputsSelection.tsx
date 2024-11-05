import React, { useState, useEffect } from 'react';

const InputSelection: React.FC = () => {
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>('');
  const [selectedCamera, setSelectedCamera] = useState<string>('');
  const itemsLimit = 5;

  useEffect(() => {
    const updateDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const mics = devices.filter(device => device.kind === 'audioinput');
      const cams = devices.filter(device => device.kind === 'videoinput');
      setMicrophones(mics);
      setCameras(cams);
    };

    navigator.mediaDevices.addEventListener('devicechange', updateDevices);
    updateDevices();

    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', updateDevices);
    };
  }, []);

  const handleMicrophoneChange = (deviceId: string) => {
    setSelectedMicrophone(deviceId);
    // Add logic to switch the microphone input
  };

  const handleCameraChange = (deviceId: string) => {
    setSelectedCamera(deviceId);
    // Add logic to switch the camera input
  };

  const truncateName = (name: string, maxLength: number) => {
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  return (
    <div className='flex flex-row'>
      {/* Microphone Input Selection */}
      <details className="dropdown">
        <summary className="btn m-1 text-black">Microphone</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-black">
          {microphones.slice(0, itemsLimit).map((mic) => (
            <li key={mic.deviceId}>
              <a onClick={() => handleMicrophoneChange(mic.deviceId)}>{truncateName(mic.label || `Microphone ${mic.deviceId}`, 10)}</a>
            </li>
          ))}
          {microphones.length > itemsLimit && (
            <li>
              <a>More...</a>
            </li>
          )}
        </ul>
      </details>
      {/* Camera Input Selection */}
      <details className="dropdown">
        <summary className="btn m-1 text-black">Camera</summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-black">
          {cameras.slice(0, itemsLimit).map((cam) => (
            <li key={cam.deviceId}>
              <a onClick={() => handleCameraChange(cam.deviceId)}>{truncateName(cam.label || `Camera ${cam.deviceId}`, 10)}</a>
            </li>
          ))}
          {cameras.length > itemsLimit && (
            <li>
              <a>More...</a>
            </li>
          )}
        </ul>
      </details>
    </div>
  );
};

export default InputSelection;
