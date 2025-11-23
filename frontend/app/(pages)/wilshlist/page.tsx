'use client'

import React, { useState } from 'react'
import { Heart, ShoppingCart, Trash2, Star, MapPin, Package, TrendingUp, Clock, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'



const WishlistPage = () => {

  // Demo Data
const demoWishlistItems = [
  {
    id: 1,
    productId: 101,
    name: 'Premium Wireless Headphones',
    store: 'TechHub Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.8,
    reviews: 1234,
    distance: '2.3 km',
    verified: true,
    inStock: true,
    trending: true,
    savedDays: 3
  },
  {
    id: 2,
    productId: 102,
    name: 'Classic Leather Watch',
    store: 'Fashion Avenue',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    price: 89.99,
    originalPrice: 149.99,
    discount: 40,
    rating: 4.9,
    reviews: 2100,
    distance: '1.5 km',
    verified: true,
    inStock: true,
    trending: false,
    savedDays: 7
  },
  {
    id: 3,
    productId: 103,
    name: 'Designer Sunglasses',
    store: 'Style Corner',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    price: 79.99,
    originalPrice: 114.99,
    discount: 30,
    rating: 4.6,
    reviews: 856,
    distance: '3.1 km',
    verified: false,
    inStock: true,
    trending: true,
    savedDays: 1
  },
  {
    id: 4,
    productId: 104,
    name: 'Running Shoes Pro',
    store: 'Sports Galaxy',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    price: 119.99,
    originalPrice: 149.99,
    discount: 20,
    rating: 4.7,
    reviews: 1890,
    distance: '4.2 km',
    verified: true,
    inStock: false,
    trending: false,
    savedDays: 14
  },
  {
    id: 5,
    productId: 105,
    name: 'Smart Watch Ultra',
    store: 'TechHub Electronics',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop',
    price: 299.99,
    originalPrice: 461.99,
    discount: 35,
    rating: 4.5,
    reviews: 672,
    distance: '2.3 km',
    verified: true,
    inStock: true,
    trending: true,
    savedDays: 2
  },
  {
    id: 6,
    productId: 106,
    name: 'Luxury Backpack',
    store: 'Fashion Avenue',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
    price: 89.99,
    originalPrice: 105.99,
    discount: 15,
    rating: 4.9,
    reviews: 3200,
    distance: '1.5 km',
    verified: true,
    inStock: true,
    trending: false,
    savedDays: 5
  }
]



  const [wishlistItems, setWishlistItems] = useState(demoWishlistItems)
  const [selectedItems, setSelectedItems] = useState<number[]>([])


  const removeFromWishlist = (id: number) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id))
    setSelectedItems(prev => prev.filter(itemId => itemId !== id))
  }

  const toggleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    )
  }

  const addToCart = (id: number) => {
    console.log('Added to cart:', id)
  }

  const addSelectedToCart = () => {
    console.log('Added selected to cart:', selectedItems)
    setSelectedItems([])
  }

  const removeSelected = () => {
    if (confirm(`Remove ${selectedItems.length} items from wishlist?`)) {
      setWishlistItems(prev => prev.filter(item => !selectedItems.includes(item.id)))
      setSelectedItems([])
    }
  }

  const totalSavings = wishlistItems.reduce((acc, item) => 
    acc + (item.originalPrice - item.price), 0
  )

  return (
    <div className="min-h-screen bg-violet-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-violet-900 mb-1 flex items-center gap-3">
                <Heart className="w-7 h-7 text-violet-500 fill-violet-500" />
                My Wishlist
              </h1>
              <p className="text-violet-600 text-sm">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          {wishlistItems.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              <div className="bg-white rounded-lg border border-violet-200 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Package className="w-4 h-4 text-violet-500" />
                  <p className="text-xs text-violet-600">Items</p>
                </div>
                <p className="text-xl font-bold text-violet-900">{wishlistItems.length}</p>
              </div>

              <div className="bg-white rounded-lg border border-violet-200 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-green-600" />
                  <p className="text-xs text-violet-600">Savings</p>
                </div>
                <p className="text-xl font-bold text-violet-900">${totalSavings.toFixed(0)}</p>
              </div>

              <div className="bg-white rounded-lg border border-violet-200 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <p className="text-xs text-violet-600">Trending</p>
                </div>
                <p className="text-xl font-bold text-violet-900">
                  {wishlistItems.filter(i => i.trending).length}
                </p>
              </div>

              <div className="bg-white rounded-lg border border-violet-200 p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-indigo-500" />
                  <p className="text-xs text-violet-600">Avg Rating</p>
                </div>
                <p className="text-xl font-bold text-violet-900">
                  {(wishlistItems.reduce((acc, i) => acc + i.rating, 0) / wishlistItems.length).toFixed(1)}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bulk Actions Bar */}
        {selectedItems.length > 0 && (
          <div className="bg-violet-50 border border-violet-200 rounded-lg p-3 mb-4 flex items-center justify-between">
            <span className="text-sm font-medium text-violet-700">
              {selectedItems.length} selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={addSelectedToCart}
                className="px-4 py-2 bg-violet-500 text-white rounded-lg text-sm font-medium hover:bg-violet-600 transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={removeSelected}
                className="px-4 py-2 bg-white border border-violet-300 text-violet-700 rounded-lg text-sm font-medium hover:bg-violet-50 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Wishlist Items */}
        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg border border-violet-200 overflow-hidden hover:shadow-lg transition-shadow group"
              >
                {/* Image Section */}
                <div className="relative">
                  {/* Selection Checkbox */}
                  <div className="absolute top-3 left-3 z-10">
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleSelectItem(item.id)}
                      className="w-5 h-5 text-violet-500 border-violet-300 rounded focus:ring-violet-500 cursor-pointer"
                    />
                  </div>

                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden bg-violet-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-3 right-3 flex flex-col gap-1">
                      {item.discount > 0 && (
                        <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          -{item.discount}%
                        </span>
                      )}
                      {item.trending && (
                        <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          Trending
                        </span>
                      )}
                    </div>

                    {/* Out of Stock Overlay */}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <span className="bg-white text-violet-900 px-4 py-2 rounded-lg text-sm font-semibold">
                          Out of Stock
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  {/* Store & Time */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-violet-600">{item.store}</span>
                      {item.verified && (
                        <span className="bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-medium">
                          ✓
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-violet-500">
                      {item.savedDays}d ago
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-base font-semibold text-violet-900 mb-2 line-clamp-2 min-h-[3rem]">
                    {item.name}
                  </h3>

                  {/* Rating & Distance */}
                  <div className="flex items-center gap-3 mb-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-indigo-500 fill-indigo-500" />
                      <span className="font-medium text-violet-700">{item.rating}</span>
                      <span className="text-violet-500">({item.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1 text-violet-600">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{item.distance}</span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-xl font-bold text-violet-900">${item.price}</span>
                    {item.discount > 0 && (
                      <span className="text-sm text-violet-400 line-through">${item.originalPrice}</span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(item.id)}
                      disabled={!item.inStock}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                        item.inStock
                          ? 'bg-violet-500 text-white hover:bg-violet-600'
                          : 'bg-violet-100 text-violet-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {item.inStock ? 'Add to Cart' : 'Notify'}
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="px-3 py-2.5 border border-violet-300 text-violet-600 rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-violet-200 p-12 text-center">
            <Heart className="w-16 h-16 text-violet-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-violet-900 mb-2">Your Wishlist is Empty</h3>
            <p className="text-violet-600 mb-6 text-sm">
              Save items you love to your wishlist
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-violet-500 text-white rounded-lg font-medium hover:bg-violet-600 transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishlistPage

