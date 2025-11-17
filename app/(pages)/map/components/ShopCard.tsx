import React from 'react'
import { Navigation, Star, Phone, Shield, Store, Footprints, Bike, Car } from 'lucide-react'
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
    <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl p-6 border border-orange-200 hover:shadow-2xl transition-all duration-300">
      <div className="flex gap-4">
        {/* Shop Image */}
        <div className="shrink-0">
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
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
                <h3 className="text-2xl font-bold text-orange-900">
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
              <p className="text-orange-600 font-medium mb-2">{shop.address}</p>
            </div>

            {/* Rating & Offers */}
            <div className="text-right">
              <div className="flex items-center gap-1 mb-1">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-xl font-bold text-slate-800">{shop.rating}</span>
                <span className="text-slate-600">({shop.reviews})</span>
              </div>
              <div className="bg-orange-100 text-orange-700 px-3 py-1 rounded-lg text-sm font-semibold border border-orange-300">
                {shop.totalProducts} offers
              </div>
            </div>
          </div>

          {/* Travel Times */}
          <div className="flex items-center gap-6 mb-4 text-orange-600">
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
            <button className="px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2">
              <Navigation className="w-5 h-5" />
              Directions
            </button>
            <button className="px-6 py-3 bg-white text-teal-600 border-2 border-teal-600 rounded-xl font-semibold hover:bg-teal-50 transition-colors flex items-center gap-2">
              <Store className="w-5 h-5" />
              View Store
            </button>
            <button className="px-6 py-3 bg-white text-orange-600 border-2 border-orange-300 rounded-xl font-semibold hover:bg-orange-50 transition-colors flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopCard
