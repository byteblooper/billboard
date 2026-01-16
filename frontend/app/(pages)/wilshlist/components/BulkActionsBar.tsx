'use client'

import React from 'react'
import { ShoppingCart, Trash2, CheckCircle2 } from 'lucide-react'

const BulkActionsBar = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onAddToCart,
  onRemove,
}: {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onAddToCart: () => void
  onRemove: () => void
}) => {
  if (selectedCount === 0) return null

  return (
    <div className="bg-linear-to-r from-violet-500 to-indigo-500 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-3 sm:mb-4 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 shadow-lg">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </div>
        <span className="text-white text-xs sm:text-base font-medium">
          {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
        </span>
      </div>
      <div className="flex gap-1.5 sm:gap-2 w-full sm:w-auto">
        <button
          onClick={onSelectAll}
          className="flex-1 sm:flex-none px-2 sm:px-4 py-1.5 sm:py-2 bg-white/20 text-white rounded-lg text-[10px] sm:text-sm font-medium hover:bg-white/30 transition-colors"
        >
          {selectedCount === totalCount ? 'Deselect' : 'Select All'}
        </button>
        <button
          onClick={onAddToCart}
          className="flex-1 sm:flex-none px-2 sm:px-4 py-1.5 sm:py-2 bg-white text-violet-700 rounded-lg text-[10px] sm:text-sm font-medium hover:bg-violet-50 transition-colors flex items-center justify-center gap-1 sm:gap-2"
        >
          <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Add to Cart</span>
          <span className="sm:hidden">Add</span>
        </button>
        <button
          onClick={onRemove}
          className="flex-1 sm:flex-none px-2 sm:px-4 py-1.5 sm:py-2 bg-white/20 text-white rounded-lg text-[10px] sm:text-sm font-medium hover:bg-red-500 transition-colors flex items-center justify-center gap-1 sm:gap-2"
        >
          <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Remove</span>
        </button>
      </div>
    </div>
  )
}

export default BulkActionsBar
