import React from 'react'
import { TrendingUp, LucideIcon } from 'lucide-react'

type Stat = {
  icon: LucideIcon
  label: string
  value: string
  color: string
}

type StatsCardsProps = {
  stats: Stat[]
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div key={index} className="bg-white rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-tranviolet-y-1 border border-violet-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-emerald-500" />
            </div>
            <div className="text-3xl font-bold text-violet-800 mb-1">{stat.value}</div>
            <div className="text-violet-500 text-sm">{stat.label}</div>
          </div>
        )
      })}
    </div>
  )
}

export default StatsCards
