'use client'

import React from 'react'
import { ShoppingCart, ShoppingBag, MapPin, Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { RecommendedProduct } from './RecommendedProducts'

interface EmptyCartProps {
  recommendedProducts: RecommendedProduct[]
}

const EmptyCart: React.FC<EmptyCartProps> = ({ recommendedProducts }) => {
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-violet-200 p-12 text-center shadow-sm">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-violet-100 to-indigo-100 flex items-center justify-center">
          <ShoppingCart className="w-12 h-12 text-violet-400" />
        </div>
        <h3 className="text-2xl font-bold text-violet-900 mb-2">Your Cart is Empty</h3>
        <p className="text-violet-600 mb-8 text-sm">
          Looks like you haven&apos;t added anything to your cart yet. Explore our products and find great deals near you!
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-violet-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-violet-200 hover:shadow-xl hover:scale-105"
        >
          <ShoppingBag className="w-5 h-5" />
          Start Shopping
        </Link>
        
        {/* Quick Links */}
        <div className="mt-8 pt-6 border-t border-violet-100">
          <p className="text-xs text-violet-500 mb-3">Or check out</p>
          <div className="flex justify-center gap-4">
            <Link href="/map" className="text-sm text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Nearby Stores
            </Link>
            <Link href="/wilshlist" className="text-sm text-violet-600 hover:text-violet-800 font-medium flex items-center gap-1">
              <Heart className="w-4 h-4" />
              Your Wishlist
            </Link>
          </div>
        </div>
      </div>

      {/* Recommended Products for Empty Cart */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-violet-900 mb-4 text-center">Popular Products</h3>
        <div className="grid grid-cols-2 gap-3">
          {recommendedProducts.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              href={`/productDetails?id=${product.id}`}
              className="group bg-white rounded-xl border border-violet-200 p-3 hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square rounded-lg overflow-hidden mb-2 bg-violet-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="text-sm font-semibold text-violet-900 line-clamp-1 group-hover:text-violet-600 transition-colors">
                {product.name}
              </h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-base font-bold text-violet-700">${product.price}</span>
                <span className="text-xs text-violet-400 line-through">${product.originalPrice}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmptyCart
