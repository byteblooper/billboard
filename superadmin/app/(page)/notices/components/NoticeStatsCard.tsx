'use client';

import { NoticeStats } from './types';

interface NoticeStatsCardProps {
  stats: NoticeStats;
}

export default function NoticeStatsCard({ stats }: NoticeStatsCardProps) {
  const statItems = [
    {
      label: 'Total Notices',
      value: stats.totalNotices,
      icon: '📋',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
    },
    {
      label: 'Sent',
      value: stats.sentNotices,
      icon: '✅',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Scheduled',
      value: stats.scheduledNotices,
      icon: '🕐',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Drafts',
      value: stats.draftNotices,
      icon: '📝',
      color: 'from-gray-500 to-gray-600',
      bgColor: 'bg-gray-50',
    },
    {
      label: 'Avg. Read Rate',
      value: `${stats.avgReadRate.toFixed(1)}%`,
      icon: '👁️',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Total Recipients',
      value: stats.totalRecipients.toLocaleString(),
      icon: '👥',
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
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
          <p className="text-2xl font-bold text-gray-900">{item.value}</p>
          <p className="text-xs text-gray-600 mt-1">{item.label}</p>
        </div>
      ))}
    </div>
  );
}
