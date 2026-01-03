import { Metadata } from 'next'
import Breadcrumbs from './components/Breadcrumbs'
import ProductGallery from './components/ProductGallery'
import ProductInfo from './components/ProductInfo'
import ProductActions from './components/ProductActions'
import ProductTabs from './components/ProductTabs'
import StoreInfo from './components/StoreInfo'
import ReviewSection from './components/ReviewSection'
import RelatedProducts from './components/RelatedProducts'


export const metadata: Metadata = {
  title: 'Product Details | Billboard - Local Marketplace',
  description: 'View detailed product information, specifications, reviews, and pricing from local stores near you.',
  keywords: ['product details', 'product information', 'product reviews', 'local shopping'],
  openGraph: {
    title: 'Product Details | Billboard',
    description: 'View detailed product information from local stores.',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Demo product data
const demoProduct = {
  id: 1,
  name: 'Apple iPhone 15 Pro Max 256GB - Natural Titanium',
  price: 1099.99,
  originalPrice: 1299.99,
  discount: 15,
  rating: 4.8,
  reviews: 2847,
  verified: true,
  inStock: true,
  stockCount: 5,
  description: `Experience the pinnacle of smartphone technology with the iPhone 15 Pro Max. Featuring the revolutionary A17 Pro chip, the most powerful chip ever in a smartphone, designed to handle the most demanding tasks with ease.

The stunning 6.7-inch Super Retina XDR display with ProMotion technology offers an incredibly smooth scrolling experience and supports always-on display. The titanium design makes it our lightest Pro model ever, while maintaining exceptional durability.

Capture professional-quality photos and videos with the advanced 48MP main camera system featuring a 5x optical zoom on the telephoto lens. The new Action button lets you customize your experience with quick access to your favorite features.`,
  features: [
    'A17 Pro chip with 6-core GPU for console-level gaming',
    '48MP main camera with 5x optical zoom telephoto',
    'Titanium design - lightest Pro model ever',
    '6.7" Super Retina XDR display with ProMotion',
    'Customizable Action button',
    'USB-C with USB 3 speeds up to 10 Gb/s',
    'All-day battery life with fast charging support'
  ],
  images: [
    'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886f2b?w=800&q=80',
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80'
  ],
  specifications: [
    { label: 'Display', value: '6.7" Super Retina XDR' },
    { label: 'Resolution', value: '2796 x 1290 pixels' },
    { label: 'Processor', value: 'A17 Pro chip' },
    { label: 'Storage', value: '256GB' },
    { label: 'RAM', value: '8GB' },
    { label: 'Main Camera', value: '48MP + 12MP + 12MP' },
    { label: 'Front Camera', value: '12MP TrueDepth' },
    { label: 'Battery', value: '4422 mAh' },
    { label: 'OS', value: 'iOS 17' },
    { label: 'Weight', value: '221 grams' },
    { label: 'Dimensions', value: '159.9 x 76.7 x 8.25 mm' },
    { label: 'Water Resistance', value: 'IP68' }
  ]
}

const demoStore = {
  name: 'TechZone Electronics',
  image: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&q=80',
  rating: 4.9,
  reviews: 1523,
  verified: true,
  distance: '1.2 km',
  walkTime: '15 min',
  bikeTime: '5 min',
  carTime: '3 min',
  address: '123 Tech Street, Downtown District, NY 10001',
  openHours: 'Open until 9:00 PM'
}

const demoReviews = [
  {
    id: 1,
    author: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    date: '2 days ago',
    title: 'Best phone I\'ve ever owned!',
    content: 'The camera quality is absolutely stunning. I\'ve taken some amazing photos that rival my DSLR. The titanium build feels premium and the battery lasts all day even with heavy use.',
    helpful: 45,
    notHelpful: 2,
    verified: true,
    images: [
      'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?w=200&q=80'
    ]
  },
  {
    id: 2,
    author: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 4,
    date: '1 week ago',
    title: 'Great upgrade from iPhone 13',
    content: 'The performance improvement is noticeable, especially in games and video editing. The Action button is super handy. Only wish it came with a charger in the box.',
    helpful: 32,
    notHelpful: 5,
    verified: true
  },
  {
    id: 3,
    author: 'Emily Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
    date: '2 weeks ago',
    title: 'Worth every penny',
    content: 'Coming from Android, I was skeptical but this phone has converted me. The ecosystem integration is seamless and the build quality is unmatched.',
    helpful: 28,
    notHelpful: 3,
    verified: true
  }
]

const ratingDistribution = [
  { stars: 5, count: 2134, percentage: 75 },
  { stars: 4, count: 498, percentage: 17 },
  { stars: 3, count: 142, percentage: 5 },
  { stars: 2, count: 45, percentage: 2 },
  { stars: 1, count: 28, percentage: 1 }
]

const relatedProducts = [
  {
    id: 2,
    name: 'Apple AirPods Pro (2nd Generation)',
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80',
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 4.7,
    reviews: 1892,
    verified: true
  },
  {
    id: 3,
    name: 'Apple Watch Ultra 2 GPS + Cellular',
    image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&q=80',
    price: 749.99,
    originalPrice: 799.99,
    discount: 6,
    rating: 4.9,
    reviews: 956,
    verified: true
  },
  {
    id: 4,
    name: 'MagSafe Charger for iPhone',
    image: 'https://images.unsplash.com/photo-1622782914767-404fb9ab3f57?w=400&q=80',
    price: 35.99,
    originalPrice: 39.99,
    discount: 10,
    rating: 4.5,
    reviews: 3421,
    verified: false
  },
  {
    id: 5,
    name: 'iPhone 15 Pro Max Silicone Case',
    image: 'https://images.unsplash.com/photo-1601593346740-925612772716?w=400&q=80',
    price: 45.99,
    originalPrice: 49.99,
    discount: 8,
    rating: 4.6,
    reviews: 782,
    verified: true
  }
]

const breadcrumbItems = [
  { label: 'Electronics', href: '/shop?category=electronics' },
  { label: 'Smartphones', href: '/shop?category=smartphones' },
  { label: 'Apple', href: '/shop?brand=apple' },
  { label: 'iPhone 15 Pro Max' }
]

export default function ProductDetailsPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-violet-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Main Product Section */}
        <div className="mt-6 grid lg:grid-cols-2 gap-8">
          {/* Left Column - Gallery */}
          <ProductGallery
            images={demoProduct.images}
            productName={demoProduct.name}
          />

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            <ProductInfo
              name={demoProduct.name}
              price={demoProduct.price}
              originalPrice={demoProduct.originalPrice}
              discount={demoProduct.discount}
              rating={demoProduct.rating}
              reviews={demoProduct.reviews}
              verified={demoProduct.verified}
              description={demoProduct.description}
              features={demoProduct.features}
            />

            <ProductActions
              productId={demoProduct.id}
              productName={demoProduct.name}
              price={demoProduct.price}
              inStock={demoProduct.inStock}
              stockCount={demoProduct.stockCount}
            />
          </div>
        </div>

        {/* Store Info Section */}
        <div className="mt-12 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductTabs
              description={demoProduct.description}
              specifications={demoProduct.specifications}
            />
          </div>
          <div>
            <StoreInfo {...demoStore} />
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-12">
          <ReviewSection
            reviews={demoReviews}
            averageRating={demoProduct.rating}
            totalReviews={demoProduct.reviews}
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
