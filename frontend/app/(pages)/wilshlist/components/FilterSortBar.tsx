'use client'

import React from 'react'
import { Filter, ArrowUpDown, Grid3X3, List } from 'lucide-react'

export type SortOption = 'recent' | 'price-low' | 'price-high' | 'discount' | 'rating'
export type FilterOption = 'all' | 'in-stock' | 'on-sale' | 'trending'
export type ViewMode = 'grid' | 'list'

export interface Collection {
  id: string
  name: string
  count: number
  icon: string
}

interface FilterSortBarProps {
  sortBy: SortOption
  filterBy: FilterOption
  viewMode: ViewMode
  showFilters: boolean
  collections: Collection[]
  onSortChange: (sort: SortOption) => void
  onFilterChange: (filter: FilterOption) => void
  onViewModeChange: (mode: ViewMode) => void
  onToggleFilters: () => void
}

const FilterSortBar: React.FC<FilterSortBarProps> = ({
  sortBy,
  filterBy,
  viewMode,
  showFilters,
  collections,
  onSortChange,
  onFilterChange,
  onViewModeChange,
  onToggleFilters
}) => {
  return (
    <div className="bg-white rounded-xl border border-violet-200 p-4 mb-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onToggleFilters}
            className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all ${
              showFilters ? 'bg-violet-100 text-violet-700' : 'bg-gray-100 text-gray-700 hover:bg-violet-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            {(['all', 'in-stock', 'on-sale', 'trending'] as FilterOption[]).map((filter) => (
              <button
                key={filter}
                onClick={() => onFilterChange(filter)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  filterBy === filter
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-gray-600 hover:text-violet-600'
                }`}
              >
                {filter === 'all' ? 'All' : filter === 'in-stock' ? 'In Stock' : filter === 'on-sale' ? 'On Sale' : 'Trending'}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Sort & View */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-violet-500" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-gray-100 border-none rounded-lg px-3 py-2 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-violet-500"
            >
              <option value="recent">Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Biggest Discount</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'grid' ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500 hover:text-violet-600'
              }`}
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('list')}
              className={`p-2 rounded-md transition-all ${
                viewMode === 'list' ? 'bg-white text-violet-700 shadow-sm' : 'text-gray-500 hover:text-violet-600'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Collections Row */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-violet-100">
          <p className="text-xs text-violet-600 font-medium mb-2">Collections</p>
          <div className="flex items-center gap-2 flex-wrap">
            {collections.map((collection) => (
              <button
                key={collection.id}
                className="px-3 py-2 bg-violet-50 hover:bg-violet-100 rounded-lg text-sm font-medium text-violet-700 flex items-center gap-2 transition-all"
              >
                <span>{collection.icon}</span>
                {collection.name}
                <span className="bg-violet-200 text-violet-700 px-1.5 py-0.5 rounded-full text-xs">
                  {collection.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterSortBar
