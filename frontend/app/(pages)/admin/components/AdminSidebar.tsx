'use client'

import React from 'react'
import { LayoutDashboard, Package, ShoppingCart, Users, Store, Tag, Percent, MessageSquare } from 'lucide-react'

type TabType = 'dashboard' | 'products' | 'orders' | 'customers' | 'stores' | 'categories' | 'coupons' | 'chats'

interface AdminSidebarProps {
  activeTab: TabType
  setActiveTab: (tab: TabType) => void
}

const AdminSidebar = ({ activeTab, setActiveTab }: AdminSidebarProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3">
      <nav className="space-y-1">
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'dashboard'
              ? 'bg-violet-50 text-violet-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Dashboard
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'products'
              ? 'bg-violet-50 text-violet-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Package className="w-4 h-4" />
          Products
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'orders'
              ? 'bg-violet-50 text-violet-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          Orders
        </button>
        <button
          onClick={() => setActiveTab('customers')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'customers'
              ? 'bg-violet-50 text-violet-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Users className="w-4 h-4" />
          Customers
        </button>
        <button
          onClick={() => setActiveTab('stores')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'stores'
              ? 'bg-violet-50 text-violet-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Store className="w-4 h-4" />
          Stores
        </button>
        <button
          onClick={() => setActiveTab('categories')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'categories'
              ? 'bg-violet-50 text-violet-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Tag className="w-4 h-4" />
          Categories
        </button>
        <button
          onClick={() => setActiveTab('coupons')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'coupons'
              ? 'bg-violet-50 text-violet-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Percent className="w-4 h-4" />
          Coupons
        </button>
        <button
          onClick={() => setActiveTab('chats')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === 'chats'
              ? 'bg-violet-50 text-violet-600'
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          Chats
        </button>
      </nav>
    </div>
  )
}

export default AdminSidebar
