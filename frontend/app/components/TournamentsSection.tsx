/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Updated tournaments data
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
    title: 'Valorant Masters', 
    game: 'Valorant', 
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FSmall%2520Banner-de510037-1c22-4ba7-a3e8-968bb03d7384.png&w=3840&q=75',
    prize: '$100,000',
    date: '2025-05-10',
    participants: 64,
    status: 'Registration Open'
  },
  { 
    id: 3, 
    title: 'Free Fire World Cup', 
    game: 'Free Fire', 
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FSmall%2520Banner-de510037-1c22-4ba7-a3e8-968bb03d7384.png&w=3840&q=75',
    prize: '$75,000',
    date: '2025-04-28',
    participants: 96,
    status: 'Upcoming'
  },
  { 
    id: 4, 
    title: 'Call of Duty Championship', 
    game: 'Call of Duty', 
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FTournament%2520List%2520Image%2520%252819%2529-7a17ff5a-9f2f-4945-a3e3-ee7c7f160f73.png&w=3840&q=75',
    prize: '$80,000',
    date: '2025-03-25',
    participants: 48,
    status: 'Live'
  },
  { 
    id: 5, 
    title: 'CS:GO Major', 
    game: 'CS:GO', 
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FTournament%2520List%2520Image%2520%252819%2529-7a17ff5a-9f2f-4945-a3e3-ee7c7f160f73.png&w=3840&q=75',
    prize: '$150,000',
    date: '2025-06-15',
    participants: 32,
    status: 'Registration Open'
  },
  { 
    id: 6, 
    title: 'Apex Predator Challenge', 
    game: 'Apex Legends', 
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FSmall%2520Banner-2bd5ee86-38cc-4787-82f8-7600720b5607.png&w=3840&q=75',
    prize: '$60,000',
    date: '2025-04-05',
    participants: 60,
    status: 'Upcoming'
  },
  { 
    id: 7, 
    title: 'Call of Duty Championship', 
    game: 'Call of Duty', 
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FSmall%2520Banner-2bd5ee86-38cc-4787-82f8-7600720b5607.png&w=3840&q=75',
    prize: '$80,000',
    date: '2025-03-25',
    participants: 48,
    status: 'Live'
  },
  { 
    id: 8, 
    title: 'CS:GO Major', 
    game: 'CS:GO', 
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FSmall%2520Banner-2bd5ee86-38cc-4787-82f8-7600720b5607.png&w=3840&q=75',
    prize: '$150,000',
    date: '2025-06-15',
    participants: 32,
    status: 'Registration Open'
  },
  { 
    id: 9, 
    title: 'Apex Predator Challenge', 
    game: 'Apex Legends', 
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FSmall%2520Banner-2bd5ee86-38cc-4787-82f8-7600720b5607.png&w=3840&q=75',
    prize: '$60,000',
    date: '2025-04-05',
    participants: 60,
    status: 'Upcoming'
  },
];

const TournamentsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [isMobile, setIsMobile] = useState(false);
  const [visibleTournaments, setVisibleTournaments] = useState(tournaments.slice(0, 6));
  const [isShowingAll, setIsShowingAll] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Define accent color
  const accentColor = "#f77644";
  // Navbar width for desktop view
  const navbarWidth = 16; // rem (equivalent to 256px with default font size)

  // Check for mobile screen size
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Process tournaments based on search, sort, and filter criteria
  const processedTournaments = () => {
    // Filter tournaments based on search query and active filter
    const filtered = tournaments.filter(tournament => {
      const matchesSearch = tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           tournament.game.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === 'all' || 
                           (activeFilter === 'live' && tournament.status === 'Live') ||
                           (activeFilter === 'registration' && tournament.status === 'Registration Open') ||
                           (activeFilter === 'upcoming' && tournament.status === 'Upcoming');
      
      return matchesSearch && matchesFilter;
    });

    // Sort tournaments based on selected criterion
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

  // Handle load more button
  const handleLoadMore = () => {
    const processed = processedTournaments();
    if (isShowingAll) {
      setVisibleTournaments(processed.slice(0, 6));
    } else {
      setVisibleTournaments(processed);
    }
    setIsShowingAll(!isShowingAll);
  };

  // Update visible tournaments when search, sort, or filter changes
  useEffect(() => {
    const processed = processedTournaments();
    setVisibleTournaments(isShowingAll ? processed : processed.slice(0, 6));
  }, [searchQuery, sortBy, activeFilter, isShowingAll]);

  return (
    <section className="bg-black py-16 md:py-20 overflow-x-hidden">
      {/* Main content container adjusted for navbar */}
      <div className={`ml-0 md:ml-64 px-4 md:px-8 transition-all duration-300`}>
        <div className="max-w-6xl mx-auto">
          {/* Sleek section header with minimal design */}
          <div className="mb-12 md:mb-16">
            <div className="flex items-center mb-3">
              <div className="h-px w-6 bg-gray-700"></div>
              <span className="text-gray-400 mx-3 text-xs uppercase tracking-widest font-medium">Elite Competition</span>
              <div className="h-px w-6 bg-gray-700"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 inline-block relative">
              TOURNAMENTS
              <div className="absolute -bottom-1 left-0 h-1 w-16" style={{ backgroundColor: accentColor }}></div>
            </h2>
            <p className="text-gray-400 max-w-2xl mt-4">
              Enter the arena and prove your skills in our high-stakes tournaments. Compete against elite players and claim your share of massive prize pools.
            </p>
          </div>

          {/* Tournament filter tabs with horizontal scrolling on small screens */}
          <div className="flex overflow-x-auto md:overflow-visible mb-8 border-b border-gray-800 scrollbar-hide pb-1">
            <button 
              className={`px-4 py-3 text-xs md:text-sm font-medium whitespace-nowrap relative ${
                activeFilter === 'all' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              ALL TOURNAMENTS
              {activeFilter === 'all' && 
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 w-full"
                  style={{ backgroundColor: accentColor }}
                  layoutId="activeFilterBar"
                />
              }
            </button>
            <button 
              className={`px-4 py-3 text-xs md:text-sm font-medium whitespace-nowrap relative ${
                activeFilter === 'live' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveFilter('live')}
            >
              LIVE NOW
              {activeFilter === 'live' && 
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 w-full"
                  style={{ backgroundColor: accentColor }}
                  layoutId="activeFilterBar"
                />
              }
            </button>
            <button 
              className={`px-4 py-3 text-xs md:text-sm font-medium whitespace-nowrap relative ${
                activeFilter === 'registration' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveFilter('registration')}
            >
              REGISTRATION OPEN
              {activeFilter === 'registration' && 
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 w-full"
                  style={{ backgroundColor: accentColor }}
                  layoutId="activeFilterBar"
                />
              }
            </button>
            <button 
              className={`px-4 py-3 text-xs md:text-sm font-medium whitespace-nowrap relative ${
                activeFilter === 'upcoming' 
                  ? 'text-white' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveFilter('upcoming')}
            >
              UPCOMING
              {activeFilter === 'upcoming' && 
                <motion.div 
                  className="absolute bottom-0 left-0 h-0.5 w-full"
                  style={{ backgroundColor: accentColor }}
                  layoutId="activeFilterBar"
                />
              }
            </button>
          </div>

          {/* Search and sort controls with responsive adjustments */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            <div className="relative w-full md:w-2/3 bg-gray-900 rounded overflow-hidden">
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

            <div className="relative w-full md:w-1/3 bg-gray-900 rounded overflow-hidden">
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

          {/* Tournament grid with responsive adjustment */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTournaments.map((tournament) => (
              <motion.div
                key={tournament.id}
                className="bg-gray-900 rounded overflow-hidden relative group"
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
              >
                {/* Status indicator with improved positioning and contrast */}
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

                {/* Tournament image with consistent sizing */}
                <div className="h-40 relative overflow-hidden">
                  <img
                    src={tournament.poster}
                    alt={tournament.title}
                    className="absolute w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Game badge with cleaner design */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <div className="bg-black text-white px-2 py-1 text-xs font-medium" style={{ borderLeft: `2px solid ${accentColor}` }}>
                      {tournament.game}
                    </div>
                  </div>
                </div>
                
                {/* Tournament details with improved typography hierarchy */}
                <div className="p-4">
                  <h3 className="text-base font-bold text-white mb-3 line-clamp-1">{tournament.title}</h3>
                  
                  {/* Info grid with more space-efficient layout */}
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
                  
                  {/* Participants with minimal progress bar */}
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
                  
                  {/* Clean, minimal register button */}
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
          </div>

          {/* No results message with cleaner styling */}
          {visibleTournaments.length === 0 && (
            <div className="text-center py-16 bg-gray-900 rounded my-8">
              <svg className="mx-auto w-12 h-12 text-gray-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-lg text-white font-medium mb-1">No tournaments found</h3>
              <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
            </div>
          )}

          {/* Load more button with clean, minimal design */}
          {processedTournaments().length > 6 && (
            <div className="mt-10 text-center">
              <motion.button 
                className="py-2.5 px-6 bg-transparent text-white text-sm border border-gray-700 rounded inline-flex items-center"
                onClick={handleLoadMore}
                whileHover={{ 
                  borderColor: accentColor,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                style={{ 
                  transition: "border-color 0.2s ease" 
                }}
              >
                {isShowingAll ? (
                  <>
                    <span>SHOW LESS</span>
                    <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 15L12 8L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                ) : (
                  <>
                    <span>LOAD MORE</span>
                    <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </motion.button>
            </div>
          )}
        </div>
      </div>

      {/* Add custom style for scrollbar hiding */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default TournamentsSection;