import React from 'react'
import { X, Search } from 'lucide-react'

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
  return (
    <aside className={`${
      showMobileFilters ? 'fixed inset-0 z-50 bg-black/50 md:relative md:bg-transparent' : 'hidden md:block'
    } md:w-80 shrink-0`}>
      <div className={`${
        showMobileFilters ? 'fixed right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto' : ''
      } md:sticky md:top-24`}>
        <div className="bg-white rounded-2xl p-6 border border-violet-200">
          {/* Mobile Close Button */}
          {showMobileFilters && (
            <button
              onClick={onCloseMobile}
              className="md:hidden absolute top-4 right-4 p-2 hover:bg-violet-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-violet-800">Filters</h2>
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
              <h3 className="font-semibold text-violet-800 mb-3">Search Shop</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -tranviolet-y-1/2 w-4 h-4 text-violet-400" />
                <input
                  type="text"
                  placeholder="Shop name..."
                  value={filters.searchQuery}
                  onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-violet-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-violet-800 mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === cat}
                      onChange={() => onFilterChange({ ...filters, category: cat })}
                      className="w-4 h-4 text-violet-500 focus:ring-violet-500"
                    />
                    <span className="text-violet-700 group-hover:text-violet-600">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Distance Range */}
            <div>
              <h3 className="font-semibold text-violet-800 mb-3">Distance Range (km)</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-violet-600">
                  <span>{filters.minDistance} km</span>
                  <span>{filters.maxDistance} km</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={filters.maxDistance}
                  onChange={(e) => onFilterChange({ ...filters, maxDistance: Number(e.target.value) })}
                  className="w-full accent-violet-500"
                />
              </div>
            </div>

            {/* Open/Close Status */}
            <div>
              <h3 className="font-semibold text-violet-800 mb-3">Status</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="status"
                    checked={filters.isOpen === null}
                    onChange={() => onFilterChange({ ...filters, isOpen: null })}
                    className="w-4 h-4 text-violet-500 focus:ring-violet-500"
                  />
                  <span className="text-violet-700 group-hover:text-violet-600">All Shops</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="status"
                    checked={filters.isOpen === true}
                    onChange={() => onFilterChange({ ...filters, isOpen: true })}
                    className="w-4 h-4 text-violet-500 focus:ring-violet-500"
                  />
                  <span className="text-violet-700 group-hover:text-violet-600">Open Now</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="radio"
                    name="status"
                    checked={filters.isOpen === false}
                    onChange={() => onFilterChange({ ...filters, isOpen: false })}
                    className="w-4 h-4 text-violet-500 focus:ring-violet-500"
                  />
                  <span className="text-violet-700 group-hover:text-violet-600">Closed</span>
                </label>
              </div>
            </div>

            {/* Verified Only */}
            <div>
              <h3 className="font-semibold text-violet-800 mb-3">Verification</h3>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.verifiedOnly}
                  onChange={(e) => onFilterChange({ ...filters, verifiedOnly: e.target.checked })}
                  className="w-4 h-4 text-violet-500 rounded focus:ring-violet-500"
                />
                <span className="text-violet-700 group-hover:text-violet-600">Verified Shops Only</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default ShopFilterSidebar
