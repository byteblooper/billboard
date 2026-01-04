'use client'

import React from 'react'
import { 
  ShoppingCart, 
  Trash2, 
  Star, 
  MapPin, 
  TrendingUp, 
  Clock, 
  Bell,
  CheckCircle2,
  Store,
  AlertCircle,
  Eye
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export interface WishlistItem {
  id: number
  productId: number
  name: string
  store: string
  image: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  distance: string
  verified: boolean
  inStock: boolean
  trending: boolean
  savedDays: number
}

const WishlistItemCard = ({
  item,
  isSelected,
  viewMode,
  onSelect,
  onAddToCart,
  onRemove,
}: {
  item: WishlistItem
  isSelected: boolean
  viewMode: 'grid' | 'list'
  onSelect: (id: number) => void
  onAddToCart: (id: number) => void
  onRemove: (id: number) => void
}) => {
  if (viewMode === 'list') {
    return (
      <div
        className={`bg-white rounded-xl border-2 p-4 hover:shadow-lg transition-all duration-300 ${
          isSelected ? 'border-violet-500 shadow-md' : 'border-violet-100'
        }`}
      >
        <div className="flex gap-4">
          {/* Checkbox */}
          <div className="flex items-start pt-1">
            <label className="relative cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(item.id)}
                className="sr-only"
              />
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                isSelected
                  ? 'bg-violet-500 border-violet-500'
                  : 'bg-white border-violet-300 hover:border-violet-500'
              }`}>
                {isSelected && (
                  <CheckCircle2 className="w-3 h-3 text-white" />
                )}
              </div>
            </label>
          </div>

          {/* Image */}
          <Link href={`/productDetails/${item.productId}`} className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-violet-100 group">
            <Image
              src={item.image}
              alt={item.name}
              width={96}
              height={96}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            {!item.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">OUT OF STOCK</span>
              </div>
            )}
            {item.discount > 0 && (
              <div className="absolute top-1 left-1 bg-red-500 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                -{item.discount}%
              </div>
            )}
          </Link>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs text-violet-600 font-medium">{item.store}</span>
                  {item.verified && (
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                  )}
                  {item.trending && (
                    <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-[10px] font-semibold flex items-center gap-0.5">
                      <TrendingUp className="w-2.5 h-2.5" />
                      Trending
                    </span>
                  )}
                </div>
                <Link href={`/productDetails/${item.productId}`}>
                  <h3 className="font-semibold text-violet-900 hover:text-violet-600 transition-colors line-clamp-1">
                    {item.name}
                  </h3>
                </Link>
                <div className="flex items-center gap-3 mt-1 text-xs text-violet-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {item.rating} ({item.reviews})
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {item.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {item.savedDays}d ago
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="text-xl font-bold text-violet-900">${item.price}</p>
                {item.discount > 0 && (
                  <p className="text-xs text-violet-400 line-through">${item.originalPrice}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => onAddToCart(item.id)}
                disabled={!item.inStock}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
                  item.inStock
                    ? 'bg-violet-500 text-white hover:bg-violet-600'
                    : 'bg-violet-100 text-violet-400 cursor-not-allowed'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                {item.inStock ? 'Add to Cart' : 'Notify Me'}
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="px-3 py-2 border border-violet-200 text-violet-600 rounded-lg hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all text-sm flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid View
  return (
    <div
      className={`bg-white rounded-xl border-2 overflow-hidden hover:shadow-xl transition-all duration-300 group ${
        isSelected ? 'border-violet-500 shadow-lg' : 'border-violet-100'
      }`}
    >
      {/* Image Section */}
      <div className="relative">
        {/* Selection Checkbox */}
        <div className="absolute top-3 left-3 z-10">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(item.id)}
              className="sr-only peer"
            />
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
              isSelected
                ? 'bg-violet-500 border-violet-500'
                : 'bg-white/80 border-violet-300 hover:border-violet-500'
            }`}>
              {isSelected && (
                <CheckCircle2 className="w-4 h-4 text-white" />
              )}
            </div>
          </label>
        </div>

        {/* Product Image */}
        <Link href={`/productDetails/${item.productId}`} className="block relative h-52 overflow-hidden bg-linear-to-br from-violet-100 to-indigo-100">
          <Image
            src={item.image}
            alt={item.name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <span className="bg-white/90 backdrop-blur-sm text-violet-700 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Quick View
            </span>
          </div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {item.discount > 0 && (
            <span className="bg-linear-to-r from-red-500 to-pink-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
              -{item.discount}%
            </span>
          )}
          {item.trending && (
            <span className="bg-linear-to-r from-blue-500 to-indigo-500 text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm">
              <TrendingUp className="w-3 h-3" />
              Hot
            </span>
          )}
        </div>

        {/* Out of Stock Overlay */}
        {!item.inStock && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white text-violet-900 px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 shadow-lg">
              <AlertCircle className="w-4 h-4 text-amber-500" />
              Out of Stock
            </div>
          </div>
        )}

        {/* Saved Time Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-violet-700 px-2.5 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {item.savedDays === 1 ? 'Yesterday' : item.savedDays < 7 ? `${item.savedDays}d ago` : `${Math.floor(item.savedDays / 7)}w ago`}
          </span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Store & Verified */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Store className="w-3.5 h-3.5 text-violet-500" />
            <span className="text-xs font-medium text-violet-600">{item.store}</span>
            {item.verified && (
              <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" />
                Verified
              </span>
            )}
          </div>
        </div>

        {/* Product Name */}
        <Link href={`/productDetails/${item.productId}`}>
          <h3 className="text-base font-bold text-violet-900 mb-2 line-clamp-2 min-h-12 hover:text-violet-600 transition-colors">
            {item.name}
          </h3>
        </Link>

        {/* Rating & Distance */}
        <div className="flex items-center gap-3 mb-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="font-semibold text-violet-800">{item.rating}</span>
            <span className="text-violet-500">({item.reviews.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-1 text-violet-600">
            <MapPin className="w-3.5 h-3.5" />
            <span>{item.distance}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            ${item.price}
          </span>
          {item.discount > 0 && (
            <span className="text-sm text-violet-400 line-through">${item.originalPrice}</span>
          )}
          {item.discount > 0 && (
            <span className="text-xs text-green-600 font-semibold">
              Save ${(item.originalPrice - item.price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onAddToCart(item.id)}
            disabled={!item.inStock}
            className={`flex-1 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              item.inStock
                ? 'bg-linear-to-r from-violet-500 to-indigo-500 text-white hover:from-violet-600 hover:to-indigo-600 shadow-lg shadow-violet-200 hover:shadow-xl hover:scale-[1.02]'
                : 'bg-violet-100 text-violet-400 cursor-not-allowed'
            }`}
          >
            {item.inStock ? (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </>
            ) : (
              <>
                <Bell className="w-4 h-4" />
                Notify Me
              </>
            )}
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="px-4 py-3 border-2 border-violet-200 text-violet-600 rounded-xl hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default WishlistItemCard
