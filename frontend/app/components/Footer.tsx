/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

// components/Footer.tsx
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Twitch, Youtube, ArrowRight } from 'lucide-react';

const Footer = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-orange-500/30 ml-16 md:ml-64">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and about */}
          <motion.div 
            className="col-span-1 md:col-span-1"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold mb-4">
              <span className="text-orange-500">CRITICAL</span> PHOENIX
            </div>
            <p className="text-gray-400 mb-4">
              Premier esports organization hosting tournaments and events for gamers worldwide.
            </p>
            <div className="flex space-x-4">
              <motion.a href="#" whileHover={{ y: -3, color: '#ff4500' }} className="text-gray-400">
                <Facebook size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{ y: -3, color: '#ff4500' }} className="text-gray-400">
                <Twitter size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{ y: -3, color: '#ff4500' }} className="text-gray-400">
                <Instagram size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{ y: -3, color: '#ff4500' }} className="text-gray-400">
                <Twitch size={20} />
              </motion.a>
              <motion.a href="#" whileHover={{ y: -3, color: '#ff4500' }} className="text-gray-400">
                <Youtube size={20} />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div 
            className="col-span-1"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 border-b border-orange-500/30 pb-2">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Tournaments', 'Games', 'About Us', 'Contact'].map((item, i) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-400 hover:text-orange-500 flex items-center">
                    <ArrowRight size={14} className="mr-2 text-orange-500" /> {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Games */}
          <motion.div 
            className="col-span-1"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 border-b border-orange-500/30 pb-2">Games</h3>
            <ul className="space-y-2">
              {['BGMI', 'Free Fire', 'Valorant', 'COD Mobile', 'PUBG', 'Fortnite'].map((item, i) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-400 hover:text-orange-500 flex items-center">
                    <ArrowRight size={14} className="mr-2 text-orange-500" /> {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

         
        </div>

        <motion.div 
          className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>© {new Date().getFullYear()} Critical Phoenix. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;