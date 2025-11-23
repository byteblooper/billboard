import React from 'react'
import { LogOut, LucideIcon } from 'lucide-react'

type MenuItem = {
  icon: LucideIcon
  label: string
  active: boolean
}

type SidebarMenuProps = {
  menuItems: MenuItem[]
  activeTab: string
  setActiveTab: (tab: string) => void
}

const SidebarMenu = ({ menuItems, activeTab, setActiveTab }: SidebarMenuProps) => {
  return (
    <div className="bg-white rounded-2xl p-6 border border-violet-200">
      <h2 className="text-lg font-bold text-violet-800 mb-6">Account Menu</h2>
      <nav className="space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon
          return (
            <button
              key={index}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.label
                  ? 'bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-lg'
                  : 'text-violet-700 hover:bg-violet-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          )
        })}
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200">
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </nav>
    </div>
  )
}

export default SidebarMenu
