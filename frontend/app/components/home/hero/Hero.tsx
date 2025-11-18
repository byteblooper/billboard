"use client";

import React from "react";
import { ShoppingBag, MapPin, BadgeCheck, Sun } from "lucide-react";
import HeroBanner from "./HeroBanner";
import FlashSell from "./FlashSell";
import JumpBanner from "./JumpBanner";

const Hero = () => {
  return (
    <div className="relative bg-linear-to-br from-violet-50 via-white to-violet-100 pb-16 py-8 overflow-hidden">
      {/* Flash Sale */}
      <div className="relative z-20 px-4">
        <FlashSell />
      </div>

      {/* Decorative Background  */}
      <div className="absolute -top-20 -left-10 w-80 h-80 bg-violet-200/50 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute -bottom-16 -right-10 w-96 h-96 bg-violet-300/40 rounded-full blur-3xl animate-pulse-slow"></div>

      <div className="container mx-auto px-4 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Content */}
          <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left duration-700">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-violet-200">
              <Sun className="w-5 h-5 text-violet-500 animate-pulse" />
              <span className="text-violet-600 font-semibold text-sm">
                Trusted by 50,000+ Happy Customers
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-violet-700 leading-tight">
                Premium
              </h1>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-linear-to-r from-violet-700 via-violet-300 to-violet-500 bg-clip-text text-transparent leading-tight animate-pulse">
                Local Deals
              </h2>
            </div>

            {/* Subheading */}
            <p className="text-lg sm:text-xl text-violet-700 font-medium max-w-md leading-relaxed">
              Verified stores within{" "}
              <span className="text-violet-500 font-bold">50km</span>. Real-time
              tracking and{" "}
              <span className="text-violet-500 font-bold">
                guaranteed quality
              </span>
              .
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group flex items-center justify-center gap-3 bg-linear-to-r from-violet-400 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white px-8 py-4 rounded-full font-bold text-base sm:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-bounce" />
                Start Shopping Now
                <svg
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <button className="group flex items-center justify-center gap-3 bg-white/50 hover:bg-white/70 text-violet-600 px-8 py-4 rounded-full font-bold text-base sm:text-lg border-2 border-violet-300 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 group-hover:animate-pulse" />
                Explore Nearby
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="bg-white/50 backdrop-blur-md rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-violet-200 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-violet-500 mb-1">
                  50km
                </div>
                <div className="text-xs sm:text-sm text-violet-700 font-medium">
                  Search Radius
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-violet-200 text-center">
                <div className="text-3xl sm:text-4xl font-bold text-violet-500 mb-1">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-violet-700 font-medium">
                  Available
                </div>
              </div>
              <div className="bg-white/50 backdrop-blur-md rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-violet-200 flex items-center justify-center">
                <BadgeCheck className="text-violet-500 w-7 h-7 mr-2" />
                <div className="text-violet-700 font-medium text-sm">
                  Verified
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Showcase */}
          <div className="lg:col-span-7 animate-in fade-in slide-in-from-right duration-700">
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300 border border-violet-200/30">
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