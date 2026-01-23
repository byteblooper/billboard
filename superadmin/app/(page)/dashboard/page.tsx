'use client';

import React, { useState } from 'react';
import {
  SellerStatsCard,
  OrdersGMVCard,
  RevenueCard,
  PendingApprovalsCard,
  DisputesCard,
  AlertsCard,
  QuickStatsRow,
  RecentActivityCard,
  demoRecentActivities,
  demoDashboardData,
  demoPendingApprovals,
  demoDisputes,
  demoAlerts,
  PendingApproval,
  Dispute,
  Alert,
  DisputeStatus,
} from './components';

export default function DashboardPage() {
  const [approvals, setApprovals] = useState(demoPendingApprovals);
  const [disputes, setDisputes] = useState(demoDisputes);
  const [alerts, setAlerts] = useState(demoAlerts);

  // Quick stats for the top row
  const quickStats = {
    activeUsers: 3456,
    activeSessions: 1289,
    avgResponseTime: 145,
    serverHealth: 98,
  };

  // Handlers for pending approvals
  const handleApprove = (id: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    // In real app, would call API
  };

  const handleReject = (id: string) => {
    setApprovals((prev) => prev.filter((a) => a.id !== id));
    // In real app, would call API
  };

  const handleViewApprovalDetails = (approval: PendingApproval) => {
    console.log('View approval details:', approval);
    // Would open a modal in real app
  };

  // Handlers for disputes
  const handleViewDisputeDetails = (dispute: Dispute) => {
    console.log('View dispute details:', dispute);
    // Would open a modal in real app
  };

  const handleUpdateDisputeStatus = (id: string, status: DisputeStatus) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status } : d))
    );
  };

  // Handlers for alerts
  const handleMarkAlertAsRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
  };

  const handleDismissAlert = (id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  };

  const handleTakeAlertAction = (alert: Alert) => {
    console.log('Taking action on alert:', alert);
    // Would navigate or open modal based on alert type
  };

  // Get current date for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  const currentDate = new Date().toLocaleDateString('en-BD', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{getGreeting()}, Admin</h1>
            <p className="text-gray-500 mt-1">{currentDate}</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export Report
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-sm font-medium text-white hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Data
            </button>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div className="mb-6">
        <QuickStatsRow stats={quickStats} />
      </div>

      {/* Main Stats Cards - Top Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <SellerStatsCard stats={demoDashboardData.sellerStats} />
        <OrdersGMVCard
          stats={demoDashboardData.orderStats}
          gmv={demoDashboardData.revenueStats.gmv}
          gmvGrowth={demoDashboardData.revenueStats.gmvGrowth}
        />
        <RevenueCard stats={demoDashboardData.revenueStats} />
      </div>

      {/* Middle Section - Approvals and Disputes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <PendingApprovalsCard
          approvals={approvals}
          onApprove={handleApprove}
          onReject={handleReject}
          onViewDetails={handleViewApprovalDetails}
        />
        <DisputesCard
          disputes={disputes}
          onViewDetails={handleViewDisputeDetails}
          onUpdateStatus={handleUpdateDisputeStatus}
        />
      </div>

      {/* Bottom Section - Alerts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AlertsCard
          alerts={alerts}
          onMarkAsRead={handleMarkAlertAsRead}
          onDismiss={handleDismissAlert}
          onTakeAction={handleTakeAlertAction}
        />
        <RecentActivityCard activities={demoRecentActivities} />
      </div>

  
      
    </div>
  );
}
