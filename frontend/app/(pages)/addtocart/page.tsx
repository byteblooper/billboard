'use client'

import React, { useState } from 'react'
import { ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react'
import Link from 'next/link'
import CartItemCard, { CartItem } from './components/CartItemCard'
import RecommendedProducts, { RecommendedProduct } from './components/RecommendedProducts'
import EmptyCart from './components/EmptyCart'
import OutOfStockItem from './components/OutOfStockItem'
import OrderSummary from './components/OrderSummary'
import { getLegacyCartItems, getValidCouponsRecord, products } from '@/store'

// Transform products to recommended products format
const recommendedProducts: RecommendedProduct[] = products.slice(0, 4).map(p => ({
  id: p.id,
  name: p.name,
  image: p.image,
  price: p.pricing.price,
  originalPrice: p.pricing.originalPrice || p.pricing.price,
  store: p.store.name
}))

// Get legacy cart items and valid coupons from store
const initialCartItems = getLegacyCartItems()
const validCoupons = getValidCouponsRecord()

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
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/products" className="p-1.5 sm:p-2 hover:bg-violet-100 rounded-lg transition-colors">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-violet-700" />
            </Link>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-violet-900">Shopping Cart</h1>
              <p className="text-xs sm:text-sm text-violet-600">{totalItems} items in your cart</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
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
