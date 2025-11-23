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
    <div className={`bg-white rounded-lg border ${borderColor} p-4 hover:shadow-md transition-shadow`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center`}>
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <span className={`flex items-center gap-1 text-xs font-medium ${
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        }`}>
          <TrendIcon className="w-3 h-3" />
          {change}
        </span>
      </div>
      <h3 className="text-sm text-violet-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-violet-900">{value}</p>
    </div>
  )
}

export default StatsCard
