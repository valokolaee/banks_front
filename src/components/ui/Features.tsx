// src/components/ui/Features.tsx
import React from "react";
import FeatureItem from "./FeatureItem";

const Features: React.FC = () => {
  const features = [
    {
      title: "High Security",
      description: "Your data is protected with the best encryption algorithms.",
    },
    {
      title: "Smart Analysis",
      description: "Our system analyzes your performance intelligently.",
    },
    {
      title: "Fast Performance",
      description: "Experience high speed and smooth operation.",
    },
  ];

  return (
    <div
      style={{
        padding: '4rem 1rem',
        borderTop: '1px solid #2a2c31',
        marginTop: '4rem',
      }}
    >
      <h2
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          color: '#f5c59f',
          textAlign: 'center',
          marginBottom: '3rem',
        }}
      >
        Features
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
        }}
      >
        {features.map((feature, index) => (
          <FeatureItem
            key={index}
            index={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;