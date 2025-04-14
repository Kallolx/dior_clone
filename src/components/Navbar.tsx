"use client";

import Image from "next/image";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LuHeart, LuSearch, LuShoppingBag, LuUserRound } from "react-icons/lu";

export default function Navbar() {
  return (
    <nav className="w-full py-6 relative bg-white">
      <div className="max-w-[1800px] mx-auto px-8 flex justify-between items-center">
        {/* Left - Menu Icon */}
        <div className="flex items-center z-10">
          <button className="flex flex-col" aria-label="Menu">
          <HiOutlineMenuAlt1 className="w-8 h-8 text-black" />
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
            className="h-32 w-auto"
          />
        </div>

        {/* Right - Icons */}
        <div className="flex items-center space-x-6 z-10 gap-2">
          <button className="p-1" aria-label="Search">
            <LuSearch className="w-5 h-5 text-black" />
          </button>
          <button className="p-1" aria-label="Wishlist">
            <LuHeart className="w-5 h-5 text-black" />
          </button>
          <button className="p-1" aria-label="Account">
            <LuUserRound className="w-5 h-5 text-black" />
          </button>
          <button className="p-1" aria-label="Shopping Bag">
            <LuShoppingBag className="w-5 h-5 text-black" />
          </button>
        </div>
      </div>
    </nav>
  );
}
