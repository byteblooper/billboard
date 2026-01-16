'use client'

import React from 'react'
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation,
  Footprints,
  Bike,
  Car,
  Star,
  Shield
} from 'lucide-react'
import { Store } from '@/store'

interface StoreInfoProps {
  store: Store
}

export default function StoreInfo({ store }: StoreInfoProps) {
  return (
    <div className="space-y-4">
      {/* Store Hours Card - Mobile Horizontal, Desktop Vertical */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Clock className="w-5 h-5 text-violet-600" />
          Store Hours
        </h3>
        <div className="flex sm:flex-col gap-4 sm:gap-3">
          <div className="flex-1 sm:flex-none flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-gray-600 text-sm">Opens</span>
            <span className="font-semibold text-gray-900">{store.hours.openTime}</span>
          </div>
          <div className="flex-1 sm:flex-none flex items-center justify-between bg-gray-50 rounded-xl px-4 py-3">
            <span className="text-gray-600 text-sm">Closes</span>
            <span className="font-semibold text-gray-900">{store.hours.closeTime}</span>
          </div>
        </div>
        <div className={`mt-3 px-4 py-2 rounded-xl text-center font-semibold text-sm ${
          store.hours.isOpen 
            ? 'bg-green-100 text-green-700' 
            : 'bg-red-100 text-red-700'
        }`}>
          {store.hours.isOpen ? '✓ Currently Open' : '✗ Currently Closed'}
        </div>
      </div>

      {/* Location Card */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-violet-600" />
          Location
        </h3>
        <p className="text-gray-600 text-sm mb-4">{store.location.address}</p>
        
        {/* Travel Times */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-violet-50 rounded-xl p-3 text-center">
            <Footprints className="w-5 h-5 text-violet-600 mx-auto mb-1" />
            <span className="text-xs text-gray-500 block">Walk</span>
            <span className="font-semibold text-gray-900 text-sm">{store.location.walkTime}</span>
          </div>
          <div className="bg-violet-50 rounded-xl p-3 text-center">
            <Bike className="w-5 h-5 text-violet-600 mx-auto mb-1" />
            <span className="text-xs text-gray-500 block">Bike</span>
            <span className="font-semibold text-gray-900 text-sm">{store.location.bikeTime}</span>
          </div>
          <div className="bg-violet-50 rounded-xl p-3 text-center">
            <Car className="w-5 h-5 text-violet-600 mx-auto mb-1" />
            <span className="text-xs text-gray-500 block">Car</span>
            <span className="font-semibold text-gray-900 text-sm">{store.location.carTime}</span>
          </div>
        </div>

        {/* Directions Button */}
        <button className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
          <Navigation className="w-5 h-5" />
          Get Directions
        </button>
      </div>

      {/* Contact Card - Hidden on Mobile, visible on larger screens */}
      <div className="hidden sm:block bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Phone className="w-5 h-5 text-violet-600" />
          Contact
        </h3>
        <button className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2">
          <Phone className="w-5 h-5" />
          Call Store
        </button>
      </div>

      {/* Trust Badges */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm">
        <h3 className="font-bold text-gray-900 mb-3">Why Shop Here</h3>
        <div className="space-y-3">
          {store.verified && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">Verified Store</p>
                <p className="text-xs text-gray-500">Authentic & Trusted</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Top Rated</p>
              <p className="text-xs text-gray-500">{store.rating} stars from {store.reviews} reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900 text-sm">Nearby</p>
              <p className="text-xs text-gray-500">Only {store.location.distance} away</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
