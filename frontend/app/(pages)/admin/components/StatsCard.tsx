'use client'

import React from 'react'
import { TrendingUp, TrendingDown, LucideIcon } from 'lucide-react'

type StatsCardProps = {
  title: string
  value: string
  change: string
  trend: 'up' | 'down'
  icon: LucideIcon
  color: string
  bgColor: string
  borderColor: string
}

const StatsCard = ({ title, value, change, trend, icon: Icon, color, bgColor, borderColor }: StatsCardProps) => {
  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown

  return (
    <div className={`bg-white rounded-lg border ${borderColor} p-3 sm:p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className={`w-9 h-9 sm:w-12 sm:h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-4 h-4 sm:w-6 sm:h-6 ${color}`} />
        </div>
        <span className={`flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-xs font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          <TrendIcon className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          {change}
        </span>
      </div>
      <h3 className="text-xs sm:text-sm text-gray-600 mb-0.5 sm:mb-1">{title}</h3>
      <p className="text-lg sm:text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

export default StatsCard
