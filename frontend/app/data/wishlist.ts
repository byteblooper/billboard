// Wishlist Types and Demo Data

export interface WishlistItem {
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

export interface Collection {
  id: string
  name: string
  count: number
  icon: string
}

// Demo wishlist items
export const initialWishlistItems: WishlistItem[] = [
  {
    id: 1,
    productId: 101,
    name: 'Premium Wireless Headphones with Active Noise Cancellation',
    store: 'AudioTech Store',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.8,
    reviews: 2341,
    distance: '0.8 km',
    verified: true,
    inStock: true,
    trending: true,
    savedDays: 2
  },
  {
    id: 2,
    productId: 102,
    name: 'Classic Leather Watch - Rose Gold Edition',
    store: 'LuxTime Boutique',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    rating: 4.6,
    reviews: 892,
    distance: '1.2 km',
    verified: true,
    inStock: true,
    trending: false,
    savedDays: 5
  },
  {
    id: 3,
    productId: 103,
    name: 'Designer Sunglasses - UV Protection',
    store: 'SunStyle Shop',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.4,
    reviews: 456,
    distance: '0.5 km',
    verified: false,
    inStock: true,
    trending: true,
    savedDays: 1
  },
  {
    id: 4,
    productId: 104,
    name: 'Running Shoes Pro - Limited Edition',
    store: 'SpeedFit Athletics',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    price: 119.99,
    originalPrice: 149.99,
    discount: 20,
    rating: 4.9,
    reviews: 1567,
    distance: '2.1 km',
    verified: true,
    inStock: false,
    trending: true,
    savedDays: 7
  },
  {
    id: 5,
    productId: 105,
    name: 'Smart Home Speaker with Voice Control',
    store: 'TechPro Hub',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=400&fit=crop',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.5,
    reviews: 723,
    distance: '1.8 km',
    verified: true,
    inStock: true,
    trending: false,
    savedDays: 3
  },
  {
    id: 6,
    productId: 106,
    name: 'Professional DSLR Camera Bundle',
    store: 'PhotoPro Studio',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    price: 699.99,
    originalPrice: 899.99,
    discount: 22,
    rating: 4.8,
    reviews: 234,
    distance: '3.2 km',
    verified: true,
    inStock: true,
    trending: false,
    savedDays: 14
  }
]

// Wishlist collections
export const getCollections = (itemsCount: number): Collection[] => [
  { id: 'all', name: 'All Items', count: itemsCount, icon: '📦' },
  { id: 'electronics', name: 'Electronics', count: 2, icon: '🎧' },
  { id: 'fashion', name: 'Fashion', count: 3, icon: '👗' },
  { id: 'sports', name: 'Sports', count: 1, icon: '⚽' }
]
