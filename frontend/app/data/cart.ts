// Cart Types and Demo Data

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

export interface RecommendedProduct {
  id: number
  name: string
  image: string
  price: number
  originalPrice: number
  store: string
}

// Demo cart items
export const initialCartItems: CartItem[] = [
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

// Recommended products for cart
export const recommendedProducts: RecommendedProduct[] = [
  { id: 201, name: 'Bluetooth Speaker Mini', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop', price: 39.99, originalPrice: 59.99, store: 'AudioTech Store' },
  { id: 202, name: 'Smart Watch Band', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&h=200&fit=crop', price: 24.99, originalPrice: 34.99, store: 'LuxTime Boutique' },
  { id: 203, name: 'Phone Case Premium', image: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=200&h=200&fit=crop', price: 19.99, originalPrice: 29.99, store: 'TechPro Shop' },
  { id: 204, name: 'Portable Charger 10000mAh', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop', price: 34.99, originalPrice: 49.99, store: 'TechPro Shop' }
]

// Valid coupons
export const validCoupons: Record<string, number> = {
  'SAVE10': 0.10,
  'WELCOME20': 0.20,
  'NEARBY15': 0.15
}
