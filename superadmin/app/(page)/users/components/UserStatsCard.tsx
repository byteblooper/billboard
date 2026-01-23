'use client';

import { UserStats } from './types';

interface UserStatsCardProps {
  stats: UserStats;
}

export default function UserStatsCard({ stats }: UserStatsCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const statItems = [
    {
      label: 'Total Users',
      value: stats.totalUsers,
      icon: '👥',
      bgColor: 'bg-indigo-50',
    },
    {
      label: 'Active Users',
      value: stats.activeUsers,
      icon: '✅',
      bgColor: 'bg-green-50',
    },
    {
      label: 'New This Month',
      value: stats.newUsersThisMonth,
      icon: '🆕',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Total Orders',
      value: stats.totalOrders,
      icon: '📦',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(stats.totalRevenue),
      icon: '💰',
      bgColor: 'bg-emerald-50',
    },
    {
      label: 'Avg. Order Value',
      value: formatCurrency(stats.avgOrderValue),
      icon: '📊',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statItems.map((item, index) => (
        <div
          key={index}
          className={`${item.bgColor} rounded-xl p-4 border border-gray-100`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl">{item.icon}</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{item.value}</p>
          <p className="text-xs text-gray-600 mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
