'use client'

import React, { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import PersonalInfoTab from './components/PersonalInfoTab'
import OrderHistoryTab from './components/OrderHistoryTab'
import ProfileHeader from './components/ProfileHeader'
import StatsCards from './components/StatsCards'
import SidebarMenu from './components/SidebarMenu'
import { defaultUserStats, orders, profileMenuItems, type UserInfo } from '@/app/data'

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
    memberLevel: 'Member',
    joinDate: 'Member'
  } : {
    name: 'User',
    email: '',
    phone: '',
    location: '',
    avatar: '',
    memberLevel: 'Member',
    joinDate: 'Member'
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

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
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
