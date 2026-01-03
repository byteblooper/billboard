import React from 'react'
import { Clock, Package } from 'lucide-react'
import Image from 'next/image'

type Order = {
  id: string
  store: string
  items: number
  total: string
  status: string
  date: string
  image: string
}

type OrderHistoryTabProps = {
  orders: Order[]
}

const OrderHistoryTab = ({ orders }: OrderHistoryTabProps) => {
  return (
    <div className="space-y-4">
      {orders.map((order, index) => (
        <div key={index} className="border border-violet-200 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 hover:border-violet-300">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
              <Image
                src={order.image}
                alt={order.store}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-bold text-violet-800">{order.id}</h3>
                  <p className="text-violet-600 text-sm">{order.store}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-700' :
                  order.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                  'bg-violet-100 text-violet-700'
                }`}>
                  {order.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-violet-500">
                <span className="flex items-center gap-1">
                  <Package className="w-4 h-4" />
                  {order.items} items
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {order.date}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-violet-600 mb-2">{order.total}</div>
              <button className="px-4 py-2 bg-violet-100 hover:bg-violet-200 rounded-lg text-sm font-medium transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default OrderHistoryTab
