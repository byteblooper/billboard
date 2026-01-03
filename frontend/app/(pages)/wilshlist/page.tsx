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



// Types
type SortOption = 'recent' | 'price-low' | 'price-high' | 'discount' | 'rating'
type FilterOption = 'all' | 'in-stock' | 'on-sale' | 'trending'
type ViewMode = 'grid' | 'list'

interface Collection {
  id: string
  name: string
  count: number
  icon: string
}

// Demo Data
const initialWishlistItems: WishlistItem[] = [
  {
    id: 1,
    productId: 101,
    name: 'Premium Wireless Headphones with Active Noise Cancellation',
    store: 'AudioTech Store',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.8,
    reviews: 2341,
    distance: '0.8 km',
    verified: true,
    inStock: true,
    trending: true,
    savedDays: 2
  },
  {
    id: 2,
    productId: 102,
    name: 'Classic Leather Watch - Rose Gold Edition',
    store: 'LuxTime Boutique',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    rating: 4.6,
    reviews: 892,
    distance: '1.2 km',
    verified: true,
    inStock: true,
    trending: false,
    savedDays: 5
  },
  {
    id: 3,
    productId: 103,
    name: 'Designer Sunglasses - UV Protection',
    store: 'SunStyle Shop',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    price: 79.99,
    originalPrice: 99.99,
    discount: 20,
    rating: 4.4,
    reviews: 456,
    distance: '0.5 km',
    verified: false,
    inStock: true,
    trending: true,
    savedDays: 1
  },
  {
    id: 4,
    productId: 104,
    name: 'Running Shoes Pro - Limited Edition',
    store: 'SpeedFit Athletics',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    price: 119.99,
    originalPrice: 149.99,
    discount: 20,
    rating: 4.9,
    reviews: 1567,
    distance: '2.1 km',
    verified: true,
    inStock: false,
    trending: true,
    savedDays: 7
  },
  {
    id: 5,
    productId: 105,
    name: 'Smart Home Speaker with Voice Control',
    store: 'TechPro Hub',
    image: 'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=400&fit=crop',
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 4.5,
    reviews: 723,
    distance: '1.8 km',
    verified: true,
    inStock: true,
    trending: false,
    savedDays: 3
  },
  {
    id: 6,
    productId: 106,
    name: 'Professional DSLR Camera Bundle',
    store: 'PhotoPro Studio',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    price: 699.99,
    originalPrice: 899.99,
    discount: 22,
    rating: 4.8,
    reviews: 234,
    distance: '3.2 km',
    verified: true,
    inStock: true,
    trending: false,
    savedDays: 14
  }
]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>(initialWishlistItems)
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [showFilters, setShowFilters] = useState(false)

  // Collections
  const collections: Collection[] = [
    { id: 'all', name: 'All Items', count: wishlistItems.length, icon: '📦' },
    { id: 'electronics', name: 'Electronics', count: 2, icon: '🎧' },
    { id: 'fashion', name: 'Fashion', count: 3, icon: '👗' },
    { id: 'sports', name: 'Sports', count: 1, icon: '⚽' }
  ]

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
    console.log('Add to cart:', id)
  }

  const addAllToCart = () => {
    console.log('Add all selected to cart:', selectedItems)
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
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-linear-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-violet-900">My Wishlist</h1>
              <p className="text-sm text-violet-600">{wishlistItems.length} items saved</p>
            </div>
          </div>
          <Link
            href="/shop"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-violet-600 hover:bg-violet-100 rounded-lg transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            Continue Shopping
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
