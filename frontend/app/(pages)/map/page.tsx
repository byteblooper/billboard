'use client'

import React, { useState, useMemo } from 'react'
import { MapPin, Store, SlidersHorizontal, Search, Navigation, Locate, ChevronDown, List, Map } from 'lucide-react'
import ShopFilterSidebar from './components/ShopFilterSidebar'
import ShopGrid from './components/ShopGrid'
import { stores } from '@/store'

// Local filter state type (matches ShopFilterSidebar's expected type)
type ShopFilterState = {
  searchQuery: string
  category: string
  minDistance: number
  maxDistance: number
  isOpen: boolean | null
  verifiedOnly: boolean
}

// Convert store format for ShopGrid compatibility
const shopsData = stores.map(s => ({
  id: s.id,
  name: s.name,
  category: s.category,
  image: s.image,
  rating: s.rating,
  reviews: s.reviews,
  distance: s.location.distance.replace(' km', ''),
  isOpen: s.hours.isOpen,
  verified: s.verified,
  openTime: s.hours.openTime,
  closeTime: s.hours.closeTime,
  address: s.location.address || '',
  description: s.description,
  totalProducts: s.totalProducts,
  walkTime: s.location.walkTime,
  bikeTime: s.location.bikeTime,
  carTime: s.location.carTime
}))

const defaultShopFilters: ShopFilterState = {
  searchQuery: '',
  category: 'All',
  minDistance: 0,
  maxDistance: 10,
  isOpen: null,
  verifiedOnly: false
}

const categories = ['All', 'Electronics', 'Fashion', 'Food', 'Sports']

export default function MapPage() {
  const [filters, setFilters] = useState<ShopFilterState>(defaultShopFilters)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const [mobileView, setMobileView] = useState<'list' | 'map'>('list')
  const [mobileSearchQuery, setMobileSearchQuery] = useState('')

  // Filter shops
  const filteredShops = useMemo(() => {
    let result = [...shopsData]

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
    if (filters.category && filters.category !== 'All') {
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
      {/* Mobile Header - Full Width */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
        {/* Top Section with Title */}
        <div className="px-4 py-3 bg-gradient-to-r from-violet-600 to-indigo-600">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Nearby Stores</h1>
                <p className="text-xs text-white/80 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {filteredShops.length} stores found
                </p>
              </div>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-white text-xs font-medium">
              <Locate className="w-3.5 h-3.5" />
              My Location
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 py-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search stores, categories..."
              value={mobileSearchQuery}
              onChange={(e) => {
                setMobileSearchQuery(e.target.value)
                setFilters({ ...filters, searchQuery: e.target.value })
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="px-4 pb-3 mb-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilters({ ...filters, category: cat })}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  filters.category === cat
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
            <button
              onClick={() => setShowMobileFilters(true)}
              className="px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-1"
            >
              <SlidersHorizontal className="w-3 h-3" />
              More
            </button>
          </div>
        </div>

        {/* View Toggle (List/Map) */}
        <div className="px-4 pb-3 flex gap-2">
          <button
            onClick={() => setMobileView('list')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
              mobileView === 'list'
                ? 'bg-violet-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <List className="w-4 h-4" />
            List View
          </button>
          <button
            onClick={() => setMobileView('map')}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors ${
              mobileView === 'map'
                ? 'bg-violet-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Map className="w-4 h-4" />
            Map View
          </button>
        </div>
      </div>

      {/* Mobile Map View */}
      {mobileView === 'map' && (
        <div className="md:hidden relative h-[calc(100vh-280px)] bg-violet-50">
          {/* Map Placeholder with SVG Illustration */}
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 400 300" className="w-full h-full opacity-30">
              {/* Grid Lines */}
              <defs>
                <pattern id="mobileGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#8B5CF6" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
              </defs>
              <rect width="400" height="300" fill="url(#mobileGrid)"/>
              
              {/* Roads */}
              <path d="M 0 150 L 400 150" stroke="#8B5CF6" strokeWidth="8" opacity="0.2"/>
              <path d="M 200 0 L 200 300" stroke="#8B5CF6" strokeWidth="8" opacity="0.2"/>
              <path d="M 50 50 L 350 250" stroke="#8B5CF6" strokeWidth="4" opacity="0.15"/>
              
              {/* Store Markers */}
              <g>
                <circle cx="120" cy="100" r="12" fill="#8B5CF6"/>
                <circle cx="120" cy="100" r="6" fill="white"/>
              </g>
              <g>
                <circle cx="280" cy="80" r="12" fill="#8B5CF6"/>
                <circle cx="280" cy="80" r="6" fill="white"/>
              </g>
              <g>
                <circle cx="200" cy="150" r="15" fill="#EC4899"/>
                <circle cx="200" cy="150" r="7" fill="white"/>
              </g>
              <g>
                <circle cx="100" cy="220" r="12" fill="#8B5CF6"/>
                <circle cx="100" cy="220" r="6" fill="white"/>
              </g>
              <g>
                <circle cx="320" cy="200" r="12" fill="#8B5CF6"/>
                <circle cx="320" cy="200" r="6" fill="white"/>
              </g>
            </svg>
          </div>
          
          {/* Floating Card */}
          <div className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
                <Navigation className="w-6 h-6 text-violet-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-gray-900">{filteredShops.length} Stores Nearby</p>
                <p className="text-xs text-gray-500">Within {filters.maxDistance} km radius</p>
              </div>
              <button 
                onClick={() => setMobileView('list')}
                className="px-4 py-2 bg-violet-600 text-white rounded-xl text-sm font-semibold"
              >
                View All
              </button>
            </div>
          </div>

          {/* Current Location Indicator */}
          <div className="absolute top-4 right-4">
            <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200">
              <Locate className="w-5 h-5 text-violet-600" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile List View */}
      <div className={`md:hidden ${mobileView === 'map' ? 'hidden' : ''}`}>
        <div className="px-4 py-4 space-y-4">
          <ShopGrid
            shops={filteredShops}
            totalShops={shopsData.length}
            onResetFilters={resetFilters}
          />
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:block max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Store className="w-5 h-5 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-3xl font-bold text-violet-900">Nearby Stores</h1>
              <p className="text-sm sm:text-base text-violet-600 flex items-center gap-1">
                <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                Find amazing stores around you
              </p>
            </div>
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
              totalShops={shopsData.length}
              onResetFilters={resetFilters}
            />
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar Overlay */}
      <ShopFilterSidebar
        filters={filters}
        showMobileFilters={showMobileFilters}
        onFilterChange={setFilters}
        onResetFilters={resetFilters}
        onCloseMobile={() => setShowMobileFilters(false)}
      />
    </div>
  )
}
