/* eslint-disable @next/next/no-img-element */
"use client";

import { SetStateAction, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Image data with external URLs
const carouselImages = [
  {
    src: "https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FEvent%2520Website%2520Home%2520Banner%2520%25283%2529-e842f0dd-3cb1-4608-9e08-b9036277679c.png&w=3840&q=75",
    alt: "Professional esports tournament arena",
    url: "https://example.com/tournaments"
  },
  {
    src: "https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2F1000142736-183a8529-d931-4024-bf2e-0250c6574eae.png&w=3840&q=75",
    alt: "Competitive gaming team",
    url: "https://example.com/teams"
  },
  {
    src: "https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FMain%2520Banner-af392227-cd12-46f4-8bec-93fd949f2126.png&w=3840&q=75",
    alt: "Gaming peripherals and setup",
    url: "https://example.com/gear"
  },
  {
    src: "https://criticalphoenix.in/public/image@2x.png",
    alt: "Esports victory celebration",
    url: "https://example.com/events"
  },
  {
    src: "https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2F1000142736-183a8529-d931-4024-bf2e-0250c6574eae.png&w=3840&q=75",
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
    <section className="relative h-[90vh] overflow-hidden ml-16 md:ml-64 mb-4">
      {/* Image Carousel with External Links */}
      <div>
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
              className="block"
            >
              <div className="relative w-full h-full">
                {/* Using regular img tag with object-contain to prevent overshadowing */}
                <img
                  src={carouselImages[currentImage].src}
                  alt={carouselImages[currentImage].alt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </a>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Subtle overlay for better contrast with navigation elements */}
      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none"></div>
      
      {/* Navigation Dots - Adjusted position */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
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

      {/* Call to action button - Adjusted position */}
      <motion.div
        className="absolute z-10 bottom-28 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <button className="px-8 py-4 bg-orange-500 text-white font-bold text-lg rounded-md hover:bg-orange-600 transition-all duration-300 transform hover:scale-105">
          JOIN THE ELITE
        </button>
      </motion.div>
      
      {/* Side navigation arrows - adjusted position to account for navbar */}
      <motion.button
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 p-3 rounded-full hover:bg-orange-500/80 transition-all duration-300"
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
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 bg-black/30 p-3 rounded-full hover:bg-orange-500/80 transition-all duration-300"
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