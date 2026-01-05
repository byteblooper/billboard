"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  { id: 1, name: "Vegetables", image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=200&h=200&fit=crop", href: "/shop?category=vegetables" },
  { id: 2, name: "Frozen", image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=200&h=200&fit=crop", href: "/shop?category=frozen" },
  { id: 3, name: "Drinks", image: "https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200&h=200&fit=crop", href: "/shop?category=drinks" },
  { id: 4, name: "Fruits", image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=200&h=200&fit=crop", href: "/shop?category=fruits" },
  { id: 5, name: "Electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop", href: "/shop?category=electronics" },
  { id: 6, name: "Mouse", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop", href: "/shop?category=mouse" },
  { id: 7, name: "Headphone", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop", href: "/shop?category=headphone" },
  { id: 8, name: "Keyboard", image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=200&h=200&fit=crop", href: "/shop?category=keyboard" },
  { id: 9, name: "Laptop", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=200&h=200&fit=crop", href: "/shop?category=laptop" },
  { id: 10, name: "Hub", image: "https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=200&h=200&fit=crop", href: "/shop?category=hub" },
];

const MobileCategories = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const newIndex = Math.round(scrollLeft / width);
      setActiveIndex(newIndex);
    }
  };

  const totalPages = Math.ceil(categories.length / 5);

  return (
    <div className="lg:hidden bg-white py-4 border-b border-gray-100">
      <div className="px-4">
        {/* Scrollable Category Grid */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-3 pb-3 scrollbar-hide snap-x snap-mandatory"
        >
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="flex flex-col items-center gap-2 snap-start shrink-0"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-violet-100 shadow-sm hover:border-violet-400 transition-colors">
                <Image
                  src={category.image}
                  alt={category.name}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-gray-700 text-center whitespace-nowrap">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-1.5 mt-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-6 bg-violet-600"
                  : "w-1.5 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileCategories;
