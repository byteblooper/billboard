'use client';

import { FunnelData } from './types';

interface ConversionFunnelProps {
  data: FunnelData;
}

export default function ConversionFunnel({ data }: ConversionFunnelProps) {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  const stages = [
    {
      name: 'Page Views',
      icon: '👁️',
      count: data.totalViews,
      color: 'bg-indigo-500',
      percentage: 100,
    },
    {
      name: 'Added to Cart',
      icon: '🛒',
      count: data.addedToCart,
      color: 'bg-blue-500',
      percentage: (data.addedToCart / data.totalViews) * 100,
    },
    {
      name: 'Checkout Started',
      icon: '💳',
      count: data.checkoutInitiated,
      color: 'bg-purple-500',
      percentage: (data.checkoutInitiated / data.totalViews) * 100,
    },
    {
      name: 'Orders Completed',
      icon: '✅',
      count: data.ordersCompleted,
      color: 'bg-green-500',
      percentage: (data.ordersCompleted / data.totalViews) * 100,
    },
  ];

  const dropoffs = [
    {
      from: 'Views',
      to: 'Cart',
      lost: data.totalViews - data.addedToCart,
      rate: ((data.totalViews - data.addedToCart) / data.totalViews) * 100,
    },
    {
      from: 'Cart',
      to: 'Checkout',
      lost: data.addedToCart - data.checkoutInitiated,
      rate: data.cartAbandonmentRate,
    },
    {
      from: 'Checkout',
      to: 'Order',
      lost: data.checkoutInitiated - data.ordersCompleted,
      rate: data.checkoutAbandonmentRate,
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Conversion Funnel</h3>
          <p className="text-sm text-gray-500">View → Cart → Checkout → Order</p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-green-600">{data.conversionRate}%</p>
          <p className="text-xs text-gray-500">Overall Conversion Rate</p>
        </div>
      </div>

      {/* Funnel Visualization */}
      <div className="mb-8">
        <div className="relative">
          {stages.map((stage, index) => {
            const widthPercentage = Math.max(stage.percentage, 20); // Minimum width for visibility
            
            return (
              <div key={index} className="mb-2">
                <div className="flex items-center gap-4">
                  {/* Stage Info */}
                  <div className="w-32 text-right">
                    <p className="text-sm font-medium text-gray-700">{stage.name}</p>
                    <p className="text-xs text-gray-500">{stage.percentage.toFixed(1)}%</p>
                  </div>
                  
                  {/* Bar */}
                  <div className="flex-1 relative">
                    <div
                      className={`h-12 ${stage.color} rounded-lg flex items-center justify-center transition-all duration-500 relative`}
                      style={{ width: `${widthPercentage}%` }}
                    >
                      <span className="text-white font-semibold flex items-center gap-2">
                        <span>{stage.icon}</span>
                        <span>{formatNumber(stage.count)}</span>
                      </span>
                    </div>
                    
                    {/* Drop-off Arrow */}
                    {index < stages.length - 1 && (
                      <div className="absolute -bottom-5 left-0 right-0 flex justify-center">
                        <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M7 10l5 5 5-5z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-indigo-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-indigo-600">
            {((data.addedToCart / data.totalViews) * 100).toFixed(1)}%
          </p>
          <p className="text-xs text-gray-600 mt-1">View to Cart Rate</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-red-600">{data.cartAbandonmentRate}%</p>
          <p className="text-xs text-gray-600 mt-1">Cart Abandonment</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 text-center">
          <p className="text-2xl font-bold text-orange-600">{data.checkoutAbandonmentRate}%</p>
          <p className="text-xs text-gray-600 mt-1">Checkout Abandonment</p>
        </div>
      </div>

      {/* Drop-off Analysis */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">Drop-off Analysis</h4>
        <div className="space-y-3">
          {dropoffs.map((dropoff, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  {dropoff.from} → {dropoff.to}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-red-600">
                    -{formatNumber(dropoff.lost)} users
                  </p>
                  <p className="text-xs text-gray-500">{dropoff.rate.toFixed(1)}% drop-off</p>
                </div>
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-red-400 rounded-full"
                    style={{ width: `${dropoff.rate}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="mt-6 bg-blue-50 rounded-xl p-4">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">💡 Insights</h4>
        <ul className="space-y-2 text-sm text-blue-700">
          <li>• Cart abandonment at {data.cartAbandonmentRate}% - Consider email reminders and limited-time offers</li>
          <li>• {formatNumber(data.totalViews - data.addedToCart)} visitors left without adding to cart - Improve product pages</li>
          <li>• Checkout abandonment at {data.checkoutAbandonmentRate}% - Simplify checkout process</li>
        </ul>
      </div>
    </div>
  );
}
