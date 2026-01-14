import React from 'react'
import { X, Search, SlidersHorizontal } from 'lucide-react'

type ShopFilterState = {
  searchQuery: string
  category: string
  minDistance: number
  maxDistance: number
  isOpen: boolean | null
  verifiedOnly: boolean
}

type ShopFilterSidebarProps = {
  filters: ShopFilterState
  showMobileFilters: boolean
  onFilterChange: (filters: ShopFilterState) => void
  onResetFilters: () => void
  onCloseMobile: () => void
}

const categories = ['All', 'Electronics', 'Fashion', 'Food & Beverage', 'Sports', 'Home & Garden', 'Health & Beauty']

const ShopFilterSidebar = ({ 
  filters, 
  showMobileFilters, 
  onFilterChange, 
  onResetFilters, 
  onCloseMobile 
}: ShopFilterSidebarProps) => {
  // Mobile: Only show when triggered via bottom sheet
  if (!showMobileFilters) {
    return (
      <aside className="hidden md:block md:w-80 shrink-0">
        <div className="md:sticky md:top-24">
          <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Filters</h2>
              <button
                onClick={onResetFilters}
                className="text-sm text-violet-600 hover:text-violet-700 font-semibold"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-6">
              {/* Search by Shop Name */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Search Shop</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Shop name..."
                    value={filters.searchQuery}
                    onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 bg-amber-300">Category</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={filters.category === cat}
                        onChange={() => onFilterChange({ ...filters, category: cat })}
                        className="w-4 h-4 text-gray-900 focus:ring-gray-500"
                      />
                      <span className="text-gray-700 group-hover:text-gray-900">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Distance Range */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Distance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <span>0 km</span>
                    <span>{filters.maxDistance >= 50 ? 'Full City' : `${filters.maxDistance} km`}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={filters.maxDistance}
                    onChange={(e) => onFilterChange({ ...filters, maxDistance: Number(e.target.value) })}
                    className="w-full accent-gray-900"
                  />
                </div>
              </div>

              {/* Open/Close Status */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="status"
                      checked={filters.isOpen === null}
                      onChange={() => onFilterChange({ ...filters, isOpen: null })}
                      className="w-4 h-4 text-gray-900 focus:ring-gray-500"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900">All Shops</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="status"
                      checked={filters.isOpen === true}
                      onChange={() => onFilterChange({ ...filters, isOpen: true })}
                      className="w-4 h-4 text-gray-900 focus:ring-gray-500"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900">Open Now</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="status"
                      checked={filters.isOpen === false}
                      onChange={() => onFilterChange({ ...filters, isOpen: false })}
                      className="w-4 h-4 text-gray-900 focus:ring-gray-500"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900">Closed</span>
                  </label>
                </div>
              </div>

              {/* Verified Only */}
              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.verifiedOnly}
                    onChange={(e) => onFilterChange({ ...filters, verifiedOnly: e.target.checked })}
                    className="w-4 h-4 text-violet-600 focus:ring-violet-500 rounded"
                  />
                  <span className="text-gray-700 font-medium">Verified Shops Only</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </aside>
    )
  }

  // Mobile Filter Bottom Sheet
  return (
    <div className="md:hidden fixed inset-0 z-50 bg-black/50" onClick={onCloseMobile}>
      <div 
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Handle Bar */}
        <div className="sticky top-0 bg-white pt-3 pb-2 px-4 border-b border-gray-100 z-10">
          <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3" />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-violet-600" />
              <h2 className="text-lg font-bold text-gray-900">Filters</h2>
            </div>
            <button
              onClick={onResetFilters}
              className="text-sm text-violet-600 font-semibold"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Distance Range - Prominent */}
          <div className="bg-violet-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Distance Range</h3>
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>0 km</span>
              <span className="font-bold text-violet-600">{filters.maxDistance >= 50 ? 'Full City' : `${filters.maxDistance} km`}</span>
            </div>
            <input
              type="range"
              min="0"
              max="50"
              value={filters.maxDistance}
              onChange={(e) => onFilterChange({ ...filters, maxDistance: Number(e.target.value) })}
              className="w-full accent-violet-600"
            />
          </div>

          {/* Category Filter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Category</h3>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onFilterChange({ ...filters, category: cat })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filters.category === cat
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Status</h3>
            <div className="flex gap-2">
              <button
                onClick={() => onFilterChange({ ...filters, isOpen: null })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  filters.isOpen === null
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                All
              </button>
              <button
                onClick={() => onFilterChange({ ...filters, isOpen: true })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  filters.isOpen === true
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Open Now
              </button>
              <button
                onClick={() => onFilterChange({ ...filters, isOpen: false })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                  filters.isOpen === false
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                Closed
              </button>
            </div>
          </div>

          {/* Verified Toggle */}
          <div 
            className="bg-gray-50 rounded-xl p-4 cursor-pointer"
            onClick={() => onFilterChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-900 font-medium">Verified Shops Only</span>
              <div className={`relative w-12 h-6 rounded-full transition-colors ${
                filters.verifiedOnly ? 'bg-violet-600' : 'bg-gray-300'
              }`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  filters.verifiedOnly ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </div>
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 p-4">
          <button
            onClick={onCloseMobile}
            className="w-full py-3.5 bg-violet-600 text-white rounded-xl font-bold text-base hover:bg-violet-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShopFilterSidebar
