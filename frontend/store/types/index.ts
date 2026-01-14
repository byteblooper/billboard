// ============================================================================
// STORE TYPES - Central Type Definitions for the Entire Application
// ============================================================================
// This file contains all shared TypeScript interfaces and types used across
// the application. All data models should reference these types to ensure
// consistency throughout the codebase.
// ============================================================================

// ============================================================================
// STORE & LOCATION TYPES
// ============================================================================

/**
 * Store location and travel time information
 */
export interface StoreLocation {
  distance: string      // e.g., "1.2 km"
  walkTime: string      // e.g., "15 min"
  bikeTime: string      // e.g., "5 min"
  carTime: string       // e.g., "3 min"
  address?: string      // Full address
}

/**
 * Store operating hours
 */
export interface StoreHours {
  openTime: string      // e.g., "9:00 AM"
  closeTime: string     // e.g., "9:00 PM"
  isOpen: boolean       // Current open status
}

/**
 * Complete store information
 */
export interface Store {
  id: number
  name: string
  slug: string
  category: string
  image: string
  description: string
  rating: number
  reviews: number
  verified: boolean
  totalProducts: number
  location: StoreLocation
  hours: StoreHours
}

/**
 * Minimal store reference for products
 */
export interface StoreRef {
  id: number
  name: string
  image?: string
  rating?: number
  reviews?: number
  verified: boolean
  location: StoreLocation
  hours?: StoreHours
}

// ============================================================================
// PRODUCT TYPES
// ============================================================================

/**
 * Product pricing information
 */
export interface ProductPricing {
  price: number
  originalPrice: number
  discount: number      // Percentage discount
  currency?: string     // Default: BDT
}

/**
 * Product rating and reviews
 */
export interface ProductRating {
  rating: number        // 1-5 stars
  reviews: number       // Total review count
}

/**
 * Product stock information
 */
export interface ProductStock {
  inStock: boolean
  stockCount: number
  maxQuantity?: number  // Max purchase quantity
}

/**
 * Product specification item
 */
export interface ProductSpec {
  id: string
  icon: string          // Lucide icon name
  label: string
  value: string
}

/**
 * Base product - Used in listings, cards, grids
 */
export interface Product {
  id: number
  name: string
  slug: string
  image: string
  images?: string[]     // Additional images
  category: string
  brand: string
  pricing: ProductPricing
  rating: ProductRating
  verified: boolean
  store: StoreRef
}

/**
 * Extended product - Full details for product page
 */
export interface ProductDetails extends Product {
  description: string
  images: string[]
  specs: ProductSpec[]
  stock: ProductStock
  deliveryTime: string
  tags?: string[]
}

/**
 * Simple product card - Minimal data for home sections
 */
export interface ProductCard {
  id: number
  name: string
  image: string
  price: number
  originalPrice?: number
  discount?: number
  unit?: string         // e.g., "Per Piece", "Per Pack"
  distance: string
  category: string
}

// ============================================================================
// CART TYPES
// ============================================================================

/**
 * Cart item
 */
export interface CartItem {
  id: number
  productId: number
  product: ProductDetails  // Full product details needed for cart (includes stock)
  quantity: number
  maxStock: number
  deliveryTime: string
  addedAt: string       // ISO date string
}

/**
 * Cart coupon
 */
export interface CartCoupon {
  code: string
  type: 'percentage' | 'fixed'
  value: number
  minOrder: number
  maxDiscount?: number
  expiresAt: string
  description: string
}

/**
 * Cart summary
 */
export interface CartSummary {
  subtotal: number
  discount: number
  deliveryFee: number
  total: number
  itemCount: number
  appliedCoupon?: CartCoupon
}

// ============================================================================
// WISHLIST TYPES
// ============================================================================

/**
 * Wishlist item
 */
export interface WishlistItem {
  id: number
  productId: number
  product: ProductDetails  // Full product details needed for wishlist (includes stock)
  savedAt: string       // ISO date string
  savedDays: number
  trending: boolean
  collection?: string
}

/**
 * Wishlist collection/folder
 */
export interface WishlistCollection {
  id: string
  name: string
  icon: string
  itemCount: number
}

// ============================================================================
// ORDER TYPES
// ============================================================================

export type OrderStatus = 'pending' | 'processing' | 'in-transit' | 'delivered' | 'cancelled'

/**
 * Order item
 */
export interface OrderItem {
  productId: number
  name: string
  image: string
  price: number
  quantity: number
}

/**
 * Order
 */
export interface Order {
  id: string
  items: OrderItem[]
  itemCount: number
  total: number
  status: OrderStatus
  store: StoreRef
  createdAt: string
  updatedAt: string
  deliveryAddress?: string
  trackingNumber?: string
}

// ============================================================================
// REVIEW TYPES
// ============================================================================

/**
 * Product review
 */
export interface Review {
  id: number
  productId: number
  author: {
    name: string
    avatar: string
    verified: boolean
  }
  rating: number
  title: string
  content: string
  images?: string[]
  helpful: number
  notHelpful: number
  createdAt: string
}

/**
 * Rating distribution for product
 */
export interface RatingDistribution {
  stars: number
  count: number
  percentage: number
}

// ============================================================================
// USER TYPES
// ============================================================================

/**
 * User profile
 */
export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  address?: string
  createdAt: string
}

// ============================================================================
// UI TYPES - Banners, Deals, Promotions
// ============================================================================

/**
 * Deal/Promo banner (for carousels)
 */
export interface DealBanner {
  id: number
  image: string
  title: string
  subtitle: string
  bgClass: string       // Tailwind bg class
  link: string
}

/**
 * Promo banner with discount (for sidebar)
 */
export interface PromoBanner {
  id: number
  image: string
  title: string
  subtitle: string
  discount: string      // e.g., "UPTO 50% OFF"
  bgClass: string
  link: string
}

/**
 * Home section category
 */
export interface HomeCategory {
  id: string
  name: string
  icon: string
  bgColor: string
  link: string
}

// ============================================================================
// FILTER TYPES
// ============================================================================

/**
 * Product filter state
 */
export interface ProductFilterState {
  searchQuery: string
  category: string | null
  brand: string | null
  minPrice: number
  maxPrice: number
  minRating: number
  verified: boolean
  inStock: boolean
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'
}

/**
 * Shop filter state
 */
export interface ShopFilterState {
  searchQuery: string
  category: string | null
  minDistance: number
  maxDistance: number
  isOpen: boolean | null
  verified: boolean
}

// ============================================================================
// HELPER TYPE UTILITIES
// ============================================================================

/**
 * Make specific properties optional
 */
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

/**
 * Make specific properties required
 */
export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>

/**
 * Extract IDs from array of objects
 */
export type ExtractIds<T extends { id: number | string }[]> = T[number]['id']
