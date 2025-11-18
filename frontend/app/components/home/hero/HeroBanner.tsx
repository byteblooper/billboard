'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { MapPin, Clock, Car, Star, ShoppingCart, ChevronLeft, ChevronRight, Gift } from 'lucide-react'

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Demo hero products
  const heroProducts = [
    {
      id: 1,
      badge: {
        text: "WEEKEND SPECIAL",
        subtext: "Buy 2 Get 1 FREE",
        color: "bg-gradient-to-r from-green-500 to-emerald-600",
        tag: "TODAY ONLY"
      },
      name: "MacBook Pro M3 Max 16\"",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200",
      originalPrice: 3199,
      salePrice: 2499,
      discount: 22,
      rating: 4.9,
      reviews: 1847,
      specs: ["M3 Max Chip", "36GB RAM", "1TB SSD", "16\" Liquid Retina XDR"],
      location: {
        distance: "0.8km away",
        walkTime: "10 min",
        driveTime: "2 min"
      }
    },
    {
      id: 2,
      badge: {
        text: "FLASH SALE",
        subtext: "Limited Stock",
        color: "bg-gradient-to-r from-orange-500 to-red-600",
        tag: "HOT DEAL"
      },
      name: "iPhone 15 Pro Max 256GB",
      image: "https://images.unsplash.com/photo-1592286927505-2fd0f3d0e00e?w=1200",
      originalPrice: 1299,
      salePrice: 1099,
      discount: 15,
      rating: 4.8,
      reviews: 2341,
      specs: ["A17 Pro Chip", "256GB Storage", "Titanium Design", "48MP Camera"],
      location: {
        distance: "1.2km away",
        walkTime: "15 min",
        driveTime: "3 min"
      }
    },
    {
      id: 3,
      badge: {
        text: "NEW ARRIVAL",
        subtext: "Just Launched",
        color: "bg-gradient-to-r from-blue-500 to-indigo-600",
        tag: "EXCLUSIVE"
      },
      name: "Sony WH-1000XM5 Headphones",
      image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=1200",
      originalPrice: 399,
      salePrice: 299,
      discount: 25,
      rating: 4.7,
      reviews: 892,
      specs: ["Active Noise Cancelling", "30hr Battery", "Premium Sound", "Wireless"],
      location: {
        distance: "0.5km away",
        walkTime: "7 min",
        driveTime: "1 min"
      }
    }
  ]

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroProducts.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [heroProducts.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroProducts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroProducts.length) % heroProducts.length)
  }

  const currentProduct = heroProducts[currentSlide]

  return (
    <div className=" bg-slate-50 w-full ">
      {/* Top Badge */}
      <div className={`${currentProduct.badge.color} transition-colors duration-500`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Gift className="w-6 h-6 text-white" />
              <div>
                <h3 className="text-white font-bold text-lg">{currentProduct.badge.text}</h3>
                <p className="text-white/90 text-sm">{currentProduct.badge.subtext}</p>
              </div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-white font-semibold text-sm">{currentProduct.badge.tag}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <div className="relative">
        {/* Background Image */}
        <div className="relative h-[400px] bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          <Image
            src={currentProduct.image}
            alt={currentProduct.name}
            fill
            className="object-cover opacity-40"
            priority
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent"></div>
        </div>

        {/* Content Overlay */}
        <div className="absolute inset-0">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              {/* Discount Badge */}
              <div className="inline-block mb-6">
                <div className="bg-red-600 text-white px-4 py-2 rounded-md font-bold text-lg shadow-lg">
                  {currentProduct.discount}% OFF - LIMITED TIME
                </div>
              </div>

              {/* Product Name */}
              <h1 className="text-white text-3xl md:text-4xl font-bold mb-6 leading-tight">
                {currentProduct.name}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-white text-4xl font-bold">
                  ${currentProduct.salePrice}
                </span>
                <span className="text-slate-400 text-2xl line-through">
                  ${currentProduct.originalPrice}
                </span>
                <div className="flex items-center gap-1 bg-indigo-500 px-3 py-1 rounded-full">
                  <Star className="w-4 h-4 text-white fill-white" />
                  <span className="text-white font-semibold text-sm">
                    {currentProduct.rating} ({currentProduct.reviews.toLocaleString()})
                  </span>
                </div>
              </div>

              {/* Specs */}
              <div className="flex flex-wrap gap-3 mb-8">
                {currentProduct.specs.map((spec, index) => (
                  <div
                    key={index}
                    className="bg-slate-700/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg text-sm font-medium border border-slate-600"
                  >
                    {spec}
                  </div>
                ))}
              </div>

              {/* Location Info */}
              <div className="flex items-center gap-6 mb-8 text-white">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-medium">{currentProduct.location.distance}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="font-medium">{currentProduct.location.walkTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Car className="w-5 h-5" />
                  <span className="font-medium">{currentProduct.location.driveTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          {heroProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-12 bg-indigo-600' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default HeroBanner
