// ============================================================================
// PRODUCTS DATA - Central Product Repository
// ============================================================================

import { Product, ProductDetails, ProductSpec, ProductCard, StoreRef } from '../types'
import { stores, toStoreRef, getStoreById } from './stores'

// ============================================================================
// PRODUCT SPECIFICATIONS
// ============================================================================

const headphoneSpecs: ProductSpec[] = [
  { id: 'battery', icon: 'Battery', label: 'Battery', value: 'Built-in 610mAh lithium battery, up to 44 hours playtime' },
  { id: 'connectivity', icon: 'Bluetooth', label: 'Connectivity', value: '2.4GHz Wireless, Bluetooth v5.3, and 3.5mm Wired' },
  { id: 'audio', icon: 'Headphones', label: 'Audio', value: '50mm Hi-Fi MOC Hybrid diaphragm for immersive sound' },
  { id: 'microphone', icon: 'Mic', label: 'Microphone', value: 'Retractable noise-cancelling unidirectional mic' },
  { id: 'comfort', icon: 'Armchair', label: 'Comfort', value: 'Ergonomic design with breathable microfibre fabric' },
  { id: 'lighting', icon: 'Lightbulb', label: 'RGB Lighting', value: '16 customizable RGB lighting modes' }
]

const smartphoneSpecs: ProductSpec[] = [
  { id: 'display', icon: 'Monitor', label: 'Display', value: '6.7" Super Retina XDR with ProMotion (2796 x 1290)' },
  { id: 'processor', icon: 'Cpu', label: 'Processor', value: 'A17 Pro chip with 6-core GPU' },
  { id: 'camera', icon: 'Camera', label: 'Camera', value: '48MP main with 5x optical zoom telephoto' },
  { id: 'battery', icon: 'Battery', label: 'Battery', value: '4422 mAh with all-day battery life' },
  { id: 'storage', icon: 'HardDrive', label: 'Storage', value: '256GB internal with 8GB RAM' },
  { id: 'design', icon: 'Smartphone', label: 'Design', value: 'Titanium design - lightest Pro model ever' }
]

const keyboardSpecs: ProductSpec[] = [
  { id: 'switches', icon: 'Keyboard', label: 'Switches', value: 'Premium mechanical with 50M keystroke lifespan' },
  { id: 'lighting', icon: 'Lightbulb', label: 'RGB Lighting', value: 'Per-key RGB with 16.8M colors' },
  { id: 'connectivity', icon: 'Usb', label: 'Connectivity', value: 'USB-C with detachable cable' },
  { id: 'keycaps', icon: 'Square', label: 'Keycaps', value: 'Double-shot PBT for durability' },
  { id: 'software', icon: 'Settings', label: 'Software', value: 'Fully programmable macros and lighting' }
]

const watchSpecs: ProductSpec[] = [
  { id: 'display', icon: 'Monitor', label: 'Display', value: 'AMOLED 1.4" Always-on Display' },
  { id: 'battery', icon: 'Battery', label: 'Battery', value: 'Up to 14 days battery life' },
  { id: 'water', icon: 'Droplets', label: 'Water Resistance', value: '5ATM water resistant' },
  { id: 'health', icon: 'Heart', label: 'Health Tracking', value: 'Heart rate, SpO2, sleep tracking' },
  { id: 'connectivity', icon: 'Bluetooth', label: 'Connectivity', value: 'Bluetooth 5.0, GPS' }
]

const sunglassesSpecs: ProductSpec[] = [
  { id: 'lens', icon: 'Eye', label: 'Lens', value: 'Polarized UV400 protection' },
  { id: 'frame', icon: 'Square', label: 'Frame', value: 'Lightweight titanium alloy' },
  { id: 'style', icon: 'Palette', label: 'Style', value: 'Classic aviator design' }
]

const shoesSpecs: ProductSpec[] = [
  { id: 'material', icon: 'Layers', label: 'Material', value: 'Breathable mesh upper with synthetic overlays' },
  { id: 'sole', icon: 'Footprints', label: 'Sole', value: 'EVA midsole with rubber outsole' },
  { id: 'cushioning', icon: 'Cloud', label: 'Cushioning', value: 'Responsive foam technology' },
  { id: 'closure', icon: 'Lock', label: 'Closure', value: 'Traditional lace-up system' }
]

// ============================================================================
// DEMO DATA - PRODUCTS
// ============================================================================

