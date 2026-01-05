// User Types and Profile Menu Data
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

// Default user stats (will be replaced with real data from API)
export const defaultUserStats: UserStat[] = [
  { label: 'Total Orders', value: '0', icon: ShoppingBag, color: 'from-blue-600 to-blue-500' },
  { label: 'Wishlist Items', value: '0', icon: Heart, color: 'from-pink-600 to-pink-500' },
  { label: 'Reward Points', value: '0', icon: CreditCard, color: 'from-amber-600 to-amber-500' },
  { label: 'Reviews Given', value: '0', icon: User, color: 'from-green-600 to-green-500' }
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
