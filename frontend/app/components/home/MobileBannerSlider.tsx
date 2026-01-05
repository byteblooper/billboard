"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

const banners = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=200&fit=crop",
    title: "BLACK FRIDAY",
    subtitle: "25% SALE",
    bgColor: "bg-gray-900",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1607083206325-caf1edaa7a0e?w=800&h=200&fit=crop",
    title: "BLACK FRIDAY",
    subtitle: "50% SALE",
    bgColor: "bg-gray-900",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=200&fit=crop",
    title: "CASH BACK",
    subtitle: "BLACK FRIDAY",
    bgColor: "bg-purple-600",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1556742111-a301076d9d18?w=800&h=200&fit=crop",
    title: "BLACK FRIDAY",
    subtitle: "NOVEMBER 25",
    bgColor: "bg-orange-500",
  },
];

const MobileBannerSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto scroll every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const nextIndex = (activeIndex + 1) % banners.length;
        const scrollWidth = scrollRef.current.offsetWidth;
        scrollRef.current.scrollTo({
          left: nextIndex * (scrollWidth * 0.7),
          behavior: "smooth",
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.offsetWidth * 0.7;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setActiveIndex(Math.min(newIndex, banners.length - 1));
    }
  };

  return (
    <div className="lg:hidden bg-[#8140DF] py-1">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto gap-1 px-2 scrollbar-hide snap-x snap-mandatory"
      >
        {banners.map((banner) => (
          <div
            key={banner.id}
            className={`${banner.bgColor} rounded-lg min-w-[70%] h-20 shrink-0 snap-start relative overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform`}
          >
            <Image
              src={banner.image}
              alt={banner.title}
              fill
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-2">
              <p className="text-[8px] font-semibold opacity-80">SPECIAL OFFER</p>
              <h3 className="text-sm font-black">{banner.title}</h3>
              <p className="text-xs font-bold text-yellow-400">{banner.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileBannerSlider;
