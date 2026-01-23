'use client';

import { Coupon, CouponType, CouponScope } from './types';

interface CouponListProps {
  coupons: Coupon[];
  onEdit: (coupon: Coupon) => void;
  onToggle: (couponId: string) => void;
  onDelete: (couponId: string) => void;
}

const couponTypeConfig: Record<CouponType, { label: string; icon: string; color: string }> = {
  percentage: { label: 'Percentage', icon: '%', color: 'bg-green-100 text-green-700' },
  fixed: { label: 'Fixed Amount', icon: '৳', color: 'bg-blue-100 text-blue-700' },
  free_shipping: { label: 'Free Shipping', icon: '🚚', color: 'bg-purple-100 text-purple-700' },
  buy_x_get_y: { label: 'Buy X Get Y', icon: '🎁', color: 'bg-orange-100 text-orange-700' },
};

const scopeConfig: Record<CouponScope, { label: string; color: string }> = {
  global: { label: 'Global', color: 'bg-indigo-100 text-indigo-700' },
  seller: { label: 'Seller', color: 'bg-cyan-100 text-cyan-700' },
  category: { label: 'Category', color: 'bg-pink-100 text-pink-700' },
  product: { label: 'Product', color: 'bg-yellow-100 text-yellow-700' },
};

export default function CouponList({ coupons, onEdit, onToggle, onDelete }: CouponListProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-BD', {
      month: 'short',
      day: 'numeric',
    });
  };

  const isExpired = (endDate: string) => {
    return new Date(endDate) < new Date();
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Coupon Code
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type & Scope
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Value
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Usage
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Validity
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {coupons.map((coupon) => {
            const typeConfig = couponTypeConfig[coupon.type];
            const scope = scopeConfig[coupon.scope];
            const expired = isExpired(coupon.endDate);
            const usagePercentage = (coupon.usedCount / coupon.usageLimit) * 100;

            return (
              <tr key={coupon.id} className={`hover:bg-gray-50 ${expired || !coupon.isActive ? 'opacity-60' : ''}`}>
                <td className="px-4 py-4">
                  <div>
                    <code className="px-2 py-1 bg-gray-100 text-sm font-mono font-semibold text-gray-900 rounded">
                      {coupon.code}
                    </code>
                    {coupon.description && (
                      <p className="text-xs text-gray-500 mt-1">{coupon.description}</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="flex flex-col gap-1">
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full w-fit ${typeConfig.color}`}>
                      {typeConfig.icon} {typeConfig.label}
                    </span>
                    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full w-fit ${scope.color}`}>
                      {scope.label}
                      {coupon.sellerName && `: ${coupon.sellerName}`}
                      {coupon.categoryName && `: ${coupon.categoryName}`}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">
                      {coupon.type === 'percentage' ? `${coupon.value}% off` : 
                       coupon.type === 'fixed' ? `৳${coupon.value} off` :
                       coupon.type === 'free_shipping' ? 'Free Shipping' :
                       `Buy ${coupon.value}, Get 1`}
                    </p>
                    {coupon.minPurchase > 0 && (
                      <p className="text-xs text-gray-500">Min: ৳{coupon.minPurchase}</p>
                    )}
                    {coupon.maxDiscount && (
                      <p className="text-xs text-gray-500">Max: ৳{coupon.maxDiscount}</p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {coupon.usedCount.toLocaleString()} / {coupon.usageLimit.toLocaleString()}
                    </p>
                    <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1">
                      <div
                        className={`h-full rounded-full ${usagePercentage >= 90 ? 'bg-red-500' : usagePercentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{coupon.perUserLimit}/user</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div className="text-sm text-gray-600">
                    <p>{formatDate(coupon.startDate)} - {formatDate(coupon.endDate)}</p>
                    {expired && (
                      <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-full bg-red-100 text-red-700 mt-1">
                        Expired
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <button
                    onClick={() => onToggle(coupon.id)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      coupon.isActive ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                    disabled={expired}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        coupon.isActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </td>
                <td className="px-4 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(coupon)}
                      className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(coupon.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
