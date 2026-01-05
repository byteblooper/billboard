"use client";

import React, { useState } from "react";
import { MapPin, ChevronDown, Search, Flame, MapPinned, TrendingUp, Truck, LayoutGrid } from "lucide-react";

const filterTabs = [
  { id: "all", label: "All product", icon: LayoutGrid },
  { id: "hot", label: "Hot deals", icon: Flame },
  { id: "nearby", label: "NearBy deals", icon: MapPinned },
  { id: "popular", label: "Popular", icon: TrendingUp },
  { id: "free", label: "Free delivery", icon: Truck },
];

const HomeHeader = () => {
  const [selectedLocation, setSelectedLocation] = useState("Select Your Location");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="bg-[#F2F2FC] border-b border-gray-200 sticky -top-1 z-40">
      <div className="container mx-auto px-4 pt-4 sm:pt-8 pb-4">




        {/* Mobile Search Bar */}
        <div className="lg:hidden mb-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-violet-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search items....."
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#8140DF] rounded-full text-sm text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#8140DF] focus:border-transparent shadow-sm"
            />
          </div>
        </div>

        {/* Main Title */}
        <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-gray-900 mb-3">
          Get Anything You Need, From NearBy
        </h1>

        {/* Location Buttons */}
        <div className="flex justify-between lg:justify-start gap-2 sm:gap-3 mb-4">

          <button 
            onClick={() => {/* Add location selector logic */}}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-violet-600 text-white rounded-full font-semibold text-xs sm:text-sm hover:bg-violet-700 transition-colors"
          >
            <span>{selectedLocation}</span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
          </button>


          <button 
            onClick={() => {/* Add current location logic */}}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 bg-white text-violet-600 border border-violet-300 rounded-full font-semibold text-xs sm:text-sm hover:bg-violet-50 transition-colors"
          >
            <span>Current Location</span>
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-violet-500" />
          </button>


        </div>

        {/* Mobile Filter Tabs */}
        <div className="lg:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-2 py-3 pt-4">
            {filterTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full font-medium text-xs whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? "bg-violet-600 text-white"
                      : "bg-white text-gray-700 border border-gray-200 hover:border-violet-300"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
