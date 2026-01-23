'use client';

import { SellerRanking } from './types';

interface SellerRankingsProps {
  sellers: SellerRanking[];
}

const tierConfig = {
  platinum: { label: 'Platinum', color: 'bg-gradient-to-r from-slate-600 to-slate-800 text-white', icon: '💎' },
  gold: { label: 'Gold', color: 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white', icon: '🥇' },
  silver: { label: 'Silver', color: 'bg-gradient-to-r from-gray-300 to-gray-500 text-white', icon: '🥈' },
  bronze: { label: 'Bronze', color: 'bg-gradient-to-r from-orange-400 to-orange-600 text-white', icon: '🥉' },
};

export default function SellerRankings({ sellers }: SellerRankingsProps) {
  const formatCurrency = (amount: number) => {
    if (amount >= 1000000) {
      return `৳${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `৳${(amount / 1000).toFixed(0)}K`;
    }
    return `৳${amount.toLocaleString()}`;
  };

  const getRankChange = (current: number, previous: number) => {
    const diff = previous - current;
    if (diff > 0) return { icon: '↑', color: 'text-green-600', text: `+${diff}` };
    if (diff < 0) return { icon: '↓', color: 'text-red-600', text: `${diff}` };
    return { icon: '—', color: 'text-gray-400', text: '0' };
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Seller Performance Rankings</h3>
          <p className="text-sm text-gray-500">Top performing sellers by revenue</p>
        </div>
        <div className="flex items-center gap-2">
          {Object.entries(tierConfig).map(([key, config]) => (
            <span
              key={key}
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${config.color}`}
            >
              {config.icon} {config.label}
            </span>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-xs text-gray-500 border-b border-gray-200">
              <th className="text-left py-3 font-medium w-16">Rank</th>
              <th className="text-left py-3 font-medium">Seller</th>
              <th className="text-right py-3 font-medium">Sales</th>
              <th className="text-right py-3 font-medium">Orders</th>
              <th className="text-center py-3 font-medium">Rating</th>
              <th className="text-right py-3 font-medium">Growth</th>
              <th className="text-right py-3 font-medium">Conv. Rate</th>
              <th className="text-center py-3 font-medium">Tier</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sellers.map((seller) => {
              const rankChange = getRankChange(seller.rank, seller.previousRank);
              const tier = tierConfig[seller.tier];

              return (
                <tr key={seller.id} className="hover:bg-gray-50">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
                          seller.rank === 1
                            ? 'bg-yellow-100 text-yellow-700'
                            : seller.rank === 2
                            ? 'bg-gray-100 text-gray-700'
                            : seller.rank === 3
                            ? 'bg-orange-100 text-orange-700'
                            : 'bg-gray-50 text-gray-600'
                        }`}
                      >
                        {seller.rank}
                      </span>
                      <span className={`text-xs font-medium ${rankChange.color}`}>
                        {rankChange.icon}
                      </span>
                    </div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      {seller.avatar ? (
                        <img
                          src={seller.avatar}
                          alt={seller.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                          {seller.name.charAt(0)}
                        </div>
                      )}
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{seller.name}</p>
                        <p className="text-xs text-gray-500">{seller.shopName}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <span className="font-semibold text-gray-900">{formatCurrency(seller.totalSales)}</span>
                  </td>
                  <td className="py-3 text-right text-sm text-gray-600">
                    {seller.totalOrders.toLocaleString()}
                  </td>
                  <td className="py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-sm">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium text-gray-900">{seller.rating}</span>
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <span
                      className={`text-sm font-medium ${
                        seller.growth >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {seller.growth >= 0 ? '+' : ''}
                      {seller.growth}%
                    </span>
                  </td>
                  <td className="py-3 text-right text-sm text-gray-600">
                    {seller.conversionRate}%
                  </td>
                  <td className="py-3 text-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${tier.color}`}>
                      {tier.icon}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
