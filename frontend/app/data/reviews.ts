// Review Types and Demo Data

export interface Review {
  id: number
  author: string
  avatar: string
  rating: number
  date: string
  title: string
  content: string
  helpful: number
  notHelpful: number
  verified: boolean
  images?: string[]
}

export interface RatingDistribution {
  stars: number
  count: number
  percentage: number
}

// Demo reviews
export const demoReviews: Review[] = [
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

// Helper function to generate rating distribution
export const getRatingDistribution = (rating: number): RatingDistribution[] => {
  const base = Math.round(rating * 15)
  return [
    { stars: 5, count: base, percentage: Math.round((rating / 5) * 80) },
    { stars: 4, count: Math.round(base * 0.3), percentage: Math.round(20 - rating) },
    { stars: 3, count: Math.round(base * 0.1), percentage: 5 },
    { stars: 2, count: Math.round(base * 0.05), percentage: 2 },
    { stars: 1, count: Math.round(base * 0.02), percentage: 1 }
  ]
}
