// src/components/ui/FeatureItem.tsx
import React from "react";

interface FeatureItemProps {
  title: string;
  description: string;
  index: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, index }) => {

  const svgPaths = [
    {
      transparent: "M579.3 245c-27.6-18.8-47.5-38.7-60.1-53.2...",
      primary: "M618.8 500.7l44.5-95.4H600l-44.5 95.4z",
      secondary: "M748.7 539.6a16.9 17 0 1 0 33.8 0 16.9 17 0 1 0-33.8 0",
    },
    {
      transparent: "M878.3 192.9H145.7c-16.5 0-30 13.5-30 30V706c0 16.5 13.5 30 30 30h732.6c16.5 0 30-13.5 30-30V222.9c0-16.5-13.5-30-30-30",
      primary: "M878.3 152.9H145.7c-38.6 0-70 31.4-70 70V706c0 38.6 31.4 70 70 70h732.6c38.6 0 70-31.4 70-70V222.9c0-38.6-31.4-70-70-70m30 531V706c0 16.5-13.5 30-30 30H145.7c-16.5 0-30-13.5-30-30V222.9c0-16.5 13.5-30 30-30h732.6c16.5 0 30 13.5 30 30zM678 871.1H346c-11 0-20-9-20-20s9-20 20-20h332c11 0 20 9 20 20s-9 20-20 20",
    },
    {
      transparent: "M500.5 175.5c-146.6 0-265.9 119.3-265.9 265.9 0 120 82 225.9 196.7 256.8l-2.5-65.2s-98.5-67.1-117-103.7-7.5-163.6 16-195.6 68.5-79.5 126-90.5 118 0 168 34.5 72.5 134.5 72.5 134.5S736 410 765.8 425c-8.5-139.1-124.2-249.5-265.3-249.5",
      primary: "M806 456.2c.2-4.9.4-9.9.4-14.9 0-81.7-31.8-158.5-89.6-216.3s-134.6-89.6-216.3-89.6S342 167.2 284.2 225s-89.6 134.6-89.6 216.3c0 35.9 6.2 71.1 18.3 104.5 11.8 32.3 28.8 62.3 50.7 89 40.4 49.4 95.6 85.1 156.7 101.7v28.9c0 62.4 50.8 113.2 113.2 113.2h213.3c62.4 0 113.2-50.8 113.2-113.2V515.8c-.1-31-23.8-56.6-54-59.6",
    },
  ];

  const data = svgPaths[index] || null;

  return (
    <div
      data-aos="fade-up"
      data-aos-duration={index === 0 ? "500" : index === 1 ? "800" : "500"}
      className={`text-white px-16 text-center p-4 w-full md:w-1/3 flex flex-col justify-center items-center gap-4 ${
        index !== 2 ? "md:border-0 md:border-r md:border-r-dark-gray border-b border-b-dark-gray" : ""
      }`}
    >
      <div>
        {data && (
          <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" className="icon" viewBox="0 0 1024 1024">
            {data.transparent && <path fill="transparent" d={data.transparent} />}
            {data.primary && <path fill="var(--primary-color)" d={data.primary} />}
            {data.secondary && <path fill="var(--secondary-color)" d={data.secondary} />}
          </svg>
        )}
      </div>
      <div>
        <p className="font-bold mb-3 text-lg">{title}</p>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
    </div>
  );
};

export default FeatureItem;