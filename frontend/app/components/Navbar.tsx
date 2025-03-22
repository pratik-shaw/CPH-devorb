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
      {/* Mobile menu toggle */}
      <motion.button
        className="fixed top-4 left-4 z-50 p-2 bg-black text-orange-500 rounded-full md:hidden"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </motion.button>

      {/* Navbar */}
      <motion.nav 
        className="fixed left-0 top-0 h-full bg-black z-40 shadow-xl shadow-orange-500/20"
        initial={isMobile ? "closed" : "open"}
        animate={isOpen ? "open" : "closed"}
        variants={navVariants}
      >
        <div className="flex flex-col h-full py-16 w-64">
          <div className="px-4 mb-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white font-bold text-xl"
            >
              <span className="text-orange-500">CRITICAL</span> PHOENIX
            </motion.div>
          </div>
          
          <ul className="space-y-2 px-4 flex-1">
            {navLinks.map((link, index) => (
              <motion.li key={link.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Link href={link.href}>
                  <motion.div 
                    className="flex items-center space-x-3 p-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-orange-500 group"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <motion.div 
                      className="text-orange-500 group-hover:scale-110"
                      whileHover={{ rotate: 5 }}
                    >
                      {link.icon}
                    </motion.div>
                    <span>{link.title}</span>
                  </motion.div>
                </Link>
              </motion.li>
            ))}
          </ul>
          
          <div className="mt-auto px-4 pb-8">
            <motion.button 
              className="w-full py-2 px-4 bg-orange-500 text-black font-bold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              SIGN IN
            </motion.button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;