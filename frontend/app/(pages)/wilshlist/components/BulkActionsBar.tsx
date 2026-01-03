'use client'

import React from 'react'
import { ShoppingCart, Trash2, CheckCircle2 } from 'lucide-react'

interface BulkActionsBarProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onAddToCart: () => void
  onRemove: () => void
}

const BulkActionsBar: React.FC<BulkActionsBarProps> = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onAddToCart,
  onRemove
}) => {
  if (selectedCount === 0) return null

  return (
    <div className="bg-linear-to-r from-violet-500 to-indigo-500 rounded-xl p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5 text-white" />
        </div>
        <span className="text-white font-medium">
          {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={onSelectAll}
          className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-white/30 transition-colors"
        >
          {selectedCount === totalCount ? 'Deselect All' : 'Select All'}
        </button>
        <button
          onClick={onAddToCart}
          className="px-4 py-2 bg-white text-violet-700 rounded-lg text-sm font-medium hover:bg-violet-50 transition-colors flex items-center gap-2"
        >
          <ShoppingCart className="w-4 h-4" />
          Add to Cart
        </button>
        <button
          onClick={onRemove}
          className="px-4 py-2 bg-white/20 text-white rounded-lg text-sm font-medium hover:bg-red-500 transition-colors flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Remove
        </button>
      </div>
    </div>
  )
}

export default BulkActionsBar
