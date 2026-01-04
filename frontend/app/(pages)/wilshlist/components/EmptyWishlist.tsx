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
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-violet-200 p-12 text-center shadow-sm">
        <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-linear-to-br from-pink-100 to-rose-100 flex items-center justify-center">
          <Heart className="w-12 h-12 text-pink-400" />
        </div>
        <h3 className="text-2xl font-bold text-violet-900 mb-2">Your Wishlist is Empty</h3>
        <p className="text-violet-600 mb-8 text-sm">
          Save items you love to your wishlist and never miss a deal. Start exploring and add products you&apos;re interested in!
        </p>
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-8 py-3 bg-linear-to-r from-violet-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-indigo-600 transition-all duration-300 shadow-lg shadow-violet-200 hover:shadow-xl hover:scale-105"
        >
          <ShoppingBag className="w-5 h-5" />
          Start Shopping
        </Link>
        
        {/* Quick Tips */}
        <div className="mt-8 pt-6 border-t border-violet-100">
          <p className="text-xs text-violet-500 mb-4 font-medium">How to save items</p>
          <div className="grid grid-cols-1 gap-3 text-left">
            <div className="flex items-start gap-3 bg-violet-50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-violet-800">Click the heart icon</p>
                <p className="text-xs text-violet-600">on any product to save it</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-violet-50 rounded-lg p-3">
              <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                <Bell className="w-4 h-4 text-violet-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-violet-800">Get notified</p>
                <p className="text-xs text-violet-600">when prices drop on saved items</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Products */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-violet-900 mb-4 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          Trending Right Now
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {trendingProducts.filter(i => i.trending).slice(0, 4).map((product) => (
            <Link
              key={product.id}
              href={`/productDetails/${product.productId}`}
              className="group bg-white rounded-xl border border-violet-200 overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <div className="aspect-square relative bg-violet-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={150}
                  height={150}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5" />
                  Hot
                </div>
              </div>
              <div className="p-3">
                <h4 className="text-sm font-semibold text-violet-900 line-clamp-1 group-hover:text-violet-600 transition-colors">
                  {product.name}
                </h4>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-base font-bold text-violet-700">${product.price}</span>
                  <span className="text-xs text-violet-400 line-through">${product.originalPrice}</span>
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
