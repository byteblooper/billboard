'use client'

import React from 'react'
import { Star, ShieldCheck, Truck, RotateCcw, Tag } from 'lucide-react'

const ProductInfo = ({
  name,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  verified,
  description,
}: {
  name: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  verified: boolean
  description: string
}) => {
  return (
    <div className="space-y-6">
      {/* Title & Verified Badge */}
      <div>
        <div className="flex items-start gap-3 mb-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
            {name}
          </h1>
          {verified && (
            <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 bg-linear-to-r from-violet-500 to-indigo-500 text-white text-xs font-medium rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              Verified
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-5 h-5 ${
                  star <= Math.floor(rating)
                    ? 'fill-amber-400 text-amber-400'
                    : star === Math.ceil(rating) && rating % 1 !== 0
                    ? 'fill-amber-400/50 text-amber-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-700">{rating.toFixed(1)}</span>
          <span className="text-sm text-gray-400">|</span>
          <span className="text-sm text-violet-600 hover:underline cursor-pointer">
            {reviews.toLocaleString()} Reviews
          </span>
        </div>
      </div>

      {/* Price */}
      <div className="p-4 bg-linear-to-r from-violet-50 to-indigo-50 rounded-xl border border-violet-100">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-3xl font-bold text-violet-700">
            ${price.toFixed(2)}
          </span>
          {discount > 0 && (
            <>
              <span className="text-lg text-gray-400 line-through">
                ${originalPrice.toFixed(2)}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-500 text-white text-sm font-semibold rounded-lg">
                <Tag className="w-3.5 h-3.5" />
                {discount}% OFF
              </span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Inclusive of all taxes. Free shipping on orders above $50.
        </p>
      </div>

      {/* Description */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">{description}</p>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 bg-violet-100 rounded-full flex items-center justify-center">
            <Truck className="w-5 h-5 text-violet-600" />
          </div>
          <p className="text-xs text-gray-600">Free Shipping</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 bg-violet-100 rounded-full flex items-center justify-center">
            <RotateCcw className="w-5 h-5 text-violet-600" />
          </div>
          <p className="text-xs text-gray-600">Easy Returns</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 mx-auto mb-2 bg-violet-100 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-violet-600" />
          </div>
          <p className="text-xs text-gray-600">Secure Payment</p>
        </div>
      </div>
    </div>
  )
}

export default ProductInfo
