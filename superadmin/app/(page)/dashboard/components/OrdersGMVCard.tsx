'use client';

import React from 'react';
import { OrderStats } from './types';

interface OrdersGMVCardProps {
  stats: OrderStats;
  gmv: number;
  gmvGrowth: number;
}

export const OrdersGMVCard: React.FC<OrdersGMVCardProps> = ({ stats, gmv, gmvGrowth }) => {
  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `৳${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `৳${(amount / 100000).toFixed(2)} Lac`;
    }
    return `৳${amount.toLocaleString('en-BD')}`;
  };

  const orderStatusData = [
    { label: 'Pending', value: stats.pending, color: 'bg-yellow-500' },
    { label: 'Processing', value: stats.processing, color: 'bg-blue-500' },
    { label: 'Shipped', value: stats.shipped, color: 'bg-purple-500' },
    { label: 'Delivered', value: stats.delivered, color: 'bg-green-500' },
    { label: 'Cancelled', value: stats.cancelled, color: 'bg-red-500' },
  ];

  const totalActiveOrders = stats.pending + stats.processing + stats.shipped;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Orders & GMV</h3>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </div>

      {/* GMV Display */}
      <div className="mb-6 p-4 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-xl">
        <p className="text-sm text-gray-600 mb-1">Gross Merchandise Value (GMV)</p>
        <div className="flex items-end gap-3">
          <p className="text-3xl font-bold text-purple-700">{formatCurrency(gmv)}</p>
          <span className={`flex items-center gap-1 text-sm font-medium mb-1 ${gmvGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {gmvGrowth >= 0 ? '↑' : '↓'} {Math.abs(gmvGrowth)}%
          </span>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-2xl font-bold text-gray-800">{stats.total.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Orders</p>
        </div>
        <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold text-green-600">{stats.todayOrders}</p>
            <span className="text-xs px-2 py-1 bg-green-200 text-green-800 rounded-full font-medium">
              +{stats.todayGrowth}%
            </span>
          </div>
          <p className="text-sm text-gray-600">Today&apos;s Orders</p>
        </div>
      </div>

      {/* Active Orders Summary */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
        <span className="text-sm font-medium text-blue-800">Active Orders</span>
        <span className="text-lg font-bold text-blue-600">{totalActiveOrders.toLocaleString()}</span>
      </div>

      {/* Order Status Breakdown */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">Status Breakdown</h4>
        {orderStatusData.map((status) => (
          <div key={status.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${status.color}`}></div>
              <span className="text-sm text-gray-600">{status.label}</span>
            </div>
            <span className="font-medium text-gray-800">{status.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
