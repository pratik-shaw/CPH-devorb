/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

// Sample games data
const games = [
  { id: 1, name: "BGMI", image: "https://wallpaperaccess.com/full/9650622.jpg", category: "Battle Royale" },
  { id: 2, name: "Valorant", image: "https://th.bing.com/th/id/OIP.I9qxS1F9JWmxh5wRkLKwlwHaNK?w=720&h=1280&rs=1&pid=ImgDetMain", category: "FPS" },
  { id: 3, name: "Free Fire", image: "https://wallpaperaccess.com/full/1077354.jpg", category: "Battle Royale" },
  { id: 4, name: "Call of Duty", image: "https://th.bing.com/th/id/OIP.8v8-xjvIN1_9hkOwi4-WbQHaI0?pid=ImgDet&w=195&h=232&c=7&dpr=2", category: "FPS" },
  { id: 5, name: "CS:GO", image: "https://th.bing.com/th/id/OIP.rz3QbSboXf67t0kqCdKgDgHaNK?rs=1&pid=ImgDetMain", category: "FPS" },
  { id: 6, name: "Apex Legends", image: "https://as2.ftcdn.net/v2/jpg/02/49/94/05/1000_F_249940553_oqWGUggjIcYPvKKiPV8WebUc0sYh9uWn.jpg", category: "Battle Royale" },
  { id: 7, name: "League of Legends", image: "https://as2.ftcdn.net/v2/jpg/06/34/74/87/1000_F_634748769_NEKmAO4jiPhYBEvGSYrmFKBLl7RSAz7k.jpg", category: "MOBA" },
  { id: 8, name: "Fortnite", image: "https://cdn.technadu.com/wp-content/uploads/2021/11/Fortnite-Logo-on-Blue-Background.jpg", category: "Battle Royale" },
];

const GamesShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(240);
  const [visibleCards, setVisibleCards] = useState(4);
  const [isMobile, setIsMobile] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState(games);
  const controls = useAnimation();
  
  // Define accent color to match tournaments section
  const accentColor = "#f77644";

  // Filter games based on search query and active filter
  useEffect(() => {
    const filtered = games.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = activeFilter === 'all' || 
                          (activeFilter === 'battle-royale' && game.category === 'Battle Royale') ||
                          (activeFilter === 'fps' && game.category === 'FPS') ||
                          (activeFilter === 'moba' && game.category === 'MOBA');
      
      return matchesSearch && matchesFilter;
    });
    
    setFilteredGames(filtered);
    setCurrentIndex(0);
    // Reset scroll position
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = 0;
    }
  }, [searchQuery, activeFilter]);

  const scrollToIndex = (index: number) => {
    // Properly handle index bounds
    let targetIndex = index;
    if (targetIndex < 0) {
      targetIndex = 0;
    } else if (targetIndex > filteredGames.length - visibleCards) {
      targetIndex = Math.max(0, filteredGames.length - visibleCards);
    }

    setCurrentIndex(targetIndex);

    if (carouselRef.current) {
      // Use the same smooth scroll for both mobile and desktop
      const scrollPos = targetIndex * (cardWidth + (isMobile ? 16 : 24));
      carouselRef.current.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const windowWidth = window.innerWidth;
      setIsMobile(windowWidth < 768);

      // Calculate visible cards based on screen size
      if (windowWidth >= 1536) {
        setVisibleCards(5);
      } else if (windowWidth >= 1280) {
        setVisibleCards(4);
      } else if (windowWidth >= 768) {
        setVisibleCards(3);
      } else {
        setVisibleCards(1);
      }

      // Adjust card width based on container size
      const navbarWidth = windowWidth < 768 ? 0 : 64;
      const containerWidth = (containerRef.current?.offsetWidth || windowWidth) - navbarWidth;
      const gap = windowWidth < 768 ? 16 : 24;
      const newCardWidth = Math.min(240, (containerWidth - gap * (visibleCards - 1)) / visibleCards);
      setCardWidth(newCardWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visibleCards]);

  return (
    <section className="bg-black py-16 md:py-20 px-4 md:px-8 md:ml-0 lg:ml-16 xl:ml-64">
      <div className="max-w-6xl mx-auto">
        {/* Section title - matching tournaments style */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center mb-3">
            <div className="h-px w-6 bg-gray-700"></div>
            <span className="text-gray-400 mx-3 text-xs uppercase tracking-widest font-medium">Top Competitions</span>
            <div className="h-px w-6 bg-gray-700"></div>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-3 inline-block relative">
            FEATURED GAMES
            <div className="absolute -bottom-1 left-0 h-1 w-16" style={{ backgroundColor: accentColor }}></div>
          </h2>
          <p className="text-gray-400 max-w-2xl mt-4">
            Discover the most popular competitive games across various genres. Each title offers unique gameplay and thrilling esports opportunities.
          </p>
        </div>

        {/* Game filter tabs with horizontal scrolling on small screens */}
        <div className="flex overflow-x-auto md:overflow-visible mb-8 border-b border-gray-800 scrollbar-hide pb-1">
          <button 
            className={`px-4 py-3 text-xs md:text-sm font-medium whitespace-nowrap relative ${
              activeFilter === 'all' 
                ? 'text-white' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveFilter('all')}
          >
            ALL GAMES
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
              activeFilter === 'battle-royale' 
                ? 'text-white' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveFilter('battle-royale')}
          >
            BATTLE ROYALE
            {activeFilter === 'battle-royale' && 
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 w-full"
                style={{ backgroundColor: accentColor }}
                layoutId="activeFilterBar"
              />
            }
          </button>
          <button 
            className={`px-4 py-3 text-xs md:text-sm font-medium whitespace-nowrap relative ${
              activeFilter === 'fps' 
                ? 'text-white' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveFilter('fps')}
          >
            FPS
            {activeFilter === 'fps' && 
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 w-full"
                style={{ backgroundColor: accentColor }}
                layoutId="activeFilterBar"
              />
            }
          </button>
          <button 
            className={`px-4 py-3 text-xs md:text-sm font-medium whitespace-nowrap relative ${
              activeFilter === 'moba' 
                ? 'text-white' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveFilter('moba')}
          >
            MOBA
            {activeFilter === 'moba' && 
              <motion.div 
                className="absolute bottom-0 left-0 h-0.5 w-full"
                style={{ backgroundColor: accentColor }}
                layoutId="activeFilterBar"
              />
            }
          </button>
        </div>

        {/* Search control matching tournaments style */}
        <div className="mb-10">
          <div className="relative w-full bg-gray-900 rounded overflow-hidden">
            <input
              type="text"
              placeholder="Search games by name or category..."
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

        <div className="relative">
          {/* Previous arrow button - now visible on all devices */}
          <button
            className={`absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-gray-900 p-3 md:p-4 rounded-r-lg border hover:bg-gray-800 transition-all duration-300 focus:outline-none ${
              filteredGames.length <= visibleCards || currentIndex <= 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={filteredGames.length <= visibleCards || currentIndex <= 0}
            aria-label="Previous games"
            style={{ borderColor: accentColor }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M15 18L9 12L15 6" 
                stroke={accentColor}
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </button>

          {/* Games container with unified approach for both mobile and desktop */}
          <div 
            className="overflow-hidden mx-2 md:mx-12" 
            ref={containerRef}
          >
            {filteredGames.length > 0 ? (
              <div 
                ref={carouselRef}
                className="flex gap-4 md:gap-6 overflow-x-hidden scroll-smooth"
                style={{
                  scrollBehavior: 'smooth',
                }}
              >
                {filteredGames.map((game) => (
                  <div
                    key={game.id}
                    className="bg-gray-900 rounded overflow-hidden relative group flex-shrink-0"
                    style={{ width: `${cardWidth}px` }}
                  >
                    {/* Game banner image */}
                    <div className="h-80 relative overflow-hidden">
                      <Image
                        src={game.image}
                        alt={game.name}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      
                      {/* Game category badge matching tournaments style */}
                      <div className="absolute bottom-3 left-3 z-10">
                        <div 
                          className="bg-black text-white px-2 py-1 text-xs font-medium"
                          style={{ borderLeft: `2px solid ${accentColor}` }}
                        >
                          {game.category}
                        </div>
                      </div>
                    </div>
                    
                    {/* Game title in bottom section */}
                    <div className="p-4">
                      <h3 className="text-base font-bold text-white">{game.name}</h3>
                      
                      {/* View game button */}
                      <motion.button
                        className="w-full py-2.5 mt-4 text-white font-medium text-sm flex items-center justify-center transition-colors duration-200"
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
                        <span>VIEW GAME</span>
                        <svg className="ml-2 w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </motion.button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-gray-900 rounded my-8">
                <svg className="mx-auto w-12 h-12 text-gray-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg text-white font-medium mb-1">No games found</h3>
                <p className="text-gray-400 text-sm">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>

          {/* Navigation helper text for mobile */}
          {isMobile && filteredGames.length > visibleCards && (
            <div className="mt-4 flex justify-center items-center">
              <div className="text-gray-400 text-xs flex items-center">
                <span>Use arrows to navigate</span>
              </div>
            </div>
          )}

          {/* Next arrow button - now visible on all devices */}
          <button
            className={`absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-gray-900 p-3 md:p-4 rounded-l-lg border hover:bg-gray-800 transition-all duration-300 focus:outline-none ${
              filteredGames.length <= visibleCards || currentIndex >= filteredGames.length - visibleCards ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => scrollToIndex(currentIndex + 1)}
            disabled={filteredGames.length <= visibleCards || currentIndex >= filteredGames.length - visibleCards}
            aria-label="Next games"
            style={{ borderColor: accentColor }}
          >
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M9 6L15 12L9 18" 
                stroke={accentColor} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </button>
        </div>

        {/* Pagination indicators */}
        {filteredGames.length > visibleCards && (
          <div className="mt-8 flex justify-center items-center space-x-3">
            {filteredGames.slice(0, filteredGames.length - visibleCards + 1).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8" 
                    : "bg-gray-700 hover:bg-gray-500"
                }`}
                style={{ 
                  backgroundColor: index === currentIndex ? accentColor : undefined 
                }}
                onClick={() => scrollToIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
        
        {/* View all games button */}
        <div className="mt-10 text-center">
          <motion.button 
            className="py-2.5 px-6 bg-transparent text-white text-sm border border-gray-700 rounded inline-flex items-center"
            whileHover={{ 
              borderColor: accentColor,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.98 }}
            style={{ 
              transition: "border-color 0.2s ease" 
            }}
          >
            <span>VIEW ALL GAMES</span>
            <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
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

export default GamesShowcase;