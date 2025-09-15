import React, { useEffect, useState } from 'react';
import './WelcomeScreen.css';

function WelcomeScreen({ onFinish }) {
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const textTimer = setTimeout(() => setShowImage(true), 2000); // after 2s show image
    const finishTimer = setTimeout(() => onFinish(), 5000);       // after 5s finish splash
    return () => {
      clearTimeout(textTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="welcome-screen">
      <h1 className={`welcome-text ${showImage ? 'fade-out' : ''}`}>
        Welcome to Our Website
      </h1>
      {showImage && (
        <img
          src="/nazara.png"
          alt="Welcome"
          className="welcome-image"
        />
      )}
    </div>
  );
}

export default WelcomeScreen;
