'use client'

import React, { useState, useMemo } from 'react'
import { MapPin, Store } from 'lucide-react'
import ShopFilterSidebar from './components/ShopFilterSidebar'
import ShopGrid from './components/ShopGrid'
import { shops, defaultShopFilters, type Shop, type ShopFilterState } from '@/app/data'

export default function MapPage() {
  const [filters, setFilters] = useState<ShopFilterState>(defaultShopFilters)
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  // Filter shops
  const filteredShops = useMemo(() => {
    let result = [...shops]

    // Search
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      result = result.filter(s =>
        s.name.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query) ||
        s.address.toLowerCase().includes(query)
      )
    }

    // Category
    if (filters.category !== 'All') {
      result = result.filter(s => s.category === filters.category)
    }

    // Distance
    result = result.filter(s => 
      parseFloat(s.distance) >= filters.minDistance && 
      parseFloat(s.distance) <= filters.maxDistance
    )

    // Open status
    if (filters.isOpen !== null) {
      result = result.filter(s => s.isOpen === filters.isOpen)
    }

    // Verified only
    if (filters.verifiedOnly) {
      result = result.filter(s => s.verified)
    }

    return result
  }, [filters])

  const resetFilters = () => {
    setFilters(defaultShopFilters)
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
            <Store className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-violet-900">Nearby Stores</h1>
            <p className="text-violet-600 flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Find amazing stores around you
            </p>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Sidebar Filters */}
          <ShopFilterSidebar
            filters={filters}
            showMobileFilters={showMobileFilters}
            onFilterChange={setFilters}
            onResetFilters={resetFilters}
            onCloseMobile={() => setShowMobileFilters(false)}
          />

          {/* Shop Grid */}
          <div className="flex-1">
            <ShopGrid
              shops={filteredShops}
              totalShops={shops.length}
              onResetFilters={resetFilters}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
