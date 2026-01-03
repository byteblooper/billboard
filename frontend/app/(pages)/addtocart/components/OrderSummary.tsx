'use client'

import React from 'react'
import { 
  Tag, 
  ArrowRight, 
  Lock, 
  Percent,
  Truck,
  Shield,
  CreditCard,
  AlertCircle
} from 'lucide-react'
import Link from 'next/link'

interface OrderSummaryProps {
  subtotal: number
  totalSavings: number
  discount: number
  discountRate: number
  deliveryFee: number
  total: number
  totalItems: number
  appliedCoupon: string
  couponCode: string
  couponError: string
  onCouponChange: (code: string) => void
  onApplyCoupon: () => void
  onRemoveCoupon: () => void
  onCouponErrorClear: () => void
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal,
  totalSavings,
  discount,
  discountRate,
  deliveryFee,
  total,
  totalItems,
  appliedCoupon,
  couponCode,
  couponError,
  onCouponChange,
  onApplyCoupon,
  onRemoveCoupon,
  onCouponErrorClear
}) => {
  return (
    <div className="bg-white rounded-xl border border-violet-200 p-5 sticky top-6 shadow-sm">
      <h2 className="text-lg font-bold text-violet-900 mb-4 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-violet-500" />
        Order Summary
      </h2>

      {/* Coupon Code */}
      <div className="mb-4 pb-4 border-b border-violet-100">
        <label className="text-sm font-medium text-violet-700 mb-2 flex items-center gap-2">
          <Tag className="w-4 h-4" />
          Promo Code
        </label>
        {appliedCoupon ? (
          <div className="mt-2 flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <div className="flex items-center gap-2 text-sm text-green-700">
              <Percent className="w-4 h-4" />
              <span className="font-semibold">{appliedCoupon}</span>
              <span className="text-green-600">({Math.round(discountRate * 100)}% off)</span>
            </div>
            <button
              onClick={onRemoveCoupon}
              className="text-green-600 hover:text-red-500 transition-colors"
            >
              <Tag className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={couponCode}
                onChange={(e) => {
                  onCouponChange(e.target.value)
                  onCouponErrorClear()
                }}
                placeholder="Enter promo code"
                className="flex-1 px-3 py-2.5 border border-violet-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
              <button
                onClick={onApplyCoupon}
                className="px-4 py-2.5 bg-violet-900 text-white rounded-lg text-sm font-medium hover:bg-violet-800 transition-colors"
              >
                Apply
              </button>
            </div>
            {couponError && (
              <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {couponError}
              </p>
            )}
            <p className="mt-2 text-xs text-violet-500">
              Try: SAVE10, WELCOME20, NEARBY15
            </p>
          </>
        )}
      </div>

      {/* Price Breakdown */}
      <div className="space-y-3 mb-4 pb-4 border-b border-violet-100">
        <div className="flex justify-between text-sm">
          <span className="text-violet-600">Subtotal ({totalItems} items)</span>
          <span className="font-medium text-violet-900">${subtotal.toFixed(2)}</span>
        </div>
        {totalSavings > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-violet-600">Product Savings</span>
            <span className="font-medium text-green-600">-${totalSavings.toFixed(2)}</span>
          </div>
        )}
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-violet-600">Promo Discount</span>
            <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-violet-600 flex items-center gap-1">
            <Truck className="w-3.5 h-3.5" />
            Delivery Fee
          </span>
          <span className={`font-medium ${deliveryFee === 0 ? 'text-green-600' : 'text-violet-900'}`}>
            {deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}
          </span>
        </div>
        {deliveryFee > 0 && (
          <div className="bg-violet-50 rounded-lg p-2.5 text-xs text-violet-600">
            <span className="font-medium">💡 Tip:</span> Add ${(100 - subtotal).toFixed(2)} more for free delivery!
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center mb-5">
        <span className="text-lg font-bold text-violet-900">Total</span>
        <div className="text-right">
          <span className="text-2xl font-bold bg-linear-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
            ${total.toFixed(2)}
          </span>
          {(totalSavings + discount) > 0 && (
            <p className="text-xs text-green-600 font-medium">
              You save ${(totalSavings + discount).toFixed(2)}!
            </p>
          )}
        </div>
      </div>

      {/* Checkout Button */}
      <Link
        href="/checkout"
        className="w-full py-3.5 bg-linear-to-r from-violet-500 to-indigo-500 text-white rounded-xl font-semibold hover:from-violet-600 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center gap-2 mb-3 shadow-lg shadow-violet-200 hover:shadow-xl hover:shadow-violet-300 hover:scale-[1.02]"
      >
        Proceed to Checkout
        <ArrowRight className="w-5 h-5" />
      </Link>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-violet-100">
        <div className="flex flex-col items-center text-center">
          <Lock className="w-4 h-4 text-violet-500 mb-1" />
          <span className="text-[10px] text-violet-600">Secure Payment</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Shield className="w-4 h-4 text-violet-500 mb-1" />
          <span className="text-[10px] text-violet-600">Buyer Protection</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Truck className="w-4 h-4 text-violet-500 mb-1" />
          <span className="text-[10px] text-violet-600">Fast Delivery</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="mt-4 pt-4 border-t border-violet-100">
        <p className="text-xs text-violet-500 text-center mb-2">We Accept</p>
        <div className="flex justify-center gap-2">
          <div className="w-10 h-6 bg-linear-to-r from-blue-600 to-blue-800 rounded text-white text-[8px] font-bold flex items-center justify-center">VISA</div>
          <div className="w-10 h-6 bg-linear-to-r from-red-500 to-yellow-500 rounded text-white text-[8px] font-bold flex items-center justify-center">MC</div>
          <div className="w-10 h-6 bg-linear-to-r from-blue-400 to-blue-600 rounded text-white text-[8px] font-bold flex items-center justify-center">AMEX</div>
          <div className="w-10 h-6 bg-linear-to-r from-blue-700 to-blue-900 rounded text-white text-[8px] font-bold flex items-center justify-center">PP</div>
        </div>
      </div>
    </div>
  )
}

export default OrderSummary
