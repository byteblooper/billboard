'use client'

import React, { useState } from 'react'
import { 
  User, 
  MapPin, 
  Bell, 
  Heart, 
  ShoppingBag, 
  Package, 
  Shield,
  CreditCard,
  Award
} from 'lucide-react'
import { Edit2 } from 'lucide-react'
import ProfileHeader from './components/ProfileHeader'
import StatsCards from './components/StatsCards'
import SidebarMenu from './components/SidebarMenu'
import PersonalInfoTab from './components/PersonalInfoTab'
import OrderHistoryTab from './components/OrderHistoryTab'



const ProfilePage = () => {

  // Demo Data
const userInfo = {
  name: 'Rian Hasan Siam',
  email: 'rianhasan1971@gmail.com',
  phone: '+880 19326 00504',
  location: '123 Market Street, Downtown, NY 10001',
  joinDate: 'January 2024',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
  memberLevel: 'Premium Member'
}

const stats = [
  { icon: ShoppingBag, label: 'Total Orders', value: '47', color: 'from-blue-500 to-indigo-500' },
  { icon: Heart, label: 'Wishlist Items', value: '23', color: 'from-pink-500 to-rose-500' },
  { icon: Package, label: 'Active Orders', value: '3', color: 'from-violet-500 to-indigo-500' },
  { icon: Award, label: 'Reward Points', value: '1,250', color: 'from-emerald-500 to-teal-500' }
]

const recentOrders = [
  {
    id: '#ORD-2024-001',
    store: 'TechHub Electronics',
    items: 2,
    total: '$299.99',
    status: 'Delivered',
    date: 'Nov 15, 2025',
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop'
  },
  {
    id: '#ORD-2024-002',
    store: 'Fashion Avenue',
    items: 1,
    total: '$79.99',
    status: 'In Transit',
    date: 'Nov 17, 2025',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop'
  },
  {
    id: '#ORD-2024-003',
    store: 'Home Decor Plus',
    items: 3,
    total: '$149.99',
    status: 'Processing',
    date: 'Nov 17, 2025',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop'
  }
]

const menuItems = [
  { icon: User, label: 'Personal Information', active: true },
  { icon: ShoppingBag, label: 'Order History', active: false },
  { icon: Heart, label: 'Wishlist', active: false },
  { icon: MapPin, label: 'Addresses', active: false },
  { icon: CreditCard, label: 'Payment Methods', active: false },
  { icon: Bell, label: 'Notifications', active: false },
  { icon: Shield, label: 'Privacy & Security', active: false },
  
]

const [activeTab, setActiveTab] = useState('Personal Information')







  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-violet-50">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <ProfileHeader userInfo={userInfo} />

        {/* Stats Cards */}
        <StatsCards stats={stats} />



        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Menu */}
          <div className="lg:col-span-1">
            <SidebarMenu 
              menuItems={menuItems} 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
            />
          </div>



          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 border border-violet-200">

              
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-violet-800">{activeTab}</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-violet-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105 flex items-center gap-2">
                  <Edit2 className="w-4 h-4" />
                  Edit
                </button>
              </div>



              {activeTab === 'Personal Information' && (
                <PersonalInfoTab userInfo={userInfo} />
              )}

              {activeTab === 'Order History' && (
                <OrderHistoryTab orders={recentOrders} />
              )}



            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
