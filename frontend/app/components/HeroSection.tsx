// components/HeroSection.tsx
"use client";

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const quotes = [
  "DOMINATE THE ARENA",
  "RISE TO LEGENDARY STATUS",
  "CLAIM YOUR VICTORY",
  "UNLEASH YOUR POTENTIAL",
  "REDEFINE THE GAME"
];

const HeroSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 1.5;
    }
  }, []);

  // Don't render anything during SSR
  if (!isClient) {
    return <div className="w-full h-screen bg-black ml-16 md:ml-64"></div>;
  }

  return (
    <section className="relative h-screen overflow-hidden ml-16 md:ml-64">
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/videos/esports-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      
      {/* Animated Quotes */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          {quotes.map((quote, index) => (
            <motion.h1
              key={index}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: [0, 1, 1, 0],
                y: [20, 0, 0, -20]
              }}
              transition={{
                times: [0, 0.1, 0.9, 1],
                duration: 4,
                delay: index * 4,
                repeat: Infinity,
                repeatDelay: quotes.length * 4 - 4
              }}
            >
              <span className="text-orange-500">{quote.split(' ')[0]}</span>{' '}
              {quote.split(' ').slice(1).join(' ')}
            </motion.h1>
          ))}
        </motion.div>
      </div>

      {/* Down arrow */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        <svg 
          width="40" 
          height="40" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 5V19M12 19L19 12M12 19L5 12" 
            stroke="#ff6600" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;