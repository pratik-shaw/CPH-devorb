// components/TournamentsSection.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Sample tournaments data - replace with your actual tournaments
const tournaments = [
  { 
    id: 1, 
    title: 'BGMI Pro League Season 5', 
    game: 'BGMI', 
    poster: '/images/tournaments/bgmi-tournament.jpg',
    prize: '$50,000',
    date: '2025-04-15',
    participants: 128,
    status: 'Upcoming'
  },
  { 
    id: 2, 
    title: 'Valorant Masters', 
    game: 'Valorant', 
    poster: '/images/tournaments/valorant-tournament.jpg',
    prize: '$100,000',
    date: '2025-05-10',
    participants: 64,
    status: 'Registration Open'
  },
  { 
    id: 3, 
    title: 'Free Fire World Cup', 
    game: 'Free Fire', 
    poster: '/images/tournaments/freefire-tournament.jpg',
    prize: '$75,000',
    date: '2025-04-28',
    participants: 96,
    status: 'Upcoming'
  },
  { 
    id: 4, 
    title: 'Call of Duty Championship', 
    game: 'Call of Duty', 
    poster: '/images/tournaments/cod-tournament.jpg',
    prize: '$80,000',
    date: '2025-03-25',
    participants: 48,
    status: 'Live'
  },
  { 
    id: 5, 
    title: 'CS:GO Major', 
    game: 'CS:GO', 
    poster: '/images/tournaments/csgo-tournament.jpg',
    prize: '$150,000',
    date: '2025-06-15',
    participants: 32,
    status: 'Registration Open'
  },
  { 
    id: 6, 
    title: 'Apex Predator Challenge', 
    game: 'Apex Legends', 
    poster: '/images/tournaments/apex-tournament.jpg',
    prize: '$60,000',
    date: '2025-04-05',
    participants: 60,
    status: 'Upcoming'
  },
];

const TournamentsSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date'); // date, prize, participants

  // Filter tournaments based on search query
  const filteredTournaments = tournaments.filter(tournament => 
    tournament.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tournament.game.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort tournaments based on selected criterion
  const sortedTournaments = [...filteredTournaments].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (sortBy === 'prize') {
      return parseInt(b.prize.replace(/\D/g, '')) - parseInt(a.prize.replace(/\D/g, ''));
    } else if (sortBy === 'participants') {
      return b.participants - a.participants;
    }
    return 0;
  });

  return (
    <section className="bg-black py-20 ml-16 md:ml-64">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="text-orange-500">UPCOMING</span> TOURNAMENTS
        </h2>

        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
          <div className="relative w-full md:w-1/2">
            <input
              type="text"
              placeholder="Search tournaments..."
              className="w-full bg-gray-900 border border-gray-700 text-white py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg 
              className="absolute right-4 top-1/2 transform -translate-y-1/2" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" 
                stroke="#888888" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-white">Sort by:</span>
            <select
              className="bg-gray-900 border border-gray-700 text-white py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="date">Date (Nearest first)</option>
              <option value="prize">Prize Pool (Highest first)</option>
              <option value="participants">Participants (Highest first)</option>
            </select>
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedTournaments.map((tournament) => (
            <motion.div
              key={tournament.id}
              className="bg-gray-900 rounded-lg overflow-hidden"
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative h-64">
                <Image
                  src={tournament.poster}
                  alt={tournament.title}
                  layout="fill"
                  objectFit="cover"
                />
                <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {tournament.status}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2">{tournament.title}</h3>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-400">{tournament.game}</span>
                  <span className="text-orange-500 font-bold">{tournament.prize}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mb-4">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    {new Date(tournament.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                    </svg>
                    {tournament.participants} Teams
                  </div>
                </div>
                <motion.button 
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  REGISTER NOW
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show more button */}
        <div className="mt-12 text-center">
          <motion.button 
            className="bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-3 px-8 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LOAD MORE TOURNAMENTS
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default TournamentsSection;