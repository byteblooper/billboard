"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles, Zap, Gift, TrendingUp } from "lucide-react";

const JumpBanner = () => {
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);

  const banners = [
    {
      id: 1,
      badge: "60% OFF Limited Time",
      title: "Flash Sale Premium Headphones",
      subtitle: "Experience superior sound today.",
      btn: "Shop Now",
      gradient: "from-violet-600/90 via-violet-500/90 to-indigo-600/90",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=900",
      icon: Zap,
    },
    {
      id: 2,
      badge: "Buy 2 Get 1 FREE",
      title: "Smart Watches Weekend Special",
      subtitle: "Advanced tech. Modern lifestyle.",
      btn: "Grab Deal",
      gradient: "from-indigo-600/90 via-indigo-500/90 to-violet-600/90",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900",
      icon: Gift,
    },
    {
      id: 3,
      badge: "50% OFF Today Only",
      title: "Wireless Earbuds Mega Sale",
      subtitle: "Feel every beat. Hear the difference.",
      btn: "Shop Now",
      gradient: "from-violet-700/90 via-indigo-600/90 to-indigo-700/90",
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=900",
      icon: TrendingUp,
    },
    {
      id: 4,
      badge: "New Arrival 40% OFF",
      title: "Gaming Accessories Collection",
      subtitle: "Level up your gaming experience.",
      btn: "Explore",
      gradient: "from-indigo-500/90 via-violet-500/90 to-violet-600/90",
      image:
        "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=900",
      icon: Sparkles,
    },
  ];

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % banners.length);
        setAnimate(false);
      }, 450);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const current = banners[index];
  const Icon = current.icon;

  return (
    <div className="py-12 bg-gradient-to-br from-indigo-50 via-violet-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* MAIN BANNER */}
        <div
          className={`
            relative rounded-3xl overflow-hidden shadow-2xl
            bg-gradient-to-r ${current.gradient}
            transition-all duration-500
            ${animate ? "scale-95 opacity-60" : "scale-100 opacity-100"}
          `}
        >
          {/* Animated Glow */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute -top-20 -left-10 w-72 h-72 bg-white/60 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/40 rounded-full blur-3xl animate-pulse delay-700"></div>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 p-8 gap-10 items-center">
            {/* LEFT CONTENT */}
            <div
              className={`
                space-y-4 transition-all duration-500
                ${
                  animate
                    ? "opacity-0 tranviolet-x-8"
                    : "opacity-100 tranviolet-x-0"
                }
              `}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-xl px-5 py-2 rounded-full border border-white/40 shadow-md">
                <Icon className="w-5 h-5 text-white animate-pulse" />
                <span className="text-white font-bold text-sm">
                  {current.badge}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
                {current.title}
              </h1>

              {/* Subtitle */}
              <p className="text-white/90 text-lg font-medium max-w-md">
                {current.subtitle}
              </p>

              {/* Button */}
              <button className="mt-2  bg-white text-violet-900 px-7 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all hover:scale-105 flex items-center gap-3 hover:-tranviolet-y-1">
                {current.btn} <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* RIGHT IMAGE */}
            <div
              className={`
                relative transition-all duration-500
                ${
                  animate
                    ? "opacity-0 scale-90 tranviolet-y-8"
                    : "opacity-100 scale-100 tranviolet-y-0"
                }
              `}
            >
              <div className="aspect-square md:aspect-[16/12] rounded-2xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-md bg-white/10">
                <Image
                  src={current.image}
                  alt="banner image"
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>

              {/* Glow accents */}
              <div className="absolute -top-3 -right-3 w-16 h-16 bg-white/30 blur-2xl rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* SLIDER DOTS */}
          {/* <div className="absolute bottom-6  left-1/2 -tranviolet-x-1/2 flex gap-3">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                className={`
                  h-3 rounded-full  transition-all duration-300
                  ${
                    i === index
                      ? "w-12 bg-white"
                      : "w-3 bg-white/40 hover:bg-white/60"
                  }
                `}
              />
            ))}
          </div> */}
        </div>

        {/* PREVIEW BUTTONS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-8">
          {banners.map((b, i) => {
            const SmallIcon = b.icon;
            return (
              <button
                key={b.id}
                onClick={() => setIndex(i)}
                className={`group p-4 rounded-xl shadow-md transition-all duration-300
                  ${
                    index === i
                      ? `bg-gradient-to-r ${b.gradient} scale-105 shadow-xl`
                      : "bg-white hover:scale-105 hover:shadow-xl"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-lg ${
                      index === i ? "bg-white/20" : "bg-violet-100"
                    }`}
                  >
                    <SmallIcon
                      className={`w-5 h-5 ${
                        index === i ? "text-white" : "text-violet-600"
                      }`}
                    />
                  </div>
                  <div>
                    <p
                      className={`text-sm font-bold ${
                        index === i ? "text-white" : "text-violet-800"
                      }`}
                    >
                      {b.badge}
                    </p>
                    <p
                      className={`text-xs ${
                        index === i ? "text-white/80" : "text-violet-500"
                      }`}
                    >
                      {b.title}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default JumpBanner;
