'use client'

import React, { useState } from 'react'
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import CartItemCard, { CartItem } from './components/CartItemCard'
import RecommendedProducts, { RecommendedProduct } from './components/RecommendedProducts'
import EmptyCart from './components/EmptyCart'
import OutOfStockItem from './components/OutOfStockItem'
import OrderSummary from './components/OrderSummary'



// Demo Data
const initialCartItems: CartItem[] = [
  {
    id: 1,
    productId: 101,
    name: 'Premium Wireless Headphones with Noise Cancellation',
    store: 'AudioTech Store',
    storeVerified: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
    price: 149.99,
    originalPrice: 199.99,
    quantity: 1,
    inStock: true,
    maxStock: 5,
    distance: '0.8 km',
    deliveryTime: '15-20 min'
  },
  {
    id: 2,
    productId: 102,
    name: 'Classic Leather Watch - Rose Gold Edition',
    store: 'LuxTime Boutique',
    storeVerified: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
    price: 89.99,
    originalPrice: 129.99,
    quantity: 2,
    inStock: true,
    maxStock: 10,
    distance: '1.2 km',
    deliveryTime: '20-30 min'
  },
  {
    id: 3,
    productId: 103,
    name: 'Designer Sunglasses - UV Protection',
    store: 'SunStyle Shop',
    storeVerified: false,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=200&h=200&fit=crop',
    price: 79.99,
    originalPrice: 99.99,
    quantity: 1,
    inStock: true,
    maxStock: 8,
    distance: '0.5 km',
    deliveryTime: '10-15 min'
  },
  {
    id: 4,
    productId: 104,
    name: 'Running Shoes Pro - Limited Edition',
    store: 'SpeedFit Athletics',
    storeVerified: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
    price: 119.99,
    originalPrice: 149.99,
    quantity: 1,
    inStock: false,
    maxStock: 0,
    distance: '2.1 km',
    deliveryTime: '25-35 min'
  }
]

const recommendedProducts: RecommendedProduct[] = [
  { id: 201, name: 'Bluetooth Speaker Mini', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop', price: 39.99, originalPrice: 59.99, store: 'AudioTech Store' },
  { id: 202, name: 'Smart Watch Band', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&h=200&fit=crop', price: 24.99, originalPrice: 34.99, store: 'LuxTime Boutique' },
  { id: 203, name: 'Phone Case Premium', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&h=200&fit=crop', price: 19.99, originalPrice: 29.99, store: 'TechPro Shop' },
  { id: 204, name: 'Portable Charger 10000mAh', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop', price: 34.99, originalPrice: 49.99, store: 'TechPro Shop' }
]

const validCoupons: Record<string, number> = {
  'SAVE10': 0.10,
  'WELCOME20': 0.20,
  'NEARBY15': 0.15
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState('')
  const [couponError, setCouponError] = useState('')

  // Calculations
  const inStockItems = cartItems.filter(item => item.inStock)
  const outOfStockItems = cartItems.filter(item => !item.inStock)
  
  const subtotal = inStockItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const totalOriginal = inStockItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0)
  const totalSavings = totalOriginal - subtotal
  const discountRate = appliedCoupon ? validCoupons[appliedCoupon] : 0
  const discount = subtotal * discountRate
  const deliveryFee = subtotal >= 100 ? 0 : 5.99
  const total = subtotal - discount + deliveryFee
  const totalItems = inStockItems.reduce((sum, item) => sum + item.quantity, 0)

  // Handlers
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.min(newQuantity, item.maxStock) } : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const moveToWishlist = (id: number) => {
    removeItem(id)
  }

  const applyCoupon = () => {
    if (validCoupons[couponCode.toUpperCase()]) {
      setAppliedCoupon(couponCode.toUpperCase())
      setCouponError('')
      setCouponCode('')
    } else {
      setCouponError('Invalid coupon code')
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon('')
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <EmptyCart recommendedProducts={recommendedProducts} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link href="/shop" className="p-2 hover:bg-violet-100 rounded-lg transition-colors">
              <ArrowLeft className="w-5 h-5 text-violet-700" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-violet-900">Shopping Cart</h1>
              <p className="text-sm text-violet-600">{totalItems} items in your cart</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* In Stock Items */}
            {inStockItems.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-sm font-semibold text-violet-700 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Available Items ({inStockItems.length})
                </h2>
                {inStockItems.map((item) => (
                  <CartItemCard
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                    onMoveToWishlist={moveToWishlist}
                  />
                ))}
              </div>
            )}

            {/* Out of Stock Items */}
            {outOfStockItems.length > 0 && (
              <div className="mt-6 space-y-3">
                <h2 className="text-sm font-semibold text-amber-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  Out of Stock Items ({outOfStockItems.length})
                </h2>
                {outOfStockItems.map((item) => (
                  <OutOfStockItem
                    key={item.id}
                    item={item}
                    onRemove={removeItem}
                    onMoveToWishlist={moveToWishlist}
                  />
                ))}
              </div>
            )}

            {/* Recommended Products */}
            <RecommendedProducts products={recommendedProducts} />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <OrderSummary
              subtotal={subtotal}
              totalSavings={totalSavings}
              discount={discount}
              discountRate={discountRate}
              deliveryFee={deliveryFee}
              total={total}
              totalItems={totalItems}
              appliedCoupon={appliedCoupon}
              couponCode={couponCode}
              couponError={couponError}
              onCouponChange={setCouponCode}
              onApplyCoupon={applyCoupon}
              onRemoveCoupon={removeCoupon}
              onCouponErrorClear={() => setCouponError('')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