export const products: ProductDetails[] = [
  {
    id: 1,
    name: 'A4tech Bloody MR720 NARAKA RGB Wireless Gaming Headphone',
    slug: 'a4tech-bloody-mr720-naraka-gaming-headphone',
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
      'https://images.unsplash.com/photo-1599669454699-248893623440?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80'
    ],
    category: 'Gaming',
    brand: 'A4tech Bloody',
    pricing: { price: 6200, originalPrice: 7500, discount: 17 },
    rating: { rating: 4.8, reviews: 2847 },
    verified: true,
    store: toStoreRef(stores[0]), // TechZone Gaming
    description: 'Experience premium wireless gaming audio with the A4tech Bloody MR720 NARAKA Edition. This headset combines stunning NARAKA-themed RGB lighting with exceptional audio quality.',
    specs: headphoneSpecs,
    stock: { inStock: true, stockCount: 15, maxQuantity: 5 },
    deliveryTime: '2 Hours',
    tags: ['gaming', 'wireless', 'rgb', 'headphones']
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra 512GB - Titanium Black',
    slug: 'samsung-galaxy-s24-ultra-512gb',
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80'
    ],
    category: 'Smartphones',
    brand: 'Samsung',
    pricing: { price: 119999, originalPrice: 139999, discount: 14 },
    rating: { rating: 4.7, reviews: 2156 },
    verified: true,
    store: toStoreRef(stores[1]), // Galaxy Store
    description: 'Meet the Samsung Galaxy S24 Ultra - the ultimate smartphone powered by Galaxy AI. Experience the most powerful Galaxy yet.',
    specs: smartphoneSpecs,
    stock: { inStock: true, stockCount: 8, maxQuantity: 2 },
    deliveryTime: '3 Hours',
    tags: ['smartphone', 'samsung', 'flagship', '5g']
  },
  {
    id: 3,
    name: 'Keychron K8 Pro Wireless Mechanical Keyboard',
    slug: 'keychron-k8-pro-wireless-keyboard',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&q=80',
      'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&q=80'
    ],
    category: 'Keyboards',
    brand: 'Keychron',
    pricing: { price: 8500, originalPrice: 10000, discount: 15 },
    rating: { rating: 4.9, reviews: 1892 },
    verified: true,
    store: toStoreRef(stores[2]), // Keyboard Hub
    description: 'The Keychron K8 Pro is the ultimate tenkeyless mechanical keyboard for professionals and enthusiasts.',
    specs: keyboardSpecs,
    stock: { inStock: true, stockCount: 12, maxQuantity: 3 },
    deliveryTime: '2 Hours',
    tags: ['keyboard', 'mechanical', 'wireless', 'rgb']
  },
  {
    id: 4,
    name: 'Premium Wireless Headphones',
    slug: 'premium-wireless-headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80'
    ],
    category: 'Electronics',
    brand: 'AudioTech',
    pricing: { price: 14999, originalPrice: 19999, discount: 25 },
    rating: { rating: 4.8, reviews: 2341 },
    verified: true,
    store: toStoreRef(stores[3]), // AudioTech Store
    description: 'Experience crystal-clear audio with active noise cancellation and premium comfort.',
    specs: headphoneSpecs,
    stock: { inStock: true, stockCount: 25, maxQuantity: 5 },
    deliveryTime: '2 Hours',
    tags: ['headphones', 'wireless', 'audio']
  },
  {
    id: 5,
    name: 'Classic Leather Watch',
    slug: 'classic-leather-watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&q=80'
    ],
    category: 'Fashion',
    brand: 'LuxTime',
    pricing: { price: 8999, originalPrice: 12999, discount: 31 },
    rating: { rating: 4.6, reviews: 892 },
    verified: true,
    store: toStoreRef(stores[4]), // LuxTime Boutique
    description: 'Elegant timepiece with genuine leather strap and Swiss movement.',
    specs: watchSpecs,
    stock: { inStock: true, stockCount: 18, maxQuantity: 3 },
    deliveryTime: '3 Hours',
    tags: ['watch', 'fashion', 'leather']
  },
  {
    id: 6,
    name: 'Designer Sunglasses',
    slug: 'designer-sunglasses',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'
    ],
    category: 'Fashion',
    brand: 'SunStyle',
    pricing: { price: 7999, originalPrice: 9999, discount: 20 },
    rating: { rating: 4.4, reviews: 456 },
    verified: false,
    store: toStoreRef(stores[6]), // SunStyle Shop
    description: 'Premium polarized sunglasses with UV400 protection.',
    specs: sunglassesSpecs,
    stock: { inStock: true, stockCount: 30, maxQuantity: 5 },
    deliveryTime: '1.5 Hours',
    tags: ['sunglasses', 'fashion', 'uv-protection']
  },
  {
    id: 7,
    name: 'Running Shoes Pro',
    slug: 'running-shoes-pro',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80'
    ],
    category: 'Sports',
    brand: 'SpeedFit',
    pricing: { price: 11999, originalPrice: 14999, discount: 20 },
    rating: { rating: 4.9, reviews: 1567 },
    verified: true,
    store: toStoreRef(stores[5]), // SpeedFit Athletics
    description: 'Professional running shoes with responsive cushioning for maximum performance.',
    specs: shoesSpecs,
    stock: { inStock: true, stockCount: 22, maxQuantity: 3 },
    deliveryTime: '2.5 Hours',
    tags: ['shoes', 'running', 'sports']
  },
  {
    id: 8,
    name: 'Wireless Gaming Mouse RGB',
    slug: 'wireless-gaming-mouse-rgb',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&q=80'
    ],
    category: 'Gaming',
    brand: 'TechZone',
    pricing: { price: 2350, originalPrice: 2800, discount: 16 },
    rating: { rating: 4.6, reviews: 892 },
    verified: true,
    store: toStoreRef(stores[0]),
    description: 'High-precision wireless gaming mouse with customizable RGB lighting.',
    specs: [],
    stock: { inStock: true, stockCount: 35, maxQuantity: 5 },
    deliveryTime: '2 Hours',
    tags: ['mouse', 'gaming', 'wireless', 'rgb']
  },
  {
    id: 9,
    name: 'Gaming Monitor 144Hz',
    slug: 'gaming-monitor-144hz',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80'
    ],
    category: 'Gaming',
    brand: 'TechZone',
    pricing: { price: 17750, originalPrice: 22000, discount: 19 },
    rating: { rating: 4.7, reviews: 654 },
    verified: true,
    store: toStoreRef(stores[0]),
    description: '27" Gaming monitor with 144Hz refresh rate and 1ms response time.',
    specs: [],
    stock: { inStock: true, stockCount: 10, maxQuantity: 2 },
    deliveryTime: '4 Hours',
    tags: ['monitor', 'gaming', '144hz']
  },
  {
    id: 10,
    name: 'USB-C Hub 7-in-1',
    slug: 'usb-c-hub-7-in-1',
    image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=800&q=80'
    ],
    category: 'Accessories',
    brand: 'TechPro',
    pricing: { price: 1890, originalPrice: 2200, discount: 14 },
    rating: { rating: 4.5, reviews: 321 },
    verified: true,
    store: toStoreRef(stores[3]),
    description: 'Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader.',
    specs: [],
    stock: { inStock: true, stockCount: 45, maxQuantity: 5 },
    deliveryTime: '2 Hours',
    tags: ['usb-c', 'hub', 'accessories']
  },
  {
    id: 11,
    name: 'Webcam 4K HDR',
    slug: 'webcam-4k-hdr',
    image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=800&q=80'
    ],
    category: 'Electronics',
    brand: 'TechPro',
    pricing: { price: 4500, originalPrice: 5500, discount: 18 },
    rating: { rating: 4.6, reviews: 234 },
    verified: true,
    store: toStoreRef(stores[3]),
    description: '4K HDR webcam with auto-focus and built-in noise-cancelling microphone.',
    specs: [],
    stock: { inStock: true, stockCount: 20, maxQuantity: 3 },
    deliveryTime: '2.5 Hours',
    tags: ['webcam', '4k', 'streaming']
  },
  {
    id: 12,
    name: 'Bluetooth Speaker Mini',
    slug: 'bluetooth-speaker-mini',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80'
    ],
    category: 'Electronics',
    brand: 'AudioTech',
    pricing: { price: 2800, originalPrice: 3500, discount: 20 },
    rating: { rating: 4.5, reviews: 567 },
    verified: true,
    store: toStoreRef(stores[3]),
    description: 'Portable Bluetooth speaker with 360° sound and 12-hour battery life.',
    specs: [],
    stock: { inStock: true, stockCount: 40, maxQuantity: 5 },
    deliveryTime: '1.5 Hours',
    tags: ['speaker', 'bluetooth', 'portable']
  },
  {
    id: 13,
    name: 'Power Bank 20000mAh',
    slug: 'power-bank-20000mah',
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&q=80'
    ],
    category: 'Accessories',
    brand: 'TechPro',
    pricing: { price: 1800, originalPrice: 2200, discount: 18 },
    rating: { rating: 4.4, reviews: 789 },
    verified: true,
    store: toStoreRef(stores[3]),
    description: 'High-capacity power bank with fast charging support for all devices.',
    specs: [],
    stock: { inStock: true, stockCount: 55, maxQuantity: 5 },
    deliveryTime: '2 Hours',
    tags: ['power-bank', 'charging', 'portable']
  },
  {
    id: 14,
    name: 'Gaming Chair Pro',
    slug: 'gaming-chair-pro',
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80'
    ],
    category: 'Gaming',
    brand: 'TechZone',
    pricing: { price: 15500, originalPrice: 18000, discount: 14 },
    rating: { rating: 4.8, reviews: 432 },
    verified: true,
    store: toStoreRef(stores[0]),
    description: 'Ergonomic gaming chair with lumbar support and adjustable armrests.',
    specs: [],
    stock: { inStock: true, stockCount: 8, maxQuantity: 2 },
    deliveryTime: '24 Hours',
    tags: ['chair', 'gaming', 'ergonomic']
  },
  {
    id: 15,
    name: 'Microphone USB Studio',
    slug: 'microphone-usb-studio',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&q=80'
    ],
    category: 'Electronics',
    brand: 'AudioTech',
    pricing: { price: 3200, originalPrice: 3800, discount: 16 },
    rating: { rating: 4.7, reviews: 345 },
    verified: true,
    store: toStoreRef(stores[3]),
    description: 'Professional USB condenser microphone for streaming and podcasting.',
    specs: [],
    stock: { inStock: true, stockCount: 25, maxQuantity: 3 },
    deliveryTime: '2 Hours',
    tags: ['microphone', 'streaming', 'usb']
  }
]

