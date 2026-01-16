'use client'

import React from 'react'

type Product = {
  id: number
  name: string
  sales: number
  revenue: string
}
type TopProductsProps = {
  products: Product[]
}


const TopProducts = ({ products }: TopProductsProps) => {
  return (
    <div className="bg-white rounded-lg border border-violet-200">
      <div className="p-3 sm:p-4 border-b border-violet-200 flex items-center justify-between">
        <h2 className="font-semibold text-violet-900 text-sm sm:text-base">Top Products</h2>
        <button className="text-violet-600 text-xs sm:text-sm font-medium hover:text-violet-700">
          View All
        </button>
      </div>
      <div className="p-3 sm:p-4">
        <div className="space-y-3 sm:space-y-4">
          {products.map((product, index) => (
            <div key={product.id} className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-violet-100 text-violet-600 rounded-md sm:rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-violet-900 text-xs sm:text-sm truncate">
                  {product.name}
                </p>
                <p className="text-[10px] sm:text-xs text-violet-600">{product.sales} sales</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-semibold text-violet-900 text-xs sm:text-sm">{product.revenue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TopProducts
