import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import '../../app/styles/styles.css';

const TalkingAvatar: React.FC<{ text: string }> = ({ text }) => {
  const [isTalking, setIsTalking] = useState(false);

  useEffect(() => {
    if (text) {
      setIsTalking(true);
      const timer = setTimeout(() => setIsTalking(false), 2000); // Stop animation after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [text]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <Image
          src="/images/character.png"
          alt="Character"
          className={isTalking ? 'talking' : ''}
          width={200}
          height={200}
        />
      </div>
    </div>
  );
};

export default TalkingAvatar;