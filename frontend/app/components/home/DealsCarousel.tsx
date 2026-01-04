"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { dealCards } from "@/app/data";

const DealsCarousel = () => {
const [activeTab, setActiveTab] = useState("Latest");
  return (
    <div className="bg-white py-3 border-b border-gray-200">
       
      <div className="container mx-auto px-4">






        {/* Filter Tabs */}
        <div className="flex items-center justify-between flex-wrap gap-3 py-5">
          <div className="flex gap-2 flex-wrap">
            {["Latest", "Offer", "Top", "Popular"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full font-semibold text-sm transition-colors ${
                  activeTab === tab
                    ? "bg-violet-600 text-white"
                    : "bg-white text-violet-600 border border-violet-600 hover:bg-violet-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-1.5 bg-violet-600 text-white rounded-full font-semibold text-sm hover:bg-violet-700 transition-colors">
            <span>View Near Best Deals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>














        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center my-3">
          {dealCards.map((card) => (
            <div
              key={card.id}
              className={`${card.bgColor} rounded-xl p-4 min-w-52 h-30 shrink-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden`}
            >
              <Image 
                src={card.image} 
                alt={card.subtitle}
                fill
                className="object-cover opacity-70"
              />
              <div className="text-center relative z-10">
                <h3 className="text-lg font-black text-gray-900 mb-1">{card.title}</h3>
                <p className="text-sm font-semibold text-gray-700">{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsCarousel;
