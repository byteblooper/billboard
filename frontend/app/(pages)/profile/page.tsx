'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import PersonalInfoTab from './components/PersonalInfoTab'
import OrderHistoryTab from './components/OrderHistoryTab'
import ProfileHeader from './components/ProfileHeader'
import StatsCards from './components/StatsCards'
import SidebarMenu from './components/SidebarMenu'
import { Package, Heart, Wallet, ShoppingBag, User, MapPin, CreditCard, Bell, Settings } from 'lucide-react'
import { orders as storeOrders, getOrderStats, getStatusInfo } from '@/store'

// Types from old data file - keeping for compatibility
interface UserInfo {
  name: string
  email: string
  phone: string
  location: string
  avatar: string
  memberSince: string
  joinDate: string
  memberLevel: string
}

// Transform orders to legacy format for OrderHistoryTab
const orders = storeOrders.map(o => ({
  id: o.id,
  store: o.store.name,
  items: o.itemCount,
  total: `৳${o.total.toLocaleString()}`,
  status: getStatusInfo(o.status).label,
  date: new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  image: o.items[0]?.image || ''
}))

// Get stats from store
const orderStats = getOrderStats()
const defaultUserStats = [
  { icon: Package, label: 'Total Orders', value: orderStats.totalOrders.toString(), color: 'from-violet-500 to-violet-600' },
  { icon: ShoppingBag, label: 'Items Purchased', value: storeOrders.reduce((sum, o) => sum + o.itemCount, 0).toString(), color: 'from-blue-500 to-blue-600' },
  { icon: Wallet, label: 'Total Savings', value: '৳2,500', color: 'from-emerald-500 to-emerald-600' },
  { icon: Heart, label: 'Wishlist Items', value: '6', color: 'from-rose-500 to-rose-600' }
]

// Profile menu items
const profileMenuItems = [
  { id: 'Personal Info', label: 'Personal Info', icon: User, active: false },
  { id: 'Order History', label: 'Order History', icon: Package, active: false },
  { id: 'Wishlist', label: 'Wishlist', icon: Heart, active: false },
  { id: 'Addresses', label: 'Addresses', icon: MapPin, active: false },
  { id: 'Payment Methods', label: 'Payment Methods', icon: CreditCard, active: false },
  { id: 'Notifications', label: 'Notifications', icon: Bell, active: false },
  { id: 'Settings', label: 'Settings', icon: Settings, active: false }
]

// Types
type TabType = 'Personal Info' | 'Order History' | 'Wishlist' | 'Addresses' | 'Payment Methods' | 'Notifications' | 'Settings'

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [activeTab, setActiveTab] = useState<TabType>('Personal Info')
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Build user info from session (only after mounted)
  const userInfo: UserInfo = mounted ? {
    name: session?.user?.name || (session?.user as any)?.username || 'User',
    email: session?.user?.email || '',
    phone: '',
    location: '',
    avatar: session?.user?.image || '',
    memberSince: 'Member since 2024',
    joinDate: '2024',
    memberLevel: 'Gold Member'
  } : {
    name: 'User',
    email: '',
    phone: '',
    location: '',
    avatar: '',
    memberSince: 'Member',
    joinDate: '',
    memberLevel: 'Member'
  }

  if (!mounted || status === 'loading') {
    return (
      <div className="min-h-screen bg-linear-to-br from-violet-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

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
        <StatsCards stats={defaultUserStats} />

        {/* Mobile Tab Navigation */}
        <div className="lg:hidden mb-6 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 pb-2">
            {profileMenuItems.map((item, index) => {
              const Icon = item.icon
              return (
                <button
                  key={index}
                  onClick={() => setActiveTab(item.label as TabType)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all ${
                    activeTab === item.label
                      ? 'bg-violet-600 text-white'
                      : 'bg-white text-violet-700 border border-violet-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Menu - Hidden on Mobile */}
          <div className="hidden lg:block lg:col-span-1">
            <SidebarMenu
              menuItems={profileMenuItems}
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
