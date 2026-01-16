'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  MapPin, 
  Star, 
  Shield, 
  Clock, 
  ArrowLeft,
  Share2,
  Heart
} from 'lucide-react'
import { Store } from '@/store'

interface StoreHeaderProps {
  store: Store
  productCount: number
}

export default function StoreHeader({ store, productCount }: StoreHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200">
      {/* Mobile Header */}
      <div className="lg:hidden">
        {/* Back Navigation */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <Link 
            href="/map" 
            className="flex items-center gap-2 text-violet-600 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Heart className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Store Banner */}
        <div className="relative h-40 sm:h-48">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${
              store.hours.isOpen 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}>
              {store.hours.isOpen ? 'Open Now' : 'Closed'}
            </span>
          </div>

          {/* Verified Badge */}
          {store.verified && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/90 text-green-700 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 fill-green-200" />
                Verified
              </span>
            </div>
          )}
        </div>

        {/* Store Info */}
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold text-gray-900 mb-1">{store.name}</h1>
          <p className="text-sm text-violet-600 font-medium mb-2">{store.category}</p>
          
          {/* Rating & Reviews */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span className="font-bold text-gray-900">{store.rating}</span>
              <span className="text-gray-500 text-sm">({store.reviews} reviews)</span>
            </div>
            <span className="text-gray-300">•</span>
            <span className="text-gray-600 text-sm">{productCount} Products</span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4 text-violet-500" />
            <span>{store.location.address}</span>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-gray-500 hover:text-violet-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/map" className="text-gray-500 hover:text-violet-600 transition-colors">
              Stores
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-violet-600 font-medium">{store.name}</span>
          </nav>

          <div className="flex gap-6">
            {/* Store Image */}
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden border-2 border-gray-200 shadow-lg shrink-0">
              <Image
                src={store.image}
                alt={store.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Store Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{store.name}</h1>
                    {store.verified && (
                      <Shield className="w-6 h-6 text-green-600 fill-green-200" />
                    )}
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      store.hours.isOpen 
                        ? 'bg-green-100 text-green-700 border border-green-300' 
                        : 'bg-red-100 text-red-700 border border-red-300'
                    }`}>
                      {store.hours.isOpen ? 'Open Now' : 'Closed'}
                    </span>
                  </div>
                  
                  <p className="text-violet-600 font-medium text-lg mb-2">{store.category}</p>
                  <p className="text-gray-600 mb-4 max-w-2xl">{store.description}</p>

                  {/* Stats Row */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-xl font-bold text-gray-900">{store.rating}</span>
                      <span className="text-gray-500">({store.reviews} reviews)</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-violet-500" />
                      <span className="text-gray-600">{store.location.distance}</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <span className="text-gray-600 font-medium">{productCount} Products</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="p-3 hover:bg-gray-100 rounded-xl transition-colors border border-gray-200">
                    <Heart className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
