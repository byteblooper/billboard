'use client'

import React from 'react'
import Image from 'next/image'
import { Smartphone, ShirtIcon, Home, UtensilsCrossed } from 'lucide-react'

const Category = () => {
  // Category data
  const categories = [
    {
      id: 1,
      name: "Electronics",
      count: 2456,
      icon: Smartphone,
      gradient: "from-cyan-400 to-cyan-500",
      bgImage: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600",
      //overlay: "bg-cyan-400/80"
    },
    {
      id: 2,
      name: "Fashion",
      count: 3421,
      icon: ShirtIcon,
      gradient: "from-teal-400 to-cyan-300",
      bgImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600",
      //overlay: "bg-teal-400/70"
    },
    {
      id: 3,
      name: "Home & Living",
      count: 1876,
      icon: Home,
      gradient: "from-blue-300 to-cyan-200",
      bgImage: "https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=600",
      //overlay: "bg-blue-300/70"
    },
    {
      id: 4,
      name: "Food & Beverage",
      count: 967,
      icon: UtensilsCrossed,
      gradient: "from-teal-300 to-teal-400",
      bgImage: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600",
      //overlay: "bg-teal-300/70"
    }
  ]

  return (
    <div className="py-12 bg-cyan-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-cyan-700 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg md:text-xl text-cyan-700 font-medium">
            Premium products within 50km
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <div
                key={category.id}
                className="group relative h-64 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer hover:-translate-y-2"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={category.bgImage}
                    alt={category.name}
                    fill
                    className="object-cover opacity-70 group-hover:opacity-40 transition-opacity duration-500"
                  />
                </div>

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 ${category.overlay} group-hover:opacity-90 transition-opacity duration-500 rounded-3xl`}></div>

                {/* Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-center p-6 z-10">
                  {/* Icon */}
                  <div className="mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                    <div className="w-20 h-20 bg-cyan/30 backdrop-blur-sm rounded-2xl flex items-center justify-center border-2 border-white/50 shadow-md">
                      <Icon className="w-10 h-10 text-cyan-500" strokeWidth={2.5} />
                    </div>
                  </div>

                  {/* Category Name */}
                  <h3 className="text-xl md:text-2xl  text-cyan-600 mb-2 group-hover:scale-105 transition-transform duration-300">
                    {category.name}
                  </h3>

                  {/* Product Count */}
                  <p className="text-cyan-600 font-semibold text-sm md:text-base">
                    {category.count.toLocaleString()} products nearby
                  </p>

                  {/* Hover Arrow */}
                  <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transform translate-y-3 group-hover:translate-y-0 transition-all duration-300">
                    <div className="flex items-center gap-2 text-cyan-500 font-semibold">
                      <span>Explore</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl">
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-cyan/20 via-transparent to-transparent transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Category
