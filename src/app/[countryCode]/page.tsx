'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { continents, Country } from '@/constants/regions';
import Navbar from '@/components/Navbar';
import { getStoredRegion } from '@/utils/storage';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function CountryLandingPage() {
  const params = useParams();
  const countryCode = params.countryCode as string;
  const [country, setCountry] = useState<Country | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Scroll animation setup
  const { scrollY } = useScroll();
  const videoContainerWidth = useTransform(scrollY, [0, 300], ['100%', '30%']);
  const whiteBackgroundWidth = useTransform(scrollY, [0, 300], ['0%', '35%']);
  const sidebarOpacity = useTransform(scrollY, [100, 250], [0, 1]);
  const imageTranslateY = useTransform(scrollY, [150, 300], ['20px', '0px']);
  
  useEffect(() => {
    // Find the selected country based on the URL parameter
    const storedRegion = getStoredRegion();
    
    // Find the country from all continents
    let foundCountry: Country | null = null;
    
    for (const continent of continents) {
      const matchedCountry = continent.countries.find(c => {
        const urlCode = c.code.toLowerCase().split('_')[0];
        return urlCode === countryCode.toLowerCase();
      });
      
      if (matchedCountry) {
        foundCountry = matchedCountry;
        break;
      }
    }
    
    setCountry(foundCountry);
  }, [countryCode]);

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      {/* Navbar */}
      <Navbar />
      
      <div className="w-full px-2 mx-auto flex justify-center min-h-[150vh]">
        {/* Main Content Container with Video and Sidebars */}
        <div className="relative w-full flex items-start justify-center">
          {/* Video and Sidebars Container - All sticky together */}
          <motion.div
            className="flex justify-center items-start w-full"
            style={{
              position: 'sticky',
              top: '5px',
            }}
          >
            {/* Left White Background with Image */}
            <motion.div 
              className="bg-white h-[800px] z-10 flex items-center justify-center overflow-hidden"
              style={{ 
                width: whiteBackgroundWidth,
                opacity: sidebarOpacity,
                display: "flex"
              }}
            >
              <div className="relative w-[95%] h-[95%] overflow-hidden group">
                {/* Dark overlay for left image */}
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                <motion.img 
                  src="/left.webp" 
                  alt="Left sidebar decorative image" 
                  className="w-full h-full object-cover"
                  style={{
                    y: imageTranslateY
                  }}
                />
                {/* Title & Button - Bottom Middle with hover effect */}
                <div className="absolute bottom-0 left-0 w-full z-20 pb-8">
                  <motion.div 
                    className="w-full flex flex-col justify-end items-center text-center text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    <motion.h2 
                      className="text-2xl font-light mb-4 text-white tracking-tighter transition-all duration-300 group-hover:-translate-y-[15px]"
                    >
                      Collection I
                    </motion.h2>
                    <div className="h-[30px] overflow-hidden">
                      <motion.button 
                        className="border-b border-white pb-1 flex items-center hover:opacity-80 transition-opacity text-white opacity-0 translate-y-[30px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                      >
                        <span className="mr-2">Explore</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
            
            {/* Main Hero Video Container - Gets Smaller */}
            <motion.div 
              className="relative h-[800px] max-w-[2000px] overflow-hidden"
              style={{
                width: videoContainerWidth,
              }}
            >
              {/* Title & Button - Centered */}
              <motion.div 
                className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h1 className="text-3xl md:text-4xl font-light mb-6 text-white tracking-tighter">
                  Revisited Heritage
                </h1>
                <motion.button 
                  className="border-b border-white pb-1 flex items-center hover:opacity-80 transition-opacity text-white"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <span className="mr-2">Discover</span>
                </motion.button>
              </motion.div>

              {/* Video Container - Always Full Width of Parent */}
              <div className="w-full h-full relative">
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                {/* Video is always full width but parent container shrinks */}
                <div className="w-full h-full overflow-hidden">
                  <video 
                    className="w-full h-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                  >
                    <source src="/dior-video.mp4" type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                </div>
              </div>
            </motion.div>
            
            {/* Right White Background with Image */}
            <motion.div 
              className="bg-white h-[800px] z-10 flex items-center justify-center overflow-hidden"
              style={{ 
                width: whiteBackgroundWidth,
                opacity: sidebarOpacity,
                display: "flex"
              }}
            >
              <div className="relative w-[95%] h-[95%] overflow-hidden group">
                {/* Dark overlay for right image */}
                <div className="absolute inset-0 bg-black opacity-40 z-10"></div>
                <motion.img 
                  src="/right.webp" 
                  alt="Right sidebar decorative image" 
                  className="w-full h-full object-cover"
                  style={{
                    y: imageTranslateY
                  }}
                />
                {/* Title & Button - Bottom Middle with hover effect */}
                <div className="absolute bottom-0 left-0 w-full z-20 pb-8">
                  <motion.div 
                    className="w-full flex flex-col justify-end items-center text-center text-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    <motion.h2 
                      className="text-2xl font-light mb-4 text-white tracking-tighter transition-all duration-300 group-hover:-translate-y-[15px]"
                    >
                      Collection II
                    </motion.h2>
                    <div className="h-[30px] overflow-hidden">
                      <motion.button 
                        className="border-b border-white pb-1 flex items-center hover:opacity-80 transition-opacity text-white opacity-0 translate-y-[30px] group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                      >
                        <span className="mr-2">Explore</span>
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Additional content below */}
      <div className="w-full max-w-[1200px] mx-auto px-6 py-20">
        <h2 className="text-3xl font-light mb-8 text-center">Explore the Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-gray-100"></div>
          ))}
        </div>
      </div>
    </div>
  );
} 