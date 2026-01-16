'use client'

import React from 'react'
import { DollarSign, ShoppingCart, Package, Users } from 'lucide-react'
import StatsCard from './StatsCard'
import RecentOrders from './RecentOrders'
import TopProducts from './TopProducts'

// Demo Data
const dashboardStats = [
  {
    id: 1,
    title: 'Total Revenue',
    value: '$45,231',
    change: '+12.5%',
    trend: 'up' as const,
    icon: DollarSign,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  {
    id: 2,
    title: 'Total Orders',
    value: '1,234',
    change: '+8.2%',
    trend: 'up' as const,
    icon: ShoppingCart,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200'
  },
  {
    id: 3,
    title: 'Total Products',
    value: '856',
    change: '+5.1%',
    trend: 'up' as const,
    icon: Package,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200'
  },
  {
    id: 4,
    title: 'Active Users',
    value: '2,458',
    change: '-2.3%',
    trend: 'down' as const,
    icon: Users,
    color: 'text-violet-600',
    bgColor: 'bg-violet-50',
    borderColor: 'border-violet-200'
  }
]

const recentOrders = [
  {
    id: '#ORD-001',
    customer: 'John Doe',
    product: 'Wireless Headphones',
    amount: '$149.99',
    status: 'completed',
    date: '2025-11-18'
  },
  {
    id: '#ORD-002',
    customer: 'Jane Smith',
    product: 'Smart Watch',
    amount: '$299.99',
    status: 'pending',
    date: '2025-11-18'
  },
  {
    id: '#ORD-003',
    customer: 'Mike Johnson',
    product: 'Leather Wallet',
    amount: '$89.99',
    status: 'processing',
    date: '2025-11-17'
  },
  {
    id: '#ORD-004',
    customer: 'Sarah Williams',
    product: 'Running Shoes',
    amount: '$119.99',
    status: 'completed',
    date: '2025-11-17'
  },
  {
    id: '#ORD-005',
    customer: 'Tom Brown',
    product: 'Designer Sunglasses',
    amount: '$79.99',
    status: 'cancelled',
    date: '2025-11-16'
  }
]

const topProducts = [
  { id: 1, name: 'Premium Wireless Headphones', sales: 234, revenue: '$35,086' },
  { id: 2, name: 'Smart Watch Ultra', sales: 189, revenue: '$56,681' },
  { id: 3, name: 'Classic Leather Watch', sales: 156, revenue: '$14,034' },
  { id: 4, name: 'Designer Sunglasses', sales: 143, revenue: '$11,437' },
  { id: 5, name: 'Luxury Backpack', sales: 128, revenue: '$11,519' }
]

const DashboardView = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
        {dashboardStats.map((stat) => (
          <StatsCard key={stat.id} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Orders */}
        <RecentOrders orders={recentOrders} />

        {/* Top Products */}
        <TopProducts products={topProducts} />
      </div>
    </div>
  )
}

export default DashboardView
