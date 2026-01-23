'use client';

import React from 'react';
import { SellerStats, TrendDirection } from './types';

interface SellerStatsCardProps {
  stats: SellerStats;
}

const TrendIndicator: React.FC<{ value: number; trend: TrendDirection }> = ({ value, trend }) => {
  const colors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500',
  };

  const icons = {
    up: '↑',
    down: '↓',
    neutral: '→',
  };

  return (
    <span className={`flex items-center gap-1 text-sm font-medium ${colors[trend]}`}>
      {icons[trend]} {Math.abs(value)}%
    </span>
  );
};

export const SellerStatsCard: React.FC<SellerStatsCardProps> = ({ stats }) => {
  const activePercentage = ((stats.active / stats.total) * 100).toFixed(1);
  const weeklyGrowth = ((stats.newThisWeek / (stats.total - stats.newThisWeek)) * 100).toFixed(1);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Seller Overview</h3>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
          <p className="text-3xl font-bold text-blue-600">{stats.total.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">Total Sellers</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
          <p className="text-3xl font-bold text-green-600">{stats.active.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">Active</p>
        </div>
        <div className="text-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
          <p className="text-3xl font-bold text-gray-600">{stats.inactive.toLocaleString()}</p>
          <p className="text-sm text-gray-600 mt-1">Inactive</p>
        </div>
      </div>

      {/* New Sellers */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-medium text-gray-700 uppercase tracking-wide">New Registrations</h4>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">Today</span>
          <span className="font-semibold text-gray-800 flex items-center gap-2">
            +{stats.newToday}
            <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Live</span>
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">This Week</span>
          <span className="font-semibold text-gray-800 flex items-center gap-2">
            +{stats.newThisWeek}
            <TrendIndicator value={parseFloat(weeklyGrowth)} trend="up" />
          </span>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <span className="text-gray-600">This Month</span>
          <span className="font-semibold text-gray-800">+{stats.newThisMonth}</span>
        </div>
      </div>

      {/* Pending & Active Rate */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">{stats.pendingApproval} pending approval</span>
        </div>
        <div className="text-sm">
          <span className="text-gray-600">Active Rate: </span>
          <span className="font-semibold text-green-600">{activePercentage}%</span>
        </div>
      </div>
    </div>
  );
};
