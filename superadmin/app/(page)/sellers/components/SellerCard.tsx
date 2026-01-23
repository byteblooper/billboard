'use client';

import { Seller } from './types';
import SellerTierBadge from './SellerTierBadge';
import StatusBadge from './StatusBadge';

interface SellerCardProps {
  seller: Seller;
  onView: (seller: Seller) => void;
  onApprove: (seller: Seller) => void;
  onReject: (seller: Seller) => void;
  onSuspend: (seller: Seller) => void;
  onPenalty: (seller: Seller) => void;
}

export default function SellerCard({
  seller,
  onView,
  onApprove,
  onReject,
  onSuspend,
  onPenalty,
}: SellerCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{seller.name}</h3>
              <p className="text-sm text-gray-500">{seller.businessInfo.businessName}</p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <StatusBadge status={seller.status} size="sm" />
            <SellerTierBadge tier={seller.tier} size="sm" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">{seller.performance.rating.toFixed(1)}</p>
            <p className="text-xs text-gray-500">Rating</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">{seller.performance.totalOrders}</p>
            <p className="text-xs text-gray-500">Orders</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-lg font-semibold text-gray-900">{seller.performance.cancellationRate}%</p>
            <p className="text-xs text-gray-500">Cancel Rate</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="flex items-center justify-between py-3 border-t border-gray-100">
          <span className="text-sm text-gray-500">Total Revenue</span>
          <span className="font-semibold text-gray-900">{formatCurrency(seller.totalRevenue)}</span>
        </div>

        {/* Active Penalties Warning */}
        {seller.penalties.some(p => p.isActive) && (
          <div className="mt-2 p-2 bg-red-50 rounded-lg flex items-center gap-2">
            <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="text-xs text-red-700">
              {seller.penalties.filter(p => p.isActive).length} active penalty(s)
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onView(seller)}
            className="flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            View Details
          </button>
          <div className="relative group">
            <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
            <div className="absolute right-0 bottom-full mb-1 w-40 py-1 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              {seller.status === 'unverified' && (
                <button
                  onClick={() => onApprove(seller)}
                  className="w-full px-4 py-2 text-sm text-left text-green-600 hover:bg-green-50"
                >
                  ✓ Approve
                </button>
              )}
              {seller.status === 'unverified' && (
                <button
                  onClick={() => onReject(seller)}
                  className="w-full px-4 py-2 text-sm text-left text-gray-600 hover:bg-gray-50"
                >
                  ✕ Reject
                </button>
              )}
              {seller.status !== 'suspended' && seller.status !== 'rejected' && (
                <button
                  onClick={() => onSuspend(seller)}
                  className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                >
                  ⊘ Suspend
                </button>
              )}
              <button
                onClick={() => onPenalty(seller)}
                className="w-full px-4 py-2 text-sm text-left text-orange-600 hover:bg-orange-50"
              >
                ⚠ Add Penalty
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
