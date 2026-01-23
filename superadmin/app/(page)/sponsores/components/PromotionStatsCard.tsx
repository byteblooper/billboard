'use client';

import { PromotionStats } from './types';

interface PromotionStatsCardProps {
  stats: PromotionStats;
}

export default function PromotionStatsCard({ stats }: PromotionStatsCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      notation: 'compact',
    }).format(amount);
  };

  const statItems = [
    {
      label: 'Active Campaigns',
      value: stats.activeCampaigns,
      total: stats.totalCampaigns,
      icon: '🎯',
      color: 'bg-indigo-500',
      bgColor: 'bg-indigo-50',
    },
    {
      label: 'Active Coupons',
      value: stats.activeCoupons,
      total: stats.totalCoupons,
      icon: '🎟️',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Active Banners',
      value: stats.activeBanners,
      total: stats.totalBanners,
      icon: '🖼️',
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Featured Sellers',
      value: stats.featuredSellers,
      icon: '🏪',
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
    },
    {
      label: 'Featured Products',
      value: stats.featuredProducts,
      icon: '⭐',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-50',
    },
    {
      label: 'Pending Notifications',
      value: stats.pendingNotifications,
      icon: '📢',
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
    },
  ];

  return (
    <div className="grid grid-cols-6 gap-4 mb-6">
      {statItems.map((item) => (
        <div key={item.label} className={`${item.bgColor} rounded-xl p-4`}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 ${item.color} rounded-lg flex items-center justify-center`}>
              <span className="text-xl">{item.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {item.value}
                {item.total !== undefined && (
                  <span className="text-sm font-normal text-gray-500">/{item.total}</span>
                )}
              </p>
              <p className="text-xs text-gray-600">{item.label}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Summary Cards */}
      <div className="col-span-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-indigo-100 text-sm">Total Coupon Usage</p>
            <p className="text-3xl font-bold mt-1">{stats.totalCouponUsage.toLocaleString()}</p>
            <p className="text-sm text-indigo-200 mt-2">Coupons redeemed all time</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-4xl">🎫</span>
          </div>
        </div>
      </div>

      <div className="col-span-3 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-100 text-sm">Total Discount Given</p>
            <p className="text-3xl font-bold mt-1">{formatCurrency(stats.totalDiscountGiven)}</p>
            <p className="text-sm text-green-200 mt-2">Campaign budget utilized</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-4xl">💰</span>
          </div>
        </div>
      </div>
    </div>
  );
}
