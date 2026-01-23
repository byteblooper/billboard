'use client';

import React, { useState } from 'react';
import { Alert, AlertSeverity } from './types';

interface AlertsCardProps {
  alerts: Alert[];
  onMarkAsRead?: (id: string) => void;
  onDismiss?: (id: string) => void;
  onTakeAction?: (alert: Alert) => void;
}

export const AlertsCard: React.FC<AlertsCardProps> = ({
  alerts,
  onMarkAsRead,
  onDismiss,
  onTakeAction,
}) => {
  const [showAll, setShowAll] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<AlertSeverity | 'all'>('all');

  const filteredAlerts = alerts
    .filter((alert) => {
      if (severityFilter === 'all') return true;
      return alert.severity === severityFilter;
    })
    .sort((a, b) => {
      // Sort by: unread first, then by severity (critical > warning > info), then by time
      if (a.isRead !== b.isRead) return a.isRead ? 1 : -1;
      const severityOrder = { critical: 0, warning: 1, info: 2 };
      if (severityOrder[a.severity] !== severityOrder[b.severity]) {
        return severityOrder[a.severity] - severityOrder[b.severity];
      }
      return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

  const displayedAlerts = showAll ? filteredAlerts : filteredAlerts.slice(0, 5);
  const unreadCount = alerts.filter((a) => !a.isRead).length;
  const criticalCount = alerts.filter((a) => a.severity === 'critical' && !a.isRead).length;

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const getSeverityConfig = (severity: AlertSeverity) => {
    const configs = {
      critical: {
        bg: 'bg-red-50 border-red-200',
        icon: 'bg-red-500',
        iconContent: (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        ),
        titleColor: 'text-red-800',
        badge: 'bg-red-100 text-red-700',
      },
      warning: {
        bg: 'bg-yellow-50 border-yellow-200',
        icon: 'bg-yellow-500',
        iconContent: (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        titleColor: 'text-yellow-800',
        badge: 'bg-yellow-100 text-yellow-700',
      },
      info: {
        bg: 'bg-blue-50 border-blue-200',
        icon: 'bg-blue-500',
        iconContent: (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
        titleColor: 'text-blue-800',
        badge: 'bg-blue-100 text-blue-700',
      },
    };
    return configs[severity];
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-800">Real-time Alerts</h3>
          {unreadCount > 0 && (
            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {unreadCount} new
            </span>
          )}
          {criticalCount > 0 && (
            <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium animate-pulse">
              {criticalCount} critical
            </span>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
      </div>

      {/* Severity Filter */}
      <div className="flex gap-2 mb-4">
        {(['all', 'critical', 'warning', 'info'] as const).map((severity) => {
          const count = severity === 'all' 
            ? alerts.length 
            : alerts.filter((a) => a.severity === severity).length;
          
          return (
            <button
              key={severity}
              onClick={() => setSeverityFilter(severity)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                severityFilter === severity
                  ? severity === 'critical' 
                    ? 'bg-red-500 text-white'
                    : severity === 'warning'
                    ? 'bg-yellow-500 text-white'
                    : severity === 'info'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {severity === 'all' ? 'All' : severity.charAt(0).toUpperCase() + severity.slice(1)}
              <span className="ml-1 opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Alerts List */}
      <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
        {displayedAlerts.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <p>No alerts</p>
          </div>
        ) : (
          displayedAlerts.map((alert) => {
            const config = getSeverityConfig(alert.severity);
            return (
              <div
                key={alert.id}
                className={`p-4 border rounded-xl transition-all ${config.bg} ${
                  !alert.isRead ? 'ring-2 ring-offset-2 ring-gray-200' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${config.icon} flex items-center justify-center flex-shrink-0`}>
                    {config.iconContent}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-medium ${config.titleColor} truncate`}>{alert.title}</h4>
                      {!alert.isRead && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{alert.message}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span>{alert.source}</span>
                      <span>•</span>
                      <span>{formatTime(alert.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200/50">
                  {!alert.isRead && (
                    <button
                      onClick={() => onMarkAsRead?.(alert.id)}
                      className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-colors"
                    >
                      Mark as Read
                    </button>
                  )}
                  {alert.actionRequired && (
                    <button
                      onClick={() => onTakeAction?.(alert)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                        alert.severity === 'critical'
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-gray-800 text-white hover:bg-gray-900'
                      }`}
                    >
                      Take Action
                    </button>
                  )}
                  <button
                    onClick={() => onDismiss?.(alert.id)}
                    className="ml-auto px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-lg transition-colors"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Show More/Less */}
      {filteredAlerts.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
        >
          {showAll ? 'Show Less' : `Show All (${filteredAlerts.length})`}
        </button>
      )}
    </div>
  );
};
