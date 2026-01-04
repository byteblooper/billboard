// Order Types and Demo Data

export interface Order {
  id: string
  store: string
  items: number
  total: string
  status: 'delivered' | 'in-transit' | 'processing' | 'cancelled'
  date: string
  image: string
}

// Demo orders
export const orders: Order[] = [
  {
    id: 'ORD-2024-001',
    date: 'Jan 15, 2024',
    status: 'delivered',
    total: '$249.99',
    store: 'AudioTech Store',
    items: 3,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop'
  },
  {
    id: 'ORD-2024-002',
    date: 'Jan 18, 2024',
    status: 'in-transit',
    total: '$89.99',
    store: 'LuxTime Boutique',
    items: 1,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop'
  },
  {
    id: 'ORD-2024-003',
    date: 'Jan 20, 2024',
    status: 'processing',
    total: '$199.99',
    store: 'SpeedFit Athletics',
    items: 2,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop'
  },
  {
    id: 'ORD-2024-004',
    date: 'Dec 28, 2023',
    status: 'cancelled',
    total: '$79.99',
    store: 'SunStyle Shop',
    items: 1,
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&h=100&fit=crop'
  }
]

// Order status helper
export const getStatusStyles = (status: Order['status']) => {
  switch (status) {
    case 'delivered':
      return 'bg-emerald-100 text-emerald-700'
    case 'in-transit':
      return 'bg-blue-100 text-blue-700'
    case 'processing':
      return 'bg-violet-100 text-violet-700'
    case 'cancelled':
      return 'bg-red-100 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}
