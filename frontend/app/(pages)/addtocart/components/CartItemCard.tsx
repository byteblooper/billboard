'use client'

import React from 'react'
import { 
  Trash2, 
  Plus, 
  Minus, 
  Heart,
  MapPin,
  Clock,
  Store,
  CheckCircle2
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export interface CartItem {
  id: number
  productId: number
  name: string
  store: string
  storeVerified: boolean
  image: string
  price: number
  originalPrice: number
  quantity: number
  inStock: boolean
  maxStock: number
  distance: string
  deliveryTime: string
}

interface CartItemCardProps {
  item: CartItem
  onUpdateQuantity: (id: number, quantity: number) => void
  onRemove: (id: number) => void
  onMoveToWishlist: (id: number) => void
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  item,
  onUpdateQuantity,
  onRemove,
  onMoveToWishlist
}) => {
  return (
    <div className="bg-white rounded-xl border border-violet-200 p-4 hover:shadow-lg hover:border-violet-300 transition-all duration-300">
      <div className="flex gap-4">
        {/* Product Image */}
        <Link href={`/productDetails/${item.productId}`} className="relative w-28 h-28 shrink-0 rounded-xl overflow-hidden bg-linear-to-br from-violet-100 to-indigo-100 group">
          <Image
            src={item.image}
            alt={item.name}
            width={112}
            height={112}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {item.originalPrice > item.price && (
            <div className="absolute top-1.5 left-1.5 bg-linear-to-r from-red-500 to-pink-500 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">
              -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
            </div>
          )}
        </Link>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between gap-4 mb-2">
            <div className="flex-1">
              <Link href={`/productDetails/${item.productId}`}>
                <h3 className="font-semibold text-violet-900 mb-1 line-clamp-1 hover:text-violet-600 transition-colors">
                  {item.name}
                </h3>
              </Link>
              <div className="flex items-center gap-2 text-xs text-violet-600">
                <Store className="w-3 h-3" />
                <span className="font-medium">{item.store}</span>
                {item.storeVerified && (
                  <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-0.5">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    Verified
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1.5 text-xs text-violet-500">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.distance}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {item.deliveryTime}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => onMoveToWishlist(item.id)}
                className="p-1.5 text-violet-400 hover:text-pink-500 hover:bg-pink-50 rounded-lg transition-all"
                title="Move to Wishlist"
              >
                <Heart className="w-4 h-4" />
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="p-1.5 text-violet-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 mt-3">
            <div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xl font-bold text-violet-900">
                  ${item.price.toFixed(2)}
                </span>
                {item.originalPrice > item.price && (
                  <span className="text-sm text-violet-400 line-through">
                    ${item.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-8 h-8 flex items-center justify-center border border-violet-300 rounded-lg hover:bg-violet-50 hover:border-violet-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Minus className="w-3.5 h-3.5 text-violet-700" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-violet-900">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  disabled={item.quantity >= item.maxStock}
                  className="w-8 h-8 flex items-center justify-center border border-violet-300 rounded-lg hover:bg-violet-50 hover:border-violet-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <Plus className="w-3.5 h-3.5 text-violet-700" />
                </button>
                <span className="text-xs text-violet-500 ml-2">
                  Max {item.maxStock}
                </span>
              </div>
            </div>

            {/* Item Total */}
            <div className="text-right">
              <p className="text-xs text-violet-500 mb-0.5">Item Total</p>
              <p className="text-xl font-bold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartItemCard
