'use client';

import { SalesData } from './types';

interface SalesChartProps {
  data: SalesData[];
}

export default function SalesChart({ data }: SalesChartProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      notation: 'compact',
    }).format(amount);
  };

  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const maxOrders = Math.max(...data.map((d) => d.orders));

  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalOrders = data.reduce((sum, d) => sum + d.orders, 0);
  const avgRevenue = totalRevenue / data.length;

  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <p className="text-gray-500">No sales data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
          <p className="text-sm text-green-600 mb-1">Total Revenue (7 days)</p>
          <p className="text-2xl font-bold text-green-700">{formatCurrency(totalRevenue)}</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
          <p className="text-sm text-blue-600 mb-1">Total Orders</p>
          <p className="text-2xl font-bold text-blue-700">{totalOrders}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
          <p className="text-sm text-purple-600 mb-1">Avg. Daily Revenue</p>
          <p className="text-2xl font-bold text-purple-700">{formatCurrency(avgRevenue)}</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-4">Revenue & Orders (Last 7 Days)</h4>
        <div className="space-y-3">
          {data.map((item, index) => {
            const revenuePercent = (item.revenue / maxRevenue) * 100;
            const orderPercent = (item.orders / maxOrders) * 100;
            const date = new Date(item.date).toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });

            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>{date}</span>
                  <span>{formatCurrency(item.revenue)} • {item.orders} orders</span>
                </div>
                <div className="flex gap-1 h-6">
                  <div
                    className="bg-gradient-to-r from-green-400 to-green-500 rounded transition-all"
                    style={{ width: `${revenuePercent}%` }}
                    title={`Revenue: ${formatCurrency(item.revenue)}`}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-gradient-to-r from-green-400 to-green-500" />
            <span className="text-xs text-gray-500">Revenue</span>
          </div>
        </div>
      </div>
    </div>
  );
}
