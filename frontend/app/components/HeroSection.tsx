/* eslint-disable @next/next/no-img-element */
"use client";

import { SetStateAction, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Original desktop image data with external URLs
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

// Mobile-specific image data
// Replace these URLs with your actual mobile-optimized images
const mobileCarouselImages = [
  {
    src: "https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2F1000142744-f1030016-723a-429a-a11e-fcc55a4e4f3b.png&w=1080&q=75",
    alt: "Mobile esports tournament view",
    url: "https://example.com/tournaments-mobile"
  },
  {
    src: "https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FEvent%2520Website%2520Mobile%2520Banner%2520%252810%2529-da41f5e5-af4a-4722-bf2f-a8af0d7532c4.png&w=1080&q=75",
    alt: "Mobile gaming team view",
    url: "https://example.com/teams-mobile"
  },
  {
    src: "https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2F1000142743-0501c7e5-72d2-405b-b5c1-d058e32db007.png&w=1080&q=75",
    alt: "Mobile gaming gear",
    url: "https://example.com/gear-mobile"
  },
  {
    src: "https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2F1000142744-f1030016-723a-429a-a11e-fcc55a4e4f3b.png&w=1080&q=75",
    alt: "Mobile esports celebration",
    url: "https://example.com/events-mobile"
  }
];

const HeroSection = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [currentMobileImage, setCurrentMobileImage] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Auto-advance carousel
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        if (isMobile) {
          setCurrentMobileImage((prev) => (prev + 1) % mobileCarouselImages.length);
        } else {
          setCurrentImage((prev) => (prev + 1) % carouselImages.length);
        }
      }, 5000);
    }
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isAutoPlaying, isMobile]);

  const handleDotClick = (index: SetStateAction<number>, isMobileView: boolean) => {
    if (isMobileView) {
      setCurrentMobileImage(index);
    } else {
      setCurrentImage(index);
    }
    setIsAutoPlaying(false);
    // Resume auto-play after user interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  // Don't render anything during SSR
  if (!isClient) {
    return <div className="w-full h-screen bg-black ml-16 md:ml-64"></div>;
  }

  return (
    <>
      {/* Desktop Hero Section - Hidden on mobile */}
      <section className="relative h-[90vh] overflow-hidden ml-16 md:ml-64 mb-4 hidden md:block">
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
              onClick={() => handleDotClick(index, false)}
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
          <button className="px-8 py-4 bg-black/50 backdrop-blur-md text-orange-500 font-bold text-lg hover:bg-black/60 transition-all duration-300 transform hover:scale-105">
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
      
      {/* Mobile Hero Section - Visible only on mobile */}
      <section className="relative h-[80vh] overflow-hidden w-full mb-4 block md:hidden">
        {/* Mobile Image Carousel with External Links */}
        <div className="w-full h-full">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentMobileImage}
              className="absolute inset-0 cursor-pointer"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <a 
                href={mobileCarouselImages[currentMobileImage].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-full"
              >
                <div className="relative w-full h-full">
                  <img
                    src={mobileCarouselImages[currentMobileImage].src}
                    alt={mobileCarouselImages[currentMobileImage].alt}
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Mobile-specific overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-0 pointer-events-none"></div>
        
        {/* Mobile navigation dots */}
        <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {mobileCarouselImages.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentMobileImage === index ? 'bg-orange-500 w-6' : 'bg-white/50'
              } transition-all duration-300`}
              onClick={() => handleDotClick(index, true)}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Mobile call to action button */}
        <motion.div
          className="absolute z-10 bottom-10 left-1/2 transform -translate-x-1/2 w-5/6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button className="w-full py-3 bg-black/50 backdrop-blur-md text-orange-500 font-bold text-base hover:bg-black/60 transition-all duration-300">
      JOIN THE ELITE
    </button>
        </motion.div>
        
        {/* Mobile swipe navigation arrows */}
        <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 z-20 flex justify-between px-2">
          <motion.button
            className="bg-black/40 p-2 rounded-full"
            onClick={() => {
              setCurrentMobileImage((prev) => 
                (prev - 1 + mobileCarouselImages.length) % mobileCarouselImages.length
              );
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 19L8 12L15 5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
          
          <motion.button
            className="bg-black/40 p-2 rounded-full"
            onClick={() => {
              setCurrentMobileImage((prev) => 
                (prev + 1) % mobileCarouselImages.length
              );
              setIsAutoPlaying(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }}
            whileTap={{ scale: 0.9 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 5L16 12L9 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </div>
      </section>
    </>
  );
};

export default HeroSection;