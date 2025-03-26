/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';

// Announcement data types
const announcements = [
  {
    id: 1,
    type: 'event',
    title: 'Global Esports Championship 2025',
    date: '2025-07-15',
    category: 'Tournament',
    image: 'https://wallpapershigh.com/wp-content/uploads/valorant-fortnite-1.webp',
    shortDescription: 'Join the biggest international esports tournament with $500,000 prize pool across multiple games.',
    tags: ['#GlobalEsports', '#Tournament2025']
  },
  {
    id: 2,
    type: 'community',
    title: 'New Discord Community Launch',
    date: '2025-03-20',
    category: 'Community',
    image: 'https://wallpapercave.com/wp/wp6690757.jpg',
    shortDescription: 'We\'ve launched our official Discord server! Connect with gamers, find teammates, and stay updated.',
    tags: ['#GamingCommunity', '#Discord']
  },
  {
    id: 3,
    type: 'update',
    title: 'Major BGMI Gameplay Update',
    date: '2025-02-10',
    category: 'Game Update',
    image: 'https://i.ytimg.com/vi/ClegOGmMq2U/maxresdefault.jpg',
    shortDescription: 'New map, weapons, and gameplay mechanics introduced in the latest BGMI update.',
    tags: ['#BGMI', '#GameUpdate']
  },
  {
    id: 4,
    type: 'recruitment',
    title: 'Pro Team Recruitment Open',
    date: '2025-04-05',
    category: 'Opportunities',
    image: 'https://wallpapers.com/images/hd/valorant-1920x1080-qhd4j25dux1bljvl.jpg',
    shortDescription: 'Top esports organizations looking for talented gamers. Application process now open!',
    tags: ['#ProGaming', '#Recruitment']
  },
  {
    id: 5,
    type: 'content',
    title: 'Streaming Creator Program Launched',
    date: '2025-01-25',
    category: 'Content Creator',
    image: 'https://www.dexerto.com/cdn-image/wp-content/uploads/2024/04/16/valorant-update-8-07-patch-notes.jpg?width=3840&quality=75&format=auto',
    shortDescription: 'New partnership program for content creators. Monetize your gaming content and grow your audience.',
    tags: ['#StreamingLife', '#CreatorProgram']
  }
];

const AnnouncementsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Accent color
  const accentColor = "#f77644";

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

  // Filter and search logic
  const filteredAnnouncements = announcements.filter(announcement => {
    const matchesSearch = 
      announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      announcement.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFilter = 
      activeFilter === 'all' || 
      announcement.type === activeFilter;

    return matchesSearch && matchesFilter;
  });

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
                src="https://eslpro.imgix.net/tour/wp-content/uploads/2023/08/mood-20230804_Adela-Sznajder_IEM-Cologne_02713-Enhanced-NR.jpg?auto=format%2Ccompress" 
                alt="Gaming Community Announcements" 
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
                  GAMING <span style={{ color: accentColor }}>ANNOUNCEMENTS</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mb-8"
                >
                  Stay Informed. Stay Connected. Be Part of the Gaming Revolution.
                </motion.p>
              </div>
            </motion.div>

            {/* Announcements Section */}
            <div className="container mx-auto px-4 py-4">
              {/* Filters and Search */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-12"
              >
                {/* Announcement Type Filters */}
                <div className="flex overflow-x-auto space-x-3 md:space-x-0 md:overflow-visible border-b border-gray-800 pb-1 scrollbar-hide">
                  {['all', 'event', 'community', 'update', 'recruitment', 'content'].map((filter) => (
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
                          layoutId="activeAnnouncementBar"
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
                    placeholder="Search announcements, tags, or descriptions..."
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

              {/* Announcements Grid */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredAnnouncements.map((announcement) => (
                  <motion.div
                    key={announcement.id}
                    className="bg-gray-900 rounded-lg overflow-hidden relative group"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.2 },
                      border: `1px solid ${accentColor}`
                    }}
                  >
                    {/* Announcement Image */}
                    <div className="h-48 relative overflow-hidden">
                      <img
                        src={announcement.image}
                        alt={announcement.title}
                        className="absolute w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      
                      {/* Category Badge */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <div 
                          className="bg-black text-white px-2 py-1 text-xs font-medium"
                          style={{ borderLeft: `2px solid ${accentColor}` }}
                        >
                          {announcement.category}
                        </div>
                      </div>
                    </div>
                    
                    {/* Announcement Details */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-white mb-3 line-clamp-1">
                        {announcement.title}
                      </h3>
                      
                      {/* Description */}
                      <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                        {announcement.shortDescription}
                      </p>
                      
                      {/* Tags and Date */}
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex space-x-2">
                          {announcement.tags.slice(0, 2).map((tag) => (
                            <span 
                              key={tag} 
                              className="text-xs bg-black text-gray-300 px-2 py-1 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(announcement.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      {/* Read More Button */}
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
                        <span>READ MORE</span>
                        <svg 
                          className="ml-2 w-3.5 h-3.5" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path 
                            d="M5 12H19M19 12L12 5M19 12L12 19" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* No Results State */}
              {filteredAnnouncements.length === 0 && (
                <div className="text-center py-16 bg-gray-900 rounded my-8">
                  <svg 
                    className="mx-auto w-12 h-12 text-gray-700 mb-3" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="1.5" 
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                    />
                  </svg>
                  <h3 className="text-lg text-white font-medium mb-1">No announcements found</h3>
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

export default AnnouncementsPage;