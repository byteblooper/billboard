import React from 'react'
import { Navigation, Star, Phone, Shield, Store, Footprints, Bike, Car, MapPin, ChevronRight } from 'lucide-react'
import Image from 'next/image'

type Shop = {
  id: number
  name: string
  category: string
  image: string
  rating: number
  reviews: number
  distance: string
  isOpen: boolean
  verified: boolean
  openTime: string
  closeTime: string
  address: string
  description: string
  totalProducts: number
  walkTime: string
  bikeTime: string
  carTime: string
}

type ShopCardProps = {
  shop: Shop
}

const ShopCard = ({ shop }: ShopCardProps) => {
  return (
    <>
      {/* Mobile Card Design */}
      <div className="md:hidden bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all">
        {/* Top Section with Image and Basic Info */}
        <div className="relative">
          {/* Shop Image as Banner */}
          <div className="relative w-full h-32 bg-gradient-to-br from-violet-100 to-indigo-100">
            <Image
              src={shop.image}
              alt={shop.name}
              fill
              className="object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Status Badge */}
            <div className="absolute top-3 left-3">
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                shop.isOpen 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}>
                {shop.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>

            {/* Distance Badge */}
            <div className="absolute top-3 right-3">
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 text-violet-700 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {shop.distance} km
              </span>
            </div>

            {/* Rating on Image */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-bold text-white">{shop.rating}</span>
              <span className="text-xs text-white/80">({shop.reviews})</span>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Shop Name & Verified */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-lg font-bold text-gray-900 truncate flex-1">
              {shop.name}
            </h3>
            {shop.verified && (
              <Shield className="w-4 h-4 text-green-600 fill-green-200 shrink-0" />
            )}
          </div>

          {/* Category & Address */}
          <p className="text-xs text-violet-600 font-medium mb-1">{shop.category}</p>
          <p className="text-xs text-gray-500 truncate mb-3">{shop.address}</p>

          {/* Travel Times - Compact */}
          <div className="flex items-center gap-4 mb-4 text-gray-600 bg-gray-50 rounded-lg px-3 py-2">
            <div className="flex items-center gap-1">
              <Footprints className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{shop.walkTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bike className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{shop.bikeTime}</span>
            </div>
            <div className="flex items-center gap-1">
              <Car className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">{shop.carTime}</span>
            </div>
          </div>

          {/* Action Buttons - Mobile */}
          <div className="flex gap-2">
            <button className="flex-1 py-2.5 bg-violet-600 text-white rounded-xl font-semibold text-sm hover:bg-violet-700 transition-colors flex items-center justify-center gap-1.5">
              <Navigation className="w-4 h-4" />
              Directions
            </button>
            <button className="py-2.5 px-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              <Phone className="w-4 h-4" />
            </button>
            <button className="py-2.5 px-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors">
              <Store className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Card Design */}
      <div className="hidden md:block bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300">
        <div className="flex gap-4">
          {/* Shop Image */}
          <div className="shrink-0">
            <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-gray-200 shadow-sm">
              <Image
                src={shop.image}
                alt={shop.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Shop Details */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {shop.name}
                  </h3>
                  {shop.verified && (
                    <Shield className="w-5 h-5 text-green-600 fill-green-200" />
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    shop.isOpen 
                      ? 'bg-green-100 text-green-700 border border-green-300' 
                      : 'bg-red-100 text-red-700 border border-red-300'
                  }`}>
                    {shop.isOpen ? 'Open' : 'Closed'}
                  </span>
                </div>
                <p className="text-gray-600 font-medium mb-2">{shop.address}</p>
              </div>

              {/* Rating & Offers */}
              <div className="text-right">
                <div className="flex items-center gap-1 mb-1">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="text-xl font-bold text-gray-900">{shop.rating}</span>
                  <span className="text-gray-600">({shop.reviews})</span>
                </div>
                <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-semibold border border-gray-300">
                  {shop.totalProducts} offers
                </div>
              </div>
            </div>

            {/* Travel Times */}
            <div className="flex items-center gap-6 mb-4 text-gray-600">
              <div className="flex items-center gap-1">
                <Footprints className="w-5 h-5" />
                <span className="font-medium">{shop.walkTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bike className="w-5 h-5" />
                <span className="font-medium">{shop.bikeTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <Car className="w-5 h-5" />
                <span className="font-medium">{shop.carTime}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Directions
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Store className="w-5 h-5" />
                View Store
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5" />
                Call
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShopCard
