"use client";

// components/Footer.tsx
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Twitch, Youtube, ArrowRight, Mail, MapPin, Phone, ChevronDown } from 'lucide-react';

const Footer = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Set initial state
      setIsMobile(window.innerWidth < 768);
      
      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      window.addEventListener('resize', handleResize);
      
      // Clean up
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <footer className="bg-black text-white pt-20 pb-8 border-t border-[#f77644]/30 ml-0 md:ml-16 lg:ml-64 relative overflow-hidden">
      {/* Cyber background graphic */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#f77644] to-transparent"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-[#f77644] to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-[#f77644] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-px h-full bg-gradient-to-b from-transparent to-[#f77644]"></div>
        
        {/* Grid lines */}
        <div className="grid grid-cols-12 h-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full border-r border-[#f77644]/10"></div>
          ))}
        </div>
        <div className="grid grid-rows-12 w-full">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-full border-b border-[#f77644]/10"></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title section with orange accent */}
        <div className="mb-10 md:mb-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="h-px w-8 bg-[#f77644]"></div>
            <span className="text-[#f77644] mx-3 text-xs md:text-sm uppercase tracking-widest">Stay Connected</span>
            <div className="h-px w-8 bg-[#f77644]"></div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 relative inline-block">
            JOIN THE COMMUNITY
            <div className="absolute -bottom-2 left-0 h-1 w-full bg-gradient-to-r from-[#f77644] via-[#f77644] to-[#f77644]"></div>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo and about */}
          <motion.div 
            className="col-span-1 md:col-span-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
          >
            <div className="text-2xl font-bold mb-4">
              <span className="text-[#f77644]">CRITICAL</span> PHOENIX
            </div>
            <p className="text-gray-400 mb-6 border-l-2 border-[#f77644] pl-4">
              Premier esports organization hosting tournaments and events for gamers worldwide. Join us to compete at the highest level and unlock your potential.
            </p>
            <div className="grid grid-cols-5 gap-2 md:gap-3">
              {[
                { icon: <Facebook size={16} />, color: "#f77644" },
                { icon: <Twitter size={16} />, color: "#f77644" },
                { icon: <Instagram size={16} />, color: "#f77644" },
                { icon: <Twitch size={16} />, color: "#f77644" },
                { icon: <Youtube size={16} />, color: "#f77644" }
              ].map((item, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  whileHover={{ y: -3, scale: 1.1 }} 
                  className="bg-gray-800 h-8 w-8 md:h-10 md:w-10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white transition-colors duration-300 border border-[#f77644]/20 hover:border-[#f77644]"
                >
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links - Collapsible on mobile */}
          <motion.div 
            className="col-span-1 md:col-span-2 border-b border-gray-800 pb-4 md:border-0 md:pb-0"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <button 
              className="text-lg font-semibold mb-2 md:mb-4 border-b border-[#f77644]/30 pb-2 flex items-center justify-between w-full md:cursor-default"
              onClick={() => toggleSection('quick-links')}
            >
              <div className="flex items-center">
                <span className="mr-2 bg-[#f77644] h-4 w-1 rounded-full"></span>
                Quick Links
              </div>
              <ChevronDown className={`md:hidden w-5 h-5 transition-transform ${expandedSection === 'quick-links' ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`space-y-3 overflow-hidden transition-all duration-300 ${expandedSection === 'quick-links' || !isMobile ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 md:opacity-100 md:max-h-60'}`}>
              {['Home', 'Tournaments', 'Games', 'About Us', 'Contact'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-400 hover:text-[#f77644] flex items-center group">
                    <span className="w-0 group-hover:w-2 transition-all mr-0 group-hover:mr-2 duration-300 bg-[#f77644] h-px"></span>
                    <ArrowRight size={14} className="mr-2 text-[#f77644]" /> 
                    <span>{item}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Games - Collapsible on mobile */}
          <motion.div 
            className="col-span-1 md:col-span-2 border-b border-gray-800 pb-4 md:border-0 md:pb-0"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <button 
              className="text-lg font-semibold mb-2 md:mb-4 border-b border-[#f77644]/30 pb-2 flex items-center justify-between w-full md:cursor-default"
              onClick={() => toggleSection('games')}
            >
              <div className="flex items-center">
                <span className="mr-2 bg-[#f77644] h-4 w-1 rounded-full"></span>
                Games
              </div>
              <ChevronDown className={`md:hidden w-5 h-5 transition-transform ${expandedSection === 'games' ? 'rotate-180' : ''}`} />
            </button>
            <ul className={`space-y-3 overflow-hidden transition-all duration-300 ${expandedSection === 'games' || !isMobile ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0 md:opacity-100 md:max-h-60'}`}>
              {['BGMI', 'Free Fire', 'Valorant', 'COD Mobile', 'PUBG', 'Fortnite'].map((item) => (
                <motion.li key={item} whileHover={{ x: 5 }}>
                  <a href="#" className="text-gray-400 hover:text-[#f77644] flex items-center group">
                    <span className="w-0 group-hover:w-2 transition-all mr-0 group-hover:mr-2 duration-300 bg-[#f77644] h-px"></span>
                    <ArrowRight size={14} className="mr-2 text-[#f77644]" /> 
                    <span>{item}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info - Collapsible on mobile */}
          <motion.div 
            className="col-span-1 md:col-span-4"
            initial="hidden"
            whileInView="visible"
            variants={fadeInUp}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button 
              className="text-lg font-semibold mb-2 md:mb-4 border-b border-[#f77644]/30 pb-2 flex items-center justify-between w-full md:cursor-default"
              onClick={() => toggleSection('contact')}
            >
              <div className="flex items-center">
                <span className="mr-2 bg-[#f77644] h-4 w-1 rounded-full"></span>
                Contact Us
              </div>
              <ChevronDown className={`md:hidden w-5 h-5 transition-transform ${expandedSection === 'contact' ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${expandedSection === 'contact' || !isMobile ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 md:opacity-100 md:max-h-96'}`}>
              <div className="bg-black/40 p-4 md:p-5 rounded-lg border border-[#f77644]/20">
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#f77644]/10 p-2 rounded-lg mr-3">
                      <Mail size={16} className="text-[#f77644]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#f77644] mb-1">EMAIL</p>
                      <p className="text-gray-300 text-sm">info@criticalphoenix.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#f77644]/10 p-2 rounded-lg mr-3">
                      <MapPin size={16} className="text-[#f77644]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#f77644] mb-1">ADDRESS</p>
                      <p className="text-gray-300 text-sm">123 Esports Arena, Gaming Street, GG 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="bg-[#f77644]/10 p-2 rounded-lg mr-3">
                      <Phone size={16} className="text-[#f77644]" />
                    </div>
                    <div>
                      <p className="text-xs text-[#f77644] mb-1">PHONE</p>
                      <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Newsletter subscription */}
        <motion.div 
          className="border border-[#f77644]/20 bg-black/30 rounded-lg p-4 md:p-6 mt-10 md:mt-16 relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {/* Cyber corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[#f77644]"></div>
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[#f77644]"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[#f77644]"></div>
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[#f77644]"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-center">
            <div className="md:col-span-1">
              <h3 className="text-lg font-bold text-white mb-1">JOIN OUR NEWSLETTER</h3>
              <p className="text-gray-400 text-sm">Get the latest updates and offers</p>
            </div>
            <div className="md:col-span-2">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-full py-3 px-4 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-[#f77644] text-white"
                  />
                </div>
                <motion.button 
                  className="bg-gradient-to-r from-[#f77644] to-[#f77644] py-3 px-6 rounded-lg font-medium text-white shadow-glow-orange flex-shrink-0"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  SUBSCRIBE
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 text-center text-gray-400 text-sm"
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p>© {new Date().getFullYear()} Critical Phoenix. All rights reserved.</p>
        </motion.div>
      </div>

      {/* Extra styles */}
      <style jsx>{`
        .shadow-glow-orange {
          box-shadow: 0 0 15px rgba(247, 118, 68, 0.3);
        }
        .grid-rows-12 {
          grid-template-rows: repeat(12, 1fr);
        }
      `}</style>
    </footer>
  );
};

export default Footer;