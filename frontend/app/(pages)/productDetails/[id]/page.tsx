import { Metadata } from 'next'
import Breadcrumbs from '../components/Breadcrumbs'
import ProductGallery from '../components/ProductGallery'
import ProductInfo from '../components/ProductInfo'
import ProductActions from '../components/ProductActions'
import ProductTabs from '../components/ProductTabs'
import StoreInfo from '../components/StoreInfo'
import ReviewSection from '../components/ReviewSection'
import RelatedProducts from '../components/RelatedProducts'


// Demo products database
const productsDatabase: Record<string, typeof demoProducts[0]> = {}

const demoProducts = [
  {
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
    category: 'Smartphones',
    brand: 'Apple',
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
    ],
    store: {
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
  },
  {
    id: 2,
    name: 'Samsung Galaxy S24 Ultra 512GB - Titanium Black',
    price: 1199.99,
    originalPrice: 1399.99,
    discount: 14,
    rating: 4.7,
    reviews: 2156,
    verified: true,
    inStock: true,
    stockCount: 8,
    category: 'Smartphones',
    brand: 'Samsung',
    description: `Meet the Samsung Galaxy S24 Ultra - the ultimate smartphone powered by Galaxy AI. With its stunning 6.8" Dynamic AMOLED 2X display and the built-in S Pen, you have endless possibilities at your fingertips.

The revolutionary 200MP camera system captures incredible detail in every shot. Night photography reaches new heights with advanced AI-powered processing. Record stunning 8K video and never miss a moment.

Powered by the Snapdragon 8 Gen 3 for Galaxy, experience lightning-fast performance for gaming, multitasking, and AI features that adapt to how you use your phone.`,
    features: [
      '200MP main camera with advanced AI processing',
      'Snapdragon 8 Gen 3 for Galaxy processor',
      'Built-in S Pen with enhanced functionality',
      '6.8" Dynamic AMOLED 2X display',
      '5000mAh battery with 45W fast charging',
      'Titanium frame with Gorilla Armor glass',
      'Galaxy AI features for productivity'
    ],
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80'
    ],
    specifications: [
      { label: 'Display', value: '6.8" Dynamic AMOLED 2X' },
      { label: 'Resolution', value: '3120 x 1440 pixels' },
      { label: 'Processor', value: 'Snapdragon 8 Gen 3' },
      { label: 'Storage', value: '512GB' },
      { label: 'RAM', value: '12GB' },
      { label: 'Main Camera', value: '200MP + 12MP + 50MP + 10MP' },
      { label: 'Front Camera', value: '12MP' },
      { label: 'Battery', value: '5000 mAh' },
      { label: 'OS', value: 'Android 14' },
      { label: 'Weight', value: '232 grams' },
      { label: 'Dimensions', value: '162.3 x 79.0 x 8.6 mm' },
      { label: 'Water Resistance', value: 'IP68' }
    ],
    store: {
      name: 'Galaxy Store',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&q=80',
      rating: 4.8,
      reviews: 987,
      verified: true,
      distance: '0.8 km',
      walkTime: '10 min',
      bikeTime: '3 min',
      carTime: '2 min',
      address: '456 Mobile Ave, Tech Park, NY 10002',
      openHours: 'Open until 8:00 PM'
    }
  },
  {
    id: 3,
    name: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones',
    price: 348.00,
    originalPrice: 399.99,
    discount: 13,
    rating: 4.9,
    reviews: 4521,
    verified: true,
    inStock: true,
    stockCount: 15,
    category: 'Audio',
    brand: 'Sony',
    description: `Experience the next level of silence with the Sony WH-1000XM5. Industry-leading noise cancellation with eight microphones and two processors controls noise at all frequencies, letting you fully immerse in your music.

The new design is lighter and more comfortable than ever, with soft-fit leather for long listening sessions. Crystal clear hands-free calling with AI-powered noise reduction ensures your voice is always heard clearly.

With up to 30 hours of battery life and quick charging (3 hours of playback from 3 minutes of charge), your music never has to stop.`,
    features: [
      'Industry-leading noise cancellation with 8 microphones',
      '30-hour battery life with quick charge',
      'Speak-to-Chat pauses music automatically',
      'Multipoint connection for 2 devices',
      'Crystal clear calls with AI noise reduction',
      'Touch controls and voice assistant support',
      'Lightweight design at 250g'
    ],
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'
    ],
    specifications: [
      { label: 'Driver Unit', value: '30mm' },
      { label: 'Frequency Response', value: '4Hz - 40,000Hz' },
      { label: 'Impedance', value: '48 ohms' },
      { label: 'Battery Life', value: '30 hours' },
      { label: 'Charging Time', value: '3.5 hours' },
      { label: 'Quick Charge', value: '3 min = 3 hours' },
      { label: 'Weight', value: '250g' },
      { label: 'Bluetooth', value: '5.2' },
      { label: 'Codecs', value: 'SBC, AAC, LDAC' },
      { label: 'NFC', value: 'Yes' },
      { label: 'Microphones', value: '8' },
      { label: 'Foldable', value: 'Yes' }
    ],
    store: {
      name: 'Audio Paradise',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&q=80',
      rating: 4.7,
      reviews: 632,
      verified: true,
      distance: '2.1 km',
      walkTime: '25 min',
      bikeTime: '8 min',
      carTime: '5 min',
      address: '789 Sound Street, Music District, NY 10003',
      openHours: 'Open until 7:00 PM'
    }
  },
  {
    id: 4,
    name: 'MacBook Pro 14" M3 Pro - Space Black',
    price: 1999.00,
    originalPrice: 2199.00,
    discount: 9,
    rating: 4.9,
    reviews: 1876,
    verified: true,
    inStock: true,
    stockCount: 3,
    category: 'Laptops',
    brand: 'Apple',
    description: `The most advanced MacBook Pro ever. The 14-inch MacBook Pro with M3 Pro delivers exceptional performance for demanding workflows. Edit massive images, develop complex codebases, or run intensive AI workloads with ease.

The Liquid Retina XDR display offers extreme dynamic range with 1600 nits peak brightness, perfect for HDR content. P3 wide color gamut and ProMotion technology provide stunning visuals for creative professionals.

With up to 18 hours of battery life, you can work all day without searching for an outlet. The new Space Black finish is stunning and resists fingerprints.`,
    features: [
      'Apple M3 Pro chip with 12-core CPU',
      '18-core GPU for graphics-intensive tasks',
      '18GB unified memory',
      '14.2" Liquid Retina XDR display',
      'Up to 18 hours battery life',
      'Six-speaker sound system with Spatial Audio',
      'MagSafe 3 charging and multiple ports'
    ],
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80'
    ],
    specifications: [
      { label: 'Chip', value: 'Apple M3 Pro' },
      { label: 'CPU Cores', value: '12 (6P + 6E)' },
      { label: 'GPU Cores', value: '18' },
      { label: 'Memory', value: '18GB Unified' },
      { label: 'Storage', value: '512GB SSD' },
      { label: 'Display', value: '14.2" Liquid Retina XDR' },
      { label: 'Resolution', value: '3024 x 1964' },
      { label: 'Battery', value: 'Up to 18 hours' },
      { label: 'Weight', value: '1.61 kg' },
      { label: 'Ports', value: '3x Thunderbolt 4, HDMI, SD, MagSafe' },
      { label: 'Keyboard', value: 'Backlit Magic Keyboard' },
      { label: 'Touch ID', value: 'Yes' }
    ],
    store: {
      name: 'Apple Premium Reseller',
      image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=200&q=80',
      rating: 4.9,
      reviews: 2341,
      verified: true,
      distance: '1.5 km',
      walkTime: '18 min',
      bikeTime: '6 min',
      carTime: '4 min',
      address: '321 Innovation Blvd, Tech Hub, NY 10004',
      openHours: 'Open until 9:00 PM'
    }
  },
  {
    id: 5,
    name: 'Nike Air Max 270 React - Black/White',
    price: 129.99,
    originalPrice: 170.00,
    discount: 24,
    rating: 4.6,
    reviews: 3254,
    verified: true,
    inStock: true,
    stockCount: 12,
    category: 'Footwear',
    brand: 'Nike',
    description: `Step into comfort with the Nike Air Max 270 React. This innovative design combines two of Nike's most popular technologies: the Max Air 270 unit and React foam.

The result is a shoe that delivers exceptional cushioning and a smooth, responsive ride. The breathable mesh upper keeps your feet cool, while the sleek silhouette looks great with any outfit.

Whether you're hitting the streets or spending the day on your feet, the Air Max 270 React provides all-day comfort and head-turning style.`,
    features: [
      'Nike React foam for soft, responsive cushioning',
      'Max Air 270 unit for maximum impact protection',
      'Breathable mesh upper',
      'No-sew overlays for durability',
      'Rubber outsole for traction',
      'Foam midsole for lightweight comfort',
      'Pull tab for easy on/off'
    ],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80'
    ],
    specifications: [
      { label: 'Brand', value: 'Nike' },
      { label: 'Style', value: 'Air Max 270 React' },
      { label: 'Color', value: 'Black/White' },
      { label: 'Material', value: 'Mesh, Synthetic' },
      { label: 'Sole', value: 'Rubber' },
      { label: 'Closure', value: 'Lace-up' },
      { label: 'Cushioning', value: 'React + Air Max' },
      { label: 'Available Sizes', value: 'US 6-14' },
      { label: 'Weight', value: '340g (Size 10)' },
      { label: 'Fit', value: 'True to size' },
      { label: 'Gender', value: 'Unisex' },
      { label: 'Care', value: 'Spot clean' }
    ],
    store: {
      name: 'Sneaker World',
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&q=80',
      rating: 4.5,
      reviews: 1876,
      verified: true,
      distance: '0.5 km',
      walkTime: '6 min',
      bikeTime: '2 min',
      carTime: '1 min',
      address: '567 Fashion Ave, Style District, NY 10005',
      openHours: 'Open until 10:00 PM'
    }
  }
]

