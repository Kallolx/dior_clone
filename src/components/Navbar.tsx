"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LuHeart, LuSearch, LuShoppingBag, LuUserRound, LuX } from "react-icons/lu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if viewport is mobile on mount and resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for resize
    window.addEventListener('resize', checkIfMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  return (
    <nav className="w-full py-4 md:py-6 relative bg-white">
      <div className="max-w-[1800px] mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Left - Menu Icon */}
        <div className="flex items-center z-20">
          <button 
            className="flex flex-col" 
            aria-label="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? 
              <LuX className="w-6 h-6 md:w-8 md:h-8 text-black" /> : 
              <HiOutlineMenuAlt1 className="w-6 h-6 md:w-8 md:h-8 text-black" />
            }
          </button>
        </div>

        {/* Center - Logo */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Image
            src="/dior-logo.png"
            alt="Dior"
            width={200}
            height={100}
            priority
            className="h-16 w-auto md:h-24 lg:h-32"
          />
        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-3 md:space-x-6 z-10">
          <button className="p-1" aria-label="Search">
            <LuSearch className="w-4 h-4 md:w-5 md:h-5 text-black" />
          </button>
          <button className="p-1 hidden md:block" aria-label="Wishlist">
            <LuHeart className="w-5 h-5 text-black" />
          </button>
          <button className="p-1 hidden md:block" aria-label="Account">
            <LuUserRound className="w-5 h-5 text-black" />
          </button>
          <button className="p-1" aria-label="Shopping Bag">
            <LuShoppingBag className="w-4 h-4 md:w-5 md:h-5 text-black" />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-10 pt-24 px-6 flex flex-col animate-fadeIn">
          <div className="flex flex-col space-y-6 text-lg">
            <a href="#" className="py-3 border-b border-gray-100">Women</a>
            <a href="#" className="py-3 border-b border-gray-100">Men</a>
            <a href="#" className="py-3 border-b border-gray-100">Beauty</a>
            <a href="#" className="py-3 border-b border-gray-100">Collections</a>
            <a href="#" className="py-3 border-b border-gray-100">Heritage</a>
            <a href="#" className="py-3 border-b border-gray-100">My Account</a>
            <a href="#" className="py-3 border-b border-gray-100">Wishlist</a>
          </div>
          
          <div className="mt-auto mb-8 text-sm text-gray-500">
            <div className="flex flex-col space-y-4 mt-8">
              <p>© 2023 Dior</p>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
