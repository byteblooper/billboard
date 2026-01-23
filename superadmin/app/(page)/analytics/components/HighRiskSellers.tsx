'use client';

import { HighRiskSeller } from './types';

interface HighRiskSellersProps {
  sellers: HighRiskSeller[];
  onViewSeller: (seller: HighRiskSeller) => void;
}

const riskLevelConfig = {
  critical: { label: 'Critical', color: 'bg-red-100 text-red-700 border-red-200', barColor: 'bg-red-500' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-700 border-orange-200', barColor: 'bg-orange-500' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', barColor: 'bg-yellow-500' },
};

export default function HighRiskSellers({ sellers, onViewSeller }: HighRiskSellersProps) {
  const criticalCount = sellers.filter((s) => s.riskLevel === 'critical').length;
  const highCount = sellers.filter((s) => s.riskLevel === 'high').length;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">High-Risk Sellers</h3>
          <p className="text-sm text-gray-500">Sellers requiring immediate attention</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 text-sm font-medium bg-red-100 text-red-700 rounded-full">
            {criticalCount} Critical
          </span>
          <span className="px-3 py-1 text-sm font-medium bg-orange-100 text-orange-700 rounded-full">
            {highCount} High
          </span>
        </div>
      </div>

      <div className="space-y-4">
        {sellers.map((seller) => {
          const riskConfig = riskLevelConfig[seller.riskLevel];

          return (
            <div
              key={seller.id}
              className={`rounded-xl border-2 ${riskConfig.color} p-4 hover:shadow-md transition-shadow cursor-pointer`}
              onClick={() => onViewSeller(seller)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {seller.avatar ? (
                    <img
                      src={seller.avatar}
                      alt={seller.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-400 to-gray-600 flex items-center justify-center text-white font-semibold">
                      {seller.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{seller.name}</p>
                    <p className="text-sm text-gray-600">{seller.shopName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Risk Score</span>
                    <span className={`text-xl font-bold ${
                      seller.riskScore >= 80 ? 'text-red-600' : seller.riskScore >= 60 ? 'text-orange-600' : 'text-yellow-600'
                    }`}>
                      {seller.riskScore}
                    </span>
                  </div>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${riskConfig.color}`}>
                    {riskConfig.label}
                  </span>
                </div>
              </div>

              {/* Risk Score Bar */}
              <div className="mb-4">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${riskConfig.barColor} rounded-full transition-all`}
                    style={{ width: `${seller.riskScore}%` }}
                  />
                </div>
              </div>

              {/* Risk Factors */}
              <div className="mb-4">
                <p className="text-xs font-medium text-gray-700 mb-2">Risk Factors:</p>
                <div className="flex flex-wrap gap-2">
                  {seller.riskFactors.map((factor, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-white rounded-lg border border-gray-200"
                    >
                      {factor}
                    </span>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className={`text-lg font-bold ${seller.salesTrend < 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {seller.salesTrend}%
                  </p>
                  <p className="text-xs text-gray-500">Sales Trend</p>
                </div>
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-red-600">{seller.complaintRate}%</p>
                  <p className="text-xs text-gray-500">Complaint Rate</p>
                </div>
                <div className="bg-white rounded-lg p-2 text-center">
                  <p className="text-lg font-bold text-orange-600">{seller.returnRate}%</p>
                  <p className="text-xs text-gray-500">Return Rate</p>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-white rounded-lg p-3 border border-gray-200">
                <p className="text-xs font-medium text-gray-700 mb-1">💡 Recommendation:</p>
                <p className="text-sm text-gray-600">{seller.recommendation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
