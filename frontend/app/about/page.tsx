/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

type TeamMember = {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Arijit Mondal',
    role: 'Founder & CEO',
    image: 'https://criticalphoenix.in/public/cph-1@2x.png',
    bio: 'Visionary entrepreneur with a passion for esports and digital innovation.'
  },
  {
    id: 2,
    name: 'Pritam Nandi',
    role: 'Co-Founder',
    image: 'https://criticalphoenix.in/public/cph-1@2x.png',
    bio: 'Expert in strategic planning and team management in the esports ecosystem.'
  },
  {
    id: 3,
    name: 'Ana Sultan',
    role: 'Marketing Head',
    image: 'https://criticalphoenix.in/public/cph-1@2x.png',
    bio: 'Former professional gamer with deep insights into competitive gaming landscapes.'
  }
];

const AboutPage: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const accentColor = "#f77644";

  // Loading screen effect
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setMounted(true);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(loadTimer);
  }, []);

  // Loading screen
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
    <div className="bg-black min-h-screen text-white flex flex-col">
      <div className="flex flex-1 relative">
        <Navbar />

        <div className="flex-1 w-full md:ml-16 lg:ml-64 flex flex-col">
          <main className="flex-grow">
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
            >
              <img 
                src="https://dotesports.com/wp-content/uploads/2023/07/all-lol-teams-qualified-for-the-2023-league-of-legends-world-championship.jpg" 
                alt="About Us Background" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black"></div>
              <div className="relative z-20 text-center px-4">
                <motion.h1 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="text-4xl md:text-6xl font-bold mb-6"
                >
                  ABOUT <span style={{ color: accentColor }}>CRITICAL PHOENIX</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mb-8"
                >
                  Empowering Esports Through Innovation, Community, and Passion
                </motion.p>
              </div>
            </motion.div>

            {/* About Content */}
            <div className="container mx-auto px-4 py-12">
              {/* Our Story Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: accentColor }}>
                  YEARLY GROWTH
                </h2>
                <div className="space-y-8">
                  <div className="text-center gap-8 items-center">
                    <div>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        Critical Phoenix emerged from a passion for esports and a vision to transform the competitive gaming landscape. Founded by industry veterans, we believe in nurturing talent, creating sustainable ecosystems, and pushing the boundaries of digital entertainment.
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        Our mission is to provide world-class platforms, tournaments, and opportunities that empower gamers to reach their full potential.
                      </p>
                    </div>
                  </div>

                  <div className="w-full">
                    <img 
                      src="https://criticalphoenix.in/public/clggraph.png" 
                      alt="Community Growth Graph" 
                      className="w-full h-auto object-cover rounded-lg border-2 hover:border-orange-500 transition-all duration-300"
                    />
                    <img 
                      src="https://criticalphoenix.in/public/yearlygraph.png" 
                      alt="Yearly Growth Graph" 
                      className="w-full h-auto object-cover rounded-lg border-2 hover:border-orange-500 transition-all duration-300 mt-4"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Team Members Section */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mb-16"
              >
                <h2 className="text-3xl font-bold mb-12 text-center" style={{ color: accentColor }}>
                  Our Leadership
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {teamMembers.map((member) => (
                    <motion.div
                      key={member.id}
                      className="bg-gray-900 rounded overflow-hidden relative group"
                      whileHover={{ 
                        scale: 1.05,
                        transition: { duration: 0.2 },
                        border: `1px solid ${accentColor}`
                      }}
                    >
                      <div className="h-64 relative overflow-hidden">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="absolute w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      </div>
                      
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                        <p className="text-sm text-gray-400 mb-3" style={{ color: accentColor }}>{member.role}</p>
                        <p className="text-gray-300 text-sm">{member.bio}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;