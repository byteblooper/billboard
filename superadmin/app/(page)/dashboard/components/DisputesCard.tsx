'use client';

import React, { useState } from 'react';
import { Dispute, DisputeStatus } from './types';

interface DisputesCardProps {
  disputes: Dispute[];
  onViewDetails?: (dispute: Dispute) => void;
  onUpdateStatus?: (id: string, status: DisputeStatus) => void;
}

export const DisputesCard: React.FC<DisputesCardProps> = ({
  disputes,
  onViewDetails,
  onUpdateStatus,
}) => {
  const [statusFilter, setStatusFilter] = useState<DisputeStatus | 'all'>('all');

  const filteredDisputes = disputes.filter((dispute) => {
    if (statusFilter === 'all') return true;
    return dispute.status === statusFilter;
  });

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString('en-BD')}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getStatusBadge = (status: DisputeStatus) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-700',
      in_progress: 'bg-blue-100 text-blue-700',
      resolved: 'bg-green-100 text-green-700',
      escalated: 'bg-red-100 text-red-700',
    };
    const labels = {
      pending: 'Pending',
      in_progress: 'In Progress',
      resolved: 'Resolved',
      escalated: 'Escalated',
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, { bg: string; emoji: string }> = {
      fraud: { bg: 'bg-red-100', emoji: '🚨' },
      quality: { bg: 'bg-orange-100', emoji: '⚠️' },
      delivery: { bg: 'bg-blue-100', emoji: '📦' },
      refund: { bg: 'bg-green-100', emoji: '💰' },
      other: { bg: 'bg-gray-100', emoji: '❓' },
    };
    const config = icons[type] || icons.other;
    return (
      <div className={`w-8 h-8 rounded-lg ${config.bg} flex items-center justify-center text-sm`}>
        {config.emoji}
      </div>
    );
  };

  const statusCounts = {
    all: disputes.length,
    pending: disputes.filter((d) => d.status === 'pending').length,
    in_progress: disputes.filter((d) => d.status === 'in_progress').length,
    escalated: disputes.filter((d) => d.status === 'escalated').length,
    resolved: disputes.filter((d) => d.status === 'resolved').length,
  };

  const totalDisputeAmount = disputes.reduce((sum, d) => sum + d.amount, 0);
  const pendingAmount = disputes
    .filter((d) => d.status === 'pending' || d.status === 'in_progress')
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-800">Disputes & Reports</h3>
          {statusCounts.escalated > 0 && (
            <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium animate-pulse">
              {statusCounts.escalated} escalated
            </span>
          )}
        </div>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-rose-600 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">Total Disputes</p>
          <p className="text-xl font-bold text-gray-800">{disputes.length}</p>
        </div>
        <div className="p-3 bg-red-50 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">Amount at Risk</p>
          <p className="text-xl font-bold text-red-600">{formatCurrency(pendingAmount)}</p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
        {(['all', 'pending', 'in_progress', 'escalated'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
              statusFilter === status
                ? 'bg-gray-800 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {status === 'all' ? 'All' : status === 'in_progress' ? 'In Progress' : status.charAt(0).toUpperCase() + status.slice(1)}
            <span className="ml-1 opacity-60">({statusCounts[status]})</span>
          </button>
        ))}
      </div>

      {/* Disputes List */}
      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2">
        {filteredDisputes.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>No disputes found</p>
          </div>
        ) : (
          filteredDisputes.map((dispute) => (
            <div
              key={dispute.id}
              className={`p-4 border rounded-xl transition-colors cursor-pointer hover:bg-gray-50 ${
                dispute.status === 'escalated' ? 'border-red-200 bg-red-50/30' : 'border-gray-100'
              }`}
              onClick={() => onViewDetails?.(dispute)}
            >
              <div className="flex items-start gap-3">
                {getTypeIcon(dispute.type)}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-800 text-sm">{dispute.orderId}</span>
                    {getStatusBadge(dispute.status)}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{dispute.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                    <span>Buyer: {dispute.buyer}</span>
                    <span>•</span>
                    <span>Seller: {dispute.seller}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-500">{formatTime(dispute.createdAt)}</span>
                    <span className="font-semibold text-red-600">{formatCurrency(dispute.amount)}</span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              {dispute.status !== 'resolved' && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  {dispute.status === 'pending' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStatus?.(dispute.id, 'in_progress');
                      }}
                      className="flex-1 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      Start Review
                    </button>
                  )}
                  {dispute.status === 'in_progress' && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateStatus?.(dispute.id, 'resolved');
                        }}
                        className="flex-1 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      >
                        Resolve
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onUpdateStatus?.(dispute.id, 'escalated');
                        }}
                        className="flex-1 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Escalate
                      </button>
                    </>
                  )}
                  {dispute.status === 'escalated' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onUpdateStatus?.(dispute.id, 'resolved');
                      }}
                      className="flex-1 px-3 py-1.5 text-sm text-green-600 hover:bg-green-50 rounded-lg transition-colors font-medium"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer Stats */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm">
        <span className="text-gray-500">Total disputed amount</span>
        <span className="font-semibold text-gray-800">{formatCurrency(totalDisputeAmount)}</span>
      </div>
    </div>
  );
};