// ============================================================================
// HELPER FUNCTIONS - PRODUCT RETRIEVAL
// ============================================================================

/**
 * Get product by ID
 */
export function getProductById(id: number): ProductDetails | undefined {
  return products.find(p => p.id === id)
}

/**
 * Get product by slug
 */
export function getProductBySlug(slug: string): ProductDetails | undefined {
  return products.find(p => p.slug === slug)
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: string, limit?: number): ProductDetails[] {
  const filtered = products.filter(p => p.category.toLowerCase() === category.toLowerCase())
  return limit ? filtered.slice(0, limit) : filtered
}

/**
 * Get products by store ID
 */
export function getProductsByStore(storeId: number): ProductDetails[] {
  return products.filter(p => p.store.id === storeId)
}

/**
 * Get related products (same category first, then fill with other products)
 */
export function getRelatedProducts(productId: number, limit: number = 8): ProductDetails[] {
  const product = getProductById(productId)
  if (!product) return products.slice(0, limit)
  
  // Get same category products first
  const sameCategory = products.filter(p => p.id !== productId && p.category === product.category)
  
  // If we have enough same-category products, return them
  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit)
  }
  
  // Otherwise, fill with other products (prioritizing similar price range)
  const otherProducts = products
    .filter(p => p.id !== productId && p.category !== product.category)
    .sort((a, b) => {
      // Sort by price similarity
      const priceDiffA = Math.abs(a.pricing.price - product.pricing.price)
      const priceDiffB = Math.abs(b.pricing.price - product.pricing.price)
      return priceDiffA - priceDiffB
    })
  
  return [...sameCategory, ...otherProducts].slice(0, limit)
}

