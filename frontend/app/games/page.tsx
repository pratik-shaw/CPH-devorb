/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Game data with more details
const games = [
  {
    id: 1,
    title: 'Battlegrounds Mobile India (BGMI)',
    genre: 'Battle Royale',
    poster: 'https://wallpaperaccess.com/full/6163542.jpg',
    players: '50M+',
    platforms: ['Mobile', 'Android', 'iOS'],
    description: 'The ultimate battle royale experience with intense multiplayer action and strategic gameplay.'
  },
  {
    id: 2,
    title: 'Valorant',
    genre: 'Tactical Shooter',
    poster: 'https://wallpaperaccess.com/full/3037905.jpg',
    players: '25M+',
    platforms: ['PC', 'Console'],
    description: 'Tactical team-based shooter with unique agent abilities and precise gunplay.'
  },
  {
    id: 3,
    title: 'League of Legends',
    genre: 'MOBA',
    poster: 'https://th.bing.com/th/id/OIP.qTZuguiBfSke0MzHAu-DoAHaEo?rs=1&pid=ImgDetMain',
    players: '180M+',
    platforms: ['PC'],
    description: 'Competitive multiplayer online battle arena with strategic team-based gameplay.'
  },
  {
    id: 4,
    title: 'Counter-Strike 2',
    genre: 'FPS',
    poster: 'https://th.bing.com/th/id/OIP.zy7Uxf4cYLufwWzXi_-VWAHaEK?w=328&h=184&c=7&r=0&o=5&dpr=2&pid=1.7',
    players: '35M+',
    platforms: ['PC', 'Steam'],
    description: 'Classic tactical first-person shooter with competitive multiplayer modes.'
  },
  {
    id: 5,
    title: 'Dota 2',
    genre: 'MOBA',
    poster: 'https://wallpaperaccess.com/full/671214.jpg',
    players: '90M+',
    platforms: ['PC'],
    description: 'Complex and strategic multiplayer online battle arena with deep gameplay mechanics.'
  }
];

const GamesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleGames, setVisibleGames] = useState(games);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Accent color
  const accentColor = "#f77644";

  // Process games based on search and filter criteria
  const processedGames = () => {
    const filtered = games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.genre.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === 'all' || 
                            game.platforms.some(platform => platform.toLowerCase() === activeFilter);
      
      return matchesSearch && matchesFilter;
    });

    return filtered;
  };

  // Update visible games when search or filter changes
  useEffect(() => {
    const processed = processedGames();
    setVisibleGames(processed);
  }, [searchQuery, activeFilter]);

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
                src="https://th.bing.com/th/id/R.94810e38e5c20e84f81f6bf62b397a67?rik=FyWTLZ0J51ASsQ&riu=http%3a%2f%2fgetwallpapers.com%2fwallpaper%2ffull%2f1%2f6%2f0%2f498975.jpg&ehk=gShGzys%2f1YAxyMNWNnbmUH%2bYeYy2dgquEVL4jkXY6uc%3d&risl=&pid=ImgRaw&r=0" 
                alt="Esports Gaming Background" 
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
                  GAMING <span style={{ color: accentColor }}>UNIVERSE</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mb-8"
                >
                  Explore the Most Exciting Games from Around the Globe
                </motion.p>
              </div>
            </motion.div>

            {/* Games Section */}
            <div className="container mx-auto px-4 py-4">
              {/* Filter and Search Controls */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                {/* Platform Filter Tabs */}
                <div className="flex overflow-x-auto space-x-3 md:space-x-0 md:overflow-visible border-b border-gray-800 pb-1 scrollbar-hide">
                  {['all', 'mobile', 'pc', 'console'].map((filter) => (
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
                      {filter.toUpperCase()}
                      {activeFilter === filter && (
                        <motion.div 
                          layoutId="activePlatformBar"
                          className="absolute bottom-0 left-0 h-0.5 w-full"
                          style={{ backgroundColor: accentColor }}
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Search Control */}
                <div className="relative w-full bg-gray-900 rounded overflow-hidden border border-transparent hover:border-orange-500 transition-all duration-200 mt-8">
                  <input
                    type="text"
                    placeholder="Search games by name or genre..."
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
              </motion.div>

              {/* Games Grid */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleGames.map((game) => (
                  <motion.div
                    key={game.id}
                    className="bg-gray-900 rounded overflow-hidden relative group"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 },
                      border: `1px solid ${accentColor}`
                    }}
                  >
                    {/* Game image with responsive sizing */}
                    <div className="h-56 relative overflow-hidden">
                      <img
                        src={game.poster}
                        alt={game.title}
                        className="absolute w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      
                      {/* Genre badge */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <div className="bg-black text-white px-2 py-1 text-xs font-medium" style={{ borderLeft: `2px solid ${accentColor}` }}>
                          {game.genre}
                        </div>
                      </div>
                    </div>
                    
                    {/* Game details */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-white mb-3 line-clamp-1">{game.title}</h3>
                      
                      {/* Description */}
                      <p className="text-xs text-gray-400 mb-4 line-clamp-2">{game.description}</p>
                      
                      {/* Info grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-black p-2.5 rounded">
                          <p className="text-xs text-gray-400 mb-1">PLAYERS</p>
                          <p className="text-base font-bold text-white">{game.players}</p>
                        </div>
                        <div className="bg-black p-2.5 rounded">
                          <p className="text-xs text-gray-400 mb-1">PLATFORMS</p>
                          <p className="text-sm text-white line-clamp-1">
                            {game.platforms.join(', ')}
                          </p>
                        </div>
                      </div>
                      
                      {/* Explore button */}
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
                        <span>EXPLORE GAME</span>
                        <svg className="ml-2 w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* No Results State */}
              {visibleGames.length === 0 && (
                <div className="text-center py-16 bg-gray-900 rounded my-8">
                  <svg className="mx-auto w-12 h-12 text-gray-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg text-white font-medium mb-1">No games found</h3>
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

export default GamesPage;