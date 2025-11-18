'use client'

import React from 'react'
import Image from 'next/image'
import { Star, MapPin, User, Bike, Car, ShoppingCart, CheckCircle, ArrowRight } from 'lucide-react'
import ProductCards from '../../productsCards/ProductCards'

const Trending = () => {
  // Trending products data
  const trendingProducts = [
    {
      id: 1,
      discount: 35,
      verified: true,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
      rating: 4.9,
      reviews: 2547,
      name: "Premium Wireless Headphones",
      store: "TechZone",
      price: 129,
      originalPrice: 199,
      distance: "0.5km away",
      walkTime: "6 min",
      bikeTime: "2 min",
      carTime: "1 min"
    },
    {
      id: 2,
      discount: 40,
      verified: true,
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600",
      rating: 4.7,
      reviews: 1203,
      name: "Designer Summer Collection",
      store: "StyleCo",
      price: 89,
      originalPrice: 149,
      distance: "0.8km away",
      walkTime: "10 min",
      bikeTime: "3 min",
      carTime: "2 min"
    },
    {
      id: 3,
      discount: 33,
      verified: true,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600",
      rating: 4.8,
      reviews: 892,
      name: "Smart Home Bundle",
      store: "HomeMax",
      price: 299,
      originalPrice: 449,
      distance: "1.2km away",
      walkTime: "15 min",
      bikeTime: "5 min",
      carTime: "3 min"
    },
    {
      id: 4,
      discount: 31,
      verified: true,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600",
      rating: 4.9,
      reviews: 445,
      name: "Organic Coffee Beans",
      store: "BrewMaster",
      price: 24,
      originalPrice: 35,
      distance: "0.3km away",
      walkTime: "4 min",
      bikeTime: "1 min",
      carTime: "1 min"
    }
  ]

  return (
    <div className="py-16 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              Trending Near You
            </h2>
            <p className="text-base md:text-lg text-orange-600 font-medium">
              Premium deals from verified stores
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-6 py-3 bg-white hover:bg-orange-600 text-orange-600 hover:text-white border-2 border-orange-600 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg">
            View All Products
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingProducts.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-8 flex justify-center md:hidden">
          <button className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg">
            View All Products
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Trending
