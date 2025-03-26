/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

type Tournament = { 
  id: number; 
  title: string; 
  game: string; 
  poster: string; 
  prize: string; 
  date: string; 
  participants: number; 
  status: string; 
};

// Tournament data (unchanged from previous version)
const tournaments = [
    { 
      id: 1, 
      title: 'BGMI Pro League Season 5', 
      game: 'BGMI', 
      poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FSmall%2520Banner-de510037-1c22-4ba7-a3e8-968bb03d7384.png&w=3840&q=75',
      prize: '$50,000',
      date: '2025-04-15',
      participants: 128,
      status: 'Upcoming'
    },
    { 
      id: 2, 
      title: 'Free Fire World Series', 
      game: 'Free Fire', 
      poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FSmall%2520Banner-de510037-1c22-4ba7-a3e8-968bb03d7384.png&w=3840&q=75',
      prize: '$100,000',
      date: '2025-05-20',
      participants: 256,
      status: 'Registration Open'
    },
    { 
      id: 3, 
      title: 'VALORANT Champions League', 
      game: 'Valorant', 
      poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FSmall%2520Banner-de510037-1c22-4ba7-a3e8-968bb03d7384.png&w=3840&q=75',
      prize: '$75,000',
      date: '2025-03-10',
      participants: 64,
      status: 'Live'
    },
    { 
      id: 4, 
      title: 'CS:GO Masters Tournament', 
      game: 'CS:GO', 
      poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FSmall%2520Banner-de510037-1c22-4ba7-a3e8-968bb03d7384.png&w=3840&q=75',
      prize: '$90,000',
      date: '2025-06-05',
      participants: 128,
      status: 'Upcoming'
    },
    { 
      id: 5, 
      title: 'League of Legends Global Series', 
      game: 'League of Legends', 
      poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FSmall%2520Banner-de510037-1c22-4ba7-a3e8-968bb03d7384.png&w=3840&q=75',
      prize: '$150,000',
      date: '2025-04-25',
      participants: 192,
      status: 'Registration Open'
    }
  ];

  const TournamentsPage: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');
    const [visibleTournaments, setVisibleTournaments] = useState<Tournament[]>(tournaments);
    const [isShowingAll, setIsShowingAll] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  
    // Accent color
    const accentColor = "#f77644";
  
    // Process tournaments based on search, sort, and filter criteria
    const processedTournaments = (): Tournament[] => {
      const filtered = tournaments.filter(tournament => {
        const matchesSearch = tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             tournament.game.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesFilter = activeFilter === 'all' || 
                             (activeFilter === 'live' && tournament.status === 'Live') ||
                             (activeFilter === 'registration' && tournament.status === 'Registration Open') ||
                             (activeFilter === 'upcoming' && tournament.status === 'Upcoming');
        
        return matchesSearch && matchesFilter;
      });
  
      return [...filtered].sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else if (sortBy === 'prize') {
          return parseInt(b.prize.replace(/\D/g, '')) - parseInt(a.prize.replace(/\D/g, ''));
        } else if (sortBy === 'participants') {
          return b.participants - a.participants;
        }
        return 0;
      });
    };
  
    // Update visible tournaments when search, sort, or filter changes
    useEffect(() => {
      const processed = processedTournaments();
      setVisibleTournaments(processed);
    }, [searchQuery, sortBy, activeFilter]);
  
    // Loading screen effect
    useEffect(() => {
      const loadTimer = setTimeout(() => {
        setMounted(true);
        setIsLoading(false);
      }, 2000); // 2 seconds loading time
  
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
        {/* Mobile-friendly Navbar */}
        <Navbar />

        {/* Main Content Area - Fully Responsive */}
        <div className="flex-1 w-full md:ml-16 lg:ml-64 flex flex-col">
          <main className="flex-grow">
            {/* Hero Section - Mobile Responsive */}
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
            >
              <img 
                src="https://dotesports.com/wp-content/uploads/2023/07/all-lol-teams-qualified-for-the-2023-league-of-legends-world-championship.jpg" 
                alt="Esports Tournament Background" 
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
                  ESPORTS <span style={{ color: accentColor }}>TOURNAMENTS</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mb-8"
                >
                  Compete, Conquer, and Claim Your Glory in the Most Epic Esports Battles
                </motion.p>
              </div>
            </motion.div>

            {/* Tournaments Section - Full Mobile Responsiveness */}
            <div className="container mx-auto px-4 py-4">
              {/* Filter and Search Controls - Mobile Optimized */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                {/* Status Filter Tabs - Horizontal Scroll on Mobile */}
                <div className="flex overflow-x-auto space-x-3 md:space-x-0 md:overflow-visible border-b border-gray-800 pb-1 scrollbar-hide">
                  {['all', 'live', 'registration', 'upcoming'].map((filter) => (
                    <motion.button
                      key={filter}
                      className={`px-4 py-3 text-xs md:text-sm font-medium whitespace-nowrap relative ${
                        activeFilter === filter 
                          ? 'text-white' 
                          : 'text-gray-400 hover:text-gray-300'
                      }`}
                      onClick={() => setActiveFilter(filter)}
                      whileTap={{ scale: 0.95 }}
                    >
                      {filter.toUpperCase().replace('_', ' ')}
                      {activeFilter === filter && (
                        <motion.div 
                          layoutId="activeFilterBar"
                          className="absolute bottom-0 left-0 h-0.5 w-full"
                          style={{ backgroundColor: accentColor }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Search and Sort Controls - Stacked on Mobile */}
                <div className="flex flex-col gap-4 mt-8 mb-10">
                  <div className="relative w-full bg-gray-900 rounded overflow-hidden border border-transparent hover:border-orange-500 transition-all duration-200">
                    <input
                      type="text"
                      placeholder="Search tournaments by name or game..."
                      className="w-full bg-transparent text-white py-3 px-4 pl-10 focus:outline-none text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2" 
                      width="16" 
                      height="16" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path 
                        d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                        stroke="white" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div className="relative w-full bg-gray-900 rounded overflow-hidden border border-transparent hover:border-orange-500 transition-all duration-200">
                    <select
                      className="w-full bg-transparent text-white py-3 px-4 appearance-none focus:outline-none text-sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="date">Sort by Date</option>
                      <option value="prize">Sort by Prize Pool</option>
                      <option value="participants">Sort by Participants</option>
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Tournaments Grid - Flexible Columns */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleTournaments.map((tournament) => (
                  <motion.div
                    key={tournament.id}
                    className="bg-gray-900 rounded overflow-hidden relative group"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 },
                      border: `1px solid ${accentColor}`
                    }}
                  >
                    {/* Tournament card content remains the same */}
                    {/* Status indicator */}
                    {tournament.status === 'Live' && (
                      <div className="absolute top-3 right-3 z-20 bg-white rounded-sm px-2 py-1 flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping mr-1.5"></div>
                        <span className="text-xs text-black font-medium tracking-wide">LIVE</span>
                      </div>
                    )}
                    {tournament.status === 'Registration Open' && (
                      <div className="absolute top-3 right-3 z-20 bg-white rounded-sm px-2 py-1">
                        <span className="text-xs text-black font-medium tracking-wide">REGISTRATION</span>
                      </div>
                    )}
                    {tournament.status === 'Upcoming' && (
                      <div className="absolute top-3 right-3 z-20 bg-white rounded-sm px-2 py-1">
                        <span className="text-xs text-black font-medium tracking-wide">UPCOMING</span>
                      </div>
                    )}

                    {/* Tournament image with responsive sizing */}
                    <div className="h-40 relative overflow-hidden">
                      <img
                        src={tournament.poster}
                        alt={tournament.title}
                        className="absolute w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      
                      {/* Game badge */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <div className="bg-black text-white px-2 py-1 text-xs font-medium" style={{ borderLeft: `2px solid ${accentColor}` }}>
                          {tournament.game}
                        </div>
                      </div>
                    </div>
                    
                    {/* Tournament details */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-white mb-3 line-clamp-1">{tournament.title}</h3>
                      
                      {/* Info grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-black p-2.5 rounded">
                          <p className="text-xs text-gray-400 mb-1">PRIZE POOL</p>
                          <p className="text-base font-bold text-white">{tournament.prize}</p>
                        </div>
                        <div className="bg-black p-2.5 rounded">
                          <p className="text-xs text-gray-400 mb-1">DATE</p>
                          <p className="text-sm text-white">
                            {new Date(tournament.date).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      
                      {/* Participants */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-400">PARTICIPANTS</span>
                          <span className="text-white">{tournament.participants} Teams</span>
                        </div>
                        <div className="w-full h-1.5 bg-black rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full"
                            style={{ 
                              width: `${Math.min(100, (tournament.participants/150)*100)}%`,
                              backgroundColor: accentColor 
                            }}
                          ></div>
                        </div>
                      </div>
                      
                      {/* Register button */}
                      <motion.button
                        className="w-full py-2.5 text-white font-medium text-sm flex items-center justify-center transition-colors duration-200"
                        style={{ 
                          backgroundColor: 'black',
                          border: `1px solid ${accentColor}`
                        }}
                        whileHover={{ 
                          backgroundColor: accentColor,
                          color: 'white'
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span>REGISTER NOW</span>
                        <svg className="ml-2 w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* No Results State */}
              {visibleTournaments.length === 0 && (
                <div className="text-center py-16 bg-gray-900 rounded my-8">
                  <svg className="mx-auto w-12 h-12 text-gray-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg text-white font-medium mb-1">No tournaments found</h3>
                  <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TournamentsPage;