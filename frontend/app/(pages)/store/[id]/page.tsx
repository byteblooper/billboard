import { Metadata } from 'next'
import StoreHeader from '../components/StoreHeader'
import StoreProducts from '../components/StoreProducts'
import StoreInfo from '../components/StoreInfo'
import { stores, products, getStoreById } from '@/store'

// ============================================================================
// TYPES
// ============================================================================

type Props = {
  params: Promise<{ id: string }>
}

// ============================================================================
// METADATA GENERATION
// ============================================================================

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const store = getStoreById(parseInt(id))
  
  if (!store) {
    return {
      title: 'Store Not Found | NearByDeals',
      description: 'The requested store could not be found.'
    }
  }

  return {
    title: `${store.name} | NearByDeals - Local Marketplace`,
    description: store.description.substring(0, 160),
    keywords: [store.name, store.category, 'local shopping', 'nearby deals'],
    openGraph: {
      title: `${store.name} | NearByDeals`,
      description: store.description.substring(0, 160),
      type: 'website',
      images: [store.image]
    },
  }
}

// ============================================================================
// PAGE COMPONENT
// ============================================================================

export default async function StorePage({ params }: Props) {
  const { id } = await params
  const store = getStoreById(parseInt(id))

  // Handle store not found
  if (!store) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-violet-800 mb-4">Store Not Found</h1>
          <p className="text-violet-600 mb-6">The store you&apos;re looking for doesn&apos;t exist.</p>
          <a 
            href="/map" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-all"
          >
            Browse Stores
          </a>
        </div>
      </div>
    )
  }

  // Get products for this store
  const storeProducts = products.filter(p => p.store.id === store.id)

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Store Header */}
      <StoreHeader store={store} productCount={storeProducts.length} />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Store Info */}
          <aside className="lg:col-span-1">
            <StoreInfo store={store} />
          </aside>
          
          {/* Products Grid */}
          <div className="lg:col-span-3">
            <StoreProducts products={storeProducts} storeName={store.name} />
          </div>
        </div>
      </div>
    </main>
  )
}
