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
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your store, products, and orders</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
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
