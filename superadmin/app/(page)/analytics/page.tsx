'use client';

import { useState } from 'react';
import {
  AnalyticsSummaryCard,
  SalesByCategory,
  SellerRankings,
  ChurnAnalysis,
  HighRiskSellers,
  ConversionFunnel,
  TimeRange,
  HighRiskSeller,
  demoCategories,
  demoSellerRankings,
  demoChurnData,
  demoChurnReasons,
  demoHighRiskSellers,
  demoFunnelData,
  demoAnalyticsSummary,
} from './components';

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');
  const [selectedRiskSeller, setSelectedRiskSeller] = useState<HighRiskSeller | null>(null);

  const timeRanges: { value: TimeRange; label: string }[] = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
    { value: 'all', label: 'All time' },
  ];

  const handleViewRiskSeller = (seller: HighRiskSeller) => {
    setSelectedRiskSeller(seller);
    // In a real app, this would open a modal or navigate to a detail page
    console.log('View seller:', seller);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-500 mt-1">
            Strategic insights for data-driven decisions
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Time Range Selector */}
          <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden">
            {timeRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value)}
                className={`px-4 py-2 text-sm font-medium transition-colors ${
                  timeRange === range.value
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button className="px-4 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <AnalyticsSummaryCard summary={demoAnalyticsSummary} />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Category */}
        <SalesByCategory categories={demoCategories} />

        {/* Conversion Funnel */}
        <ConversionFunnel data={demoFunnelData} />
      </div>

      {/* Seller Rankings - Full Width */}
      <SellerRankings sellers={demoSellerRankings} />

      {/* Churn & Risk Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Churn Analysis */}
        <ChurnAnalysis data={demoChurnData} reasons={demoChurnReasons} />

        {/* High-Risk Sellers */}
        <HighRiskSellers sellers={demoHighRiskSellers} onViewSeller={handleViewRiskSeller} />
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white">Generate Custom Report</h3>
            <p className="text-indigo-100 mt-1">
              Create detailed reports with custom date ranges and metrics
            </p>
          </div>
          <button className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-colors">
            Create Report
          </button>
        </div>
      </div>
    </div>
  );
}
