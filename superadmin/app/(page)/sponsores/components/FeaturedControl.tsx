'use client';

import { FeaturedItem, FeaturedStatus } from './types';

interface FeaturedControlProps {
  items: FeaturedItem[];
  onApprove: (itemId: string) => void;
  onReject: (itemId: string) => void;
  onRemove: (itemId: string) => void;
  onReorder: (itemId: string, direction: 'up' | 'down') => void;
}

const statusConfig: Record<FeaturedStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  approved: { label: 'Approved', color: 'bg-blue-100 text-blue-700' },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-700' },
  active: { label: 'Active', color: 'bg-green-100 text-green-700' },
  expired: { label: 'Expired', color: 'bg-gray-100 text-gray-700' },
};

export default function FeaturedControl({ items, onApprove, onReject, onRemove, onReorder }: FeaturedControlProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-BD', {
      month: 'short',
      day: 'numeric',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getCTR = (clicks: number, impressions: number) => {
    if (impressions === 0) return '0%';
    return ((clicks / impressions) * 100).toFixed(2) + '%';
  };

  const sellers = items.filter(i => i.type === 'seller');
  const products = items.filter(i => i.type === 'product');

  const renderItemCard = (item: FeaturedItem, index: number, total: number) => {
    const status = statusConfig[item.status];

    return (
      <div
        key={item.id}
        className={`bg-white rounded-xl border border-gray-200 p-4 ${
          item.status === 'pending' ? 'border-yellow-300 bg-yellow-50/30' : ''
        }`}
      >
        <div className="flex items-start gap-4">
          {/* Image */}
          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
            <img
              src={item.itemImage}
              alt={item.itemName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${status.color}`}>
                    {status.label}
                  </span>
                  {!item.feePaid && (
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700">
                      Unpaid
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-gray-900 mt-1">{item.itemName}</h4>
                {item.sellerName && (
                  <p className="text-sm text-gray-500">by {item.sellerName}</p>
                )}
              </div>

              {/* Reorder Buttons */}
              <div className="flex items-center gap-1">
                <span className="text-xs text-gray-500 mr-2">#{item.position}</span>
                <button
                  onClick={() => onReorder(item.id, 'up')}
                  disabled={index === 0}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => onReorder(item.id, 'down')}
                  disabled={index === total - 1}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-3">
              <div>
                <p className="text-xs text-gray-500">Fee</p>
                <p className="text-sm font-semibold text-gray-900">{formatCurrency(item.fee)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Impressions</p>
                <p className="text-sm font-semibold text-gray-900">{item.impressions.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Clicks</p>
                <p className="text-sm font-semibold text-gray-900">{item.clicks.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">CTR</p>
                <p className="text-sm font-semibold text-green-600">{getCTR(item.clicks, item.impressions)}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Period</p>
                <p className="text-sm text-gray-600">{formatDate(item.startDate)} - {formatDate(item.endDate)}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              {item.status === 'pending' && (
                <>
                  <button
                    onClick={() => onApprove(item.id)}
                    className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => onReject(item.id)}
                    className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
                  >
                    ✕ Reject
                  </button>
                </>
              )}
              {['active', 'approved'].includes(item.status) && (
                <button
                  onClick={() => onRemove(item.id)}
                  className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Featured Sellers */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-xl">🏪</span>
            Featured Sellers
          </h3>
          <span className="text-sm text-gray-500">
            {sellers.filter(s => s.status === 'active').length} active
          </span>
        </div>
        <div className="space-y-4">
          {sellers.length > 0 ? (
            sellers.map((item, index) => renderItemCard(item, index, sellers.length))
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl">
              No featured sellers
            </div>
          )}
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <span className="text-xl">📦</span>
            Featured Products
          </h3>
          <span className="text-sm text-gray-500">
            {products.filter(p => p.status === 'active').length} active
          </span>
        </div>
        <div className="space-y-4">
          {products.length > 0 ? (
            products.map((item, index) => renderItemCard(item, index, products.length))
          ) : (
            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-xl">
              No featured products
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
