'use client'

import { X, Sparkles, ArrowRight, Tag, Zap, Gift, TrendingUp, Percent } from 'lucide-react'
import React, { useState, useEffect } from 'react'

const TopBanner = () => {
  const [isVisible, setIsVisible] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  // Demo sales data
  const salesData = [
    {
      icon: Tag,
      badge: "MEGA SALE",
      discount: "70% OFF",
      description: "on all products",
      tag: "Limited Time Only",
      tagIcon: Zap
    },
    {
      icon: Gift,
      badge: "FLASH DEAL",
      discount: "Buy 2 Get 1",
      description: "on selected items",
      tag: "Today Only",
      tagIcon: Sparkles
    },
    {
      icon: Percent,
      badge: "WEEKEND SPECIAL",
      discount: "50% OFF",
      description: "on electronics",
      tag: "Ends Sunday",
      tagIcon: TrendingUp
    },
    {
      icon: Sparkles,
      badge: "NEW ARRIVALS",
      discount: "30% OFF",
      description: "latest collection",
      tag: "While Stocks Last",
      tagIcon: Zap
    }
  ]

  useEffect(() => {


    const interval = setInterval(() => {
      setIsAnimating(true)

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % salesData.length)
        setIsAnimating(false)
      }, 300) // Half of the transition time

    }, 4000) 


    return () => clearInterval(interval)


  }, [salesData.length])

  const currentSale = salesData[currentIndex]
  const CurrentIcon = currentSale.icon
  const CurrentTagIcon = currentSale.tagIcon

  if (!isVisible) return null

  return (
    <div className="relative bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-100"></div>
        <div className="absolute -bottom-4 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse delay-200"></div>
      </div>

      {/* Main Content */}
      <div className="relative container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-3 md:gap-6">
          {/* Icon */}
          <div className="hidden sm:flex items-center justify-center w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>

          {/* Message */}
          <div className={`flex flex-wrap items-center justify-center gap-2 md:gap-3 text-white transition-all duration-300 ${
            isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
          }`}>
            <div className="flex items-center gap-2">
              <CurrentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-bold text-sm sm:text-base">
                {currentSale.badge}
              </span>
            </div>
            
            <div className="hidden md:block w-px h-4 bg-white/40"></div>
            
            <p className="text-xs sm:text-sm font-medium">
              <span className="font-bold text-base sm:text-lg mx-1">{currentSale.discount}</span> {currentSale.description}
            </p>
            
            <div className="hidden md:block w-px h-4 bg-white/40"></div>
            
            <span className="flex items-center gap-1 text-xs sm:text-sm">
              <CurrentTagIcon className="w-3 h-3 sm:w-4 sm:h-4 fill-white" />
              {currentSale.tag}
            </span>
          </div>

          {/* CTA Button */}
          <button className="hidden lg:flex items-center gap-2 px-4 py-1.5 bg-white text-orange-600 rounded-lg font-semibold text-sm hover:bg-orange-50 transition-all duration-200 hover:scale-105 shadow-lg">
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="ml-2 p-1.5 hover:bg-white/20 rounded-md transition-colors"
            aria-label="Close banner"
          >
            <X className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Bottom Animated Border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-pulse"></div>
    </div>
  )
}

export default TopBanner
