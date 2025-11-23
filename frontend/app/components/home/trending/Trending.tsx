"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import ProductCards from "../../productsCards/ProductCards";

const Trending = () => {
  const trendingProducts = [
    {
      id: 1,
      discount: 35,
      verified: true,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      rating: 4.9,
      reviews: 2547,
      name: "Premium Wireless Headphones",
      store: "TechZone",
      price: 129,
      originalPrice: 199,
      distance: "0.5km away",
      walkTime: "6 min",
      bikeTime: "2 min",
      carTime: "1 min",
    },
    {
      id: 2,
      discount: 40,
      verified: true,
      image:
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
      rating: 4.7,
      reviews: 1203,
      name: "Designer Summer Collection",
      store: "StyleCo",
      price: 89,
      originalPrice: 149,
      distance: "0.8km away",
      walkTime: "10 min",
      bikeTime: "3 min",
      carTime: "2 min",
    },
    {
      id: 3,
      discount: 33,
      verified: true,
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
      rating: 4.8,
      reviews: 892,
      name: "Smart Home Bundle",
      store: "HomeMax",
      price: 299,
      originalPrice: 449,
      distance: "1.2km away",
      walkTime: "15 min",
      bikeTime: "5 min",
      carTime: "3 min",
    },
    {
      id: 4,
      discount: 31,
      verified: true,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600",
      rating: 4.9,
      reviews: 445,
      name: "Organic Coffee Beans",
      store: "BrewMaster",
      price: 24,
      originalPrice: 35,
      distance: "0.3km away",
      walkTime: "4 min",
      bikeTime: "1 min",
      carTime: "1 min",
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-violet-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 md:gap-0">
          <div>
            <h2 className="text-3xl sm:text-3xl md:text-4xl font-bold text-violet-600 mb-2">
              Trending Near You
            </h2>
            <p className="text-base sm:text-base md:text-lg text-indigo-600 font-medium">
              Premium deals from verified stores
            </p>
          </div>

          {/* Desktop Button */}
          <button
            className="hidden md:flex items-center gap-2 px-6 py-3 
            bg-white hover:bg-violet-600 
            text-violet-600 hover:text-white 
            border-2 border-violet-600 
            rounded-full font-bold 
            transition-all duration-300 
            hover:scale-105 shadow-md hover:shadow-lg"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <button
            className="flex items-center gap-2 px-8 py-3 
            bg-gradient-to-r from-violet-500 to-indigo-600 
            hover:from-violet-600 hover:to-indigo-700 
            text-white rounded-full font-bold 
            transition-all duration-300 
            hover:scale-105 shadow-lg"
          >
            View All Products
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trending;
