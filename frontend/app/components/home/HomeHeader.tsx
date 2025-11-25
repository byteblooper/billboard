"use client";

import React, { useState } from "react";
import { MapPin, ChevronDown, ArrowRight } from "lucide-react";

const HomeHeader = () => {
  const [selectedLocation, setSelectedLocation] = useState("Select Your Location");
  const [currentLocation, setCurrentLocation] = useState("Current Location");
  

  return (
    <div className="bg-[#F2F2FC] border-b border-gray-200 sticky -top-1 z-40 ">
      <div className="container mx-auto px-4 pt-8 pb-4">
        {/* Main Title */}
        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-3">
          Get Anything You Need, From NearBy
        </h1>

        {/* Location Buttons */}
        <div className="flex flex-wrap gap-3 mb-3">
          <button 
            onClick={() => {/* Add location selector logic */}}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-full font-semibold text-sm hover:bg-violet-700 transition-colors"
          >
            <span>{selectedLocation}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
          <button 
            onClick={() => {/* Add current location logic */}}
            className="flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-full font-semibold text-sm hover:bg-violet-700 transition-colors"
          >
            <MapPin className="w-4 h-4" />
            <span>{currentLocation}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

       
      </div>
    </div>
  );
};

export default HomeHeader;
