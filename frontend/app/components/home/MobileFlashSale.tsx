"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const MobileFlashSale = () => {
  return (
    <div className="lg:hidden px-4 py-4">
      <Link href="/products?sale=flash" className="block">
        <div className="relative w-full h-40 sm:h-48 rounded-2xl overflow-hidden shadow-lg">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-violet-600 to-pink-500" />
          
          {/* Left Side - Flash Sale */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 p-4 flex flex-col justify-center">
            <div className="bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded inline-block w-fit mb-1">
              SHOP NOW
            </div>
            <h3 className="text-white font-black text-2xl sm:text-3xl leading-tight">
              FLASH<br />SALE
            </h3>
            <div className="bg-pink-500 text-white text-sm font-bold px-3 py-1 rounded-lg mt-2 inline-block w-fit">
              70% OFF
            </div>
          </div>

          {/* Right Side - Another Sale */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 p-4 flex flex-col items-end justify-center text-right">
            <div className="bg-yellow-400 text-purple-900 text-[10px] font-bold px-2 py-0.5 rounded mb-1">
              FLASH
            </div>
            <h3 className="text-white font-black text-2xl sm:text-3xl">
              SALE
            </h3>
            <p className="text-white/80 text-xs mt-1">UP TO 50% OFF</p>
            {/* Decorative dots */}
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/50" />
              ))}
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2">
            <div className="w-8 h-8 rounded-full bg-white/20" />
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <svg className="w-24 h-6 text-white/30" viewBox="0 0 100 20">
              <path d="M0,10 Q25,0 50,10 T100,10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="5,5" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MobileFlashSale;
