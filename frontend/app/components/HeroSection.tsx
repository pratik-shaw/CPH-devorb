/* eslint-disable @next/next/no-img-element */
"use client";

import { SetStateAction, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Image data with external URLs
const carouselImages = [
  {
    src: "https://cf-img.fnatic.com/cdn-cgi/image/dpr=1,fit=contain,format=auto,height=1560,width=1536,trim=0;1233;0;1234/https://cdn.sanity.io/images/5gii1snx/production/fdeb19681ef7ee48944066c4e831a9cc9d42309f-7407x4940.jpg",
    alt: "Professional esports tournament arena",
    url: "https://example.com/tournaments"
  },
  {
    src: "https://criticalphoenix.in/public/yearlygraph.png",
    alt: "Competitive gaming team",
    url: "https://example.com/teams"
  },
  {
    src: "https://criticalphoenix.in/public/image@2x.png",
    alt: "Gaming peripherals and setup",
    url: "https://example.com/gear"
  },
  {
    src: "https://criticalphoenix.in/public/image@2x.png",
    alt: "Esports victory celebration",
    url: "https://example.com/events"
  },
  {
    src: "https://criticalphoenix.in/public/image@2x.png",
    alt: "Gaming strategic planning",
    url: "https://example.com/strategies"
  }
];

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    setIsClient(true);
    
    // Auto-advance carousel
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setCurrentImage((prev) => (prev + 1) % carouselImages.length);
      }, 5000);
    }
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const handleDotClick = (index: SetStateAction<number>) => {
    setCurrentImage(index);
    setIsAutoPlaying(false);
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Don't render anything during SSR
  if (!isClient) {
    return <div className="w-full h-screen bg-black ml-16 md:ml-64"></div>;
  }

  return (
    <section className="relative h-screen overflow-hidden ml-16 md:ml-64">
      {/* Image Carousel with External Links */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentImage}
            className="absolute inset-0 cursor-pointer"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <a 
              href={carouselImages[currentImage].url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full h-full"
            >
              <div className="relative w-full h-full">
                {/* Using regular img tag instead of Next.js Image component to avoid domain restrictions */}
                <img
                  src={carouselImages[currentImage].src}
                  alt={carouselImages[currentImage].alt}
                  className="w-full h-full object-cover"
                />
              </div>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Subtle overlay for better contrast with navigation elements */}
      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none"></div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {carouselImages.map((_, index) => (
          <motion.button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentImage === index ? 'bg-orange-500 w-8' : 'bg-white/50'
            } transition-all duration-300`}
            onClick={() => handleDotClick(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>

      {/* Call to action button */}
      <motion.div
        className="absolute z-10 bottom-32 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <button className="px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
          JOIN THE ELITE
        </button>
      </motion.div>
      
      {/* Side navigation arrows */}
      <motion.button
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 p-3 rounded-full hover:bg-orange-500/80 transition-all duration-300"
        onClick={() => {
          setCurrentImage((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
      
      <motion.button
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 p-3 rounded-full hover:bg-orange-500/80 transition-all duration-300"
        onClick={() => {
          setCurrentImage((prev) => (prev + 1) % carouselImages.length);
          setIsAutoPlaying(false);
          setTimeout(() => setIsAutoPlaying(true), 10000);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </section>
  );
};

export default HeroSection;