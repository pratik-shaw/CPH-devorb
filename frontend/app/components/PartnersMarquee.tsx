"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

// Sample partners - replace with your actual partners
const partners = [
  { id: 1, name: 'SteelSeries', logo: '/images/partners/steelseries.png' },
  { id: 2, name: 'Razer', logo: '/images/partners/razer.png' },
  { id: 3, name: 'Intel', logo: '/images/partners/intel.png' },
  { id: 4, name: 'Nvidia', logo: '/images/partners/nvidia.png' },
  { id: 5, name: 'HyperX', logo: '/images/partners/hyperx.png' },
  { id: 6, name: 'Red Bull', logo: '/images/partners/redbull.png' },
  { id: 7, name: 'Monster Energy', logo: '/images/partners/monster.png' },
  { id: 8, name: 'Logitech', logo: '/images/partners/logitech.png' },
  { id: 9, name: 'Corsair', logo: '/images/partners/corsair.png' },
  { id: 10, name: 'Alienware', logo: '/images/partners/alienware.png' },
];

const PartnersMarquee = () => {
  return (
    <section className="bg-black py-16 overflow-hidden ml-16 md:ml-64">
      <div className="container mx-auto mb-8 px-4">
        <h2 className="text-4xl font-bold text-center">
          <span className="text-orange-500">OUR</span> PARTNERS
        </h2>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* First marquee (left to right) */}
        <motion.div
          className="flex space-x-16 py-6"
          animate={{ x: [0, -1920] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...partners, ...partners].map((partner, index) => (
            <div 
              key={`${partner.id}-${index}`} 
              className="flex items-center justify-center bg-gray-900 rounded-lg p-6 w-48 h-32"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={80}
                className="filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>

        {/* Second marquee (right to left) - creating a more dynamic feel */}
        <motion.div
          className="flex space-x-16 py-6 mt-4"
          animate={{ x: [-1920, 0] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {[...partners.reverse(), ...partners].map((partner, index) => (
            <div 
              key={`${partner.id}-rev-${index}`} 
              className="flex items-center justify-center bg-gray-900 rounded-lg p-6 w-48 h-32"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={80}
                className="filter grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersMarquee;