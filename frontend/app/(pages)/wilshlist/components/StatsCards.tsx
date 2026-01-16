'use client'

import React from 'react'
import { Package, Zap, TrendingUp, Star } from 'lucide-react'
import { WishlistItem } from './WishlistItemCard'

const StatsCards = ({
  items,
}: {
  items: WishlistItem[]
}) => {
  const totalSavings = items.reduce((acc, item) => 
    acc + (item.originalPrice - item.price), 0
  )

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-6">
      <div className="bg-white rounded-lg sm:rounded-xl border border-violet-200 p-2.5 sm:p-4 hover:shadow-md transition-all">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-violet-100 flex items-center justify-center">
            <Package className="w-3 h-3 sm:w-4 sm:h-4 text-violet-600" />
          </div>
          <p className="text-[10px] sm:text-xs text-violet-600 font-medium">Total Items</p>
        </div>
        <p className="text-lg sm:text-2xl font-bold text-violet-900">{items.length}</p>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl border border-violet-200 p-2.5 sm:p-4 hover:shadow-md transition-all">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-green-100 flex items-center justify-center">
            <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
          </div>
          <p className="text-[10px] sm:text-xs text-violet-600 font-medium">Savings</p>
        </div>
        <p className="text-lg sm:text-2xl font-bold text-green-600">${totalSavings.toFixed(0)}</p>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl border border-violet-200 p-2.5 sm:p-4 hover:shadow-md transition-all">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-blue-100 flex items-center justify-center">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
          </div>
          <p className="text-[10px] sm:text-xs text-violet-600 font-medium">Trending</p>
        </div>
        <p className="text-lg sm:text-2xl font-bold text-violet-900">
          {items.filter(i => i.trending).length}
        </p>
      </div>

      <div className="bg-white rounded-lg sm:rounded-xl border border-violet-200 p-2.5 sm:p-4 hover:shadow-md transition-all">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-1 sm:mb-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-md sm:rounded-lg bg-indigo-100 flex items-center justify-center">
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-600" />
          </div>
          <p className="text-[10px] sm:text-xs text-violet-600 font-medium">Avg Rating</p>
        </div>
        <p className="text-lg sm:text-2xl font-bold text-violet-900">
          {items.length > 0 ? (items.reduce((acc, i) => acc + i.rating, 0) / items.length).toFixed(1) : '0.0'}
        </p>
      </div>
    </div>
  )
}

export default StatsCards
