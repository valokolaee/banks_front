// src/components/ui/StarsSimulation.tsx
import React from "react";

const starPositions = [
  { top: '15%', left: '10%' },
  { top: '25%', left: '80%' },
  { top: '40%', left: '30%' },
  { top: '60%', left: '70%' },
  { top: '75%', left: '20%' },
  { top: '50%', left: '50%' },
  { top: '90%', left: '60%' },
  { top: '10%', left: '50%' },
  { top: '30%', left: '90%' },
  { top: '85%', left: '5%' },
  { top: '20%', left: '25%' },
  { top: '65%', left: '40%' },
];

const StarsSimulation = () => {
  return (
    <>
      {starPositions.map((pos, index) => (
        <div
          key={index}
          className="absolute w-1 h-1 bg-white rounded-full opacity-60 blur-sm animate-pulse"
          style={{
            top: pos.top,
            left: pos.left,
            //random delay for pulse
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </>
  );
};

export default StarsSimulation;