'use client'

import React, { useState, useMemo } from 'react'
import { 
  Sparkles,
  Heart
} from 'lucide-react'
import Link from 'next/link'
import WishlistItemCard, { WishlistItem } from './components/WishlistItemCard'
import EmptyWishlist from './components/EmptyWishlist'
import StatsCards from './components/StatsCards'
import FilterSortBar from './components/FilterSortBar'
import BulkActionsBar from './components/BulkActionsBar'
import NoFilterMatch from './components/NoFilterMatch'
import { getLegacyWishlistItems, getCollections, type Collection } from '@/store'

// Get initial wishlist items from store
const initialWishlistItems = getLegacyWishlistItems()

// Types
type SortOption = 'recent' | 'price-low' | 'price-high' | 'discount' | 'rating'
type FilterOption = 'all' | 'in-stock' | 'on-sale' | 'trending'
type ViewMode = 'grid' | 'list'

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlistItems)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Collections
  const collections: Collection[] = getCollections(wishlistItems.length)

  // Filter and sort logic
  const filteredAndSortedItems = useMemo(() => {
    let items = [...wishlistItems]
    
    // Filter
    switch (filterBy) {
      case 'in-stock':
        items = items.filter(item => item.inStock)
        break
      case 'on-sale':
        items = items.filter(item => item.discount > 0)
        break
      case 'trending':
        items = items.filter(item => item.trending)
        break
    }
    
    // Sort
    switch (sortBy) {
      case 'price-low':
        items.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        items.sort((a, b) => b.price - a.price)
        break
      case 'discount':
        items.sort((a, b) => b.discount - a.discount)
        break
      case 'rating':
        items.sort((a, b) => b.rating - a.rating)
        break
      default:
        items.sort((a, b) => a.savedDays - b.savedDays)
    }
    
    return items
  }, [wishlistItems, sortBy, filterBy])

  // Handlers
  const toggleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
  }

  const selectAll = () => {
    if (selectedItems.length === wishlistItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(wishlistItems.map(item => item.id))
    }
  }

  const removeItem = (id: number) => {
    setWishlistItems(items => items.filter(item => item.id !== id))
    setSelectedItems(prev => prev.filter(i => i !== id))
  }

  const removeSelected = () => {
    setWishlistItems(items => items.filter(item => !selectedItems.includes(item.id)))
    setSelectedItems([])
  }

  const addToCart = (id: number) => {
    // TODO: Implement add to cart functionality
  }

  const addAllToCart = () => {
    // TODO: Implement add all to cart functionality
  }

  // Empty state
  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <EmptyWishlist trendingProducts={initialWishlistItems.slice(0, 4)} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-violet-900">My Wishlist</h1>
              <p className="text-xs sm:text-sm text-violet-600">{wishlistItems.length} items saved</p>
            </div>
          </div>
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-violet-600 hover:bg-violet-100 rounded-lg transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            <span className="hidden sm:inline">Continue Shopping</span>
            <span className="sm:hidden">Shop More</span>
          </Link>
        </div>

        {/* Stats Cards */}
        <StatsCards items={wishlistItems} />

        {/* Filter & Sort Bar */}
        <FilterSortBar
          sortBy={sortBy}
          filterBy={filterBy}
          viewMode={viewMode}
          showFilters={showFilters}
          collections={collections}
          onSortChange={setSortBy}
          onFilterChange={setFilterBy}
          onViewModeChange={setViewMode}
          onToggleFilters={() => setShowFilters(!showFilters)}
        />

        {/* Bulk Actions Bar */}
        {selectedItems.length > 0 && (
          <BulkActionsBar
            selectedCount={selectedItems.length}
            totalCount={wishlistItems.length}
            onSelectAll={selectAll}
            onRemove={removeSelected}
            onAddToCart={addAllToCart}
          />
        )}

        {/* Wishlist Items */}
        {filteredAndSortedItems.length > 0 ? (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4' 
            : 'space-y-3'
          }>
            {filteredAndSortedItems.map((item) => (
              <WishlistItemCard
                key={item.id}
                item={item}
                isSelected={selectedItems.includes(item.id)}
                viewMode={viewMode}
                onSelect={toggleSelectItem}
                onAddToCart={addToCart}
                onRemove={removeItem}
              />
            ))}
          </div>
        ) : (
          <NoFilterMatch onClearFilter={() => setFilterBy('all')} />
        )}
      </div>
    </div>
  )
}
