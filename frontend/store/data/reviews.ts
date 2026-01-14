// ============================================================================
// REVIEWS DATA - Product Reviews Repository
// ============================================================================

import { Review, RatingDistribution } from '../types'

// ============================================================================
// DEMO DATA - REVIEWS
// ============================================================================

export const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    author: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      verified: true
    },
    rating: 5,
    title: 'Absolutely amazing sound quality!',
    content: 'This headset exceeded all my expectations. The sound quality is outstanding with deep bass and crystal-clear highs. The RGB lighting is stunning and the battery lasts forever. Highly recommend for any gamer!',
    images: [
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=200&q=80'
    ],
    helpful: 45,
    notHelpful: 2,
    createdAt: '2026-01-12T10:30:00Z'
  },
  {
    id: 2,
    productId: 1,
    author: {
      name: 'Michael Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
      verified: true
    },
    rating: 4,
    title: 'Great product, minor issues',
    content: 'Overall very satisfied with my purchase. The build quality is excellent and sound is impressive. Only minor complaint is the packaging could be better, but the product itself is perfect.',
    helpful: 32,
    notHelpful: 5,
    createdAt: '2026-01-07T09:15:00Z'
  },
  {
    id: 3,
    productId: 1,
    author: {
      name: 'Emily Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
      verified: true
    },
    rating: 5,
    title: 'Worth every penny',
    content: 'I did a lot of research before buying this and I\'m so glad I chose this one. The quality and features are exactly as described. The wireless connectivity is flawless!',
    helpful: 28,
    notHelpful: 3,
    createdAt: '2026-01-01T14:45:00Z'
  },
  {
    id: 4,
    productId: 2,
    author: {
      name: 'David Park',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80',
      verified: true
    },
    rating: 5,
    title: 'Best phone I\'ve ever owned',
    content: 'The S24 Ultra is simply incredible. The camera quality is unmatched, and the AI features are genuinely useful. Battery life easily lasts all day with heavy use.',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&q=80'
    ],
    helpful: 67,
    notHelpful: 4,
    createdAt: '2026-01-10T08:00:00Z'
  },
  {
    id: 5,
    productId: 3,
    author: {
      name: 'Alex Turner',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      verified: true
    },
    rating: 5,
    title: 'Perfect mechanical keyboard',
    content: 'As a programmer, I spend 8+ hours typing daily. This keyboard has transformed my work experience. The tactile feedback is perfect and the wireless mode is rock solid.',
    helpful: 52,
    notHelpful: 1,
    createdAt: '2026-01-08T16:20:00Z'
  }
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get reviews for a product
 */
export function getProductReviews(productId: number): Review[] {
  return reviews.filter(r => r.productId === productId)
}

/**
 * Get average rating for a product
 */
export function getProductAverageRating(productId: number): number {
  const productReviews = getProductReviews(productId)
  if (productReviews.length === 0) return 0
  
  const sum = productReviews.reduce((acc, r) => acc + r.rating, 0)
  return Number((sum / productReviews.length).toFixed(1))
}

/**
 * Generate rating distribution for a product
 */
export function getRatingDistribution(productId: number): RatingDistribution[] {
  const productReviews = getProductReviews(productId)
  const total = productReviews.length || 1
  
  const distribution: RatingDistribution[] = [5, 4, 3, 2, 1].map(stars => {
    const count = productReviews.filter(r => r.rating === stars).length
    return {
      stars,
      count,
      percentage: Math.round((count / total) * 100)
    }
  })
  
  return distribution
}

/**
 * Get recent reviews
 */
export function getRecentReviews(limit: number = 5): Review[] {
  return [...reviews]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

/**
 * Get most helpful reviews
 */
export function getMostHelpfulReviews(productId: number, limit: number = 3): Review[] {
  return getProductReviews(productId)
    .sort((a, b) => b.helpful - a.helpful)
    .slice(0, limit)
}
