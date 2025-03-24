/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Menu, X, Home, Calendar, Gamepad, Trophy, Users, Info, Mail } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setIsOpen(true);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navLinks = [
    { title: 'Home', href: '/', icon: <Home /> },
    { title: 'Tournaments', href: '/tournaments', icon: <Trophy /> },
    { title: 'Games', href: '/games', icon: <Gamepad /> },
    { title: 'Schedule', href: '/schedule', icon: <Calendar /> },
    { title: 'Teams', href: '/teams', icon: <Users /> },
    { title: 'About', href: '/about', icon: <Info /> },
    { title: 'Contact', href: '/contact', icon: <Mail /> },
  ];

  const navVariants = {
    open: { 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    },
    closed: { 
      x: '-100%',
      transition: { type: 'spring', stiffness: 300, damping: 25 }
    }
  };

  return (
    <>
      {/* Mobile Horizontal Navbar - Only shown on mobile */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-transparent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo on the left */}
            <div className="h-10 relative">
              <img 
                src="https://criticalphoenix.in/public/cph-1@2x.png" 
                alt="Critical Phoenix Logo" 
                className="h-full object-contain object-left"
              />
            </div>
            
            {/* Menu button on the right */}
            <motion.button
              className="p-2 bg-black border border-white text-white rounded-full shadow-glow-accent"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Removed the fixed mobile menu button since it's now in the navbar */}

      {/* Navbar with updated black & white design - Original desktop version */}
      <motion.nav 
        className="fixed left-0 top-0 h-full bg-black z-40 border-r border-white/10 shadow-xl"
        initial={isMobile ? "closed" : "open"}
        animate={isOpen ? "open" : "closed"}
        variants={navVariants}
      >
        <div className="flex flex-col h-full py-16 w-64">
          {/* Logo section with accent color */}
          <div className="px-6 mb-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* Using regular img tag instead of Next.js Image component */}
              <div className="h-12 relative">
                <img 
                  src="https://criticalphoenix.in/public/cph-1@2x.png" 
                  alt="Critical Phoenix Logo" 
                  className="h-full object-contain object-left"
                />
              </div>
              <div className="absolute -bottom-2 left-0 h-px w-full bg-gradient-to-r from-transparent via-accent to-transparent"></div>
            </motion.div>
          </div>
          
          <ul className="space-y-1 px-4 flex-1">
            {navLinks.map((link, index) => (
              <motion.li key={link.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={link.href}>
                  <motion.div 
                    className="flex items-center space-x-3 p-3 text-white/80 hover:bg-black hover:text-white group relative overflow-hidden"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {/* Hover gradient effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    />
                    
                    {/* Cyber corner accents - only visible on hover */}
                    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#f77644] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#f77644] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#f77644] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#f77644] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <motion.div 
                      className="relative z-10 text-accent group-hover:text-accent group-hover:scale-110"
                      whileHover={{ rotate: 5 }}
                    >
                      {link.icon}
                    </motion.div>
                    <span className="relative z-10 font-medium">{link.title}</span>
                  </motion.div>
                </Link>
              </motion.li>
            ))}
          </ul>
          
          {/* Sign in button with subtle effect */}
          <div className="mt-auto px-4 pb-8">
            <motion.button 
              className="w-full py-3 px-4 bg-black text-white font-bold rounded-lg group relative overflow-hidden border border-white/20 shadow-glow-accent-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Button shine effect */}
              <motion.div 
                className="absolute inset-0 w-20 h-full bg-accent/20 skew-x-30 translate-x-[-150%] group-hover:translate-x-[200%] transition-all duration-1000"
                initial={{ x: '-150%' }}
                whileHover={{ x: '200%' }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <span className="relative z-10 tracking-wider">SIGN IN</span>
            </motion.button>
          </div>
        </div>

        {/* Extra styles */}
        <style jsx>{`
          :root {
            --accent-color: #f77644;
          }
          .text-accent {
            color: var(--accent-color);
          }
          .bg-accent {
            background-color: var(--accent-color);
          }
          .border-accent {
            border-color: var(--accent-color);
          }
          .shadow-glow-accent {
            box-shadow: 0 0 15px rgba(247, 118, 68, 0.3);
          }
          .shadow-glow-accent-sm {
            box-shadow: 0 0 10px rgba(247, 118, 68, 0.15);
          }
          .skew-x-30 {
            transform: skewX(30deg);
          }
        `}</style>
      </motion.nav>
    </>
  );
};

export default Navbar;