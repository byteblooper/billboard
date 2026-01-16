'use client'

import React from 'react'
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

type Order = {
  id: string
  customer: string
  product: string
  amount: string
  status: string
  date: string
}

type RecentOrdersProps = {
  orders: Order[]
}

const RecentOrders = ({ orders }: RecentOrdersProps) => {
    
  const getStatusBadge = (status: string) => {

    const statusConfig = {
      completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      processing: { bg: 'bg-blue-100', text: 'text-blue-700', icon: AlertCircle },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle }
    }
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-lg border border-violet-200">
      <div className="p-3 sm:p-4 border-b border-violet-200 flex items-center justify-between">
        <h2 className="font-semibold text-violet-900 text-sm sm:text-base">Recent Orders</h2>
        <button className="text-violet-600 text-xs sm:text-sm font-medium hover:text-violet-700">
          View All
        </button>
      </div>
      <div className="divide-y divide-violet-200">
        {orders.map((order) => (
          <div key={order.id} className="p-3 sm:p-4 hover:bg-violet-50 transition-colors">
            <div className="flex items-start justify-between mb-1.5 sm:mb-2">
              <div>
                <p className="font-medium text-violet-900 text-xs sm:text-sm">{order.id}</p>
                <p className="text-[10px] sm:text-xs text-violet-600">{order.customer}</p>
              </div>
              {getStatusBadge(order.status)}
            </div>
            <p className="text-[10px] sm:text-xs text-violet-600 mb-1.5 sm:mb-2 line-clamp-1">{order.product}</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-violet-900 text-xs sm:text-sm">{order.amount}</span>
              <span className="text-[10px] sm:text-xs text-violet-500">{order.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentOrders
