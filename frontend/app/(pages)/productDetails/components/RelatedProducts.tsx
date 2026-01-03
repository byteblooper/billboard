'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Heart, ShoppingCart, ShieldCheck } from 'lucide-react'

interface RelatedProduct {
  id: number
  name: string
  image: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  verified: boolean
}

interface RelatedProductsProps {
  products: RelatedProduct[]
  title?: string
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  title = 'Related Products'
}) => {
  const handleQuickAction = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-linear-to-b from-violet-500 to-indigo-500 rounded-full" />
        {title}
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/productDetails/${product.id}`}
            className="group bg-white rounded-2xl border border-violet-100 overflow-hidden hover:shadow-lg hover:shadow-violet-100 transition-all cursor-pointer"
          >
            {/* Image Container */}
            <div className="relative aspect-square bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-105 transition-transform"
              />

              {/* Discount Badge */}
              {product.discount > 0 && (
                <span className="absolute top-3 left-3 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-lg">
                  -{product.discount}%
                </span>
              )}

              {/* Verified Badge */}
              {product.verified && (
                <span className="absolute top-3 right-3 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-white" />
                </span>
              )}

              {/* Quick Actions */}
              <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={handleQuickAction} className="p-2 bg-white rounded-full shadow-md hover:bg-violet-50 transition-colors">
                  <Heart className="w-4 h-4 text-violet-600" />
                </button>
                <button onClick={handleQuickAction} className="p-2 bg-violet-600 rounded-full shadow-md hover:bg-violet-700 transition-colors">
                  <ShoppingCart className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 text-sm line-clamp-2 mb-2 group-hover:text-violet-700 transition-colors">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="text-xs font-medium text-gray-700">
                  {product.rating.toFixed(1)}
                </span>
                <span className="text-xs text-gray-400">
                  ({product.reviews})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-lg font-bold text-violet-700">
                  ${product.price.toFixed(2)}
                </span>
                {product.discount > 0 && (
                  <span className="text-xs text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center">
        <Link href="/shop" className="inline-block px-6 py-2.5 border-2 border-violet-600 text-violet-700 font-medium rounded-xl hover:bg-violet-50 transition-all">
          View All Products
        </Link>
      </div>
    </div>
  )
}

export default RelatedProducts
