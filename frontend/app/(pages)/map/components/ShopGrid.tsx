import React from 'react'
import ShopCard from './ShopCard'

type Shop = {
  id: number
  name: string
  category: string
  image: string
  rating: number
  reviews: number
  distance: string
  isOpen: boolean
  verified: boolean
  openTime: string
  closeTime: string
  address: string
  description: string
  totalProducts: number
  walkTime: string
  bikeTime: string
  carTime: string
}

type ShopGridProps = {
  shops: Shop[]
  totalShops: number
  onResetFilters: () => void
}

const ShopGrid = ({ shops, totalShops, onResetFilters }: ShopGridProps) => {
  return (
    <div>
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-slate-600">
          Showing <span className="font-semibold text-slate-800">{shops.length}</span> of{' '}
          <span className="font-semibold text-slate-800">{totalShops}</span> shops
        </p>
      </div>

      {/* Shops Grid */}
      {shops.length > 0 ? (
        <div className="space-y-4">
          {shops.map((shop) => (
            <ShopCard key={shop.id} shop={shop} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🏪</div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">No shops found</h3>
          <p className="text-slate-600 mb-6">Try adjusting your filters or search query</p>
          <button
            onClick={onResetFilters}
            className="px-6 py-3 bg-linear-to-r from-orange-500 to-amber-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default ShopGrid
