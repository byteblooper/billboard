'use client'

import React, { useState } from 'react'
import { SlidersHorizontal } from 'lucide-react'
import SearchBar from './components/SearchBar'
import FilterSidebar from './components/FilterSidebar'
import ProductGrid from './components/ProductGrid'
import Pagination from './components/Pagination'

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

const ShopPage = () => {
  // Demo Data
const demoProducts = [
  {
    id: 1,
    discount: 25,
    verified: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 1234,
    name: 'Premium Wireless Headphones',
    store: 'TechHub Electronics',
    price: 149.99,
    originalPrice: 199.99,
    distance: '2.3 km',
    walkTime: '28 min',
    bikeTime: '12 min',
    carTime: '5 min',
    category: 'Electronics',
    brand: 'AudioTech'
  },
  {
    id: 2,
    discount: 40,
    verified: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 2100,
    name: 'Classic Leather Watch',
    store: 'Fashion Avenue',
    price: 89.99,
    originalPrice: 149.99,
    distance: '1.5 km',
    walkTime: '18 min',
    bikeTime: '8 min',
    carTime: '3 min',
    category: 'Fashion',
    brand: 'LuxTime'
  },
  {
    id: 3,
    discount: 30,
    verified: false,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    rating: 4.6,
    reviews: 856,
    name: 'Designer Sunglasses',
    store: 'Style Corner',
    price: 79.99,
    originalPrice: 114.99,
    distance: '3.1 km',
    walkTime: '35 min',
    bikeTime: '15 min',
    carTime: '7 min',
    category: 'Fashion',
    brand: 'SunStyle'
  },
  {
    id: 4,
    discount: 20,
    verified: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    rating: 4.7,
    reviews: 1890,
    name: 'Running Shoes Pro',
    store: 'Sports Galaxy',
    price: 119.99,
    originalPrice: 149.99,
    distance: '4.2 km',
    walkTime: '48 min',
    bikeTime: '20 min',
    carTime: '9 min',
    category: 'Sports',
    brand: 'SpeedFit'
  },
  {
    id: 5,
    discount: 35,
    verified: true,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop',
    rating: 4.5,
    reviews: 672,
    name: 'Smart Watch Ultra',
    store: 'TechHub Electronics',
    price: 299.99,
    originalPrice: 461.99,
    distance: '2.3 km',
    walkTime: '28 min',
    bikeTime: '12 min',
    carTime: '5 min',
    category: 'Electronics',
    brand: 'TechPro'
  },
  {
    id: 6,
    discount: 15,
    verified: true,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 3200,
    name: 'Luxury Backpack',
    store: 'Fashion Avenue',
    price: 89.99,
    originalPrice: 105.99,
    distance: '1.5 km',
    walkTime: '18 min',
    bikeTime: '8 min',
    carTime: '3 min',
    category: 'Fashion',
    brand: 'TravelPro'
  },
  {
    id: 7,
    discount: 50,
    verified: false,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&h=500&fit=crop',
    rating: 4.4,
    reviews: 445,
    name: 'Ceramic Coffee Mug Set',
    store: 'Home Decor Plus',
    price: 24.99,
    originalPrice: 49.99,
    distance: '5.7 km',
    walkTime: '65 min',
    bikeTime: '28 min',
    carTime: '12 min',
    category: 'Home',
    brand: 'HomeStyle'
  },
  {
    id: 8,
    discount: 45,
    verified: true,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 1567,
    name: 'Wireless Camera 4K',
    store: 'TechHub Electronics',
    price: 399.99,
    originalPrice: 727.99,
    distance: '2.3 km',
    walkTime: '28 min',
    bikeTime: '12 min',
    carTime: '5 min',
    category: 'Electronics',
    brand: 'PhotoPro'
  },
  {
    id: 9,
    discount: 25,
    verified: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 1234,
    name: 'Premium Wireless Headphones',
    store: 'TechHub Electronics',
    price: 149.99,
    originalPrice: 199.99,
    distance: '2.3 km',
    walkTime: '28 min',
    bikeTime: '12 min',
    carTime: '5 min',
    category: 'Electronics',
    brand: 'AudioTech'
  },
  {
    id: 10,
    discount: 40,
    verified: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 2100,
    name: 'Classic Leather Watch',
    store: 'Fashion Avenue',
    price: 89.99,
    originalPrice: 149.99,
    distance: '1.5 km',
    walkTime: '18 min',
    bikeTime: '8 min',
    carTime: '3 min',
    category: 'Fashion',
    brand: 'LuxTime'
  },
  {
    id: 11,
    discount: 30,
    verified: false,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&h=500&fit=crop',
    rating: 4.6,
    reviews: 856,
    name: 'Designer Sunglasses',
    store: 'Style Corner',
    price: 79.99,
    originalPrice: 114.99,
    distance: '3.1 km',
    walkTime: '35 min',
    bikeTime: '15 min',
    carTime: '7 min',
    category: 'Fashion',
    brand: 'SunStyle'
  },
  {
    id: 12,
    discount: 20,
    verified: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    rating: 4.7,
    reviews: 1890,
    name: 'Running Shoes Pro',
    store: 'Sports Galaxy',
    price: 119.99,
    originalPrice: 149.99,
    distance: '4.2 km',
    walkTime: '48 min',
    bikeTime: '20 min',
    carTime: '9 min',
    category: 'Sports',
    brand: 'SpeedFit'
  },
  {
    id: 13,
    discount: 35,
    verified: true,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=500&h=500&fit=crop',
    rating: 4.5,
    reviews: 672,
    name: 'Smart Watch Ultra',
    store: 'TechHub Electronics',
    price: 299.99,
    originalPrice: 461.99,
    distance: '2.3 km',
    walkTime: '28 min',
    bikeTime: '12 min',
    carTime: '5 min',
    category: 'Electronics',
    brand: 'TechPro'
  },
  {
    id: 14,
    discount: 15,
    verified: true,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop',
    rating: 4.9,
    reviews: 3200,
    name: 'Luxury Backpack',
    store: 'Fashion Avenue',
    price: 89.99,
    originalPrice: 105.99,
    distance: '1.5 km',
    walkTime: '18 min',
    bikeTime: '8 min',
    carTime: '3 min',
    category: 'Fashion',
    brand: 'TravelPro'
  },
  {
    id: 15,
    discount: 50,
    verified: false,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500&h=500&fit=crop',
    rating: 4.4,
    reviews: 445,
    name: 'Ceramic Coffee Mug Set',
    store: 'Home Decor Plus',
    price: 24.99,
    originalPrice: 49.99,
    distance: '5.7 km',
    walkTime: '65 min',
    bikeTime: '28 min',
    carTime: '12 min',
    category: 'Home',
    brand: 'HomeStyle'
  },
  {
    id: 16,
    discount: 45,
    verified: true,
    image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop',
    rating: 4.8,
    reviews: 1567,
    name: 'Wireless Camera 4K',
    store: 'TechHub Electronics',
    price: 399.99,
    originalPrice: 727.99,
    distance: '2.3 km',
    walkTime: '28 min',
    bikeTime: '12 min',
    carTime: '5 min',
    category: 'Electronics',
    brand: 'PhotoPro'
  }
]

const brands = ['All', 'AudioTech', 'LuxTime', 'SunStyle', 'SpeedFit', 'TechPro', 'TravelPro', 'HomeStyle', 'PhotoPro']






  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const [filters, setFilters] = useState<FilterState>({
    category: 'All',
    brand: 'All',
    minPrice: 0,
    maxPrice: 1000,
    minDistance: 0,
    maxDistance: 50,
    minRating: 0,
    searchQuery: '',
    sortBy: 'Featured'
  })


  //filtering and sorting
const filteredProducts = demoProducts.filter(product => {
  // Category
  if (filters.category !== 'All' && product.category !== filters.category) {
    return false
  }

  // Brand
  if (filters.brand !== 'All' && product.brand !== filters.brand) {
    return false
  }

  // Price
  if (product.price < filters.minPrice || product.price > filters.maxPrice) {
    return false
  }

  // Distance
  const distance = parseFloat(product.distance)
  if (distance < filters.minDistance || distance > filters.maxDistance) {
    return false
  }

  // Rating
  if (product.rating < filters.minRating) {
    return false
  }

  // Search
  if (filters.searchQuery !== "") {
    const q = filters.searchQuery.toLowerCase()
    const name = product.name.toLowerCase()
    const brand = product.brand.toLowerCase()
    const store = product.store.toLowerCase()

    if (
      !name.includes(q) &&
      !brand.includes(q) &&
      !store.includes(q)
    ) {
      return false
    }
  }

  return true
}).sort((a, b) => {
  if (filters.sortBy === 'Price: Low to High') {
    return a.price - b.price
  }

  if (filters.sortBy === 'Price: High to Low') {
    return b.price - a.price
  }

  if (filters.sortBy === 'Rating') {
    return b.rating - a.rating
  }

  if (filters.sortBy === 'Distance') {
    return parseFloat(a.distance) - parseFloat(b.distance)
  }

  return 0
})

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)

  const resetFilters = () => {
    setFilters({
      category: 'All',
      brand: 'All',
      minPrice: 0,
      maxPrice: 1000,
      minDistance: 0,
      maxDistance: 50,
      minRating: 0,
      searchQuery: '',
      sortBy: 'Featured'
    })
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Shop All Products</h1>
          <p className="text-slate-600">Discover amazing deals from stores near you</p>
        </div>

        {/* Search & Sort Bar */}
        <SearchBar
          searchQuery={filters.searchQuery}
          sortBy={filters.sortBy}
          onSearchChange={(query) => {
            setFilters({ ...filters, searchQuery: query })
            setCurrentPage(1)
          }}
          onSortChange={(sort) => setFilters({ ...filters, sortBy: sort })}
        />

        {/* Mobile Filter Toggle */}
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden mb-6 w-full px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
          Filters
        </button>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <FilterSidebar
            filters={filters}
            showMobileFilters={showMobileFilters}
            onFilterChange={(newFilters) => {
              setFilters(newFilters)
              setCurrentPage(1)
            }}
            onResetFilters={resetFilters}
            onCloseMobile={() => setShowMobileFilters(false)}
          />

          {/* Products Grid */}
          <main className="flex-1">
            <ProductGrid
              products={paginatedProducts}
              totalProducts={filteredProducts.length}
              onResetFilters={resetFilters}
            />

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </main>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
