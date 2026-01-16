'use client'

import React from 'react'
import { Heart, ShoppingBag, Bell, TrendingUp, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { WishlistItem } from './WishlistItemCard'

const EmptyWishlist = ({
  trendingProducts,
}: {
  trendingProducts: WishlistItem[]
}) => {
  return (
    <div className="max-w-md mx-auto px-4 sm:px-0">
      <div className="bg-white rounded-xl sm:rounded-2xl border border-violet-200 p-6 sm:p-12 text-center shadow-sm">
        <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto mb-4 sm:mb-6 rounded-full bg-linear-to-br from-pink-100 to-rose-100 flex items-center justify-center">
          <Heart className="w-8 h-8 sm:w-12 sm:h-12 text-pink-400" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-violet-900 mb-2">Your Wishlist is Empty</h3>
        <p className="text-violet-600 mb-6 sm:mb-8 text-xs sm:text-sm">
          Save items you love to your wishlist and never miss a deal. Start exploring and add products you&apos;re interested in!
        </p>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 bg-linear-to-r from-violet-500 to-indigo-500 text-white rounded-lg sm:rounded-xl font-semibold hover:from-violet-600 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-violet-200 hover:shadow-xl hover:scale-105 text-sm sm:text-base"
        >
          <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
          Start Shopping
        </Link>
        
        {/* Quick Tips */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-violet-100">
          <p className="text-[10px] sm:text-xs text-violet-500 mb-3 sm:mb-4 font-medium">How to save items</p>
          <div className="grid grid-cols-1 gap-2 sm:gap-3 text-left">
            <div className="flex items-start gap-2 sm:gap-3 bg-violet-50 rounded-lg p-2 sm:p-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-violet-800">Click the heart icon</p>
                <p className="text-[10px] sm:text-xs text-violet-600">on any product to save it</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 bg-violet-50 rounded-lg p-2 sm:p-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-violet-800">Get notified</p>
                <p className="text-[10px] sm:text-xs text-violet-600">when prices drop on saved items</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Products */}
      <div className="mt-6 sm:mt-8">
        <h3 className="text-base sm:text-lg font-bold text-violet-900 mb-3 sm:mb-4 text-center flex items-center justify-center gap-1.5 sm:gap-2">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
          Trending Right Now
        </h3>
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {trendingProducts.filter(i => i.trending).slice(0, 4).map((product) => (
            <Link
              key={product.id}
              href={`/productDetails/${product.productId}`}
              className="group bg-white rounded-lg sm:rounded-xl border border-violet-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square relative bg-violet-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 bg-blue-500 text-white px-1.5 sm:px-2 py-0.5 rounded-full text-[8px] sm:text-[10px] font-bold flex items-center gap-0.5 sm:gap-1">
                  <TrendingUp className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                  Hot
                </div>
              </div>
              <div className="p-2 sm:p-3">
                <h4 className="text-xs sm:text-sm font-semibold text-violet-900 line-clamp-1 group-hover:text-violet-600 transition-colors">
                  {product.name}
                </h4>
                <div className="flex items-baseline gap-1 sm:gap-2 mt-0.5 sm:mt-1">
                  <span className="text-sm sm:text-base font-bold text-violet-700">${product.price}</span>
                  <span className="text-[10px] sm:text-xs text-violet-400 line-through">${product.originalPrice}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmptyWishlist
