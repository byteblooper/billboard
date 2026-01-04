import { Metadata } from 'next'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductGallery from '../components/ProductGallery'
import ProductInfo from '../components/ProductInfo'
import ProductActions from '../components/ProductActions'
import ProductTabs from '../components/ProductTabs'
import StoreInfo from '../components/StoreInfo'
import ReviewSection from '../components/ReviewSection'
import RelatedProducts from '../components/RelatedProducts'
import { productDetailsDatabase, getProductById, getRelatedProducts, demoReviews, getRatingDistribution } from '@/app/data'

// Create lookup database from array
const productsDatabase: Record<string, typeof productDetailsDatabase[0]> = {}
productDetailsDatabase.forEach(p => {
  productsDatabase[p.id.toString()] = p
})

type Props = {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const product = productsDatabase[id]
  
  if (!product) {
    return {
      title: 'Product Not Found | Billboard',
      description: 'The requested product could not be found.'
    }
  }

  return {
    title: `${product.name} | Billboard - Local Marketplace`,
    description: product.description.substring(0, 160),
    keywords: [product.name, product.brand, product.category, 'local shopping'],
    openGraph: {
      title: `${product.name} | Billboard`,
      description: product.description.substring(0, 160),
      type: 'website',
      images: [product.images[0]]
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params
  const product = productsDatabase[id]

  if (!product) {
    return (
      <div className="min-h-screen bg-linear-to-b from-violet-50/50 to-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-violet-800 mb-4">Product Not Found</h1>
          <p className="text-violet-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <a 
            href="/shop" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-violet-600 to-indigo-600 text-white font-medium rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all"
          >
            Browse Products
          </a>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: product.category, href: `/shop?category=${product.category.toLowerCase()}` },
    { label: product.brand, href: `/shop?brand=${product.brand.toLowerCase()}` },
    { label: product.name }
  ]

  const ratingDistribution = getRatingDistribution(product.rating)
  const relatedProducts = getRelatedProducts(product.id)

  return (
    <div className="min-h-screen bg-linear-to-b from-violet-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Main Product Section */}
        <div className="mt-6 grid lg:grid-cols-2 gap-8">
          {/* Left Column - Gallery */}
          <ProductGallery
            images={product.images}
            productName={product.name}
          />

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <ProductInfo
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              rating={product.rating}
              reviews={product.reviews}
              verified={product.verified}
              description={product.description}
            />

            <ProductActions
              productId={product.id}
              productName={product.name}
              price={product.price}
              inStock={product.inStock}
              stockCount={product.stockCount}
            />
          </div>
        </div>

        {/* Store Info Section */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductTabs
              description={product.description}
            />
          </div>
          <div>
            <StoreInfo {...product.store} />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <ReviewSection
            reviews={demoReviews}
            averageRating={product.rating}
            totalReviews={product.reviews}
            ratingDistribution={ratingDistribution}
          />
        </div>

        {/* Related Products */}
        <div className="mt-12 pb-12">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  )
}
