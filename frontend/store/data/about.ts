// ============================================================================
// ABOUT DATA - About Page Data Repository
// ============================================================================

// ============================================================================
// TYPES
// ============================================================================

export interface StatItem {
  value: string
  label: string
}

// ============================================================================
// DEMO DATA - STATS
// ============================================================================

export const statsData: StatItem[] = [
  { value: '50K+', label: 'Active Users' },
  { value: '2,000+', label: 'Partner Stores' },
  { value: '100K+', label: 'Products' },
  { value: '50KM', label: 'Radius' },
]

// ============================================================================
// JSON-LD STRUCTURED DATA FOR SEO
// ============================================================================

export const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NearByDeals',
  description: 'Local shopping platform connecting customers with verified stores within 50KM',
  url: 'https://nearbydeals.com',
  logo: 'https://nearbydeals.com/logo.png',
  foundingDate: '2024',
  sameAs: [
    'https://facebook.com/nearbydeals',
    'https://twitter.com/nearbydeals',
    'https://instagram.com/nearbydeals',
    'https://linkedin.com/company/nearbydeals',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-800-NEARBY',
    contactType: 'customer service',
    availableLanguage: ['English'],
  },
}
