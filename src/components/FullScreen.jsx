import React, { useState } from 'react';
import { BsAspectRatioFill } from 'react-icons/bs';
import './component.css';

const FullScreen = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      enterFullscreen();
    } else {
      exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const enterFullscreen = () => {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      // Firefox
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      // Chrome, Safari and Opera
      document.documentElement.webkitRequestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      // IE/Edge
      document.documentElement.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      // Firefox
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      // Chrome, Safari and Opera
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      // IE/Edge
      document.msExitFullscreen();
    }
  };

  return (
    <div className="text-center mt-0.4 mr-3">
      <div className="relative inline-block group w-9 h-9">
        <button
          onClick={toggleFullscreen}
          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" className="h-5 w-5">
            <path
              fill="rgb(229, 228, 226)"
              d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81v8.37C2 19.83 4.17 22 7.81 22h8.37c3.64 0 5.81-2.17 5.81-5.81V7.81C22 4.17 19.83 2 16.19 2"
              opacity="0.35"
            ></path>
            <path
              fill="black"
              d="M2.75 9.97c-.41 0-.75-.33-.75-.75V6.91C2 4.2 4.2 2 6.91 2h2.31a.749.749 0 1 1 0 1.5H6.91C5.03 3.5 3.5 5.03 3.5 6.91v2.31c0 .42-.34.75-.75.75M21.25 9.97c-.41 0-.75-.34-.75-.75V6.91c0-1.88-1.53-3.41-3.41-3.41h-2.31a.749.749 0 1 1 0-1.5h2.31C19.8 2 22 4.2 22 6.91v2.31c0 .42-.34.75-.75.75M17.09 22H15.7c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h1.39c1.88 0 3.41-1.53 3.41-3.41V15.7c0-.41.34-.75.75-.75s.75.34.75.75v1.39C22 19.8 19.8 22 17.09 22M9.22 22H6.91C4.2 22 2 19.8 2 17.09v-2.31c0-.41.34-.75.75-.75s.75.34.75.75v2.31c0 1.88 1.53 3.41 3.41 3.41h2.31a.749.749 0 1 1 0 1.5"
            ></path>
          </svg>
        </button>
        <div className=" fullScreenPopup mt-1 absolute left-1/2 transform -translate-x-1/2 mb-2 w-max px-3 py-2  text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {isFullscreen ? 'Exit Full Screen' : 'Full Screen'}
          <div className="arrow"></div>
        </div>
      </div>
    </div>
  );
};

export default FullScreen;
