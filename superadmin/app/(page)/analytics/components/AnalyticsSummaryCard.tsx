'use client';

import { AnalyticsSummary } from './types';

interface AnalyticsSummaryCardProps {
  summary: AnalyticsSummary;
}

export default function AnalyticsSummaryCard({ summary }: AnalyticsSummaryCardProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `৳${(amount / 1000000).toFixed(1)}M`;
    }
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const stats = [
    {
      label: 'Total Revenue',
      value: formatCurrency(summary.totalRevenue),
      change: summary.revenueGrowth,
      icon: '💰',
      color: 'from-emerald-500 to-emerald-600',
    },
    {
      label: 'Total Orders',
      value: formatNumber(summary.totalOrders),
      change: summary.ordersGrowth,
      icon: '📦',
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Active Users',
      value: formatNumber(summary.activeUsers),
      change: summary.usersGrowth,
      icon: '👥',
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Avg. Order Value',
      value: formatCurrency(summary.avgOrderValue),
      change: summary.aovGrowth,
      icon: '📊',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      label: 'Conversion Rate',
      value: `${summary.conversionRate}%`,
      change: summary.conversionGrowth,
      icon: '🎯',
      color: 'from-orange-500 to-orange-600',
    },
    {
      label: 'Churn Rate',
      value: `${summary.churnRate}%`,
      change: summary.churnChange,
      icon: '📉',
      color: 'from-red-500 to-red-600',
      invertColor: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{stat.icon}</span>
            <span
              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                stat.invertColor
                  ? stat.change < 0
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                  : stat.change >= 0
                  ? 'bg-green-100 text-green-700'
                  : 'bg-red-100 text-red-700'
              }`}
            >
              {stat.change >= 0 ? '+' : ''}
              {stat.change}%
            </span>
          </div>
          <p className="text-xl font-bold text-gray-900">{stat.value}</p>
          <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}
