'use client'

import React, { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import ShopFilterSidebar from './components/ShopFilterSidebar'
import ShopGrid from './components/ShopGrid'



type ShopFilterState = {
  searchQuery: string
  category: string
  minDistance: number
  maxDistance: number
  isOpen: boolean | null
  verifiedOnly: boolean
}

const MapPage = () => {

    // Demo Data
const demoShops = [
  {
    id: 1,
    name: 'TechZone Electronics',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500&h=300&fit=crop',
    rating: 4.8,
    reviews: 1247,
    distance: '2.3 km',
    isOpen: true,
    verified: true,
    openTime: '9:00 AM',
    closeTime: '9:00 PM',
    address: '123 Tech Street, San Francisco, CA',
    description: 'Your one-stop destination for all electronic devices, gadgets, and accessories. Latest tech at best prices.',
    totalProducts: 12,
    walkTime: '6 min',
    bikeTime: '2 min',
    carTime: '1 min'
  },
  {
    id: 2,
    name: 'StyleCo Fashion',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop',
    rating: 4.6,
    reviews: 892,
    distance: '1.5 km',
    isOpen: true,
    verified: true,
    openTime: '10:00 AM',
    closeTime: '10:00 PM',
    address: '456 Fashion Ave, San Francisco, CA',
    description: 'Premium fashion boutique offering trendy clothing, accessories, and footwear for all occasions.',
    totalProducts: 8,
    walkTime: '10 min',
    bikeTime: '3 min',
    carTime: '2 min'
  },
  {
    id: 3,
    name: 'Sports Galaxy',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500&h=300&fit=crop',
    rating: 4.7,
    reviews: 890,
    distance: '4.2 km',
    isOpen: false,
    verified: true,
    openTime: '8:00 AM',
    closeTime: '8:00 PM',
    address: '789 Fitness Road, San Francisco, CA',
    description: 'Complete sports equipment and athletic wear store. Everything for your active lifestyle.',
    totalProducts: 15,
    walkTime: '25 min',
    bikeTime: '8 min',
    carTime: '5 min'
  },
  {
    id: 4,
    name: 'Gourmet Delights',
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500&h=300&fit=crop',
    rating: 4.6,
    reviews: 1567,
    distance: '0.8 km',
    isOpen: true,
    verified: false,
    openTime: '7:00 AM',
    closeTime: '11:00 PM',
    address: '321 Food Plaza, San Francisco, CA',
    description: 'Fresh organic produce, gourmet ingredients, and international delicacies. Farm to table quality.',
    totalProducts: 20,
    walkTime: '5 min',
    bikeTime: '2 min',
    carTime: '1 min'
  },
  {
    id: 5,
    name: 'Home & Garden Paradise',
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=500&h=300&fit=crop',
    rating: 4.5,
    reviews: 678,
    distance: '5.1 km',
    isOpen: true,
    verified: true,
    openTime: '9:00 AM',
    closeTime: '7:00 PM',
    address: '654 Green Lane, San Francisco, CA',
    description: 'Transform your living space with our wide range of home decor, furniture, and garden supplies.',
    totalProducts: 18,
    walkTime: '30 min',
    bikeTime: '12 min',
    carTime: '7 min'
  },
  {
    id: 6,
    name: 'Beauty & Wellness Center',
    category: 'Health & Beauty',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=500&h=300&fit=crop',
    rating: 4.9,
    reviews: 2341,
    distance: '1.2 km',
    isOpen: true,
    verified: true,
    openTime: '10:00 AM',
    closeTime: '9:00 PM',
    address: '987 Wellness Avenue, San Francisco, CA',
    description: 'Premium beauty products, skincare, cosmetics, and wellness items. Expert advice available.',
    totalProducts: 14,
    walkTime: '8 min',
    bikeTime: '3 min',
    carTime: '2 min'
  },
  {
    id: 7,
    name: 'Style Corner',
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1469395446868-fb6a048d5ca3?w=500&h=300&fit=crop',
    rating: 4.4,
    reviews: 523,
    distance: '3.1 km',
    isOpen: false,
    verified: false,
    openTime: '11:00 AM',
    closeTime: '8:00 PM',
    address: '147 Fashion Street, San Francisco, CA',
    description: 'Affordable fashion for everyone. Latest trends at budget-friendly prices.',
    totalProducts: 10,
    walkTime: '18 min',
    bikeTime: '6 min',
    carTime: '4 min'
  },
  {
    id: 8,
    name: 'Digital World',
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&h=300&fit=crop',
    rating: 4.7,
    reviews: 1089,
    distance: '2.9 km',
    isOpen: true,
    verified: true,
    openTime: '9:30 AM',
    closeTime: '9:30 PM',
    address: '258 Digital Plaza, San Francisco, CA',
    description: 'Computers, laptops, smartphones, and all your digital needs under one roof.',
    totalProducts: 16,
    walkTime: '15 min',
    bikeTime: '5 min',
    carTime: '3 min'
  },
  {
    id: 9,
    name: 'Fresh Mart',
    category: 'Food & Beverage',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&h=300&fit=crop',
    rating: 4.8,
    reviews: 1876,
    distance: '1.7 km',
    isOpen: true,
    verified: true,
    openTime: '6:00 AM',
    closeTime: '10:00 PM',
    address: '369 Market Road, San Francisco, CA',
    description: 'Your neighborhood grocery store with fresh produce, dairy, and daily essentials.',
    totalProducts: 25,
    walkTime: '12 min',
    bikeTime: '4 min',
    carTime: '2 min'
  },
  {
    id: 10,
    name: 'Fitness Pro',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=500&h=300&fit=crop',
    rating: 4.6,
    reviews: 734,
    distance: '3.8 km',
    isOpen: false,
    verified: false,
    openTime: '7:00 AM',
    closeTime: '9:00 PM',
    address: '741 Gym Street, San Francisco, CA',
    description: 'Professional sports equipment, gym gear, and fitness supplements for athletes.',
    totalProducts: 11,
    walkTime: '22 min',
    bikeTime: '8 min',
    carTime: '5 min'
  },
  {
    id: 11,
    name: 'Eco Home Store',
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=300&fit=crop',
    rating: 4.7,
    reviews: 923,
    distance: '6.2 km',
    isOpen: true,
    verified: true,
    openTime: '9:00 AM',
    closeTime: '6:00 PM',
    address: '852 Eco Lane, San Francisco, CA',
    description: 'Sustainable home products, eco-friendly furniture, and organic garden supplies.',
    totalProducts: 13,
    walkTime: '35 min',
    bikeTime: '14 min',
    carTime: '8 min'
  },
  {
    id: 12,
    name: 'Glamour Beauty',
    category: 'Health & Beauty',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&h=300&fit=crop',
    rating: 4.5,
    reviews: 1456,
    distance: '2.1 km',
    isOpen: true,
    verified: false,
    openTime: '10:00 AM',
    closeTime: '8:00 PM',
    address: '963 Beauty Boulevard, San Francisco, CA',
    description: 'Luxury beauty products, makeup, fragrances, and professional beauty services.',
    totalProducts: 9,
    walkTime: '14 min',
    bikeTime: '5 min',
    carTime: '3 min'
  }
]
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const [filters, setFilters] = useState<ShopFilterState>({
    searchQuery: '',
    category: 'All',
    minDistance: 0,
    maxDistance: 50,
    isOpen: null,
    verifiedOnly: false
  })

  // Filter shops
  const filteredShops = demoShops.filter(shop => {
    // Search query
    if (filters.searchQuery !== '') {
      const query = filters.searchQuery.toLowerCase()
      if (!shop.name.toLowerCase().includes(query)) {
        return false
      }
    }

    // Category
    if (filters.category !== 'All' && shop.category !== filters.category) {
      return false
    }

    // Distance
    const distance = parseFloat(shop.distance)
    if (distance < filters.minDistance || distance > filters.maxDistance) {
      return false
    }

    // Open/Close status
    if (filters.isOpen !== null && shop.isOpen !== filters.isOpen) {
      return false
    }

    // Verified only
    if (filters.verifiedOnly && !shop.verified) {
      return false
    }

    return true
  })

  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      category: 'All',
      minDistance: 0,
      maxDistance: 50,
      isOpen: null,
      verifiedOnly: false
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-violet-800 mb-2">All Shops Near You</h1>
          <p className="text-violet-600">Discover local shops and explore their products</p>
        </div>

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden mb-6 w-full px-6 py-3 bg-violet-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-violet-600 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <ShopFilterSidebar
            filters={filters}
            showMobileFilters={showMobileFilters}
            onFilterChange={setFilters}
            onResetFilters={resetFilters}
            onCloseMobile={() => setShowMobileFilters(false)}
          />

          {/* Shops Grid */}
          <main className="flex-1">
            <ShopGrid
              shops={filteredShops}
              totalShops={filteredShops.length}
              onResetFilters={resetFilters}
            />
          </main>
        </div>
      </div>
    </div>
  )
}

export default MapPage
