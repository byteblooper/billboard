'use client'

import React from 'react'
import { Trash2, Heart } from 'lucide-react'
import Image from 'next/image'
import { CartItem } from './CartItemCard'

interface OutOfStockItemProps {
  item: CartItem
  onRemove: (id: number) => void
  onMoveToWishlist: (id: number) => void
}

const OutOfStockItem: React.FC<OutOfStockItemProps> = ({
  item,
  onRemove,
  onMoveToWishlist
}) => {
  return (
    <div className="bg-white/60 rounded-xl border border-amber-200 p-4 opacity-75">
      <div className="flex gap-4">
        <div className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-gray-100 grayscale">
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white text-xs font-bold">OUT OF STOCK</span>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-700 mb-1 line-clamp-1">{item.name}</h3>
          <p className="text-xs text-gray-500">{item.store}</p>
          <p className="text-sm font-bold text-gray-600 mt-2">${item.price.toFixed(2)}</p>
        </div>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => onMoveToWishlist(item.id)}
            className="p-1.5 text-gray-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all text-xs flex items-center gap-1"
          >
            <Heart className="w-3.5 h-3.5" />
            <span>Save</span>
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all text-xs flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default OutOfStockItem
