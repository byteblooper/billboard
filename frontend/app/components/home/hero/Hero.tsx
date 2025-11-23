"use client";

import React from "react";
import { ShoppingBag, MapPin, BadgeCheck, Sun } from "lucide-react";
import HeroBanner from "./HeroBanner";
import FlashSell from "./FlashSell";
import JumpBanner from "./JumpBanner";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-violet-50 via-indigo-100 to-violet-50 pb-20 sm:pb-24 md:pb-28 lg:pb-32 py-10 overflow-hidden">
      {/* Flash Sale Section */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8">
        <FlashSell />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-left duration-700">
            {/* Trust Badge */}
            <div
              className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm px-5 sm:px-6 py-3 rounded-full shadow-lg 
              hover:shadow-xl transition-shadow duration-300 border border-violet-200"
            >
              <Sun className="w-5 h-5 text-violet-600 animate-pulse" />
              <span className="text-violet-700 font-semibold text-sm sm:text-base">
                Trusted by 50,000+ Happy Customers
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-1 sm:space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-violet-700 leading-tight">
                Premium
              </h1>

              <h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold 
                bg-gradient-to-r from-violet-600 via-indigo-500 to-violet-500 
                bg-clip-text text-transparent leading-tight animate-pulse"
              >
                Local Deals
              </h2>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg md:text-xl text-violet-800 font-medium max-w-md leading-relaxed">
              Verified stores within{" "}
              <span className="text-indigo-600 font-bold">50km</span>. Real-time
              tracking and{" "}
              <span className="text-violet-600 font-bold">
                guaranteed quality
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="group flex items-center justify-center gap-3 
                bg-gradient-to-r from-violet-500 to-indigo-500 
                hover:from-indigo-500 hover:to-violet-500 text-white 
                px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold 
                text-base sm:text-lg shadow-lg hover:shadow-2xl 
                transition-all duration-300 hover:scale-105 hover:-tranviolet-y-1"
              >
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                Start Shopping Now
              </button>

              <button
                className="group flex items-center justify-center gap-3 
                bg-white/60 hover:bg-white/80 text-violet-700 
                px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold 
                text-base sm:text-lg border-2 border-violet-300 
                shadow-lg hover:shadow-2xl transition-all duration-300 
                hover:scale-105 hover:-tranviolet-y-1"
              >
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
                Explore Nearby
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
              <div
                className="bg-white/50 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-md 
                hover:shadow-lg transition-shadow duration-300 border border-violet-200 text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-violet-600 mb-1">
                  50km
                </div>
                <div className="text-xs sm:text-sm text-indigo-700 font-medium">
                  Search Radius
                </div>
              </div>

              <div
                className="bg-white/50 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-md 
                hover:shadow-lg transition-shadow duration-300 border border-violet-200 text-center"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-violet-600 mb-1">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-indigo-700 font-medium">
                  Available
                </div>
              </div>

              <div
                className="bg-white/50 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-md 
                hover:shadow-lg transition-shadow duration-300 border border-violet-200 
                flex items-center justify-center"
              >
                <BadgeCheck className="text-violet-600 w-6 h-6 sm:w-7 sm:h-7 mr-2" />
                <div className="text-indigo-700 font-medium text-xs sm:text-sm">
                  Verified
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Showcase */}
          <div className="lg:col-span-7 animate-in fade-in slide-in-from-right duration-700">
            <div
              className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl 
              hover:shadow-3xl transition-shadow duration-300 border border-violet-300/40"
            >
              <HeroBanner />
            </div>
          </div>
        </div>
      </div>

      <JumpBanner />
    </div>
  );
};

export default Hero;
