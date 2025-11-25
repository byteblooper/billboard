"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

const SidebarFilters = () => {
  const [searchShop, setSearchShop] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [distanceRange, setDistanceRange] = useState(50);
  const [discountRange, setDiscountRange] = useState(0);

  const categories = ["All", "Grocery", "Fashion", "Gadget"];
  const statuses = ["Open", "Closed"];

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-black text-violet-600">Filters</h3>
        <button 
          onClick={() => {
            setSearchShop("");
            setSelectedCategories([]);
            setDistanceRange(50);
            setDiscountRange(0);
          }}
          className="text-violet-600 font-semibold text-sm hover:underline"
        >
          Reset All
        </button>
      </div>

      {/* Search Shop */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-violet-600 mb-1.5">
          Search Shop
        </label>
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search shops..."
            value={searchShop}
            onChange={(e) => setSearchShop(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Category */}
      <div className="mb-4">
        <h4 className="text-xs font-bold text-gray-700 mb-2">Category</h4>
        <div className="space-y-1.5">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="w-3.5 h-3.5 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryToggle(category)}
              />
              <span className="text-sm text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Distance Range */}
      <div className="mb-4">
        <h4 className="text-xs font-bold text-gray-700 mb-2">
          Distance Range
        </h4>
        <input
          type="range"
          min="0"
          max="100"
          value={distanceRange}
          onChange={(e) => setDistanceRange(parseInt(e.target.value))}
          className="w-full h-1.5 accent-gray-900"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>0 km</span>
          <span>{distanceRange >= 100 ? 'Full City' : `${distanceRange} km`}</span>
        </div>
      </div>

      {/* Discount Range */}
      <div className="mb-4">
        <h4 className="text-xs font-bold text-gray-700 mb-2">
          Discount Range (%)
        </h4>
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          value={discountRange}
          onChange={(e) => setDiscountRange(parseInt(e.target.value))}
          className="w-full h-1.5 accent-gray-900"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          <span>0%</span>
          <span>{discountRange}%</span>
        </div>
      </div>

      {/* Status */}
      <div>
        <h4 className="text-xs font-bold text-gray-700 mb-2">Status</h4>
        <div className="space-y-1.5">
          {statuses.map((status) => (
            <label key={status} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="status"
                className="w-3.5 h-3.5 text-violet-600 focus:ring-violet-500"
              />
              <span className="text-sm text-gray-700">{status}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SidebarFilters;
