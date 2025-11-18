'use client'

import React, { useState } from 'react'
import AdminSidebar from './components/AdminSidebar'
import DashboardView from './components/DashboardView'
import ProductsView from './components/ProductsView'
import OrdersView from './components/OrdersView'
import CustomersView from './components/CustomersView'
import StoresView from './components/StoresView'
import CategoriesView from './components/CategoriesView'
import CouponsView from './components/CouponsView'
import ChatsView from './components/ChatsView'


type TabType = 'dashboard' | 'products' | 'orders' | 'customers' | 'stores' | 'categories' | 'coupons' | 'chats'

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard')

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 py-6">


        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-4">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'products' && <ProductsView />}
            {activeTab === 'orders' && <OrdersView />}
            {activeTab === 'customers' && <CustomersView />}
            {activeTab === 'stores' && <StoresView />}
            {activeTab === 'categories' && <CategoriesView />}
            {activeTab === 'coupons' && <CouponsView />}
            {activeTab === 'chats' && <ChatsView />}
          </div>


        </div>
      </div>
    </div>
  )
}

export default AdminPanel
