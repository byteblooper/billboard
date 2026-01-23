'use client';

import { Shop } from './types';
import ShopStatusBadge, { CategoryBadge } from './ShopStatusBadge';
import Link from 'next/link';

interface ShopCardProps {
  shop: Shop;
  onSuspend: (shop: Shop) => void;
  onActivate: (shop: Shop) => void;
}

export default function ShopCard({ shop, onSuspend, onActivate }: ShopCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      notation: 'compact',
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all overflow-hidden">
      {/* Banner */}
      <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        {shop.banner && (
          <img
            src={shop.banner}
            alt={shop.name}
            className="w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute -bottom-6 left-4">
          <img
            src={shop.logo}
            alt={shop.name}
            className="w-14 h-14 rounded-xl border-4 border-white shadow-sm"
          />
        </div>
        <div className="absolute top-2 right-2">
          <ShopStatusBadge status={shop.status} size="sm" />
        </div>
      </div>

      <div className="pt-8 pb-5 px-5">
        {/* Shop Info */}
        <div className="mb-3">
          <h3 className="font-semibold text-gray-900">{shop.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">by {shop.sellerName}</p>
        </div>

        <div className="mb-4">
          <CategoryBadge category={shop.category} size="sm" />
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-900">{shop.metrics.totalProducts}</p>
            <p className="text-xs text-gray-500">Products</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-900">{shop.metrics.totalOrders}</p>
            <p className="text-xs text-gray-500">Orders</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded-lg">
            <p className="text-sm font-semibold text-gray-900">{shop.metrics.rating.toFixed(1)}</p>
            <p className="text-xs text-gray-500">Rating</p>
          </div>
        </div>

        {/* Revenue */}
        <div className="flex items-center justify-between py-2 border-t border-gray-100">
          <span className="text-sm text-gray-500">Monthly Revenue</span>
          <span className="font-semibold text-green-600">{formatCurrency(shop.metrics.monthlyRevenue)}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-4">
          <Link
            href={`/shops/${shop.id}`}
            className="flex-1 px-4 py-2 text-sm font-medium text-center text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            View Details
          </Link>
          {shop.status === 'approved' && (
            <button
              onClick={() => onSuspend(shop)}
              className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
            >
              Suspend
            </button>
          )}
          {shop.status === 'suspended' && (
            <button
              onClick={() => onActivate(shop)}
              className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              Activate
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