/**
 * Get recent/featured products (excluding specified ID)
 */
export function getRecentProducts(excludeId?: number, limit: number = 6): ProductDetails[] {
  return products
    .filter(p => p.id !== excludeId)
    .slice(0, limit)
}

/**
 * Search products
 */
export function searchProducts(query: string): ProductDetails[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  )
}

/**
 * Get featured/trending products
 */
export function getFeaturedProducts(limit: number = 8): ProductDetails[] {
  return [...products]
    .sort((a, b) => b.rating.reviews - a.rating.reviews)
    .slice(0, limit)
}

// ============================================================================
// HELPER FUNCTIONS - PRODUCT CONVERSION
// ============================================================================

/**
 * Convert ProductDetails to simple Product (for listings)
 */
export function toProduct(details: ProductDetails): Product {
  return {
    id: details.id,
    name: details.name,
    slug: details.slug,
    image: details.image,
    images: details.images,
    category: details.category,
    brand: details.brand,
    pricing: details.pricing,
    rating: details.rating,
    verified: details.verified,
    store: details.store
  }
}

/**
 * Convert ProductDetails to ProductCard (for home sections)
 */
export function toProductCard(details: ProductDetails): ProductCard {
  return {
    id: details.id,
    name: details.name,
    image: details.image,
    price: details.pricing.price,
    originalPrice: details.pricing.originalPrice,
    discount: details.pricing.discount,
    distance: details.store.location.distance,
    category: details.category
  }
}

/**
 * Get all products as ProductCards
 */
export function getAllProductCards(limit?: number): ProductCard[] {
  const cards = products.map(toProductCard)
  return limit ? cards.slice(0, limit) : cards
}
