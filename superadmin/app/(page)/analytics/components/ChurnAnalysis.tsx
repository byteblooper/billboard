'use client';

import { ChurnData, ChurnReason } from './types';

interface ChurnAnalysisProps {
  data: ChurnData[];
  reasons: ChurnReason[];
}

export default function ChurnAnalysis({ data, reasons }: ChurnAnalysisProps) {
  const latestMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];
  const churnTrend = latestMonth.churnRate - previousMonth.churnRate;

  const totalChurned = data.reduce((sum, d) => sum + d.churnedUsers, 0);
  const avgChurnRate = data.reduce((sum, d) => sum + d.churnRate, 0) / data.length;

  const maxActiveUsers = Math.max(...data.map((d) => d.activeUsers));

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Churn Analysis</h3>
          <p className="text-sm text-gray-500">User retention and churn trends</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{avgChurnRate.toFixed(1)}%</p>
            <p className="text-xs text-gray-500">Avg. Churn Rate</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">{totalChurned.toLocaleString()}</p>
            <p className="text-xs text-gray-500">Total Churned (YTD)</p>
          </div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="mb-6">
        <div className="flex items-end justify-between h-48 gap-2 px-2">
          {data.map((month, index) => {
            const height = (month.activeUsers / maxActiveUsers) * 100;
            const churnHeight = (month.churnedUsers / month.activeUsers) * 100 * 3; // Scale for visibility

            return (
              <div
                key={index}
                className="flex-1 flex flex-col items-center group relative"
              >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block z-10">
                  <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                    <p className="font-semibold">{month.period}</p>
                    <p>Active: {month.activeUsers.toLocaleString()}</p>
                    <p>Churned: {month.churnedUsers.toLocaleString()}</p>
                    <p>Rate: {month.churnRate}%</p>
                  </div>
                </div>

                {/* Bar */}
                <div
                  className="w-full bg-indigo-100 rounded-t-lg relative transition-all hover:bg-indigo-200"
                  style={{ height: `${height}%` }}
                >
                  {/* Churn Indicator */}
                  <div
                    className="absolute bottom-0 left-0 right-0 bg-red-400 rounded-t-lg"
                    style={{ height: `${churnHeight}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2">{month.period}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-200 rounded" />
            <span className="text-xs text-gray-600">Active Users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-400 rounded" />
            <span className="text-xs text-gray-600">Churned Users</span>
          </div>
        </div>
      </div>

      {/* Monthly Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">Current Month Churn</p>
          <p className="text-lg font-bold text-gray-900">{latestMonth.churnRate}%</p>
          <p className={`text-xs ${churnTrend <= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {churnTrend <= 0 ? '↓' : '↑'} {Math.abs(churnTrend).toFixed(1)}% vs last month
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">Users Churned</p>
          <p className="text-lg font-bold text-gray-900">{latestMonth.churnedUsers.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">New Users</p>
          <p className="text-lg font-bold text-green-600">{latestMonth.newUsers.toLocaleString()}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <p className="text-xs text-gray-500">Net Growth</p>
          <p className={`text-lg font-bold ${latestMonth.netGrowth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {latestMonth.netGrowth >= 0 ? '+' : ''}{latestMonth.netGrowth.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Churn Reasons */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-4">Top Churn Reasons</h4>
        <div className="space-y-3">
          {reasons.map((reason, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-700">{reason.reason}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{reason.count.toLocaleString()} users</span>
                  <span className="text-sm font-medium text-gray-900">{reason.percentage}%</span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full"
                  style={{ width: `${reason.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
