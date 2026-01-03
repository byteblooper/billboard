'use client'

import React from 'react'
import { ShoppingBag, MapPin, User } from 'lucide-react'
import Image from 'next/image'

const BrandingPanel: React.FC = () => {
  return (
    <div className="hidden md:block">
      <div className="bg-linear-to-br from-violet-500 to-indigo-600 rounded-3xl p-12 text-white shadow-2xl">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white p-3 rounded-xl">
              <ShoppingBag className="w-8 h-8 text-violet-500" />
            </div>
            <h1 className="text-3xl font-bold">NearByDeals</h1>
          </div>
          <p className="text-violet-100 text-lg">
            Discover amazing deals from shops near you
          </p>
        </div>

        <div className="space-y-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="bg-violet-400 p-2 rounded-lg shrink-0">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Location-Based Shopping</h3>
              <p className="text-violet-100">Find deals from stores closest to you</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-violet-400 p-2 rounded-lg shrink-0">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Exclusive Offers</h3>
              <p className="text-violet-100">Access special deals and discounts</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="bg-violet-400 p-2 rounded-lg shrink-0">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Personalized Experience</h3>
              <p className="text-violet-100">Tailored recommendations just for you</p>
            </div>
          </div>
        </div>

        <div className="relative h-64 rounded-2xl overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=400&fit=crop"
            alt="Shopping illustration"
            width={600}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}

export default BrandingPanel
