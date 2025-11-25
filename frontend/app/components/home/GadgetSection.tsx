"use client";

import React from "react";
import Image from "next/image";
import ProductCard from "./ProductCard";

const GadgetSection = () => {
  const gadgetItems = [
    { id: 1, name: "Gaming Monitor", price: "1250", unit: "Old", distance: "2.1 km", category: "gadget", image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400" },
    { id: 2, name: "Gaming Console", price: "200", unit: "Old", distance: "3.2 km", category: "gadget", image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400" },
    { id: 3, name: "Wireless Headphones", price: "6250", unit: "Old", distance: "1.7 km", category: "gadget", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
    { id: 4, name: "Hair Dryer", price: "340", unit: "Per Piece", distance: "2.9 km", category: "gadget", image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400" },
    { id: 5, name: "Mechanical Keyboard", price: "6650", unit: "Old", distance: "4.1 km", category: "gadget", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400" },
    { id: 6, name: "Gaming Mouse", price: "750", unit: "Old", distance: "2.6 km", category: "gadget", image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400" },
  ];

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-black text-violet-600 mb-4">Gadget List</h2>


    <div className="flex justify-between gap-4 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 flex-1 gap-4 ">
        {gadgetItems.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
        
      </div>
      {/* Cyber Monday Banner */}
        <div className="w-70 bg-linear-to-br from-gray-900 via-purple-900 to-pink-900 rounded-xl p-5 text-white relative overflow-hidden shadow-lg shrink-0">
          <Image 
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400" 
            alt="Cyber Monday Sale"
            fill
            className="object-cover opacity-15"
          />
          <div className="relative z-10">
            <h3 className="text-sm font-light mb-1">Friday</h3>
            <h4 className="text-xl font-black mb-3.5">BLACK WEEK</h4>
            <div className="text-2xl font-black mb-2.5">
              UPTO 50% OFF
            </div>
            <div className="mt-5">
              <div className="inline-block bg-pink-600 text-white px-3 py-1.5 rounded-full text-xs font-bold">
                CYBER MONDAY
              </div>
              <div className="text-3xl font-black mt-2.5">50%</div>
              <div className="text-sm font-bold">SALE OFF</div>
            </div>
          </div>
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

export default GadgetSection;
