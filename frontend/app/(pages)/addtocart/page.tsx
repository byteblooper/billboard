'use client'

import React, { useState } from 'react'
import { ShoppingCart, Trash2, Plus, Minus, Tag, ArrowRight, Lock, ShoppingBag, Percent } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Demo Data
const demoCartItems = [
  {
    id: 1,
    productId: 101,
    name: 'Premium Wireless Headphones',
    store: 'TechHub Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
    price: 149.99,
    originalPrice: 199.99,
    quantity: 1,
    inStock: true,
    maxStock: 5
  },
  {
    id: 2,
    productId: 102,
    name: 'Classic Leather Watch',
    store: 'Fashion Avenue',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
    price: 89.99,
    originalPrice: 149.99,
    quantity: 2,
    inStock: true,
    maxStock: 3
  },
  {
    id: 3,
    productId: 105,
    name: 'Smart Watch Ultra',
    store: 'TechHub Electronics',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300&h=300&fit=crop',
    price: 299.99,
    originalPrice: 461.99,
    quantity: 1,
    inStock: true,
    maxStock: 2
  }
]

const CartPage = () => {
  const [cartItems, setCartItems] = useState(demoCartItems)
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState('')

  const updateQuantity = (id: number, newQuantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && newQuantity <= item.maxStock && newQuantity > 0
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const applyCoupon = () => {
    if (couponCode.trim()) {
      setAppliedCoupon(couponCode)
      setCouponCode('')
    }
  }

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalSavings = cartItems.reduce((sum, item) => sum + (item.originalPrice - item.price) * item.quantity, 0)
  const discount = appliedCoupon ? subtotal * 0.1 : 0
  const deliveryFee = subtotal > 100 ? 0 : 5.99
  const total = subtotal - discount + deliveryFee

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900 mb-1 flex items-center gap-3">
            <ShoppingCart className="w-7 h-7 text-orange-500" />
            Shopping Cart
          </h1>
          <p className="text-slate-600 text-sm">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-slate-100">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                      {item.originalPrice > item.price && (
                        <div className="absolute top-1 right-1 bg-red-500 text-white px-1.5 py-0.5 rounded text-xs font-semibold">
                          -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900 mb-1 line-clamp-1">
                            {item.name}
                          </h3>
                          <p className="text-xs text-orange-600 font-medium">{item.store}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-600 transition-colors shrink-0"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="text-lg font-bold text-slate-900">
                              ${item.price}
                            </span>
                            {item.originalPrice > item.price && (
                              <span className="text-xs text-slate-400 line-through">
                                ${item.originalPrice}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxStock}
                              className="w-7 h-7 flex items-center justify-center border border-slate-300 rounded hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                            <span className="text-xs text-slate-500 ml-1">
                              (Max: {item.maxStock})
                            </span>
                          </div>
                        </div>

                        {/* Item Total */}
                        <div className="text-right">
                          <p className="text-xs text-slate-600 mb-1">Item Total</p>
                          <p className="text-xl font-bold text-orange-600">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-orange-600 font-medium text-sm hover:text-orange-700 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border border-slate-200 p-5 sticky top-6">
                <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>

                {/* Coupon Code */}
                <div className="mb-4 pb-4 border-b border-slate-200">
                  <label className="text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
                    <Tag className="w-4 h-4" />
                    Coupon Code
                  </label>
                  <div className="flex gap-2 mt-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 flex items-center gap-2 text-xs text-green-600">
                      <Percent className="w-3 h-3" />
                      Coupon &quot;{appliedCoupon}&quot; applied (10% off)
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 mb-4 pb-4 border-b border-slate-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Subtotal</span>
                    <span className="font-medium text-slate-900">${subtotal.toFixed(2)}</span>
                  </div>
                  {totalSavings > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Total Savings</span>
                      <span className="font-medium text-green-600">-${totalSavings.toFixed(2)}</span>
                    </div>
                  )}
                  {discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Discount</span>
                      <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Delivery Fee</span>
                    <span className="font-medium text-slate-900">
                      {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-slate-500">
                      Add ${(100 - subtotal).toFixed(2)} more for free delivery
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base font-bold text-slate-900">Total</span>
                  <span className="text-2xl font-bold text-orange-600">${total.toFixed(2)}</span>
                </div>

                {/* Checkout Button */}
                <Link
                  href="/payment"
                  className="w-full py-3 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 mb-3"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Link>

                {/* Security Note */}
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <Lock className="w-3 h-3" />
                  <span>Secure checkout</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
            <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Your Cart is Empty</h3>
            <p className="text-slate-600 mb-6 text-sm">
              Add items to your cart to get started
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" />
              Browse Products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage

