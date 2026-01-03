import React from 'react'
import ProductCards from '@/app/components/ProductCards'

type Product = {
  id: number
  discount: number
  verified: boolean
  image: string
  rating: number
  reviews: number
  name: string
  store: string
  price: number
  originalPrice: number
  distance: string
  walkTime: string
  bikeTime: string
  carTime: string
  category: string
  brand: string
}

type ProductGridProps = {
  products: Product[]
  totalProducts: number
  onResetFilters: () => void
}

const ProductGrid = ({ products, totalProducts, onResetFilters }: ProductGridProps) => {
  return (
    <div>
      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{products.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{totalProducts}</span> products
        </p>
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">Try adjusting your filters or search query</p>
          <button
            onClick={onResetFilters}
            className="px-6 py-3 bg-black text-white rounded-full font-semibold hover:bg-gray-800 transition-all"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  )
}

export default ProductGrid
