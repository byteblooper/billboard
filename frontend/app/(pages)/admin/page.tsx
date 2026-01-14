'use client'

import React, { useState } from 'react'
import DashboardView from './components/DashboardView'
import ProductsView from './components/ProductsView'
import OrdersView from './components/OrdersView'
import CustomersView from './components/CustomersView'
import StoresView from './components/StoresView'
import CategoriesView from './components/CategoriesView'
import CouponsView from './components/CouponsView'
import ChatsView from './components/ChatsView'
import AdminSidebar from './components/AdminSidebar'



// Types
type TabType = 'dashboard' | 'products' | 'orders' | 'customers' | 'stores' | 'categories' | 'coupons' | 'chats'

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />
      case 'products':
        return <ProductsView />
      case 'orders':
        return <OrdersView />
      case 'customers':
        return <CustomersView />
      case 'stores':
        return <StoresView />
      case 'categories':
        return <CategoriesView />
      case 'coupons':
        return <CouponsView />
      case 'chats':
        return <ChatsView />
      default:
        return <DashboardView />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage your store, products, and orders</p>
        </div>

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2">
            {[
              { id: 'dashboard', label: 'Dashboard' },
              { id: 'products', label: 'Products' },
              { id: 'orders', label: 'Orders' },
              { id: 'customers', label: 'Customers' },
              { id: 'stores', label: 'Stores' },
              { id: 'categories', label: 'Categories' },
              { id: 'coupons', label: 'Coupons' },
              { id: 'chats', label: 'Chats' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-violet-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
