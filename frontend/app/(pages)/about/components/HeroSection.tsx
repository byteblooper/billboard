"use client";

import React from "react";
import { Award } from "lucide-react";

interface StatItem {
  value: string;
  label: string;
}

interface HeroSectionProps {
  statsData: StatItem[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ statsData }) => {
  return (
    <section className="relative bg-linear-to-br from-gray-800 via-gray-900 to-black text-white overflow-hidden">
      {/* Background shapes for depth */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20 filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-violet-600 rounded-full opacity-20 filter blur-3xl animate-pulse"></div>
      </div>

      <div className="mx-auto px-4 py-24 relative z-10 flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Glassy Text Panel */}
        <div
          className="md:w-2/3 text-center md:text-left space-y-6 
                  bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-lg"
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-2 rounded-full mb-4 justify-center md:justify-start">
            <Award className="w-4 h-4 text-white/70" />
            <span className="text-sm font-semibold text-white/70">
              About NearByDeals
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-200">
            Connecting You to Local Deals Within 50KM
          </h1>

          {/* Description */}
          <p className="text-white/70 text-lg md:text-xl leading-relaxed">
            We bring verified stores, instant deals, and premium products
            right to your fingertips.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
            {statsData.map((stat, idx) => (
              <div key={idx} className="text-center md:text-left">
                <div className="text-3xl md:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
