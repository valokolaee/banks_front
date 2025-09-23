// src/components/ui/Hero.tsx
import React from "react";
// import Background from "./Background";
import PrimaryButton from "./PrimaryButton";

const Hero = () => {
  return (
    <div className="font-alcxTitles relative flex min-h-screen flex-col items-center text-center">
      {/* <Background /> */}

      <div className="relative z-10 px-6 py-20 md:py-32 max-w-4xl mx-auto text-center space-y-6">
        <h1
          data-aos="fade-up"
          className="bg-gradient-to-br from-gold via-bronze to-gold bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl lg:text-7xl leading-tight"
        >
          Welcome to BTX
          <br />
          The Future of Financial Pools
        </h1>

        <p data-aos="fade-up" data-aos-delay="200" className="text-white-inverse/80 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          Maximize your returns with intelligent pool management.
        </p>
        <p data-aos="fade-up" data-aos-delay="300" className="text-white-inverse/80 text-base md:text-lg max-w-2xl mx-auto">
          Join thousands of users already growing their wealth.
        </p>

        <div data-aos="fade-up" data-aos-delay="400">
          <PrimaryButton href="/register">Get Started</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default Hero;