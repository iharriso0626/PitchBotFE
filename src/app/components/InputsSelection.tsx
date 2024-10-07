
import React from 'react';

const SimpleComponent: React.FC = () => {
  return (
    <div className='flex flex-row'>
              {/* Microphone Input Selection */}
              <details className="dropdown">
                <summary className="btn m-1 text-black">Microphone</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-black">
                  <li><a>Default</a></li>
                  <li><a>Other</a></li>
                </ul>
              </details>
              {/* Camera Input Selection */}
              <details className="dropdown">
                <summary className="btn m-1 text-black">Camera</summary>
                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow text-black">
                  <li><a>Default</a></li>
                  <li><a>Other</a></li>
                </ul>
              </details>
            </div>
  );
};

export default SimpleComponent;