// Populate database
demoProducts.forEach(p => {
  productsDatabase[p.id.toString()] = p
})

const demoReviews = [
  {
    id: 1,
    author: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    rating: 5,
    date: '2 days ago',
    title: 'Absolutely love it!',
    content: 'This exceeded all my expectations. The quality is outstanding and it arrived quickly. Would definitely recommend to anyone looking for this product.',
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
    title: 'Great product, minor issues',
    content: 'Overall very satisfied with my purchase. The build quality is excellent. Only minor complaint is the packaging could be better, but the product itself is perfect.',
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
    content: 'I did a lot of research before buying this and I\'m so glad I chose this one. The quality and features are exactly as described. Highly recommend!',
    helpful: 28,
    notHelpful: 3,
    verified: true
  }
]

const getRatingDistribution = (rating: number) => {
  const base = Math.round(rating * 15)
  return [
    { stars: 5, count: base, percentage: Math.round((rating / 5) * 80) },
    { stars: 4, count: Math.round(base * 0.3), percentage: Math.round(20 - rating) },
    { stars: 3, count: Math.round(base * 0.1), percentage: 5 },
    { stars: 2, count: Math.round(base * 0.05), percentage: 2 },
    { stars: 1, count: Math.round(base * 0.02), percentage: 1 }
  ]
}

const getRelatedProducts = (currentId: number) => {
  return demoProducts
    .filter(p => p.id !== currentId)
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      name: p.name,
      image: p.images[0],
      price: p.price,
      originalPrice: p.originalPrice,
      discount: p.discount,
      rating: p.rating,
      reviews: p.reviews,
      verified: p.verified
    }))
}

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
              features={product.features}
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
              specifications={product.specifications}
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
