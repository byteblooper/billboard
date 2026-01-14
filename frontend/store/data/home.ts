// ============================================================================
// HOME DATA - Homepage UI Data Repository
// ============================================================================

import { DealBanner, PromoBanner, HomeCategory, ProductCard } from '../types'
import { products, toProductCard } from './products'

// ============================================================================
// HOME PRODUCT TYPE - String price format for UI
// ============================================================================

export interface HomeProduct {
  id: number
  name: string
  price: string  // String format for display (e.g., "৳450")
  unit: string
  distance: string
  category: string
  image: string
}

// ============================================================================
// DEMO DATA - DEAL BANNERS (for carousel)
// ============================================================================

export const dealBanners: DealBanner[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1543168256-418811576931?w=400&h=200&fit=crop',
    title: '25% OFF',
    subtitle: 'VEGETABLES',
    bgClass: 'bg-green-600',
    link: '/products?category=grocery'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=200&fit=crop',
    title: 'SPECIAL',
    subtitle: 'OFFER',
    bgClass: 'bg-orange-500',
    link: '/products?category=fashion'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=200&fit=crop',
    title: '50%',
    subtitle: 'DISCOUNT',
    bgClass: 'bg-purple-600',
    link: '/products?category=electronics'
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
    title: 'DELICIOUS',
    subtitle: '50% OFF',
    bgClass: 'bg-amber-500',
    link: '/products?category=food'
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=400&h=200&fit=crop',
    title: 'FRESH PICKS',
    subtitle: 'FRESH DEALS',
    bgClass: 'bg-teal-600',
    link: '/products'
  }
]

// ============================================================================
// DEMO DATA - PROMO BANNERS (for sidebar, with discount text)
// ============================================================================

export const promoBanners: PromoBanner[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=400&h=400&fit=crop',
    title: 'BLACK',
    subtitle: 'Friday',
    discount: 'UPTO 50% OFF',
    bgClass: 'bg-gray-900',
    link: '/products'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop',
    title: 'CYBER',
    subtitle: 'MONDAY',
    discount: '50% SALE',
    bgClass: 'bg-purple-700',
    link: '/products'
  }
]

// ============================================================================
// DEMO DATA - HOME CATEGORIES
// ============================================================================

export const homeCategories: HomeCategory[] = [
  { id: 'grocery', name: 'Grocery', icon: 'ShoppingBasket', bgColor: 'bg-green-100', link: '/products?category=grocery' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', bgColor: 'bg-pink-100', link: '/products?category=fashion' },
  { id: 'electronics', name: 'Electronics', icon: 'Laptop', bgColor: 'bg-blue-100', link: '/products?category=electronics' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2', bgColor: 'bg-purple-100', link: '/products?category=gaming' },
  { id: 'sports', name: 'Sports', icon: 'Dumbbell', bgColor: 'bg-orange-100', link: '/products?category=sports' },
  { id: 'home', name: 'Home', icon: 'Home', bgColor: 'bg-yellow-100', link: '/products?category=home' },
  { id: 'beauty', name: 'Beauty', icon: 'Sparkles', bgColor: 'bg-rose-100', link: '/products?category=beauty' },
  { id: 'books', name: 'Books', icon: 'BookOpen', bgColor: 'bg-indigo-100', link: '/products?category=books' }
]

// ============================================================================
// HOME SECTION PRODUCTS - Derived from main products
// ============================================================================

/**
 * Get grocery items for home section
 * Note: Using mock data as we don't have grocery products in the main store yet
 * These link to existing products as placeholders
 */
export function getGroceryItems(limit: number = 6): HomeProduct[] {
  // Map to existing product IDs so clicking works
  return [
    { id: 1, name: 'Fresh Milk', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', price: '৳450', unit: 'Per Piece', distance: '2.6 km', category: 'grocery' },
    { id: 2, name: 'Premium Coffee', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400', price: '৳100', unit: 'Per Pack', distance: '1.2 km', category: 'grocery' },
    { id: 3, name: 'Biscuits Pack', image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', price: '৳200', unit: 'Per Piece', distance: '3.5 km', category: 'grocery' },
    { id: 4, name: 'Snacks Combo', image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=400', price: '৳850', unit: 'Per Combo', distance: '2.1 km', category: 'grocery' },
    { id: 5, name: 'Tomato Sauce', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', price: '৳50', unit: 'Per Piece', distance: '1.8 km', category: 'grocery' },
    { id: 6, name: 'Chips Variety', image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', price: '৳340', unit: 'Per Combo', distance: '4.2 km', category: 'grocery' }
  ].slice(0, limit)
}

/**
 * Get fashion items for home section
 * Uses actual products from store that are in Fashion category
 */
export function getFashionItems(limit: number = 6): HomeProduct[] {
  // Use actual fashion products from store (IDs 5, 6, 7 are Fashion/Running)
  const fashionProducts = products.filter(p => 
    ['Fashion', 'Running Shoes', 'Watches', 'Sunglasses'].includes(p.category)
  )
  
  if (fashionProducts.length > 0) {
    return fashionProducts.slice(0, limit).map(p => ({
      id: p.id,
      name: p.name,
      image: p.image,
      price: `৳${p.pricing.price.toLocaleString()}`,
      unit: 'Per Piece',
      distance: p.store.location.distance,
      category: 'fashion'
    }))
  }

  // Fallback to existing products if no fashion products found
  return products.slice(4, 10).map(p => ({
    id: p.id,
    name: p.name,
    image: p.image,
    price: `৳${p.pricing.price.toLocaleString()}`,
    unit: 'Per Piece',
    distance: p.store.location.distance,
    category: 'fashion'
  })).slice(0, limit)
}

/**
 * Get gadget items for home section
 */
export function getGadgetItems(limit: number = 6): HomeProduct[] {
  // Use actual products converted to home product format
  return products
    .filter(p => ['Gaming', 'Electronics', 'Keyboards'].includes(p.category))
    .slice(0, limit)
    .map(p => ({
      id: p.id,
      name: p.name,
      image: p.image,
      price: `৳${p.pricing.price.toLocaleString()}`,
      unit: 'Per Piece',
      distance: p.store.location.distance,
      category: p.category.toLowerCase()
    }))
}

/**
 * Get flash sale items
 */
export function getFlashSaleItems(limit: number = 8): HomeProduct[] {
  return products
    .filter(p => p.pricing.discount >= 15)
    .sort((a, b) => b.pricing.discount - a.pricing.discount)
    .slice(0, limit)
    .map(p => ({
      id: p.id,
      name: p.name,
      image: p.image,
      price: `৳${p.pricing.price.toLocaleString()}`,
      unit: 'Per Piece',
      distance: p.store.location.distance,
      category: p.category.toLowerCase()
    }))
}

/**
 * Get featured products for home
 */
export function getFeaturedHomeProducts(limit: number = 12): ProductCard[] {
  return products
    .sort((a, b) => b.rating.reviews - a.rating.reviews)
    .slice(0, limit)
    .map(toProductCard)
}
