import React from 'react'
import { Search, ChevronDown } from 'lucide-react'

type SearchBarProps = {
  searchQuery: string
  sortBy: string
  onSearchChange: (query: string) => void
  onSortChange: (sort: string) => void
}

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Distance']

const SearchBar = ({ searchQuery, sortBy, onSearchChange, onSortChange }: SearchBarProps) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4">
      {/* Search */}
      <div className="flex-1 relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by product name, brand, or store..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
        />
      </div>

      {/* Sort */}
      <div className="relative w-full md:w-64">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 appearance-none cursor-pointer"
        >
          {sortOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
}

export default SearchBar
