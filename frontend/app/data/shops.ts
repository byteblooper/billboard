// Shop Types and Demo Data

export interface Shop {
  id: number
  name: string
  category: string
  image: string
  rating: number
  reviews: number
  distance: string
  isOpen: boolean
  verified: boolean
  openTime: string
  closeTime: string
  address: string
  description: string
  totalProducts: number
  walkTime: string
  bikeTime: string
  carTime: string
}

export const shops: Shop[] = [
  {
    id: 1,
    name: 'AudioTech Store',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
    rating: 4.8,
    reviews: 2341,
    distance: '0.8',
    isOpen: true,
    verified: true,
    openTime: '9:00 AM',
    closeTime: '9:00 PM',
    address: '123 Tech Avenue, Downtown',
    description: 'Premium audio equipment and accessories for audiophiles and music lovers.',
    totalProducts: 156,
    walkTime: '10 min',
    bikeTime: '3 min',
    carTime: '2 min'
  },
  {
    id: 2,
    name: 'LuxTime Boutique',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop',
    rating: 4.6,
    reviews: 892,
    distance: '1.2',
    isOpen: true,
    verified: true,
    openTime: '10:00 AM',
    closeTime: '8:00 PM',
    address: '456 Fashion Street, Midtown',
    description: 'Luxury watches and fashion accessories for the discerning customer.',
    totalProducts: 89,
    walkTime: '15 min',
    bikeTime: '5 min',
    carTime: '3 min'
  },
  {
    id: 3,
    name: 'SpeedFit Athletics',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
    rating: 4.9,
    reviews: 1567,
    distance: '2.1',
    isOpen: true,
    verified: true,
    openTime: '6:00 AM',
    closeTime: '10:00 PM',
    address: '789 Sports Boulevard, West Side',
    description: 'Your one-stop shop for athletic gear, shoes, and fitness equipment.',
    totalProducts: 234,
    walkTime: '26 min',
    bikeTime: '8 min',
    carTime: '5 min'
  },
  {
    id: 4,
    name: 'SunStyle Shop',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=400&h=300&fit=crop',
    rating: 4.4,
    reviews: 456,
    distance: '0.5',
    isOpen: false,
    verified: false,
    openTime: '11:00 AM',
    closeTime: '7:00 PM',
    address: '321 Sunny Lane, Beach District',
    description: 'Trendy sunglasses and summer fashion accessories.',
    totalProducts: 67,
    walkTime: '6 min',
    bikeTime: '2 min',
    carTime: '1 min'
  },
  {
    id: 5,
    name: 'TechPro Hub',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=300&fit=crop',
    rating: 4.7,
    reviews: 1234,
    distance: '1.8',
    isOpen: true,
    verified: true,
    openTime: '9:00 AM',
    closeTime: '8:00 PM',
    address: '567 Digital Drive, Tech Park',
    description: 'Latest gadgets, smartphones, and computer accessories.',
    totalProducts: 312,
    walkTime: '22 min',
    bikeTime: '7 min',
    carTime: '4 min'
  },
  {
    id: 6,
    name: 'Fresh Mart',
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
    rating: 4.5,
    reviews: 789,
    distance: '0.3',
    isOpen: true,
    verified: true,
    openTime: '7:00 AM',
    closeTime: '11:00 PM',
    address: '100 Market Street, Central',
    description: 'Fresh groceries, organic produce, and daily essentials.',
    totalProducts: 523,
    walkTime: '4 min',
    bikeTime: '1 min',
    carTime: '1 min'
  }
]

// Shop filter default state
export interface ShopFilterState {
  searchQuery: string
  category: string
  minDistance: number
  maxDistance: number
  isOpen: boolean | null
  verifiedOnly: boolean
}

export const defaultShopFilters: ShopFilterState = {
  searchQuery: '',
  category: 'All',
  minDistance: 0,
  maxDistance: 10,
  isOpen: null,
  verifiedOnly: false
}

// Shop categories
export const shopCategories = ['All', 'Electronics', 'Fashion', 'Food & Beverage', 'Sports', 'Home & Garden', 'Health & Beauty']
