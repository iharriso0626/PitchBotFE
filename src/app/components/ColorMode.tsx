import React, { useState } from 'react';
import OptionsPage from '../../pages/OptionsPage';

function ColorMode() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode); 
  };

  return (
    <div 
      style={{backgroundColor: darkMode ? '#121212' : '#ffffff',
        color: darkMode ? '#ffffff' : '#000000',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s ease',
      }}
    >
      <h1>
      {darkMode ? 'Dark Mode' : 'Light Mode'}</h1>
      <button onClick={toggleDarkMode}>
        Switch to {darkMode ? 'Light' : 'Dark'} 
        
export default ColorMode;