// ============================================================================
// ORDERS DATA - Order Repository
// ============================================================================

import { Order, OrderItem, OrderStatus } from '../types'
import { products } from './products'
import { stores, toStoreRef } from './stores'

// ============================================================================
// DEMO DATA - ORDERS
// ============================================================================

export const orders: Order[] = [
  {
    id: 'ORD-2026-001',
    items: [
      { productId: 4, name: 'Premium Wireless Headphones', image: products[3].image, price: 14999, quantity: 1 },
      { productId: 10, name: 'USB-C Hub 7-in-1', image: products[9].image, price: 1890, quantity: 2 }
    ],
    itemCount: 3,
    total: 18779,
    status: 'delivered',
    store: toStoreRef(stores[3]),
    createdAt: '2026-01-10T10:30:00Z',
    updatedAt: '2026-01-11T14:20:00Z',
    deliveryAddress: '123 Main Street, Dhaka',
    trackingNumber: 'TRK-2026-001'
  },
  {
    id: 'ORD-2026-002',
    items: [
      { productId: 5, name: 'Classic Leather Watch', image: products[4].image, price: 8999, quantity: 1 }
    ],
    itemCount: 1,
    total: 8999,
    status: 'in-transit',
    store: toStoreRef(stores[4]),
    createdAt: '2026-01-12T09:15:00Z',
    updatedAt: '2026-01-13T16:45:00Z',
    deliveryAddress: '456 Fashion Ave, Dhaka',
    trackingNumber: 'TRK-2026-002'
  },
  {
    id: 'ORD-2026-003',
    items: [
      { productId: 7, name: 'Running Shoes Pro', image: products[6].image, price: 11999, quantity: 1 },
      { productId: 12, name: 'Bluetooth Speaker Mini', image: products[11].image, price: 2800, quantity: 1 }
    ],
    itemCount: 2,
    total: 14799,
    status: 'processing',
    store: toStoreRef(stores[5]),
    createdAt: '2026-01-14T08:00:00Z',
    updatedAt: '2026-01-14T08:00:00Z',
    deliveryAddress: '789 Sports Blvd, Dhaka'
  },
  {
    id: 'ORD-2025-099',
    items: [
      { productId: 6, name: 'Designer Sunglasses', image: products[5].image, price: 7999, quantity: 1 }
    ],
    itemCount: 1,
    total: 7999,
    status: 'cancelled',
    store: toStoreRef(stores[6]),
    createdAt: '2025-12-28T14:30:00Z',
    updatedAt: '2025-12-29T10:00:00Z',
    deliveryAddress: '321 Beach Road, Dhaka'
  },
  {
    id: 'ORD-2025-098',
    items: [
      { productId: 1, name: 'A4tech Bloody MR720 Gaming Headphone', image: products[0].image, price: 6200, quantity: 1 },
      { productId: 8, name: 'Wireless Gaming Mouse RGB', image: products[7].image, price: 2350, quantity: 1 }
    ],
    itemCount: 2,
    total: 8550,
    status: 'delivered',
    store: toStoreRef(stores[0]),
    createdAt: '2025-12-20T11:00:00Z',
    updatedAt: '2025-12-22T09:30:00Z',
    deliveryAddress: '123 Main Street, Dhaka',
    trackingNumber: 'TRK-2025-098'
  }
]

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get order by ID
 */
export function getOrderById(id: string): Order | undefined {
  return orders.find(o => o.id === id)
}

/**
 * Get orders by status
 */
export function getOrdersByStatus(status: OrderStatus): Order[] {
  return orders.filter(o => o.status === status)
}

/**
 * Get recent orders
 */
export function getRecentOrders(limit: number = 5): Order[] {
  return [...orders]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit)
}

/**
 * Get order stats
 */
export function getOrderStats() {
  const totalOrders = orders.length
  const completedOrders = orders.filter(o => o.status === 'delivered').length
  const pendingOrders = orders.filter(o => o.status === 'processing' || o.status === 'in-transit').length
  const cancelledOrders = orders.filter(o => o.status === 'cancelled').length
  const totalSpent = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.total, 0)

  return {
    totalOrders,
    completedOrders,
    pendingOrders,
    cancelledOrders,
    totalSpent
  }
}

/**
 * Get status display info
 */
export function getStatusInfo(status: OrderStatus): { label: string; color: string; bgColor: string } {
  const statusMap: Record<OrderStatus, { label: string; color: string; bgColor: string }> = {
    'pending': { label: 'Pending', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
    'processing': { label: 'Processing', color: 'text-blue-700', bgColor: 'bg-blue-100' },
    'in-transit': { label: 'In Transit', color: 'text-purple-700', bgColor: 'bg-purple-100' },
    'delivered': { label: 'Delivered', color: 'text-green-700', bgColor: 'bg-green-100' },
    'cancelled': { label: 'Cancelled', color: 'text-red-700', bgColor: 'bg-red-100' }
  }
  return statusMap[status]
}
