'use client'

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { SlidersHorizontal, Loader2 } from 'lucide-react'
import ProductCards from '@/app/components/ProductCards'
import SearchBar from './components/SearchBar'
import FilterSidebar from './components/FilterSidebar'
import { products } from '@/store'

// Convert store products to shop format
const shopProducts = products.map(p => ({
  id: p.id,
  name: p.name,
  price: p.pricing.price,
  originalPrice: p.pricing.originalPrice,
  discount: p.pricing.discount,
  rating: p.rating.rating,
  reviews: p.rating.reviews,
  verified: p.verified,
  image: p.image,
  store: p.store.name,
  distance: p.store.location.distance.replace(' km', ''),
  walkTime: p.store.location.walkTime,
  bikeTime: p.store.location.bikeTime,
  carTime: p.store.location.carTime,
  category: p.category,
  brand: p.brand
}))

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

const defaultFilters: FilterState = {
  category: 'All',
  brand: 'All',
  minPrice: 0,
  maxPrice: 200000,
  minDistance: 0,
  maxDistance: 10,
  minRating: 0,
  searchQuery: '',
  sortBy: 'relevance'
}

const ITEMS_PER_LOAD = 10

export default function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD)
  const [isLoading, setIsLoading] = useState(false)
  const loaderRef = useRef<HTMLDivElement>(null)

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = [...shopProducts]

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

  // Visible products for infinite scroll
  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount)
  }, [filteredProducts, visibleCount])

  const hasMore = visibleCount < filteredProducts.length

  // Load more products
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setVisibleCount(prev => Math.min(prev + ITEMS_PER_LOAD, filteredProducts.length))
      setIsLoading(false)
    }, 300)
  }, [isLoading, hasMore, filteredProducts.length])

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore()
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => observer.disconnect()
  }, [hasMore, isLoading, loadMore])

  const resetFilters = () => {
    setFilters(defaultFilters)
    setVisibleCount(ITEMS_PER_LOAD)
  }

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters)
    setVisibleCount(ITEMS_PER_LOAD)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-violet-900 mb-1 sm:mb-2">Discover Products</h1>
            <p className="text-sm sm:text-base text-violet-600">Find amazing products from stores near you</p>
          </div>
          {/* Mobile Filter Button */}
          <button
            onClick={() => setShowMobileFilters(true)}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-violet-600 text-white rounded-lg font-medium text-sm"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
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
              Showing {visibleProducts.length} of {filteredProducts.length} products
            </div>

            {/* Products */}
            {visibleProducts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {visibleProducts.map((product) => (
                    <ProductCards key={product.id} product={product} />
                  ))}
                </div>

                {/* Infinite Scroll Loader */}
                {hasMore && (
                  <div 
                    ref={loaderRef} 
                    className="flex justify-center items-center py-8"
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-2 text-violet-600">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="text-sm font-medium">Loading more...</span>
                      </div>
                    ) : (
                      <div className="h-8" />
                    )}
                  </div>
                )}

                {/* End of Results */}
                {!hasMore && filteredProducts.length > ITEMS_PER_LOAD && (
                  <div className="text-center py-8 text-violet-500 text-sm">
                    You&apos;ve reached the end of the list
                  </div>
                )}
              </>
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
          </div>
        </div>
      </div>
    </div>
  )
}
