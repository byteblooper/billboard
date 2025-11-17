'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ArrowRight, Sparkles, Zap, Gift, TrendingUp } from 'lucide-react'

const JumpBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0)
  const [isJumping, setIsJumping] = useState(false)

  // Demo banner data
  const banners = [
    {
      id: 1,
      badge: "60% OFF Limited Time",
      title: "Flash Sale: Premium Headphones",
      subtitle: "Exclusive deals from TechZone",
      buttonText: "Shop Now",
      gradient: "from-orange-500 via-red-500 to-red-600",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
      icon: Zap
    },
    {
      id: 2,
      badge: "Buy 2 Get 1 FREE",
      title: "Weekend Special: Smart Watches",
      subtitle: "Limited stock - Hurry up!",
      buttonText: "Grab Deal",
      gradient: "from-purple-500 via-pink-500 to-red-500",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
      icon: Gift
    },
    {
      id: 3,
      badge: "50% OFF Today Only",
      title: "Mega Sale: Wireless Earbuds",
      subtitle: "Premium sound, premium savings",
      buttonText: "Shop Now",
      gradient: "from-blue-500 via-indigo-500 to-purple-600",
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800",
      icon: TrendingUp
    },
    {
      id: 4,
      badge: "New Arrival 40% OFF",
      title: "Latest: Gaming Accessories",
      subtitle: "Level up your gaming experience",
      buttonText: "Explore",
      gradient: "from-green-500 via-emerald-500 to-teal-600",
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=800",
      icon: Sparkles
    }
  ]

  // Auto-change banners with jump effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsJumping(true)
      setTimeout(() => {
        setCurrentBanner((prev) => (prev + 1) % banners.length)
        setIsJumping(false)
      }, 400) // Jump duration
    }, 5000) // Change every 5 seconds

    return () => clearInterval(interval)
  }, [banners.length])

  const currentData = banners[currentBanner]
  const CurrentIcon = currentData.icon

  return (
    <div className="py-8 bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="container mx-auto px-4">
        {/* Main Banner Container with Jump Effect */}
        <div 
          className={`relative bg-gradient-to-r ${currentData.gradient} rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 ${
            isJumping ? 'scale-95 opacity-70 -translate-y-4' : 'scale-100 opacity-100 translate-y-0'
          }`}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 items-center p-6 lg:p-8">
            {/* Left Content */}
            <div 
              className={`space-y-4 transition-all duration-500 ${
                isJumping ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
              }`}
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-md px-4 py-2 rounded-full border border-white/40 shadow-lg">
                <CurrentIcon className="w-4 h-4 text-white animate-pulse" />
                <span className="text-white font-bold text-sm">
                  {currentData.badge}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {currentData.title}
              </h2>

              {/* Subtitle */}
              <p className="text-base md:text-lg text-white/90 font-medium">
                {currentData.subtitle}
              </p>

              {/* CTA Button */}
              <button className="group inline-flex items-center gap-3 bg-white hover:bg-orange-50 text-slate-800 px-6 py-3 rounded-full font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                {currentData.buttonText}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>

            {/* Right Image */}
            <div 
              className={`relative transition-all duration-500 ${
                isJumping ? 'opacity-0 scale-90 translate-y-10' : 'opacity-100 scale-100 translate-y-0'
              }`}
            >
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                <Image
                  src={currentData.image}
                  alt={currentData.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
                
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30"></div>
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-white/20 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsJumping(true)
                  setTimeout(() => {
                    setCurrentBanner(index)
                    setIsJumping(false)
                  }, 400)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentBanner 
                    ? 'w-12 bg-white' 
                    : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          {/* Eye Focus Indicator - Pulsing ring */}
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-500 ${
            isJumping ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="relative w-32 h-32">
              <div className="absolute inset-0 border-4 border-white rounded-full animate-ping"></div>
              <div className="absolute inset-4 border-4 border-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Mini Preview Cards - Eye Focus Elements */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {banners.map((banner, index) => {
            const Icon = banner.icon
            return (
              <button
                key={banner.id}
                onClick={() => {
                  setIsJumping(true)
                  setTimeout(() => {
                    setCurrentBanner(index)
                    setIsJumping(false)
                  }, 400)
                }}
                className={`group relative p-4 rounded-xl transition-all duration-300 ${
                  index === currentBanner
                    ? `bg-gradient-to-r ${banner.gradient} shadow-lg scale-105`
                    : 'bg-white hover:bg-slate-50 shadow-md hover:shadow-lg hover:scale-105'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    index === currentBanner ? 'bg-white/20' : 'bg-orange-100'
                  }`}>
                    <Icon className={`w-5 h-5 ${
                      index === currentBanner ? 'text-white' : 'text-orange-600'
                    }`} />
                  </div>
                  <div className="text-left">
                    <p className={`font-bold text-xs md:text-sm line-clamp-1 ${
                      index === currentBanner ? 'text-white' : 'text-slate-800'
                    }`}>
                      {banner.badge}
                    </p>
                    <p className={`text-xs line-clamp-1 ${
                      index === currentBanner ? 'text-white/80' : 'text-slate-600'
                    }`}>
                      {banner.title.split(':')[1] || banner.title}
                    </p>
                  </div>
                </div>
                
                {/* Active indicator */}
                {index === currentBanner && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full animate-pulse"></div>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default JumpBanner
