'use client'

import React, { useState } from 'react'
import { Download, Search, CheckCircle, XCircle, Clock, AlertCircle, Edit, Trash2, Eye } from 'lucide-react'

const demoOrders = [
  { id: '#ORD-001', customer: 'John Doe', product: 'Wireless Headphones', amount: 149.99, status: 'completed', date: '2025-11-18', time: '10:30 AM' },
  { id: '#ORD-002', customer: 'Jane Smith', product: 'Smart Watch', amount: 299.99, status: 'pending', date: '2025-11-18', time: '09:15 AM' },
  { id: '#ORD-003', customer: 'Mike Johnson', product: 'Leather Wallet', amount: 89.99, status: 'processing', date: '2025-11-17', time: '04:45 PM' },
  { id: '#ORD-004', customer: 'Sarah Williams', product: 'Running Shoes', amount: 119.99, status: 'completed', date: '2025-11-17', time: '02:20 PM' },
  { id: '#ORD-005', customer: 'Tom Brown', product: 'Designer Sunglasses', amount: 79.99, status: 'cancelled', date: '2025-11-16', time: '11:00 AM' },
  { id: '#ORD-006', customer: 'Emily Davis', product: 'Bluetooth Speaker', amount: 59.99, status: 'processing', date: '2025-11-16', time: '08:30 AM' },
  { id: '#ORD-007', customer: 'David Wilson', product: 'Luxury Backpack', amount: 89.99, status: 'completed', date: '2025-11-15', time: '03:10 PM' },
  { id: '#ORD-008', customer: 'Lisa Anderson', product: 'Smart Watch Ultra', amount: 299.99, status: 'pending', date: '2025-11-15', time: '01:45 PM' }
]

const OrdersView = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOrders = demoOrders.filter(order =>
    order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.product.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
    <div className="bg-white rounded-lg border border-slate-200">
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center justify-between gap-4 mb-4">
          <h2 className="font-semibold text-slate-900">Orders Management</h2>
          <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Order ID</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Customer</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Product</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Amount</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Date</th>
              <th className="text-left p-4 text-xs font-semibold text-slate-600">Status</th>
              <th className="text-right p-4 text-xs font-semibold text-slate-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4 font-medium text-slate-900 text-sm">{order.id}</td>
                <td className="p-4 text-sm text-slate-600">{order.customer}</td>
                <td className="p-4 text-sm text-slate-600">{order.product}</td>
                <td className="p-4 text-sm font-semibold text-slate-900">${order.amount}</td>
                <td className="p-4 text-sm text-slate-600">
                  <div>{order.date}</div>
                  <div className="text-xs text-slate-500">{order.time}</div>
                </td>
                <td className="p-4">{getStatusBadge(order.status)}</td>
                <td className="p-4">
                   <div className="flex items-center justify-end gap-2">
                    <button className="p-1.5 text-slate-600 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-slate-600 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredOrders.length === 0 && (
        <div className="p-8 text-center text-slate-500">
          <p>No orders found</p>
        </div>
      )}
    </div>
  )
}

export default OrdersView
