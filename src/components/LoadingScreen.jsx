import React, { useEffect, useState } from 'react';

// LoadingScreen Component
const LoadingScreen = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show loading screen initially and animate it
    showLoadingScreen();
  }, []);

  const showLoadingScreen = () => {
    const container = document.getElementById('fadeContainer');
    const needle = document.getElementById('needle');

    container.style.display = 'flex';
    container.style.opacity = '1';

    // Restart animation
    needle.style.animation = 'none';
    needle.offsetHeight;  // Trigger reflow to restart animation
    needle.style.animation = 'sweep 3s ease-in-out forwards';

    // After animation, fade out the screen
    setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        container.style.display = 'none';
      }, 1000); // Delay before hiding the screen
    }, 3000); // Duration of the loading animation
  };

  return (
    <div
      id="fadeContainer"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 1s ease-in-out',
      }}
    >
      <div style={{ textAlign: 'center', position: 'relative' }}>
        <div
          style={{
            width: '120px',
            height: '120px',
            background: 'white',
            borderRadius: '50%',
            border: '5px solid #1f2f3f',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: '-150px',
            right: '-10px',
          }}
        >
          <div
            id="needle"
            style={{
              position: 'absolute',
              width: '5px',
              height: '50px',
              background: 'black',
              transformOrigin: 'bottom center',
              transform: 'rotate(-130deg)',
              right: '50px',
              bottom: '50px',
            }}
          ></div>
        </div>
        <div
          style={{
            fontSize: '36px',
            fontWeight: 'bold',
            fontFamily: "'Crimson Text', serif",
            color: 'white',
          }}
        >
          MONZA MOTORS
        </div>
        <div
          style={{
            fontSize: '16px',
            fontFamily: "'Great Vibes', cursive",
            color: 'gray',
          }}
        >
          Where Performance Meets Perfection.
        </div>
      </div>
      <style>
        {`
          @keyframes sweep {
            from {
              transform: rotate(-130deg);
            }
            to {
              transform: rotate(45deg);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;