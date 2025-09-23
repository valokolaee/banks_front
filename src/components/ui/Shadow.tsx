// src/components/ui/Shadow.tsx
import React from "react";

interface ShadowProps {
  className?: string;
  color?: string;
}

const Shadow: React.FC<ShadowProps> = ({ className = "w-64 h-64", color = "var(--primary-color)" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        fill="none"
        viewBox="0 0 100 100"
      >
        <g filter="url(#filter0_f_702_6)">
          <circle cx="50" cy="50" r="40" fill={color} />
        </g>
        <defs>
          <filter
            id="filter0_f_702_6"
            width="100"
            height="100"
            x="0"
            y="0"
            colorInterpolationFilters="sRGB"
            filterUnits="userSpaceOnUse"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feGaussianBlur result="effect1_foregroundBlur" stdDeviation="15" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Shadow;