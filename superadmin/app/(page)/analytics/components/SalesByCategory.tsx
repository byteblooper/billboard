'use client';

import { CategorySales } from './types';

interface SalesByCategoryProps {
  categories: CategorySales[];
}

export default function SalesByCategory({ categories }: SalesByCategoryProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `৳${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `৳${(amount / 1000).toFixed(0)}K`;
    }
    return `৳${amount.toLocaleString()}`;
  };

  const totalSales = categories.reduce((sum, cat) => sum + cat.totalSales, 0);
  const sortedCategories = [...categories].sort((a, b) => b.totalSales - a.totalSales);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Sales by Category</h3>
          <p className="text-sm text-gray-500">Revenue distribution across categories</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSales)}</p>
          <p className="text-xs text-gray-500">Total Revenue</p>
        </div>
      </div>

      {/* Visual Bars */}
      <div className="space-y-4 mb-6">
        {sortedCategories.map((category) => {
          const percentage = (category.totalSales / totalSales) * 100;
          return (
            <div key={category.id}>
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{category.icon}</span>
                  <span className="text-sm font-medium text-gray-700">{category.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-gray-900">
                    {formatCurrency(category.totalSales)}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      category.growth >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {category.growth >= 0 ? '+' : ''}
                    {category.growth}%
                  </span>
                </div>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full ${category.color} rounded-full transition-all duration-500`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Category Table */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Detailed Breakdown</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100">
                <th className="text-left py-2 font-medium">Category</th>
                <th className="text-right py-2 font-medium">Orders</th>
                <th className="text-right py-2 font-medium">Avg. Order</th>
                <th className="text-left py-2 font-medium pl-4">Top Product</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {sortedCategories.map((category) => (
                <tr key={category.id} className="text-sm">
                  <td className="py-2">
                    <span className="mr-2">{category.icon}</span>
                    {category.name}
                  </td>
                  <td className="text-right py-2 text-gray-600">
                    {category.totalOrders.toLocaleString()}
                  </td>
                  <td className="text-right py-2 text-gray-600">
                    {formatCurrency(category.avgOrderValue)}
                  </td>
                  <td className="py-2 pl-4 text-gray-600 truncate max-w-[150px]">
                    {category.topProduct}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
