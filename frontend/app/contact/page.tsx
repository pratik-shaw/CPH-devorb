/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client"

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/app/components/Navbar';
import Footer from '@/app/components/Footer';
import { 
  Twitter, 
  Instagram, 
  Facebook, 
  Twitch, 
  Youtube, 
  Mail, 
  Send 
} from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const accentColor = "#f77644";

  // Loading screen effect
  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setMounted(true);
      setIsLoading(false);
    }, 2000);

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

  const socialPlatforms = [
    {
      name: 'Twitter',
      icon: <Twitter size={24} />,
      link: 'https://twitter.com/criticalphoenix',
      handle: '@CriticalPhoenix'
    },
    {
      name: 'Instagram',
      icon: <Instagram size={24} />,
      link: 'https://instagram.com/critical.phoenix',
      handle: '@critical.phoenix'
    },
    {
      name: 'Facebook',
      icon: <Facebook size={24} />,
      link: 'https://facebook.com/criticalphoenix',
      handle: 'Critical Phoenix'
    },
    {
      name: 'Twitch',
      icon: <Twitch size={24} />,
      link: 'https://twitch.tv/criticalphoenix',
      handle: 'critical_phoenix'
    },
    {
      name: 'YouTube',
      icon: <Youtube size={24} />,
      link: 'https://youtube.com/criticalphoenix',
      handle: 'Critical Phoenix Esports'
    },
    {
      name: 'Discord',
      icon: <FaDiscord size={24} />,
      link: 'https://discord.gg/criticalphoenix',
      handle: 'Critical Phoenix Discord'
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual form submission logic
    alert('Message sent! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <div className="flex flex-1 relative">
        <Navbar />
        
        <div className="flex-1 w-full md:ml-16 lg:ml-64 flex flex-col">
          <main className="flex-grow container mx-auto ">
            {/* Hero Section */}
            <motion.div 
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="relative h-[50vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
            >
              <img 
                src="https://dotesports.com/wp-content/uploads/2023/07/all-lol-teams-qualified-for-the-2023-league-of-legends-world-championship.jpg" 
                alt="About Us Background" 
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
                  CONTACT <span style={{ color: accentColor }}>CRITICAL PHOENIX</span>
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300 mb-8"
                >
                  Empowering Esports Through Innovation, Community, and Passion
                </motion.p>
              </div>
            </motion.div>

            {/* Contact Form and Social Links */}
            <div className="grid md:grid-cols-2 gap-12 px-4 py-4">
              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-gray-900 p-8 rounded-lg"
              >
                <h2 className="text-2xl font-bold mb-6" style={{ color: accentColor }}>
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <input 
                      type="text" 
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="mb-4">
                    <input 
                      type="email" 
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div className="mb-6">
                    <textarea 
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full bg-black/50 border border-gray-700 rounded p-3 text-white focus:outline-none focus:border-orange-500"
                    ></textarea>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full py-3 rounded font-bold transition-all duration-300"
                    style={{ 
                      backgroundColor: accentColor,
                      color: 'white'
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <Send className="mr-2" size={20} />
                      Send Message
                    </div>
                  </button>
                </form>
              </motion.div>

              {/* Social Links */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gray-900 p-8 rounded-lg"
              >
                <h2 className="text-2xl font-bold mb-6" style={{ color: accentColor }}>
                  Connect with Us
                </h2>
                <div className="space-y-4">
                  {socialPlatforms.map((platform) => (
                    <a 
                      key={platform.name}
                      href={platform.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-black/50 p-4 rounded hover:bg-black/70 transition-all duration-300 group"
                    >
                      <div className="flex items-center">
                        <div 
                          className="mr-4 p-2 rounded-full transition-all duration-300"
                          style={{ 
                            backgroundColor: accentColor,
                            color: 'white'
                          }}
                        >
                          {platform.icon}
                        </div>
                        <div>
                          <h3 className="font-bold">{platform.name}</h3>
                          <p className="text-sm text-gray-400">{platform.handle}</p>
                        </div>
                      </div>
                      <Mail 
                        size={20} 
                        className="text-gray-500 group-hover:text-white transition-colors"
                      />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;