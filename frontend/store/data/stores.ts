// ============================================================================
// STORES DATA - Central Store Repository
// ============================================================================

import { Store, StoreRef } from '../types'

// ============================================================================
// DEMO DATA - STORES
// ============================================================================

export const stores: Store[] = [
  {
    id: 1,
    name: 'TechZone Gaming',
    slug: 'techzone-gaming',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=300&fit=crop',
    description: 'Premium gaming equipment, peripherals, and accessories for professional gamers and enthusiasts.',
    rating: 4.9,
    reviews: 1523,
    verified: true,
    totalProducts: 245,
    location: {
      distance: '1.2 km',
      walkTime: '15 min',
      bikeTime: '5 min',
      carTime: '3 min',
      address: '123 Tech Street, Downtown District'
    },
    hours: {
      openTime: '9:00 AM',
      closeTime: '9:00 PM',
      isOpen: true
    }
  },
  {
    id: 2,
    name: 'Galaxy Store',
    slug: 'galaxy-store',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    description: 'Official Samsung partner store. Latest smartphones, tablets, and smart devices.',
    rating: 4.8,
    reviews: 987,
    verified: true,
    totalProducts: 156,
    location: {
      distance: '0.8 km',
      walkTime: '10 min',
      bikeTime: '3 min',
      carTime: '2 min',
      address: '456 Mobile Ave, Tech Park'
    },
    hours: {
      openTime: '10:00 AM',
      closeTime: '8:00 PM',
      isOpen: true
    }
  },
  {
    id: 3,
    name: 'Keyboard Hub',
    slug: 'keyboard-hub',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop',
    description: 'Specialized in mechanical keyboards, keycaps, and custom builds for enthusiasts.',
    rating: 4.7,
    reviews: 654,
    verified: true,
    totalProducts: 189,
    location: {
      distance: '2.5 km',
      walkTime: '30 min',
      bikeTime: '10 min',
      carTime: '5 min',
      address: '789 Peripheral Lane, West Side'
    },
    hours: {
      openTime: '10:00 AM',
      closeTime: '7:00 PM',
      isOpen: true
    }
  },
  {
    id: 4,
    name: 'AudioTech Store',
    slug: 'audiotech-store',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    description: 'Premium audio equipment and accessories for audiophiles and music lovers.',
    rating: 4.8,
    reviews: 2341,
    verified: true,
    totalProducts: 156,
    location: {
      distance: '0.8 km',
      walkTime: '10 min',
      bikeTime: '3 min',
      carTime: '2 min',
      address: '123 Audio Avenue, Downtown'
    },
    hours: {
      openTime: '9:00 AM',
      closeTime: '9:00 PM',
      isOpen: true
    }
  },
  {
    id: 5,
    name: 'LuxTime Boutique',
    slug: 'luxtime-boutique',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop',
    description: 'Luxury watches and fashion accessories for the discerning customer.',
    rating: 4.6,
    reviews: 892,
    verified: true,
    totalProducts: 89,
    location: {
      distance: '1.2 km',
      walkTime: '15 min',
      bikeTime: '5 min',
      carTime: '3 min',
      address: '456 Fashion Street, Midtown'
    },
    hours: {
      openTime: '10:00 AM',
      closeTime: '8:00 PM',
      isOpen: true
    }
  },
  {
    id: 6,
    name: 'SpeedFit Athletics',
    slug: 'speedfit-athletics',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    description: 'Your one-stop shop for athletic gear, shoes, and fitness equipment.',
    rating: 4.9,
    reviews: 1567,
    verified: true,
    totalProducts: 234,
    location: {
      distance: '2.1 km',
      walkTime: '26 min',
      bikeTime: '8 min',
      carTime: '5 min',
      address: '789 Sports Boulevard, West Side'
    },
    hours: {
      openTime: '6:00 AM',
      closeTime: '10:00 PM',
      isOpen: true
    }
  },
  {
    id: 7,
    name: 'SunStyle Shop',
    slug: 'sunstyle-shop',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop',
    description: 'Trendy sunglasses and summer fashion accessories.',
    rating: 4.4,
    reviews: 456,
    verified: false,
    totalProducts: 67,
    location: {
      distance: '0.5 km',
      walkTime: '6 min',
      bikeTime: '2 min',
      carTime: '1 min',
      address: '321 Sunny Lane, Beach District'
    },
    hours: {
      openTime: '11:00 AM',
      closeTime: '7:00 PM',
      isOpen: false
    }
  },
  {
    id: 8,
    name: 'Fresh Mart',
    slug: 'fresh-mart',
    category: 'Grocery',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
    description: 'Fresh groceries, organic produce, and daily essentials.',
    rating: 4.5,
    reviews: 789,
    verified: true,
    totalProducts: 523,
    location: {
      distance: '0.3 km',
      walkTime: '4 min',
      bikeTime: '1 min',
      carTime: '1 min',
      address: '100 Market Street, Central'
    },
    hours: {
      openTime: '7:00 AM',
      closeTime: '11:00 PM',
      isOpen: true
    }
  },
  {
    id: 9,
    name: 'HomeStyle Kitchen',
    slug: 'homestyle-kitchen',
    category: 'Home',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
    description: 'Quality kitchenware, cookware, and home essentials for modern living.',
    rating: 4.3,
    reviews: 189,
    verified: true,
    totalProducts: 312,
    location: {
      distance: '1.8 km',
      walkTime: '22 min',
      bikeTime: '7 min',
      carTime: '5 min',
      address: '567 Home Avenue, Residential Area'
    },
    hours: {
      openTime: '9:00 AM',
      closeTime: '8:00 PM',
      isOpen: true
    }
  },
  {
    id: 10,
    name: 'PhotoPro Studio',
    slug: 'photopro-studio',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
    description: 'Professional cameras, lenses, and photography equipment.',
    rating: 4.9,
    reviews: 512,
    verified: true,
    totalProducts: 178,
    location: {
      distance: '4.5 km',
      walkTime: '55 min',
      bikeTime: '18 min',
      carTime: '12 min',
      address: '890 Photo Lane, Arts District'
    },
    hours: {
      openTime: '10:00 AM',
      closeTime: '7:00 PM',
      isOpen: true
    }
  }
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get store by ID
 */
export function getStoreById(id: number): Store | undefined {
  return stores.find(s => s.id === id)
}

/**
 * Get store by slug
 */
export function getStoreBySlug(slug: string): Store | undefined {
  return stores.find(s => s.slug === slug)
}

/**
 * Convert Store to StoreRef (minimal reference)
 */
export function toStoreRef(store: Store): StoreRef {
  return {
    id: store.id,
    name: store.name,
    image: store.image,
    rating: store.rating,
    reviews: store.reviews,
    verified: store.verified,
    location: store.location,
    hours: store.hours
  }
}

/**
 * Get stores by category
 */
export function getStoresByCategory(category: string): Store[] {
  return stores.filter(s => s.category.toLowerCase() === category.toLowerCase())
}

/**
 * Get verified stores
 */
export function getVerifiedStores(): Store[] {
  return stores.filter(s => s.verified)
}

/**
 * Get nearby stores (sorted by distance)
 */
export function getNearbyStores(limit: number = 10): Store[] {
  return [...stores]
    .sort((a, b) => parseFloat(a.location.distance) - parseFloat(b.location.distance))
    .slice(0, limit)
}

/**
 * Search stores by name or category
 */
export function searchStores(query: string): Store[] {
  const lowerQuery = query.toLowerCase()
  return stores.filter(s => 
    s.name.toLowerCase().includes(lowerQuery) ||
    s.category.toLowerCase().includes(lowerQuery) ||
    s.description.toLowerCase().includes(lowerQuery)
  )
}
