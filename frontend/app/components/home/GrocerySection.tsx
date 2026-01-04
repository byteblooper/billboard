"use client";

import React from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";
import { groceryItems } from "@/app/data";

const GrocerySection = () => {

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-black text-violet-600 mb-4">Grocery List</h2>


    <div className="flex justify-between gap-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-1 gap-4 ">
        {groceryItems.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
        
      </div>
      {/* Flash Sale Banner */}
        <div className="w-70 bg-linear-to-br from-violet-600 via-purple-600 to-pink-600 rounded-xl p-5 text-white relative overflow-hidden shadow-lg shrink-0">
          <Image 
            src="https://images.unsplash.com/photo-1601599561213-832382fd07ba?w=400" 
            alt="Flash Sale"
            fill
            className="object-cover opacity-90"
          />
          <div className="relative z-10">
            <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-2.5">
              SALE
            </div>
            <h3 className="text-3xl font-black mb-3">
              FLASH SALE<br />40%
            </h3>
            <p className="text-xs mb-4 opacity-90">
              Grab amazing deals on selected groceries. Limited time offer!
            </p>
            <button className="bg-white text-violet-600 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
          <div className="absolute bottom-0 right-0 w-28 h-28 bg-white/10 rounded-full blur-3xl"></div>
        </div>

    </div>
      <div className="text-center mt-5">
        <button className="px-6 py-2 mt-5 bg-black text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-colors">
          Load More
        </button>
      </div>
    </section>
  );
};

export default GrocerySection;
