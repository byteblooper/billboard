"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface MobileAdBannerProps {
  variant?: "purple" | "orange" | "blue" | "green";
  title?: string;
  subtitle?: string;
  discount?: string;
  link?: string;
  image?: string;
}

const variants = {
  purple: {
    bg: "bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600",
    accent: "bg-pink-500",
  },
  orange: {
    bg: "bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500",
    accent: "bg-red-500",
  },
  blue: {
    bg: "bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-500",
    accent: "bg-indigo-500",
  },
  green: {
    bg: "bg-gradient-to-r from-green-600 via-emerald-500 to-teal-500",
    accent: "bg-lime-500",
  },
};

const MobileAdBanner = ({
  variant = "purple",
  title = "SPECIAL OFFER",
  subtitle = "Limited Time Only",
  discount = "50% OFF",
  link = "/shop",
  image,
}: MobileAdBannerProps) => {
  const style = variants[variant];

  return (
    <div className="lg:hidden  py-3">
      <Link href={link} className="block">
        <div className={`relative w-full h-24 sm:h-28 rounded-2xl overflow-hidden shadow-md ${style.bg}`}>
          {/* Background Image (optional) */}
          {image && (
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover opacity-30"
            />
          )}

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-between px-4 sm:px-6">
            {/* Left Side */}
            <div className="flex flex-col gap-1">
              <span className={`${style.accent} text-white text-[10px] font-bold px-2 py-0.5 rounded w-fit`}>
                HOT DEAL
              </span>
              <h3 className="text-white font-black text-lg sm:text-xl leading-tight">
                {title}
              </h3>
              <p className="text-white/80 text-xs">{subtitle}</p>
            </div>

            {/* Right Side - Discount */}
            <div className="text-right">
              <div className="bg-white text-gray-900 font-black text-lg sm:text-xl px-3 py-1.5 rounded-lg shadow-lg">
                {discount}
              </div>
              <p className="text-white text-[10px] mt-1 font-medium">Shop Now →</p>
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full" />
          <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white/10 rounded-full" />
        </div>
      </Link>
    </div>
  );
};

export default MobileAdBanner;
