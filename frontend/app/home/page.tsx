/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from 'react';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { motion, useScroll, useSpring } from 'framer-motion';
import dynamic from 'next/dynamic';

// Use dynamic imports with explicit configuration
const HeroSection = dynamic(() => import('@/app/components/HeroSection'), { 
  ssr: false,
  loading: () => <div className="h-96 bg-gray-800 flex items-center justify-center">Loading Hero...</div>
});

const PartnersMarquee = dynamic(() => import('@/app/components/PartnersMarquee'), {
  ssr: false,
  loading: () => <div className="h-40 bg-gray-700 flex items-center justify-center">Loading Partners...</div>
});

const GamesShowcase = dynamic(() => import('@/app/components/GamesShowcase'), {
  ssr: false,
  loading: () => <div className="h-80 bg-gray-800 flex items-center justify-center">Loading Games...</div>
});

const TournamentsSection = dynamic(() => import('@/app/components/TournamentsSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-gray-700 flex items-center justify-center">Loading Tournaments...</div>
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setMounted(true);
      setIsLoading(false);
    }, 2000); // 2 seconds loading time

    return () => clearTimeout(loadTimer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="animate-pulse">
          <img 
            src="https://criticalphoenix.in/public/cph-1@2x.png" 
            alt="Critical Phoenix Logo" 
            className="max-w-[200px] max-h-[200px] object-contain"
          />
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      {/* Progress bar */}
      {mounted && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-50 origin-left"
          style={{ scaleX }}
        />
      )}
      
      {/* Layout with vertical navbar */}
      <div className="flex">
        {/* Vertical Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <div className="flex-1 w-full">
          {/* Only render components when mounted */}
          {mounted && (
            <>
              <HeroSection />
              <PartnersMarquee />
              <GamesShowcase />
              <TournamentsSection />
            </>
          )}
          
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </main>
  );
}