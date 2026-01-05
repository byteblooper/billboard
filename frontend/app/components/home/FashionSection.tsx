"use client";

import React from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";
import { fashionItems } from "@/app/data";

const FashionSection = () => {

  return (
    <section className="mb-8">
      <h2 className="text-xl sm:text-2xl font-black text-violet-600 mb-4">Fashion List</h2>

      <div className="flex flex-col lg:flex-row justify-between gap-4">
        {/* Product Grid - Responsive columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 flex-1 gap-3 sm:gap-4">
          {fashionItems.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>

        {/* Big Sale Banner - Hidden on mobile */}
        <div className="hidden lg:block w-70 bg-linear-to-br from-orange-400 to-yellow-500 rounded-xl p-5 text-white relative overflow-hidden shadow-lg shrink-0">
          <Image 
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400" 
            alt="Fashion Sale"
            fill
            className="object-cover opacity-50"
          />
          <div className="relative z-10">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-2.5">
              <div className="text-center">
                <div className="text-2xl font-black text-orange-500">30%</div>
                <div className="text-xs font-bold text-gray-700">OFF</div>
              </div>
            </div>
            <h3 className="text-3xl font-black mb-2">BIG SALE</h3>
            <p className="text-lg font-bold mb-2.5">79৳</p>
            <p className="text-xs opacity-90">Limited time fashion deals</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <button className="px-6 py-2.5 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
          Load More
        </button>
      </div>
    </section>
  );
};

export default FashionSection;
