'use client'

import React, { useState } from 'react'
import { Heart, ShoppingCart, Minus, Plus, Share2, Bell } from 'lucide-react'

const ProductActions = ({
  productId,
  productName,
  price,
  inStock,
  stockCount = 10,
}: {
  productId: number
  productName: string
  price: number
  inStock: boolean
  stockCount?: number
}) => {
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, Math.min(stockCount, prev + delta)))
  }

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of product ${productId} to cart`)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: productName,
          url: window.location.href
        })
      } catch (err) {
        console.log('Share cancelled', err)
      }
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  return (
    <div className="space-y-4">
      {/* Stock Status */}
      <div className="flex items-center gap-2">
        {inStock ? (
          <>
            <span className="w-2 h-2 rounded-full bg-green-500" />
            <span className="text-sm text-green-600 font-medium">In Stock</span>
            {stockCount <= 5 && (
              <span className="text-sm text-amber-600 ml-2">
                (Only {stockCount} left!)
              </span>
            )}
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-sm text-red-600 font-medium">Out of Stock</span>
          </>
        )}
      </div>

      {/* Quantity Selector */}
      {inStock && (
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Quantity:</span>
          <div className="flex items-center border border-violet-200 rounded-xl overflow-hidden">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-2.5 hover:bg-violet-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Minus className="w-4 h-4 text-violet-600" />
            </button>
            <span className="w-12 text-center font-medium text-gray-900">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= stockCount}
              className="p-2.5 hover:bg-violet-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Plus className="w-4 h-4 text-violet-600" />
            </button>
          </div>
          <span className="text-sm text-gray-500">
            Total: <span className="font-semibold text-violet-700">${(price * quantity).toFixed(2)}</span>
          </span>
        </div>
      )}

      {/* Main Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white transition-all shadow-lg ${
            inStock
              ? addedToCart
                ? 'bg-green-500 shadow-green-200'
                : 'bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 shadow-violet-200'
              : 'bg-gray-300 cursor-not-allowed shadow-none'
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
        </button>

        <button
          onClick={handleWishlist}
          className={`p-3.5 rounded-xl border-2 transition-all ${
            isWishlisted
              ? 'bg-pink-50 border-pink-500 text-pink-500'
              : 'border-violet-200 text-violet-600 hover:bg-violet-50'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-pink-500' : ''}`} />
        </button>

        <button
          onClick={handleShare}
          className="p-3.5 rounded-xl border-2 border-violet-200 text-violet-600 hover:bg-violet-50 transition-all"
          aria-label="Share product"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {/* Notify When Available */}
      {!inStock && (
        <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-violet-100 text-violet-700 rounded-xl font-medium hover:bg-violet-200 transition-all">
          <Bell className="w-5 h-5" />
          Notify Me When Available
        </button>
      )}

      {/* Buy Now Button */}
      {inStock && (
        <button className="w-full px-6 py-3.5 border-2 border-violet-600 text-violet-700 rounded-xl font-semibold hover:bg-violet-50 transition-all">
          Buy Now
        </button>
      )}
    </div>
  )
}

export default ProductActions
