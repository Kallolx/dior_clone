"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { continents, Continent, Country } from "@/constants/regions";
import { saveRegion } from "@/utils/storage";
import Link from "next/link";
import Image from "next/image";

export default function RegionSelectorPage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [expandedRegions, setExpandedRegions] = useState<{
    [key: string]: boolean;
  }>({});
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleCountrySelect = (country: Country, continentCode: string) => {
    // Save the selection to localStorage
    saveRegion(country.code, continentCode);

    // Set the selected country and show loading animation
    setSelectedCountry(country);
    setIsRedirecting(true);
    
    // Redirect to the same landing page but with country-specific URL
    const countryCode = country.code.toLowerCase().split('_')[0];
    
    // Small delay to show the loading animation
    setTimeout(() => {
      router.push(`/${countryCode}`);
    }, 800);
  };

  const toggleRegionExpand = (regionCode: string) => {
    setExpandedRegions((prev) => ({
      ...prev,
      [regionCode]: !prev[regionCode],
    }));
  };

  // Get visible countries for a region (limited to 8 if not expanded)
  const getVisibleCountries = (region: Continent) => {
    // Only apply the limitation to Europe
    if (region.code === "EU" && !expandedRegions[region.code]) {
      return region.countries.slice(0, 16); // Show 8 rows (16 countries in 2 columns)
    }
    return region.countries;
  };

  // Should this region show the See More button
  const shouldShowSeeMore = (region: Continent) => {
    return region.code === "EU" && region.countries.length > 16;
  };

  // Should this region display countries in two columns
  const shouldUseDoubleColumn = (region: Continent) => {
    // Use single column for regions with few countries
    return !["NA", "SA", "ME"].includes(region.code);
  };

  // Animation variants for smoother transitions
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        duration: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 },
    },
  };

  // Loading overlay for redirection
  const LoadingOverlay = () => (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-gray-800">Loading...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navbar */}
      <div className="max-w-full mx-auto px-12 flex justify-center items-center">
        <Link href="/" className="inline-block">
          <Image 
            src="/dior-logo.png" 
            alt="Dior" 
            width={280} 
            height={90}
            priority
            className="h-18 w-auto"
          />
        </Link>
      </div>  

      {/* Loading Overlay */}
      {isRedirecting && <LoadingOverlay />}

      <div className="px-12 pt-2 pb-16 w-full max-w-[1800px] mx-auto">
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-normal  text-gray-500">
            Select your country/region & language
          </h1>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-300 mb-14"></div>

        {/* Regions and Countries */}
        <div className="flex flex-wrap">
          {continents.map((continent, index) => {
            const visibleCountries = getVisibleCountries(continent);
            const useDoubleColumn = shouldUseDoubleColumn(continent);
            const showSeeMore = shouldShowSeeMore(continent);

            return (
              <motion.div
                key={continent.code}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="w-full lg:w-1/5 px-6 mb-12 relative"
              >
                {/* Add vertical divider with proper spacing - consistent for all regions */}
                {index < continents.length - 1 && (
                  <div
                    className="absolute right-0 top-0 bottom-0 hidden lg:block"
                    style={{
                      width: "1px",
                      background: "#D1D5DB", // Consistent gray color
                      right: "0px",
                    }}
                  ></div>
                )}

                {/* Continent Name */}
                <h2 className="text-xl title-font mb-5 text-black">
                  {continent.name}
                </h2>

                {/* Countries - conditionally use single or double column layout */}
                <motion.div
                  className={`grid ${
                    useDoubleColumn
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1"
                  } gap-3`}
                  variants={listVariants}
                  initial="hidden"
                  animate="visible"
                  key={
                    expandedRegions[continent.code] ? "expanded" : "collapsed"
                  }
                >
                  {visibleCountries.map((country, idx) => (
                    <motion.button
                      key={country.code}
                      variants={itemVariants}
                      onClick={() =>
                        handleCountrySelect(country, continent.code)
                      }
                      className={`text-left text-sm py-1.5 transition-colors body-font ${
                        selectedCountry?.code === country.code
                          ? "font-semibold text-black"
                          : "text-gray-500 hover:text-black font-normal"
                      }`}
                    >
                      {country.name}
                    </motion.button>
                  ))}
                </motion.div>

                {/* See More/Less Button - Centered - Only for Europe */}
                {showSeeMore && (
                  <div className="w-full flex justify-center mt-6">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleRegionExpand(continent.code)}
                      className="text-sm text-gray-500 hover:text-black px-4 py-1"
                    >
                      {expandedRegions[continent.code]
                        ? "See Less"
                        : "See More"}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
