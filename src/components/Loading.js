import React from 'react';

export default function Loading() {
  return (
    <div className="text-center my-5">
      <div className="spinner-border text-primary my-3" role="status" style={{ width: '10rem', height: '10rem' }}></div>
      <br />
      <style>
        {`
          @keyframes fadeInOut {
            0%, 100% {
              opacity: 0;
            }
            50% {
              opacity: 1;
            }
          }

          .animated-text {
            animation: fadeInOut 2s ease infinite; // Infinite loop
          }
        `}
      </style>
      <span className="animated-text my-3">Loading...</span>
    </div>
  );
}
