/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

type LeaderboardEntry = { 
  id: number; 
  name: string; 
  game: string; 
  team: string; 
  rank: number;
  points: number;
  wins: number;
  avatar: string;
};

// Leaderboard data
const leaderboardData: LeaderboardEntry[] = [
  {
    id: 1,
    name: 'Phoenix "Ace" Rodriguez',
    game: 'VALORANT',
    team: 'Critical Phoenix',
    rank: 1,
    points: 2850,
    wins: 87,
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: 2,
    name: 'Luna "StarShot" Chen',
    game: 'CS:GO',
    team: 'Quantum Surge',
    rank: 2,
    points: 2720,
    wins: 82,
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: 3,
    name: 'Kai "Shadow" Wong',
    game: 'Free Fire',
    team: 'Phantom Elite',
    rank: 3,
    points: 2650,
    wins: 79,
    avatar: 'https://randomuser.me/api/portraits/men/86.jpg'
  },
  {
    id: 4,
    name: 'Emma "Thunderbolt" Garcia',
    game: 'League of Legends',
    team: 'Celestial Riders',
    rank: 4,
    points: 2550,
    wins: 76,
    avatar: 'https://randomuser.me/api/portraits/women/79.jpg'
  },
  {
    id: 5,
    name: 'Zain "Phantom" Ali',
    game: 'BGMI',
    team: 'Storm Breakers',
    rank: 5,
    points: 2480,
    wins: 73,
    avatar: 'https://randomuser.me/api/portraits/men/28.jpg'
  },
  {
    id: 6,
    name: 'Olivia "Sniper" Kim',
    game: 'CS:GO',
    team: 'Apex Titans',
    rank: 6,
    points: 2420,
    wins: 70,
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
  },
  {
    id: 7,
    name: 'Rafael "Blaze" Santos',
    game: 'VALORANT',
    team: 'Quantum Surge',
    rank: 7,
    points: 2380,
    wins: 68,
    avatar: 'https://randomuser.me/api/portraits/men/57.jpg'
  },
  {
    id: 8,
    name: 'Aria "Phoenix" Patel',
    game: 'League of Legends',
    team: 'Critical Phoenix',
    rank: 8,
    points: 2320,
    wins: 65,
    avatar: 'https://randomuser.me/api/portraits/women/55.jpg'
  }
];

const LeaderboardsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortBy, setSortBy] = useState('points');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [visibleLeaderboard, setVisibleLeaderboard] = useState<LeaderboardEntry[]>(leaderboardData);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Accent color
  const accentColor = "#f77644";

  // Process leaderboard based on search, sort, and filter criteria
  const processedLeaderboard = (): LeaderboardEntry[] => {
    const filtered = leaderboardData.filter(entry => {
      const matchesSearch = entry.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           entry.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           entry.game.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === 'all' || 
                           entry.game.toLowerCase() === activeFilter.toLowerCase();
      
      return matchesSearch && matchesFilter;
    });

    return [...filtered].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'points':
          comparison = b.points - a.points;
          break;
        case 'wins':
          comparison = b.wins - a.wins;
          break;
        case 'rank':
          comparison = a.rank - b.rank;
          break;
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
      }
      return sortDirection === 'desc' ? comparison : -comparison;
    });
  };

  // Update visible leaderboard when search, sort, or filter changes
  useEffect(() => {
    const processed = processedLeaderboard();
    setVisibleLeaderboard(processed);
  }, [searchQuery, sortBy, activeFilter, sortDirection]);

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

  // Get unique games for filtering
  const gameFilters = ['all', ...new Set(leaderboardData.map(entry => entry.game))];

  // Handle column sorting
  const handleSort = (column: string) => {
    if (sortBy === column) {
      // If already sorting by this column, switch direction
      setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc');
    } else {
      // If sorting by a new column, default to descending
      setSortBy(column);
      setSortDirection('desc');
    }
  };

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
                src="https://i.ytimg.com/vi/TgYwtir7lic/maxresdefault.jpg" 
                alt="Esports Leaderboards" 
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
                  GLOBAL <span style={{ color: accentColor }}>LEADERBOARDS</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mb-8"
                >
                  Discover the Top Players Dominating the Esports Arena
                </motion.p>
              </div>
            </motion.div>

            {/* Leaderboards Section - Full Mobile Responsiveness */}
            <div className="container mx-auto px-4 py-4">
              {/* Filter and Search Controls - Mobile Optimized */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                {/* Game Filter Tabs - Horizontal Scroll on Mobile */}
                <div className="flex overflow-x-auto space-x-3 md:space-x-0 md:overflow-visible border-b border-gray-800 pb-1 scrollbar-hide">
                  {gameFilters.map((filter) => (
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
                      placeholder="Search players, teams, or games..."
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
                </div>
              </motion.div>

              {/* Leaderboard Table - Responsive */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full overflow-x-auto"
              >
                <table className="w-full border-collapse bg-gray-900">
                  <thead>
                    <tr className="bg-black text-gray-400">
                      <th 
                        className="p-3 text-left cursor-pointer hover:bg-gray-800"
                        onClick={() => handleSort('rank')}
                      >
                        <div className="flex items-center">
                          Rank
                          {sortBy === 'rank' && (
                            <span className="ml-2">
                              {sortDirection === 'desc' ? '▼' : '▲'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-3 text-left cursor-pointer hover:bg-gray-800"
                        onClick={() => handleSort('name')}
                      >
                        <div className="flex items-center">
                          Player
                          {sortBy === 'name' && (
                            <span className="ml-2">
                              {sortDirection === 'desc' ? '▼' : '▲'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-3 text-left cursor-pointer hover:bg-gray-800"
                        onClick={() => handleSort('game')}
                      >
                        <div className="flex items-center">
                          Game
                          {sortBy === 'game' && (
                            <span className="ml-2">
                              {sortDirection === 'desc' ? '▼' : '▲'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-3 text-left cursor-pointer hover:bg-gray-800"
                        onClick={() => handleSort('team')}
                      >
                        <div className="flex items-center">
                          Team
                          {sortBy === 'team' && (
                            <span className="ml-2">
                              {sortDirection === 'desc' ? '▼' : '▲'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-3 text-left cursor-pointer hover:bg-gray-800"
                        onClick={() => handleSort('points')}
                      >
                        <div className="flex items-center">
                          Points
                          {sortBy === 'points' && (
                            <span className="ml-2">
                              {sortDirection === 'desc' ? '▼' : '▲'}
                            </span>
                          )}
                        </div>
                      </th>
                      <th 
                        className="p-3 text-left cursor-pointer hover:bg-gray-800"
                        onClick={() => handleSort('wins')}
                      >
                        <div className="flex items-center">
                          Wins
                          {sortBy === 'wins' && (
                            <span className="ml-2">
                              {sortDirection === 'desc' ? '▼' : '▲'}
                            </span>
                          )}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleLeaderboard.map((entry) => (
                      <tr 
                        key={entry.id} 
                        className="border-b border-gray-800 hover:bg-gray-800 transition-colors"
                      >
                        <td className="p-3">
                          <div 
                            className="w-8 h-8 rounded-full flex items-center justify-center font-bold"
                            style={{ 
                              backgroundColor: accentColor,
                              color: 'white'
                            }}
                          >
                            {entry.rank}
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center">
                            <img 
                              src={entry.avatar} 
                              alt={entry.name} 
                              className="w-10 h-10 rounded-full mr-3 object-cover"
                            />
                            <div>
                              <div className="font-bold">{entry.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{entry.game}</td>
                        <td className="p-3">{entry.team}</td>
                        <td className="p-3 font-bold" style={{ color: accentColor }}>{entry.points}</td>
                        <td className="p-3">{entry.wins}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>

              {/* No Results State */}
              {visibleLeaderboard.length === 0 && (
                <div className="text-center py-16 bg-gray-900 rounded my-8">
                  <svg className="mx-auto w-12 h-12 text-gray-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg text-white font-medium mb-1">No players found</h3>
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

export default LeaderboardsPage;