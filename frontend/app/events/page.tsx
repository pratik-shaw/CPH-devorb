/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Event data structure
interface GamingEvent {
  id: number;
  title: string;
  date: string;
  location: string;
  type: 'Tournament' | 'Convention' | 'Livestream' | 'Launch';
  game?: string;
  description: string;
  poster: string;
  prize?: string;
  registrationLink?: string;
}

// Sample Events Data
const events: GamingEvent[] = [
  {
    id: 1,
    title: 'VALORANT Champions 2024',
    date: 'August 15-25, 2024',
    location: 'Los Angeles, USA',
    type: 'Tournament',
    game: 'Valorant',
    description: 'The ultimate global championship for Valorant esports featuring top teams from around the world.',
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FMain%2520Banner-5992a965-6ef1-4308-8543-3efee44c4758.png&w=640&q=75',
    prize: '$2,000,000',
    registrationLink: '#'
  },
  {
    id: 2,
    title: 'League of Legends World Championship',
    date: 'October 5-19, 2024',
    location: 'Seoul, South Korea',
    type: 'Tournament',
    game: 'League of Legends',
    description: 'The pinnacle of competitive League of Legends, where global teams battle for supremacy.',
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FGeneric%2520Banner%2520-%2520Alienware%2520x%2520Intel-571b3f81-5d08-4428-98dd-7374b1b328b3.png&w=640&q=75',
    prize: '$2,500,000',
    registrationLink: '#'
  },
  {
    id: 3,
    title: 'PAX East 2025',
    date: 'February 27 - March 1, 2025',
    location: 'Boston, MA, USA',
    type: 'Convention',
    description: 'The premier gaming and tabletop gaming conference, showcasing the latest in gaming innovation.',
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FMain%2520Banner%2520%25286%2529-d25b38e2-5adc-4b2d-beef-5aedddc80e82.png&w=640&q=75',
    registrationLink: '#'
  },
  {
    id: 4,
    title: 'CS2 Global Series',
    date: 'September 10-20, 2024',
    location: 'Berlin, Germany',
    type: 'Tournament',
    game: 'Counter-Strike 2',
    description: 'The most prestigious Counter-Strike 2 international tournament featuring elite teams.',
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FMain%2520Banner-b991e120-cb4c-4d3e-986e-ca715f2fc384.png&w=640&q=75',
    prize: '$1,500,000',
    registrationLink: '#'
  },
  {
    id: 5,
    title: 'Cyberpunk 2077 Expansion Livestream',
    date: 'July 15, 2024',
    location: 'Online Event',
    type: 'Livestream',
    game: 'Cyberpunk 2077',
    description: 'Exclusive reveal of the next major expansion for Cyberpunk 2077.',
    poster: 'https://theesports.club/_next/image?url=https%3A%2F%2Fcdn.theesports.club%2FMain%2520Banner%2520%25286%2529-d25b38e2-5adc-4b2d-beef-5aedddc80e82.png&w=640&q=75',
    registrationLink: '#'
  }
];

const EventsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [visibleEvents, setVisibleEvents] = useState(events);
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Accent color
  const accentColor = "#f77644";

  // Process events based on search and filter criteria
  const processedEvents = () => {
    const filtered = events.filter(event => {
      const matchesSearch = 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.game && event.game.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesFilter = activeFilter === 'all' || 
                            event.type.toLowerCase() === activeFilter;
      
      return matchesSearch && matchesFilter;
    });

    return filtered;
  };

  // Update visible events when search or filter changes
  useEffect(() => {
    const processed = processedEvents();
    setVisibleEvents(processed);
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
                src="https://www.gannett-cdn.com/presto/2018/08/23/USAT/351fb7d8-7749-42ea-94f8-7a364bab9b97-666.jpg?crop=4499,2531,x0,y469&width=3200&height=1680&fit=bounds" 
                alt="Gaming Events Background" 
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
                  GAMING <span style={{ color: accentColor }}>EVENTS</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mb-8"
                >
                  Discover the Most Exciting Gaming Events Worldwide
                </motion.p>
              </div>
            </motion.div>

            {/* Events Section */}
            <div className="container mx-auto px-4 py-4">
              {/* Filter and Search Controls */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                {/* Event Type Filter Tabs */}
                <div className="flex overflow-x-auto space-x-3 md:space-x-0 md:overflow-visible border-b border-gray-800 pb-1 scrollbar-hide">
                  {['all', 'tournament', 'convention', 'livestream', 'launch'].map((filter) => (
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
                          layoutId="activeEventBar"
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
                    placeholder="Search events by name, type, or game..."
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

              {/* Events Grid */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {visibleEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    className="bg-gray-900 rounded overflow-hidden relative group"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 },
                      border: `1px solid ${accentColor}`
                    }}
                  >
                    {/* Event image with responsive sizing */}
                    <div className="h-56 relative overflow-hidden">
                      <img
                        src={event.poster}
                        alt={event.title}
                        className="absolute w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      
                      {/* Event Type badge */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <div className="bg-black text-white px-2 py-1 text-xs font-medium" style={{ borderLeft: `2px solid ${accentColor}` }}>
                          {event.type}
                        </div>
                      </div>
                    </div>
                    
                    {/* Event details */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-white mb-3 line-clamp-1">{event.title}</h3>
                      
                      {/* Description */}
                      <p className="text-xs text-gray-400 mb-4 line-clamp-2">{event.description}</p>
                      
                      {/* Event Info Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-black p-2.5 rounded">
                          <p className="text-xs text-gray-400 mb-1">DATE</p>
                          <p className="text-sm font-bold text-white line-clamp-1">{event.date}</p>
                        </div>
                        <div className="bg-black p-2.5 rounded">
                          <p className="text-xs text-gray-400 mb-1">LOCATION</p>
                          <p className="text-sm text-white line-clamp-1">
                            {event.location}
                          </p>
                        </div>
                      </div>
                      
                      {/* Event Prize (if exists) */}
                      {event.prize && (
                        <div className="bg-black p-2.5 rounded mb-4">
                          <p className="text-xs text-gray-400 mb-1">PRIZE POOL</p>
                          <p className="text-base font-bold text-white">{event.prize}</p>
                        </div>
                      )}
                      
                      {/* Register/More Info button */}
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
                        <span>MORE DETAILS</span>
                        <svg className="ml-2 w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* No Results State */}
              {visibleEvents.length === 0 && (
                <div className="text-center py-16 bg-gray-900 rounded my-8">
                  <svg className="mx-auto w-12 h-12 text-gray-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-lg text-white font-medium mb-1">No events found</h3>
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

export default EventsPage;