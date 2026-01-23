'use client';

import React from 'react';

interface QuickStatsRowProps {
  stats: {
    activeUsers: number;
    activeSessions: number;
    avgResponseTime: number;
    serverHealth: number;
  };
}

export const QuickStatsRow: React.FC<QuickStatsRowProps> = ({ stats }) => {
  const quickStats = [
    {
      label: 'Active Users',
      value: stats.activeUsers.toLocaleString(),
      icon: (
        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      live: true,
    },
    {
      label: 'Active Sessions',
      value: stats.activeSessions.toLocaleString(),
      icon: (
        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      live: true,
    },
    {
      label: 'Avg Response Time',
      value: `${stats.avgResponseTime}ms`,
      icon: (
        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-purple-500 to-violet-600',
      bgColor: 'bg-purple-50',
      live: false,
    },
    {
      label: 'Server Health',
      value: `${stats.serverHealth}%`,
      icon: (
        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50',
      live: false,
      isHealth: true,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {quickStats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center gap-4"
        >
          <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
            {stat.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-gray-800">{stat.value}</p>
              {stat.live && (
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs text-green-600 font-medium">Live</span>
                </span>
              )}
              {stat.isHealth && (
                <span className={`w-2 h-2 rounded-full ${
                  stats.serverHealth >= 90 ? 'bg-green-500' : 
                  stats.serverHealth >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                }`}></span>
              )}
            </div>
            <p className="text-sm text-gray-500">{stat.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
