'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Shield,
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  Package
} from 'lucide-react'
import { ProductDetails } from '@/store'

interface StoreProductsProps {
  products: ProductDetails[]
  storeName: string
}

export default function StoreProducts({ products, storeName }: StoreProductsProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter and sort products
  const filteredProducts = products
    .filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.pricing.price - b.pricing.price
        case 'price-high':
          return b.pricing.price - a.pricing.price
        case 'rating':
          return b.rating.rating - a.rating.rating
        case 'discount':
          return b.pricing.discount - a.pricing.discount
        default:
          return b.rating.reviews - a.rating.reviews
      }
    })

  return (
    <div>
      {/* Header with Search and Filters */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200 shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
          {/* Title & Count */}
          <div>
            <h2 className="text-xl font-bold text-gray-900">Products</h2>
            <p className="text-sm text-gray-500">{filteredProducts.length} products available</p>
          </div>

          {/* Search & Controls */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-56 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Best Discount</option>
            </select>

            {/* View Toggle - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-violet-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-violet-600 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-200 text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Products Found</h3>
          <p className="text-gray-500 mb-4">
            {searchQuery 
              ? `No products match "${searchQuery}"`
              : `${storeName} doesn't have any products yet.`
            }
          </p>
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="text-violet-600 font-medium hover:underline"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Grid View */}
          <div className={`${viewMode === 'grid' ? 'block' : 'hidden sm:hidden'}`}>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* List View - Desktop Only */}
          <div className={`${viewMode === 'list' ? 'hidden sm:block' : 'hidden'}`}>
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductListItem key={product.id} product={product} />
              ))}
            </div>
          </div>

          {/* Mobile always shows grid */}
          <div className="sm:hidden">
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

// Product Card Component
function ProductCard({ product }: { product: ProductDetails }) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <Link 
      href={`/productDetails/${product.id}`} 
      className="block bg-white rounded-xl sm:rounded-2xl p-2.5 sm:p-3 shadow-sm hover:shadow-lg transition-all duration-300 group cursor-pointer border border-gray-100"
    >
      {/* Product Image */}
      <div className="aspect-square bg-gray-50 rounded-lg sm:rounded-xl mb-2 sm:mb-2.5 flex items-center justify-center relative overflow-hidden">
        <Image 
          src={product.image} 
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {product.pricing.discount > 0 && (
          <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 px-2 py-0.5 bg-red-500 text-white text-[10px] sm:text-xs font-bold rounded-full">
            -{product.pricing.discount}%
          </div>
        )}
        
        <button 
          onClick={handleWishlist}
          className="absolute top-1.5 sm:top-2 right-1.5 sm:right-2 w-6 sm:w-7 h-6 sm:h-7 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors z-10"
        >
          <Heart className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-gray-600" />
        </button>
      </div>

      {/* Product Info */}
      <div className="mb-2 sm:mb-2.5">
        <div className="flex items-center gap-1 mb-0.5">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-[10px] sm:text-xs text-gray-600">{product.rating.rating}</span>
          {product.verified && (
            <Shield className="w-3 h-3 text-green-600 fill-green-200 ml-1" />
          )}
        </div>
        <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-0.5 group-hover:text-violet-700 transition-colors line-clamp-2">{product.name}</h3>
        <div className="flex items-baseline gap-1.5">
          <p className="text-sm sm:text-base font-black text-gray-900">
            ৳{product.pricing.price.toLocaleString()}
          </p>
          {product.pricing.originalPrice > product.pricing.price && (
            <p className="text-[10px] sm:text-xs text-gray-400 line-through">
              ৳{product.pricing.originalPrice.toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart}
        className="w-full py-1.5 sm:py-2 bg-black text-white rounded-full font-semibold text-xs sm:text-sm hover:bg-violet-600 transition-all flex items-center justify-center gap-1.5 sm:gap-2"
      >
        <ShoppingCart className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
        <span>Add to Cart</span>
      </button>
    </Link>
  )
}

// Product List Item Component (Desktop)
function ProductListItem({ product }: { product: ProductDetails }) {
  return (
    <Link 
      href={`/productDetails/${product.id}`}
      className="block bg-white rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all group"
    >
      <div className="flex gap-4">
        {/* Image */}
        <div className="relative w-32 h-32 rounded-xl overflow-hidden shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {product.pricing.discount > 0 && (
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
              -{product.pricing.discount}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium text-gray-700">{product.rating.rating}</span>
                  <span className="text-xs text-gray-500">({product.rating.reviews})</span>
                </div>
                {product.verified && (
                  <Shield className="w-4 h-4 text-green-600 fill-green-200" />
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-violet-700 transition-colors line-clamp-1 mb-1">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500 line-clamp-2 mb-2">{product.description}</p>
              <p className="text-xs text-violet-600 font-medium">{product.category} • {product.brand}</p>
            </div>

            {/* Price & Actions */}
            <div className="text-right ml-4">
              <p className="text-xl font-black text-gray-900">৳{product.pricing.price.toLocaleString()}</p>
              {product.pricing.originalPrice > product.pricing.price && (
                <p className="text-sm text-gray-400 line-through">
                  ৳{product.pricing.originalPrice.toLocaleString()}
                </p>
              )}
              <div className="flex items-center gap-2 mt-3 justify-end">
                <button className="p-2 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors">
                  <Heart className="w-5 h-5 text-gray-600" />
                </button>
                <button className="px-4 py-2 bg-violet-600 text-white rounded-xl font-semibold text-sm hover:bg-violet-700 transition-colors flex items-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
