import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const MediaDeviceDetector = () => {
  const [cameraDevices, setCameraDevices] = useState([]);
  const [microphoneDevices, setMicrophoneDevices] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const detectDevices = async () => {
      try {
        // Check for permission to access devices
        await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter((device) => device.kind === 'videoinput');
        const microphones = devices.filter((device) => device.kind === 'audioinput');

        setCameraDevices(cameras);
        setMicrophoneDevices(microphones);
      } catch (err) {
        setError("Unable to access media devices. Please allow access.");
        console.error(err);
      }
    };

    detectDevices();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Media Device Detector
      </Typography>

      {error && (
        <Typography color="error" gutterBottom>
          {error}
        </Typography>
      )}

      <Box marginBottom={4}>
        <Typography variant="h6">Cameras Detected</Typography>
        {cameraDevices.length > 0 ? (
          <List>
            {cameraDevices.map((device) => (
              <ListItem key={device.deviceId}>
                <ListItemText primary={device.label || "Unnamed Camera"} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No cameras detected.</Typography>
        )}
      </Box>

      <Box marginBottom={4}>
        <Typography variant="h6">Microphones Detected</Typography>
        {microphoneDevices.length > 0 ? (
          <List>
            {microphoneDevices.map((device) => (
              <ListItem key={device.deviceId}>
                <ListItemText primary={device.label || "Unnamed Microphone"} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No microphones detected.</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MediaDeviceDetector;








































/*import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const SimpleComponent: React.FC = () => {




  return (
    <div className='flex flex-row'>
              {/* Microphone Input Selection */}
            /*  <details className="dropdown">
                <select>
                <summary className="btn m-1 text-black">Microphone</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-black">
                  <li><a>Default</a></li>
                  <li><a>Other</a></li>
                </ul>
                </select>
              </details>
              {/* Camera Input Selection */}
          /*    <details className="dropdown">
                <select>
                <summary className="btn m-1 text-black">Camera</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-black">
                  <li><a>Default</a></li>
                  <li><a>Other</a></li>
                </ul>
                </select>
              </details>
            </div>

  );
};

export default SimpleComponent;
