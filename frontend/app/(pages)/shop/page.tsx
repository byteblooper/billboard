'use client'

import React, { useState, useMemo } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import ProductCards from '@/app/components/ProductCards'
import SearchBar from './components/SearchBar'
import FilterSidebar from './components/FilterSidebar'
import Pagination from './components/Pagination'


// Types
type FilterState = {
  category: string
  brand: string
  minPrice: number
  maxPrice: number
  minDistance: number
  maxDistance: number
  minRating: number
  searchQuery: string
  sortBy: string
}

type Product = {
  id: number
  discount: number
  verified: boolean
  image: string
  rating: number
  reviews: number
  name: string
  store: string
  price: number
  originalPrice: number
  distance: string
  walkTime: string
  bikeTime: string
  carTime: string
  category: string
  brand: string
}

// Demo Data
const demoProducts: Product[] = [
  {
    id: 1,
    discount: 25,
    verified: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 2341,
    name: 'Premium Wireless Headphones',
    store: 'AudioTech Store',
    price: 149.99,
    originalPrice: 199.99,
    distance: '0.8',
    walkTime: '10 min',
    bikeTime: '3 min',
    carTime: '2 min',
    category: 'Electronics',
    brand: 'AudioTech'
  },
  {
    id: 2,
    discount: 31,
    verified: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 892,
    name: 'Classic Leather Watch',
    store: 'LuxTime Boutique',
    price: 89.99,
    originalPrice: 129.99,
    distance: '1.2',
    walkTime: '15 min',
    bikeTime: '5 min',
    carTime: '3 min',
    category: 'Fashion',
    brand: 'LuxTime'
  },
  {
    id: 3,
    discount: 20,
    verified: false,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 456,
    name: 'Designer Sunglasses',
    store: 'SunStyle Shop',
    price: 79.99,
    originalPrice: 99.99,
    distance: '0.5',
    walkTime: '6 min',
    bikeTime: '2 min',
    carTime: '1 min',
    category: 'Fashion',
    brand: 'SunStyle'
  },
  {
    id: 4,
    discount: 20,
    verified: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 1567,
    name: 'Running Shoes Pro',
    store: 'SpeedFit Athletics',
    price: 119.99,
    originalPrice: 149.99,
    distance: '2.1',
    walkTime: '26 min',
    bikeTime: '8 min',
    carTime: '5 min',
    category: 'Sports',
    brand: 'SpeedFit'
  },
  {
    id: 5,
    discount: 15,
    verified: true,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 234,
    name: 'Premium Skincare Set',
    store: 'TechPro Store',
    price: 84.99,
    originalPrice: 99.99,
    distance: '1.5',
    walkTime: '18 min',
    bikeTime: '5 min',
    carTime: '4 min',
    category: 'Electronics',
    brand: 'TechPro'
  },
  {
    id: 6,
    discount: 30,
    verified: true,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 678,
    name: 'Travel Backpack',
    store: 'TravelPro Gear',
    price: 69.99,
    originalPrice: 99.99,
    distance: '3.2',
    walkTime: '40 min',
    bikeTime: '12 min',
    carTime: '8 min',
    category: 'Fashion',
    brand: 'TravelPro'
  },
  {
    id: 7,
    discount: 10,
    verified: false,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 189,
    name: 'Stainless Steel Cookware Set',
    store: 'HomeStyle Kitchen',
    price: 179.99,
    originalPrice: 199.99,
    distance: '1.8',
    walkTime: '22 min',
    bikeTime: '7 min',
    carTime: '5 min',
    category: 'Home',
    brand: 'HomeStyle'
  },
  {
    id: 8,
    discount: 40,
    verified: true,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 512,
    name: 'Professional Camera',
    store: 'PhotoPro Studio',
    price: 599.99,
    originalPrice: 999.99,
    distance: '4.5',
    walkTime: '55 min',
    bikeTime: '18 min',
    carTime: '12 min',
    category: 'Electronics',
    brand: 'PhotoPro'
  }
]

const defaultFilters: FilterState = {
  category: 'All',
  brand: 'All',
  minPrice: 0,
  maxPrice: 1000,
  minDistance: 0,
  maxDistance: 10,
  minRating: 0,
  searchQuery: '',
  sortBy: 'relevance'
}

const ITEMS_PER_PAGE = 6

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...demoProducts]

    // Search
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.store.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      )
    }

    // Category
    if (filters.category !== 'All') {
      result = result.filter(p => p.category === filters.category)
    }

    // Brand
    if (filters.brand !== 'All') {
      result = result.filter(p => p.brand === filters.brand)
    }

    // Price Range
    result = result.filter(p => p.price >= filters.minPrice && p.price <= filters.maxPrice)

    // Distance
    result = result.filter(p => parseFloat(p.distance) >= filters.minDistance && parseFloat(p.distance) <= filters.maxDistance)

    // Rating
    result = result.filter(p => p.rating >= filters.minRating)

    // Sort
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'distance':
        result.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance))
        break
      case 'discount':
        result.sort((a, b) => b.discount - a.discount)
        break
    }

    return result
  }, [filters])

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE)
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )

  const resetFilters = () => {
    setFilters(defaultFilters)
    setCurrentPage(1)
  }

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-violet-900 mb-2">Discover Products</h1>
          <p className="text-violet-600">Find amazing products from stores near you</p>
        </div>

        {/* Search Bar */}
        <SearchBar
          searchQuery={filters.searchQuery}
          sortBy={filters.sortBy}
          onSearchChange={(value) => handleFilterChange({ ...filters, searchQuery: value })}
          onSortChange={(value) => handleFilterChange({ ...filters, sortBy: value })}
        />

        <div className="flex gap-6 mt-6">
          {/* Sidebar */}
          <FilterSidebar
            filters={filters}
            showMobileFilters={showMobileFilters}
            onFilterChange={handleFilterChange}
            onResetFilters={resetFilters}
            onCloseMobile={() => setShowMobileFilters(false)}
          />

          {/* Product Grid */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-4 text-sm text-violet-600">
              Showing {paginatedProducts.length} of {filteredProducts.length} products
            </div>

            {/* Products */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedProducts.map((product) => (
                  <ProductCards key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-12 text-center border border-violet-100">
                <SlidersHorizontal className="w-12 h-12 text-violet-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-violet-900 mb-2">No products found</h3>
                <p className="text-violet-600 mb-4">Try adjusting your filters or search query</p>
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
