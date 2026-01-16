'use client'

import React from 'react'
import { Gift } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export interface RecommendedProduct {
  id: number
  name: string
  image: string
  price: number
  originalPrice: number
  store: string
}

const RecommendedProducts = ({
  products,
}: {
  products: RecommendedProduct[]
}) => {
  return (
    <div className="mt-6 sm:mt-8 bg-white rounded-lg sm:rounded-xl border border-violet-200 p-3 sm:p-5">
      <h3 className="text-sm sm:text-lg font-bold text-violet-900 mb-3 sm:mb-4 flex items-center gap-1.5 sm:gap-2">
        <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-violet-500" />
        You Might Also Like
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/productDetails/${product.id}`}
            className="group bg-linear-to-br from-violet-50 to-indigo-50 rounded-lg sm:rounded-xl p-2 sm:p-3 hover:shadow-md transition-all duration-300"
          >
            <div className="aspect-square rounded-md sm:rounded-lg overflow-hidden mb-1.5 sm:mb-2 bg-white">
              <Image
                src={product.image}
                alt={product.name}
                width={150}
                height={150}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h4 className="text-[10px] sm:text-xs font-semibold text-violet-900 line-clamp-2 mb-0.5 sm:mb-1 group-hover:text-violet-600 transition-colors">
              {product.name}
            </h4>
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-violet-700">${product.price}</span>
              <span className="text-[10px] sm:text-xs text-violet-400 line-through">${product.originalPrice}</span>
            </div>
            <p className="text-[8px] sm:text-[10px] text-violet-500 mt-0.5 sm:mt-1 truncate">{product.store}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecommendedProducts
