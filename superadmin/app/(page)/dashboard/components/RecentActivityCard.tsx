'use client';

import React from 'react';

interface RecentActivityItem {
  id: string;
  type: 'order' | 'seller' | 'dispute' | 'withdrawal' | 'product';
  title: string;
  description: string;
  timestamp: string;
  metadata?: Record<string, string | number>;
}

interface RecentActivityCardProps {
  activities: RecentActivityItem[];
  onViewAll?: () => void;
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ activities, onViewAll }) => {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getTypeConfig = (type: string) => {
    const configs: Record<string, { bg: string; icon: React.ReactNode }> = {
      order: {
        bg: 'bg-blue-100',
        icon: (
          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        ),
      },
      seller: {
        bg: 'bg-green-100',
        icon: (
          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        ),
      },
      dispute: {
        bg: 'bg-red-100',
        icon: (
          <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ),
      },
      withdrawal: {
        bg: 'bg-yellow-100',
        icon: (
          <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        ),
      },
      product: {
        bg: 'bg-purple-100',
        icon: (
          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        ),
      },
    };
    return configs[type] || configs.order;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        <button
          onClick={onViewAll}
          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
        >
          View All →
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const config = getTypeConfig(activity.type);
          return (
            <div key={activity.id} className="flex items-start gap-3">
              <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                <p className="text-xs text-gray-500 truncate">{activity.description}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{formatTime(activity.timestamp)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const demoRecentActivities: RecentActivityItem[] = [
  {
    id: 'act-1',
    type: 'order',
    title: 'New High-Value Order',
    description: 'Order #ORD-2026-046789 - ৳125,000 from Premium Electronics',
    timestamp: '2026-01-24T10:30:00Z',
  },
  {
    id: 'act-2',
    type: 'seller',
    title: 'New Seller Registration',
    description: 'Tech Solutions BD applied for seller account',
    timestamp: '2026-01-24T10:15:00Z',
  },
  {
    id: 'act-3',
    type: 'dispute',
    title: 'Dispute Escalated',
    description: 'Order #ORD-2026-044567 escalated to admin review',
    timestamp: '2026-01-24T09:45:00Z',
  },
  {
    id: 'act-4',
    type: 'withdrawal',
    title: 'Large Withdrawal Request',
    description: 'Fashion House requested ৳850,000 withdrawal',
    timestamp: '2026-01-24T09:30:00Z',
  },
  {
    id: 'act-5',
    type: 'product',
    title: 'Product Flagged',
    description: 'iPhone 15 listing flagged for authenticity review',
    timestamp: '2026-01-24T09:00:00Z',
  },
  {
    id: 'act-6',
    type: 'seller',
    title: 'Seller Tier Upgrade',
    description: 'Beauty Box upgraded to Gold tier',
    timestamp: '2026-01-24T08:30:00Z',
  },
  {
    id: 'act-7',
    type: 'order',
    title: 'Bulk Order Placed',
    description: '50 items ordered by Corporate Solutions Ltd',
    timestamp: '2026-01-24T08:00:00Z',
  },
];
