"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

// Sample games data - replace with your actual games
const games = [
  { id: 1, name: "BGMI", image: "/images/games/bgmi.jpg", players: "250K+" },
  { id: 2, name: "Valorant", image: "/images/games/valorant.jpg", players: "180K+" },
  { id: 3, name: "Free Fire", image: "/images/games/freefire.jpg", players: "320K+" },
  { id: 4, name: "Call of Duty", image: "/images/games/cod.jpg", players: "150K+" },
  { id: 5, name: "CS:GO", image: "/images/games/csgo.jpg", players: "200K+" },
  { id: 6, name: "Apex Legends", image: "/images/games/apex.jpg", players: "120K+" },
  { id: 7, name: "League of Legends", image: "/images/games/lol.jpg", players: "280K+" },
  { id: 8, name: "Fortnite", image: "/images/games/fortnite.jpg", players: "220K+" },
];

const GamesShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [cardWidth, setCardWidth] = useState<number>(300);
  const [visibleCards, setVisibleCards] = useState<number>(3);

  useEffect(() => {
    const handleResize = () => {
      // Check window width and determine how many cards to show
      const windowWidth = window.innerWidth - 64; // Subtract navbar width
      if (windowWidth >= 1536) {
        setVisibleCards(4);
      } else if (windowWidth >= 1280) {
        setVisibleCards(3);
      } else if (windowWidth >= 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }

      // Adjust card width based on container size
      const containerWidth = containerRef.current?.offsetWidth || 0;
      const gap = 24; // 6 * 4 = 24px (space-x-6)
      const newCardWidth = (containerWidth - gap * (visibleCards - 1)) / visibleCards;
      setCardWidth(newCardWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [visibleCards]);

  const scrollToIndex = (index: number) => {
    if (index < 0) {
      setCurrentIndex(games.length - visibleCards);
    } else if (index > games.length - visibleCards) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(index);
    }
  };

  return (
    <section className="bg-black py-20 ml-16 md:ml-64">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="text-orange-500">FEATURED</span> GAMES
        </h2>

        <div className="relative">
          {/* Previous arrow */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-70 p-4 rounded-r-lg"
            onClick={() => scrollToIndex(currentIndex - 1)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Games container */}
          <div className="overflow-hidden mx-12" ref={containerRef}>
            <motion.div
              className="flex space-x-6"
              animate={{ x: -currentIndex * (cardWidth + 24) }} // cardWidth + 24px (gap)
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {games.map((game) => (
                <motion.div
                  key={game.id}
                  className="flex-shrink-0 relative group overflow-hidden rounded-lg"
                  style={{ width: `${cardWidth}px`, height: "400px" }}
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={game.image}
                    alt={game.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <h3 className="text-2xl font-bold text-white">{game.name}</h3>
                    <div className="flex items-center mt-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-gray-300">{game.players} Active Players</p>
                    </div>
                    <motion.button
                      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md w-full"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      JOIN TOURNAMENT
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Next arrow */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-black bg-opacity-70 p-4 rounded-l-lg"
            onClick={() => scrollToIndex(currentIndex + 1)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 6L15 12L9 18" stroke="#ff6600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {games.slice(0, games.length - visibleCards + 1).map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index <= currentIndex && currentIndex < index + visibleCards ? "bg-orange-500" : "bg-gray-700"
              }`}
              onClick={() => scrollToIndex(index)}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GamesShowcase;
