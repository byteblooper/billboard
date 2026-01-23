'use client';

import { ShopMetrics } from './types';

interface ShopMetricsCardProps {
  metrics: ShopMetrics;
}

export default function ShopMetricsCard({ metrics }: ShopMetricsCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      notation: 'compact',
    }).format(amount);
  };

  const completionRate = metrics.totalOrders > 0
    ? ((metrics.completedOrders / metrics.totalOrders) * 100).toFixed(1)
    : 0;

  const cancellationRate = metrics.totalOrders > 0
    ? ((metrics.cancelledOrders / metrics.totalOrders) * 100).toFixed(1)
    : 0;

  const metricsData = [
    {
      label: 'Total Products',
      value: metrics.totalProducts,
      subValue: `${metrics.activeProducts} active`,
      icon: '📦',
      color: 'from-blue-400 to-blue-500',
    },
    {
      label: 'Total Orders',
      value: metrics.totalOrders,
      subValue: `${completionRate}% completed`,
      icon: '🛒',
      color: 'from-green-400 to-green-500',
    },
    {
      label: 'Total Revenue',
      value: formatCurrency(metrics.totalRevenue),
      subValue: `${formatCurrency(metrics.monthlyRevenue)}/month`,
      icon: '💰',
      color: 'from-purple-400 to-purple-500',
    },
    {
      label: 'Avg. Order Value',
      value: formatCurrency(metrics.averageOrderValue),
      subValue: 'per order',
      icon: '📊',
      color: 'from-orange-400 to-orange-500',
    },
    {
      label: 'Shop Rating',
      value: metrics.rating.toFixed(1),
      subValue: `${metrics.reviewCount} reviews`,
      icon: '⭐',
      color: 'from-yellow-400 to-yellow-500',
    },
    {
      label: 'Cancellation Rate',
      value: `${cancellationRate}%`,
      subValue: `${metrics.cancelledOrders} cancelled`,
      icon: '❌',
      color: 'from-red-400 to-red-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {metricsData.map((metric, index) => (
        <div
          key={index}
          className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{metric.icon}</span>
          </div>
          <p className="text-xl font-bold text-gray-900">{metric.value}</p>
          <p className="text-xs text-gray-500 mt-1">{metric.label}</p>
          <p className="text-xs text-gray-400">{metric.subValue}</p>
        </div>
      ))}
    </div>
  );
}
