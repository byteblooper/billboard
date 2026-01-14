// ============================================================================
// WISHLIST DATA - Wishlist Repository
// ============================================================================

import { WishlistItem, WishlistCollection } from '../types'
import { products } from './products'

// ============================================================================
// DEMO DATA - WISHLIST ITEMS
// ============================================================================

export const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    productId: 4,
    product: products.find(p => p.id === 4)!,
    savedAt: '2026-01-12T10:30:00Z',
    savedDays: 2,
    trending: true,
    collection: 'electronics'
  },
  {
    id: 2,
    productId: 5,
    product: products.find(p => p.id === 5)!,
    savedAt: '2026-01-09T09:15:00Z',
    savedDays: 5,
    trending: false,
    collection: 'fashion'
  },
  {
    id: 3,
    productId: 6,
    product: products.find(p => p.id === 6)!,
    savedAt: '2026-01-13T14:45:00Z',
    savedDays: 1,
    trending: true,
    collection: 'fashion'
  },
  {
    id: 4,
    productId: 7,
    product: products.find(p => p.id === 7)!,
    savedAt: '2026-01-07T08:20:00Z',
    savedDays: 7,
    trending: true,
    collection: 'sports'
  },
  {
    id: 5,
    productId: 8,
    product: products.find(p => p.id === 8)!,
    savedAt: '2026-01-10T16:30:00Z',
    savedDays: 4,
    trending: false,
    collection: 'gaming'
  },
  {
    id: 6,
    productId: 9,
    product: products.find(p => p.id === 9)!,
    savedAt: '2026-01-11T11:00:00Z',
    savedDays: 3,
    trending: true,
    collection: 'gaming'
  }
]

// ============================================================================
// DEMO DATA - COLLECTIONS
// ============================================================================

export const wishlistCollections: WishlistCollection[] = [
  { id: 'all', name: 'All Items', icon: 'Heart', itemCount: wishlistItems.length },
  { id: 'electronics', name: 'Electronics', icon: 'Laptop', itemCount: wishlistItems.filter(i => i.collection === 'electronics').length },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', itemCount: wishlistItems.filter(i => i.collection === 'fashion').length },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2', itemCount: wishlistItems.filter(i => i.collection === 'gaming').length },
  { id: 'sports', name: 'Sports', icon: 'Dumbbell', itemCount: wishlistItems.filter(i => i.collection === 'sports').length }
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get wishlist items by collection
 */
export function getWishlistByCollection(collectionId: string): WishlistItem[] {
  if (collectionId === 'all') return wishlistItems
  return wishlistItems.filter(item => item.collection === collectionId)
}

/**
 * Get trending wishlist items
 */
export function getTrendingWishlistItems(): WishlistItem[] {
  return wishlistItems.filter(item => item.trending)
}

/**
 * Check if product is in wishlist
 */
export function isInWishlist(productId: number): boolean {
  return wishlistItems.some(item => item.productId === productId)
}

/**
 * Get wishlist stats
 */
export function getWishlistStats() {
  const totalValue = wishlistItems.reduce((sum, item) => sum + item.product.pricing.price, 0)
  const totalSavings = wishlistItems.reduce((sum, item) => {
    const original = item.product.pricing.originalPrice
    const current = item.product.pricing.price
    return sum + (original - current)
  }, 0)

  return {
    totalItems: wishlistItems.length,
    totalValue,
    totalSavings,
    trendingCount: wishlistItems.filter(i => i.trending).length
  }
}

// ============================================================================
// LEGACY TRANSFORMATIONS
// ============================================================================

/**
 * Legacy wishlist item format for backward compatibility
 */
export interface LegacyWishlistItem {
  id: number
  productId: number
  name: string
  store: string
  image: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  distance: string
  verified: boolean
  inStock: boolean
  trending: boolean
  savedDays: number
}

export function toLegacyWishlistItem(item: WishlistItem): LegacyWishlistItem {
  return {
    id: item.id,
    productId: item.productId,
    name: item.product.name,
    store: item.product.store.name,
    image: item.product.image,
    price: item.product.pricing.price,
    originalPrice: item.product.pricing.originalPrice,
    discount: item.product.pricing.discount || 0,
    rating: item.product.rating.rating,
    reviews: item.product.rating.reviews,
    distance: item.product.store.location?.distance || '0.5 km',
    verified: item.product.store.verified,
    inStock: item.product.stock.inStock,
    trending: item.trending,
    savedDays: item.savedDays
  }
}

export function getLegacyWishlistItems(): LegacyWishlistItem[] {
  return wishlistItems.map(toLegacyWishlistItem)
}

/**
 * Legacy collection type
 */
export interface Collection {
  id: string
  name: string
  icon: string
  count: number
}

export function getCollections(totalItems: number): Collection[] {
  return wishlistCollections.map(c => ({
    id: c.id,
    name: c.name,
    icon: c.icon,
    count: c.id === 'all' ? totalItems : c.itemCount
  }))
}
