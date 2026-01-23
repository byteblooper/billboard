'use client';

import { PerformanceMetrics as PerformanceMetricsType } from './types';

interface PerformanceMetricsProps {
  metrics: PerformanceMetricsType;
}

export default function PerformanceMetrics({ metrics }: PerformanceMetricsProps) {
  const getPerformanceColor = (value: number, type: 'rating' | 'rate' | 'time') => {
    if (type === 'rating') {
      if (value >= 4.5) return 'text-green-600';
      if (value >= 4.0) return 'text-yellow-600';
      if (value >= 3.0) return 'text-orange-600';
      return 'text-red-600';
    }
    if (type === 'rate') {
      if (value <= 2) return 'text-green-600';
      if (value <= 5) return 'text-yellow-600';
      if (value <= 10) return 'text-orange-600';
      return 'text-red-600';
    }
    if (type === 'time') {
      if (value <= 1) return 'text-green-600';
      if (value <= 3) return 'text-yellow-600';
      if (value <= 6) return 'text-orange-600';
      return 'text-red-600';
    }
    return 'text-gray-600';
  };

  const getDeliveryColor = (value: number) => {
    if (value >= 95) return 'text-green-600';
    if (value >= 90) return 'text-yellow-600';
    if (value >= 80) return 'text-orange-600';
    return 'text-red-600';
  };

  const completionRate =
    metrics.totalOrders > 0
      ? ((metrics.completedOrders / metrics.totalOrders) * 100).toFixed(1)
      : 0;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        Performance Metrics
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Rating */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="flex items-center justify-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                className={`w-4 h-4 ${star <= Math.round(metrics.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <p className={`text-2xl font-bold ${getPerformanceColor(metrics.rating, 'rating')}`}>
            {metrics.rating.toFixed(1)}
          </p>
          <p className="text-xs text-gray-500 mt-1">{metrics.reviewCount} reviews</p>
          <p className="text-sm text-gray-600 font-medium">Rating</p>
        </div>

        {/* Orders */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">📦</div>
          <p className="text-2xl font-bold text-gray-900">{metrics.totalOrders}</p>
          <p className="text-xs text-gray-500 mt-1">{metrics.completedOrders} completed</p>
          <p className="text-sm text-gray-600 font-medium">Total Orders</p>
        </div>

        {/* Completion Rate */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">✅</div>
          <p className={`text-2xl font-bold ${getDeliveryColor(Number(completionRate))}`}>
            {completionRate}%
          </p>
          <p className="text-xs text-gray-500 mt-1">{metrics.cancelledOrders} cancelled</p>
          <p className="text-sm text-gray-600 font-medium">Completion Rate</p>
        </div>

        {/* Cancellation Rate */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">❌</div>
          <p className={`text-2xl font-bold ${getPerformanceColor(metrics.cancellationRate, 'rate')}`}>
            {metrics.cancellationRate}%
          </p>
          <p className="text-sm text-gray-600 font-medium mt-2">Cancellation Rate</p>
        </div>

        {/* Response Time */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">⏱️</div>
          <p className={`text-2xl font-bold ${getPerformanceColor(metrics.responseTime, 'time')}`}>
            {metrics.responseTime}h
          </p>
          <p className="text-sm text-gray-600 font-medium mt-2">Avg. Response</p>
        </div>

        {/* On-Time Delivery */}
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-3xl mb-2">🚚</div>
          <p className={`text-2xl font-bold ${getDeliveryColor(metrics.onTimeDeliveryRate)}`}>
            {metrics.onTimeDeliveryRate}%
          </p>
          <p className="text-sm text-gray-600 font-medium mt-2">On-Time Delivery</p>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="mt-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Performance Summary</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Overall Rating</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-500 h-2 rounded-full"
                style={{ width: `${(metrics.rating / 5) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900">{metrics.rating}/5</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">On-Time Delivery</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${metrics.onTimeDeliveryRate}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900">{metrics.onTimeDeliveryRate}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Order Completion</span>
            <div className="flex-1 mx-4 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${completionRate}%` }}
              />
            </div>
            <span className="text-sm font-medium text-gray-900">{completionRate}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
