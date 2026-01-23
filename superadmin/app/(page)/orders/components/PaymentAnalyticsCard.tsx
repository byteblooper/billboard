'use client';

import { PaymentAnalytics } from './types';

interface PaymentAnalyticsCardProps {
  analytics: PaymentAnalytics;
}

export default function PaymentAnalyticsCard({ analytics }: PaymentAnalyticsCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      notation: 'compact',
    }).format(amount);
  };

  const paymentMethodLabels: Record<string, { label: string; icon: string; color: string }> = {
    cod: { label: 'Cash on Delivery', icon: '💵', color: 'bg-green-500' },
    bkash: { label: 'bKash', icon: '📱', color: 'bg-pink-500' },
    nagad: { label: 'Nagad', icon: '📲', color: 'bg-orange-500' },
    card: { label: 'Card Payment', icon: '💳', color: 'bg-blue-500' },
    bank_transfer: { label: 'Bank Transfer', icon: '🏦', color: 'bg-purple-500' },
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Analytics</h3>

      {/* COD vs Online Comparison */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💵</span>
            <span className="text-sm font-medium text-green-700">Cash on Delivery</span>
          </div>
          <p className="text-2xl font-bold text-green-800">{formatCurrency(analytics.codRevenue)}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-green-600">{analytics.codOrders} orders</span>
            <span className="text-sm font-medium text-green-700">{analytics.codPercentage.toFixed(1)}%</span>
          </div>
          <div className="mt-2 bg-green-200 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${analytics.codPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💳</span>
            <span className="text-sm font-medium text-indigo-700">Online Payment</span>
          </div>
          <p className="text-2xl font-bold text-indigo-800">{formatCurrency(analytics.onlineRevenue)}</p>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm text-indigo-600">{analytics.onlineOrders} orders</span>
            <span className="text-sm font-medium text-indigo-700">{analytics.onlinePercentage.toFixed(1)}%</span>
          </div>
          <div className="mt-2 bg-indigo-200 rounded-full h-2">
            <div
              className="bg-indigo-500 h-2 rounded-full"
              style={{ width: `${analytics.onlinePercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Payment Method Breakdown */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-4">Payment Method Breakdown</h4>
        <div className="space-y-3">
          {analytics.paymentMethodBreakdown
            .filter(pm => pm.count > 0)
            .sort((a, b) => b.revenue - a.revenue)
            .map((pm) => {
              const config = paymentMethodLabels[pm.method];
              const percentage = (pm.revenue / analytics.totalRevenue) * 100;
              return (
                <div key={pm.method} className="flex items-center gap-3">
                  <span className="text-xl w-8">{config.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">{config.label}</span>
                      <span className="text-sm text-gray-500">{pm.count} orders</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-100 rounded-full h-2">
                        <div
                          className={`${config.color} h-2 rounded-full transition-all`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600 w-16 text-right">
                        {formatCurrency(pm.revenue)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{analytics.totalOrders}</p>
          <p className="text-xs text-gray-500">Total Orders</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.totalRevenue)}</p>
          <p className="text-xs text-gray-500">Total Revenue</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(analytics.averageOrderValue)}</p>
          <p className="text-xs text-gray-500">Avg. Order Value</p>
        </div>
      </div>
    </div>
  );
}
