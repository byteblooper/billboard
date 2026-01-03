'use client'

import React, { useState } from 'react'
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Bell,
  Settings
} from 'lucide-react'
import PersonalInfoTab from './components/PersonalInfoTab'
import OrderHistoryTab from './components/OrderHistoryTab'
import ProfileHeader from './components/ProfileHeader'
import StatsCards from './components/StatsCards'
import SidebarMenu from './components/SidebarMenu'



// Types
type TabType = 'Personal Info' | 'Order History' | 'Wishlist' | 'Addresses' | 'Payment Methods' | 'Notifications' | 'Settings'

interface Order {
  id: string
  store: string
  items: number
  total: string
  status: string
  date: string
  image: string
}

// Demo Data
const userInfo = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY 10001',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  memberLevel: 'Gold Member',
  joinDate: 'January 2024'
}

const stats = [
  { label: 'Total Orders', value: '24', icon: ShoppingBag, color: 'from-blue-600 to-blue-500' },
  { label: 'Wishlist Items', value: '12', icon: Heart, color: 'from-pink-600 to-pink-500' },
  { label: 'Reward Points', value: '2,450', icon: CreditCard, color: 'from-amber-600 to-amber-500' },
  { label: 'Reviews Given', value: '18', icon: User, color: 'from-green-600 to-green-500' }
]

const orders: Order[] = [
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

const menuItems = [
  { icon: User, label: 'Personal Info' as TabType, active: true },
  { icon: ShoppingBag, label: 'Order History' as TabType, active: false },
  { icon: Heart, label: 'Wishlist' as TabType, active: false },
  { icon: MapPin, label: 'Addresses' as TabType, active: false },
  { icon: CreditCard, label: 'Payment Methods' as TabType, active: false },
  { icon: Bell, label: 'Notifications' as TabType, active: false },
  { icon: Settings, label: 'Settings' as TabType, active: false }
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<TabType>('Personal Info')

  const renderContent = () => {
    switch (activeTab) {
      case 'Personal Info':
        return <PersonalInfoTab userInfo={userInfo} />
      case 'Order History':
        return <OrderHistoryTab orders={orders} />
      default:
        return (
          <div className="bg-white rounded-2xl p-8 border border-violet-200">
            <h2 className="text-xl font-bold text-violet-900 mb-4">{activeTab}</h2>
            <p className="text-violet-600">This section is coming soon...</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Profile Header */}
        <ProfileHeader userInfo={userInfo} />

        {/* Stats Cards */}
        <StatsCards stats={stats} />

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
            <SidebarMenu
              menuItems={menuItems}
              activeTab={activeTab}
              setActiveTab={(tab) => setActiveTab(tab as TabType)}
            />
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}
