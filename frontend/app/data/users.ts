// User Types and Demo Data
import { LucideIcon, ShoppingBag, Heart, CreditCard, User, MapPin, Bell, Settings } from 'lucide-react'

export interface UserInfo {
  name: string
  email: string
  phone: string
  location: string
  avatar: string
  memberLevel: string
  joinDate: string
}

export interface UserStat {
  label: string
  value: string
  icon: LucideIcon
  color: string
}

export interface MenuItem {
  icon: LucideIcon
  label: string
  active: boolean
}

// Demo user data
export const userInfo: UserInfo = {
  name: 'John Doe',
  email: 'john.doe@email.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY 10001',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
  memberLevel: 'Gold Member',
  joinDate: 'January 2024'
}

// User stats
export const userStats: UserStat[] = [
  { label: 'Total Orders', value: '24', icon: ShoppingBag, color: 'from-blue-600 to-blue-500' },
  { label: 'Wishlist Items', value: '12', icon: Heart, color: 'from-pink-600 to-pink-500' },
  { label: 'Reward Points', value: '2,450', icon: CreditCard, color: 'from-amber-600 to-amber-500' },
  { label: 'Reviews Given', value: '18', icon: User, color: 'from-green-600 to-green-500' }
]

// Profile menu items
export const profileMenuItems: MenuItem[] = [
  { icon: User, label: 'Personal Info', active: true },
  { icon: ShoppingBag, label: 'Order History', active: false },
  { icon: Heart, label: 'Wishlist', active: false },
  { icon: MapPin, label: 'Addresses', active: false },
  { icon: CreditCard, label: 'Payment Methods', active: false },
  { icon: Bell, label: 'Notifications', active: false },
  { icon: Settings, label: 'Settings', active: false }
]
