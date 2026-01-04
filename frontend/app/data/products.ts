// Product Types and Demo Data

export interface Product {
  id: number
  name: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  verified: boolean
  image: string
  store: string
  distance: string
  walkTime: string
  bikeTime: string
  carTime: string
  category: string
  brand: string
}

export interface ProductDetails {
  id: number
  name: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviews: number
  verified: boolean
  inStock: boolean
  stockCount: number
  category: string
  brand: string
  description: string
  images: string[]
  store: {
    name: string
    image: string
    rating: number
    reviews: number
    verified: boolean
    distance: string
    walkTime: string
    bikeTime: string
    carTime: string
    address: string
    openHours: string
  }
}

// Shop Page Products
export const shopProducts: Product[] = [
  {
    id: 1,
    discount: 25,
    verified: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 2341,
    name: 'Premium Wireless Headphones',
    store: 'AudioTech Store',
    price: 149.99,
    originalPrice: 199.99,
    distance: '0.8',
    walkTime: '10 min',
    bikeTime: '3 min',
    carTime: '2 min',
    category: 'Electronics',
    brand: 'AudioTech'
  },
  {
    id: 2,
    discount: 31,
    verified: true,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 892,
    name: 'Classic Leather Watch',
    store: 'LuxTime Boutique',
    price: 89.99,
    originalPrice: 129.99,
    distance: '1.2',
    walkTime: '15 min',
    bikeTime: '5 min',
    carTime: '3 min',
    category: 'Fashion',
    brand: 'LuxTime'
  },
  {
    id: 3,
    discount: 20,
    verified: false,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    rating: 4.4,
    reviews: 456,
    name: 'Designer Sunglasses',
    store: 'SunStyle Shop',
    price: 79.99,
    originalPrice: 99.99,
    distance: '0.5',
    walkTime: '6 min',
    bikeTime: '2 min',
    carTime: '1 min',
    category: 'Fashion',
    brand: 'SunStyle'
  },
  {
    id: 4,
    discount: 20,
    verified: true,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 1567,
    name: 'Running Shoes Pro',
    store: 'SpeedFit Athletics',
    price: 119.99,
    originalPrice: 149.99,
    distance: '2.1',
    walkTime: '26 min',
    bikeTime: '8 min',
    carTime: '5 min',
    category: 'Sports',
    brand: 'SpeedFit'
  },
  {
    id: 5,
    discount: 15,
    verified: true,
    image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 234,
    name: 'Premium Skincare Set',
    store: 'TechPro Store',
    price: 84.99,
    originalPrice: 99.99,
    distance: '1.5',
    walkTime: '18 min',
    bikeTime: '5 min',
    carTime: '4 min',
    category: 'Electronics',
    brand: 'TechPro'
  },
  {
    id: 6,
    discount: 30,
    verified: true,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    rating: 4.5,
    reviews: 678,
    name: 'Travel Backpack',
    store: 'TravelPro Gear',
    price: 69.99,
    originalPrice: 99.99,
    distance: '3.2',
    walkTime: '40 min',
    bikeTime: '12 min',
    carTime: '8 min',
    category: 'Fashion',
    brand: 'TravelPro'
  },
  {
    id: 7,
    discount: 10,
    verified: false,
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    rating: 4.3,
    reviews: 189,
    name: 'Stainless Steel Cookware Set',
    store: 'HomeStyle Kitchen',
    price: 179.99,
    originalPrice: 199.99,
    distance: '1.8',
    walkTime: '22 min',
    bikeTime: '7 min',
    carTime: '5 min',
    category: 'Home',
    brand: 'HomeStyle'
  },
  {
    id: 8,
    discount: 40,
    verified: true,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 512,
    name: 'Professional Camera',
    store: 'PhotoPro Studio',
    price: 599.99,
    originalPrice: 999.99,
    distance: '4.5',
    walkTime: '55 min',
    bikeTime: '18 min',
    carTime: '12 min',
    category: 'Electronics',
    brand: 'PhotoPro'
  }
]

