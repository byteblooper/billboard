'use client'

import React from 'react'
import { ShoppingBag, MapPin, CheckCircle, Sun, BadgeCheck } from 'lucide-react'
import HeroBanner from './HeroBanner'
import FlashSell from './FlashSell'
import JumpBanner from './JumpBanner'

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 pb-16 py-8">

        <FlashSell />
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content Panel */}
          <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left duration-700">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 border border-emerald-200">
              <Sun className="w-5 h-5 text-emerald-600 animate-pulse" />
              <span className="text-emerald-800 font-semibold text-sm">
                Trusted by 50,000+ Happy Customers
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-2">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight">
                Premium
              </h1>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-amber-500 bg-clip-text text-transparent leading-tight">
                Local Deals
              </h2>
            </div>

            {/* Subheading */}
            <p className="text-lg md:text-xl text-slate-700 font-medium max-w-md leading-relaxed">
              Verified stores within <span className="text-orange-600 font-bold">50km</span>. 
              Real-time tracking and <span className="text-emerald-600 font-bold">guaranteed quality</span>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 rounded-full font-bold text-base md:text-lg shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <ShoppingBag className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-bounce" />
                Start Shopping Now
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <button className="group flex items-center justify-center gap-3 bg-white hover:bg-emerald-50 text-emerald-600 px-8 py-4 rounded-full font-bold text-base md:text-lg border-2 border-emerald-500 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <MapPin className="w-5 h-5 md:w-6 md:h-6 group-hover:animate-pulse" />
                Explore Nearby
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-orange-100">
                <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-1">50km</div>
                <div className="text-xs md:text-sm text-slate-600 font-medium">Search Radius</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-emerald-100">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600 mb-1">24/7</div>
                <div className="text-xs md:text-sm text-slate-600 font-medium">Available</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 border border-blue-100 flex items-center">
                <div className="flex items-center justify-center gap-1  text-2xl ">
                  <BadgeCheck className='text-blue-700 w-7  h-auto' />
                <div className=" text-slate-600 font-medium">Verified</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Product Showcase */}
          <div className="lg:col-span-7 animate-in fade-in slide-in-from-right duration-700">
            <div className="rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
              <HeroBanner />
            </div>
          </div>

        </div>
      </div>
      <JumpBanner />
    </div>
  )
}

export default Hero
