// ============================================================================
// CART DATA - Shopping Cart Repository
// ============================================================================

import { CartItem, CartCoupon, CartSummary, ProductDetails } from '../types'
import { products } from './products'

// ============================================================================
// DEMO DATA - CART ITEMS
// ============================================================================

export const cartItems: CartItem[] = [
  {
    id: 1,
    productId: 4,
    product: products.find(p => p.id === 4)!,
    quantity: 1,
    maxStock: 5,
    deliveryTime: '15-20 min',
    addedAt: '2026-01-14T10:30:00Z'
  },
  {
    id: 2,
    productId: 5,
    product: products.find(p => p.id === 5)!,
    quantity: 2,
    maxStock: 10,
    deliveryTime: '20-30 min',
    addedAt: '2026-01-14T09:15:00Z'
  },
  {
    id: 3,
    productId: 6,
    product: products.find(p => p.id === 6)!,
    quantity: 1,
    maxStock: 8,
    deliveryTime: '10-15 min',
    addedAt: '2026-01-13T14:45:00Z'
  }
]

// ============================================================================
// DEMO DATA - COUPONS
// ============================================================================

export const availableCoupons: CartCoupon[] = [
  {
    code: 'SAVE10',
    type: 'percentage',
    value: 10,
    minOrder: 500,
    maxDiscount: 200,
    expiresAt: '2026-02-28T23:59:59Z',
    description: '10% off on orders above ৳500'
  },
  {
    code: 'FLAT50',
    type: 'fixed',
    value: 50,
    minOrder: 300,
    expiresAt: '2026-01-31T23:59:59Z',
    description: 'Flat ৳50 off on orders above ৳300'
  },
  {
    code: 'NEARBY25',
    type: 'percentage',
    value: 25,
    minOrder: 1000,
    maxDiscount: 500,
    expiresAt: '2026-03-31T23:59:59Z',
    description: '25% off on orders above ৳1000 (Max ৳500)'
  }
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate cart summary
 */
export function calculateCartSummary(
  items: CartItem[],
  coupon?: CartCoupon
): CartSummary {
  const subtotal = items.reduce((sum, item) => {
    return sum + (item.product.pricing.price * item.quantity)
  }, 0)

  let discount = 0
  if (coupon && subtotal >= coupon.minOrder) {
    if (coupon.type === 'percentage') {
      discount = (subtotal * coupon.value) / 100
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount)
      }
    } else {
      discount = coupon.value
    }
  }

  const deliveryFee = subtotal > 500 ? 0 : 50
  const total = subtotal - discount + deliveryFee

  return {
    subtotal,
    discount,
    deliveryFee,
    total,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    appliedCoupon: coupon
  }
}

/**
 * Validate coupon code
 */
export function validateCoupon(code: string, orderTotal: number): CartCoupon | null {
  const coupon = availableCoupons.find(c => c.code === code.toUpperCase())
  if (!coupon) return null
  
  const now = new Date()
  const expires = new Date(coupon.expiresAt)
  if (now > expires) return null
  
  if (orderTotal < coupon.minOrder) return null
  
  return coupon
}

/**
 * Get recommended products for cart (products not in cart)
 */
export function getCartRecommendations(cartProductIds: number[], limit: number = 4): ProductDetails[] {
  return products
    .filter(p => !cartProductIds.includes(p.id))
    .slice(0, limit)
}

/**
 * Transform cart items to legacy flat format for backward compatibility
 */
export interface LegacyCartItem {
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

export function toLegacyCartItem(item: CartItem): LegacyCartItem {
  return {
    id: item.id,
    productId: item.productId,
    name: item.product.name,
    store: item.product.store.name,
    storeVerified: item.product.store.verified,
    image: item.product.image,
    price: item.product.pricing.price,
    originalPrice: item.product.pricing.originalPrice || item.product.pricing.price,
    quantity: item.quantity,
    inStock: item.product.stock.inStock,
    maxStock: item.maxStock,
    distance: item.product.store.location?.distance || '0.5 km',
    deliveryTime: item.deliveryTime
  }
}

export function getLegacyCartItems(): LegacyCartItem[] {
  return cartItems.map(toLegacyCartItem)
}

/**
 * Get valid coupons as record for quick lookup
 */
export function getValidCouponsRecord(): Record<string, number> {
  const record: Record<string, number> = {}
  availableCoupons.forEach(c => {
    if (c.type === 'percentage') {
      record[c.code] = c.value / 100
    }
  })
  return record
}
