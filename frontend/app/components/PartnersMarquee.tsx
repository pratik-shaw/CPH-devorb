/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useRef } from 'react';

// Partners array with external image URLs - using more reliable image sources
const partners = [
  { id: 1, name: 'SteelSeries', logo: 'https://www.nicepng.com/png/full/209-2090230_steelseries-logo-png.png', url: 'https://steelseries.com' },
  { id: 2, name: 'Razer', logo: 'https://th.bing.com/th/id/R.e1488c78afe9b541fc6a16181da96a56?rik=lgGOp1ZNGKgGLg&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f4%2fRazer-Logo-PNG-Pic.png&ehk=lor4sKNV1nGW0Ogm66jdxBzYLl3yeqasRyWCWI2SMqA%3d&risl=&pid=ImgRaw&r=0', url: 'https://razer.com' },
  { id: 3, name: 'Intel', logo: 'https://th.bing.com/th/id/R.2ddd0850b2d6d102621f42a2175b34f7?rik=rbgZxZltc17%2fSg&riu=http%3a%2f%2fdwglogo.com%2fwp-content%2fuploads%2f2016%2f05%2fIntel_logo.png&ehk=GUcGADvaMF%2fY9NhzqfWqMRqKqsbcl%2bU3euW%2b448cL7k%3d&risl=&pid=ImgRaw&r=0', url: 'https://intel.com' },
  { id: 4, name: 'Nvidia', logo: 'https://static.vecteezy.com/system/resources/previews/024/039/095/non_2x/nvidia-logo-transparent-free-png.png', url: 'https://nvidia.com' },
  { id: 5, name: 'HyperX', logo: 'https://static.gtri.be/img/logos/hyper-x-w.png', url: 'https://hyperx.com' },
  { id: 6, name: 'Red Bull', logo: 'https://th.bing.com/th/id/R.0bfb682d3a786c68ffd1c64213f99fe5?rik=PQ3Kbu0RxJemCg&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fred-bull-logo-png-png-2272x1704-red-bull-logo-background-2272.png&ehk=OcXuwt9A2e6xgmWA4e5U9Gu6bVo2GgUCynxtbnrFE0s%3d&risl=&pid=ImgRaw&r=0', url: 'https://redbull.com' },
  { id: 7, name: 'Monster Energy', logo: 'https://static.vecteezy.com/system/resources/previews/027/127/428/non_2x/monster-energy-logo-monster-energy-icon-transparent-free-png.png', url: 'https://monsterenergy.com' },
  { id: 8, name: 'Logitech', logo: 'https://logosmarcas.net/wp-content/uploads/2020/11/Logitech-Emblema.png', url: 'https://logitech.com' },
  { id: 9, name: 'Corsair', logo: 'https://logos-world.net/wp-content/uploads/2023/01/Corsair-Logo.png', url: 'https://corsair.com' },
  { id: 10, name: 'Alienware', logo: 'https://clipground.com/images/logo-alienware-png-5.png', url: 'https://alienware.com' },
];

const PartnersMarquee: React.FC = () => {
  const [marqueeWidth, setMarqueeWidth] = useState<number>(2400);
  const containerRef = useRef<HTMLDivElement>(null);
  const accentColor = "#f77644";
  const [isClient, setIsClient] = useState<boolean>(false);

  // Handle client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Calculate the marquee width based on the container size
  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        // Set marquee width to be at least 2x the container width to ensure smooth looping
        setMarqueeWidth(Math.max(containerWidth * 2, 2400));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  // Duplicate the partners for the marquee effect
  const duplicatedPartners = [...partners, ...partners, ...partners];

  if (!isClient) {
    return <div className="h-64 bg-black">Loading partners...</div>;
  }

  return (
    <section className="bg-black py-16  px-4 md:px-8 md:ml-0 lg:ml-16 xl:ml-64">
        <div className="max-w-6xl mx-auto" ref={containerRef}>
        {/* Section title - matching games showcase style */}
        <div className="mb-8">
          <div className="flex items-center mb-3">
            <div className="h-px w-6 bg-gray-700"></div>
            <span className="text-gray-400 mx-3 text-xs uppercase tracking-widest font-medium">Strategic Partners</span>
            <div className="h-px w-6 bg-gray-700"></div>
          </div>
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 inline-block relative">
            OUR PARTNERS
            <div className="absolute -bottom-1 left-0 h-1 w-16" style={{ backgroundColor: accentColor }}></div>
          </h2>
          <p className="text-gray-400 max-w-2xl mt-2">
            We collaborate with industry-leading brands to bring you the best gaming experiences.
          </p>
        </div>

        <div className="relative w-full overflow-hidden">
          {/* Single line marquee */}
          <motion.div
            className="flex space-x-12 py-6"
            animate={{ x: [0, -marqueeWidth] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
            style={{ width: `${marqueeWidth}px` }}
          >
            {duplicatedPartners.map((partner, index) => (
              <Link 
                key={`${partner.id}-${index}`} 
                href={partner.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-28 h-20 transition-transform hover:scale-110 flex-shrink-0"
              >
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  loading="lazy"
                  width={80}
                  height={50}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/80x50?text=Logo';
                  }}
                />
              </Link>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Extra styles to match the navbar */}
      <style jsx>{`
        :root {
          --accent-color: #f77644;
        }
        .text-accent {
          color: var(--accent-color);
        }
        .shadow-glow-accent-sm {
          box-shadow: 0 0 10px rgba(247, 118, 68, 0.15);
        }
      `}</style>
    </section>
  );
};

export default PartnersMarquee;