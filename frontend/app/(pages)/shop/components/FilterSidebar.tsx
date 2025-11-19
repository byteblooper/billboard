import React from 'react'
import { X, Star } from 'lucide-react'

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

type FilterSidebarProps = {
  filters: FilterState
  showMobileFilters: boolean
  onFilterChange: (filters: FilterState) => void
  onResetFilters: () => void
  onCloseMobile: () => void
}

const categories = ['All', 'Electronics', 'Fashion', 'Sports', 'Home']
const brands = ['All', 'AudioTech', 'LuxTime', 'SunStyle', 'SpeedFit', 'TechPro', 'TravelPro', 'HomeStyle', 'PhotoPro']

const FilterSidebar = ({ 
  filters, 
  showMobileFilters, 
  onFilterChange, 
  onResetFilters, 
  onCloseMobile 
}: FilterSidebarProps) => {
  return (
    <aside className={`${
      showMobileFilters ? 'fixed inset-0 z-50 bg-black/50 md:relative md:bg-transparent' : 'hidden md:block'
    } md:w-80 shrink-0`}>
      <div className={`${
        showMobileFilters ? 'fixed right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto' : ''
      } md:sticky md:top-24`}>
        <div className="bg-white rounded-2xl p-6 border border-slate-200">
          {/* Mobile Close Button */}
          {showMobileFilters && (
            <button
              onClick={onCloseMobile}
              className="md:hidden absolute top-4 right-4 p-2 hover:bg-slate-100 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Filters</h2>
            <button
              onClick={onResetFilters}
              className="text-sm text-orange-600 hover:text-orange-700 font-semibold"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-6">
            {/* Category Filter */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={filters.category === cat}
                      onChange={() => onFilterChange({ ...filters, category: cat })}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-slate-700 group-hover:text-orange-600">{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Brand</h3>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {brands.map((brand) => (
                  <label key={brand} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="brand"
                      checked={filters.brand === brand}
                      onChange={() => onFilterChange({ ...filters, brand: brand })}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-slate-700 group-hover:text-orange-600">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Customer Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1, 0].map((rating) => (
                  <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="rating"
                      checked={filters.minRating === rating}
                      onChange={() => onFilterChange({ ...filters, minRating: rating })}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <div className="flex items-center gap-1">
                      {rating > 0 ? (
                        <>
                          {Array.from({ length: 5 }, (_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < rating ? 'text-amber-500 fill-amber-500' : 'text-slate-300'
                              }`}
                            />
                          ))}
                          <span className="text-slate-700 ml-1">& Up</span>
                        </>
                      ) : (
                        <span className="text-slate-700">All Ratings</span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={filters.minPrice}
                    onChange={(e) => onFilterChange({ ...filters, minPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Min"
                  />
                  <span className="text-slate-500">-</span>
                  <input
                    type="number"
                    value={filters.maxPrice}
                    onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Max"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filters.maxPrice}
                  onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
                  className="w-full accent-orange-500"
                />
              </div>
            </div>

            {/* Distance Range */}
            <div>
              <h3 className="font-semibold text-slate-800 mb-3">Distance (km)</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{filters.minDistance} km</span>
                  <span>{filters.maxDistance} km</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={filters.maxDistance}
                  onChange={(e) => onFilterChange({ ...filters, maxDistance: Number(e.target.value) })}
                  className="w-full accent-orange-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default FilterSidebar