// Product Details Database
export const productDetailsDatabase: ProductDetails[] = [
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

Capture professional-quality photos and videos with the advanced 48MP main camera system featuring a 5x optical zoom on the telephoto lens. The new Action button lets you customize your experience with quick access to your favorite features.

Key Features:
• A17 Pro chip with 6-core GPU for console-level gaming
• 48MP main camera with 5x optical zoom telephoto
• Titanium design - lightest Pro model ever
• 6.7" Super Retina XDR display with ProMotion
• Customizable Action button
• USB-C with USB 3 speeds up to 10 Gb/s
• All-day battery life with fast charging support

Specifications:
• Display: 6.7" Super Retina XDR (2796 x 1290 pixels)
• Processor: A17 Pro chip
• Storage: 256GB | RAM: 8GB
• Camera: 48MP + 12MP + 12MP (Rear) | 12MP TrueDepth (Front)
• Battery: 4422 mAh
• OS: iOS 17
• Weight: 221 grams
• Water Resistance: IP68`,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886f2b?w=800&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80'
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

Powered by the Snapdragon 8 Gen 3 for Galaxy, experience lightning-fast performance for gaming, multitasking, and AI features that adapt to how you use your phone.

Key Features:
• 200MP main camera with advanced AI processing
• Snapdragon 8 Gen 3 for Galaxy processor
• Built-in S Pen with enhanced functionality
• 6.8" Dynamic AMOLED 2X display
• 5000mAh battery with 45W fast charging
• Titanium frame with Gorilla Armor glass
• Galaxy AI features for productivity

Specifications:
• Display: 6.8" Dynamic AMOLED 2X (3120 x 1440 pixels)
• Processor: Snapdragon 8 Gen 3
• Storage: 512GB | RAM: 12GB
• Camera: 200MP + 12MP + 50MP + 10MP (Rear) | 12MP (Front)
• Battery: 5000 mAh
• OS: Android 14
• Weight: 232 grams
• Water Resistance: IP68`,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80',
      'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?w=800&q=80',
      'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800&q=80'
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

With up to 30 hours of battery life and quick charging (3 hours of playback from 3 minutes of charge), your music never has to stop.

Key Features:
• Industry-leading noise cancellation with 8 microphones
• 30-hour battery life with quick charge
• Speak-to-Chat pauses music automatically
• Multipoint connection for 2 devices
• Crystal clear calls with AI noise reduction
• Touch controls and voice assistant support
• Lightweight design at 250g

Specifications:
• Driver Unit: 30mm
• Frequency Response: 4Hz - 40,000Hz
• Battery Life: 30 hours
• Quick Charge: 3 min = 3 hours playback
• Bluetooth: 5.2
• Codecs: SBC, AAC, LDAC
• Weight: 250g`,
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&q=80'
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

With up to 18 hours of battery life, you can work all day without searching for an outlet. The new Space Black finish is stunning and resists fingerprints.

Key Features:
• Apple M3 Pro chip with 12-core CPU
• 18-core GPU for graphics-intensive tasks
• 18GB unified memory
• 14.2" Liquid Retina XDR display
• Up to 18 hours battery life
• Six-speaker sound system with Spatial Audio
• MagSafe 3 charging and multiple ports

Specifications:
• Chip: Apple M3 Pro (12-core CPU, 18-core GPU)
• Memory: 18GB Unified
• Storage: 512GB SSD
• Display: 14.2" Liquid Retina XDR (3024 x 1964)
• Ports: 3x Thunderbolt 4, HDMI, SD, MagSafe
• Battery: Up to 18 hours
• Weight: 1.61 kg`,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&q=80',
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80'
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

Whether you're hitting the streets or spending the day on your feet, the Air Max 270 React provides all-day comfort and head-turning style.

Key Features:
• Nike React foam for soft, responsive cushioning
• Max Air 270 unit for maximum impact protection
• Breathable mesh upper
• No-sew overlays for durability
• Rubber outsole for traction
• Foam midsole for lightweight comfort
• Pull tab for easy on/off

Specifications:
• Style: Air Max 270 React
• Color: Black/White
• Material: Mesh, Synthetic
• Sole: Rubber
• Cushioning: React + Air Max
• Available Sizes: US 6-14
• Weight: 340g (Size 10)
• Fit: True to size`,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80',
      'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80'
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

// Helper function to get product by ID
export const getProductById = (id: number): ProductDetails | undefined => {
  return productDetailsDatabase.find(p => p.id === id)
}

// Helper function to get related products
export const getRelatedProducts = (currentId: number, limit: number = 4) => {
  return productDetailsDatabase
    .filter(p => p.id !== currentId)
    .slice(0, limit)
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
