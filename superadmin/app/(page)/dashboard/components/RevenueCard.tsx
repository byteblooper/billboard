'use client';

import React from 'react';
import { RevenueStats } from './types';

interface RevenueCardProps {
  stats: RevenueStats;
}

export const RevenueCard: React.FC<RevenueCardProps> = ({ stats }) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `৳${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `৳${(amount / 100000).toFixed(2)} Lac`;
    }
    return `৳${amount.toLocaleString('en-BD')}`;
  };

  const revenueBreakdown = [
    { 
      label: 'Today', 
      value: stats.todayRevenue, 
      icon: '📅',
      color: 'from-emerald-50 to-emerald-100',
      textColor: 'text-emerald-700'
    },
    { 
      label: 'This Week', 
      value: stats.weeklyRevenue, 
      icon: '📈',
      color: 'from-blue-50 to-blue-100',
      textColor: 'text-blue-700'
    },
    { 
      label: 'This Month', 
      value: stats.monthlyRevenue, 
      icon: '🗓️',
      color: 'from-purple-50 to-purple-100',
      textColor: 'text-purple-700'
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Platform Revenue</h3>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>

      {/* Main Revenue Display */}
      <div className="mb-6 p-5 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl text-white">
        <p className="text-sm text-emerald-100 mb-1">Total Platform Revenue</p>
        <div className="flex items-end gap-3">
          <p className="text-4xl font-bold">{formatCurrency(stats.platformRevenue)}</p>
          <span className={`flex items-center gap-1 text-sm font-medium mb-1 ${stats.revenueGrowth >= 0 ? 'text-emerald-200' : 'text-red-200'}`}>
            {stats.revenueGrowth >= 0 ? '↑' : '↓'} {Math.abs(stats.revenueGrowth)}%
          </span>
        </div>
        <div className="mt-3 flex items-center gap-2 text-sm text-emerald-100">
          <span>Commission Rate:</span>
          <span className="px-2 py-1 bg-white/20 rounded-full font-medium">{stats.commissionRate}%</span>
        </div>
      </div>

      {/* Revenue Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Revenue Breakdown</h4>
        {revenueBreakdown.map((item) => (
          <div 
            key={item.label} 
            className={`p-4 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-between`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium text-gray-700">{item.label}</span>
            </div>
            <span className={`text-lg font-bold ${item.textColor}`}>{formatCurrency(item.value)}</span>
          </div>
        ))}
      </div>

      {/* GMV vs Revenue Comparison */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">GMV Total</span>
          <span className="font-semibold text-gray-800">{formatCurrency(stats.gmv)}</span>
        </div>
        <div className="mt-2">
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
              style={{ width: `${stats.commissionRate}%` }}
            ></div>
          </div>
          <p className="mt-1 text-xs text-gray-500 text-right">
            {stats.commissionRate}% of GMV as platform revenue
          </p>
        </div>
      </div>
    </div>
  );
};
