'use client'

import React, { useState } from 'react'
import PersonalInfoTab from './components/PersonalInfoTab'
import OrderHistoryTab from './components/OrderHistoryTab'
import ProfileHeader from './components/ProfileHeader'
import StatsCards from './components/StatsCards'
import SidebarMenu from './components/SidebarMenu'
import { userInfo, userStats, orders, profileMenuItems } from '@/app/data'

// Types
type TabType = 'Personal Info' | 'Order History' | 'Wishlist' | 'Addresses' | 'Payment Methods' | 'Notifications' | 'Settings'

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
        <StatsCards stats={userStats} />

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
