'use client';

import { Campaign, CampaignStatus, CampaignType } from './types';

interface CampaignListProps {
  campaigns: Campaign[];
  onEdit: (campaign: Campaign) => void;
  onToggleStatus: (campaignId: string, newStatus: CampaignStatus) => void;
}

const campaignTypeConfig: Record<CampaignType, { label: string; icon: string; color: string }> = {
  flash_sale: { label: 'Flash Sale', icon: '⚡', color: 'bg-yellow-100 text-yellow-800' },
  mega_sale: { label: 'Mega Sale', icon: '🔥', color: 'bg-red-100 text-red-800' },
  seasonal: { label: 'Seasonal', icon: '🌸', color: 'bg-pink-100 text-pink-800' },
  clearance: { label: 'Clearance', icon: '🏷️', color: 'bg-orange-100 text-orange-800' },
  bundle: { label: 'Bundle', icon: '📦', color: 'bg-purple-100 text-purple-800' },
};

const statusConfig: Record<CampaignStatus, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700' },
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-700' },
  active: { label: 'Active', color: 'bg-green-100 text-green-700' },
  paused: { label: 'Paused', color: 'bg-yellow-100 text-yellow-700' },
  ended: { label: 'Ended', color: 'bg-gray-100 text-gray-600' },
  cancelled: { label: 'Cancelled', color: 'bg-red-100 text-red-700' },
};

export default function CampaignList({ campaigns, onEdit, onToggleStatus }: CampaignListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      notation: 'compact',
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-BD', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTimeRemaining = (endDate: string) => {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end.getTime() - now.getTime();
    if (diff <= 0) return 'Ended';
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 0) return `${days}d ${hours}h left`;
    return `${hours}h left`;
  };

  return (
    <div className="space-y-4">
      {campaigns.map((campaign) => {
        const typeConfig = campaignTypeConfig[campaign.type];
        const status = statusConfig[campaign.status];
        const budgetUsage = campaign.budget ? (campaign.usedBudget / campaign.budget) * 100 : 0;

        return (
          <div
            key={campaign.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="flex">
              {/* Campaign Image */}
              {campaign.bannerImage && (
                <div className="w-48 h-36 flex-shrink-0">
                  <img
                    src={campaign.bannerImage}
                    alt={campaign.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Campaign Details */}
              <div className="flex-1 p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${typeConfig.color}`}>
                        {typeConfig.icon} {typeConfig.label}
                      </span>
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${status.color}`}>
                        {status.label}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                    <p className="text-sm text-gray-500 mt-0.5">{campaign.description}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    {campaign.status === 'active' && (
                      <button
                        onClick={() => onToggleStatus(campaign.id, 'paused')}
                        className="px-3 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-50 rounded-lg hover:bg-yellow-100"
                      >
                        Pause
                      </button>
                    )}
                    {campaign.status === 'paused' && (
                      <button
                        onClick={() => onToggleStatus(campaign.id, 'active')}
                        className="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100"
                      >
                        Resume
                      </button>
                    )}
                    <button
                      onClick={() => onEdit(campaign)}
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Campaign Stats */}
                <div className="grid grid-cols-4 gap-4 mt-3">
                  <div>
                    <p className="text-xs text-gray-500">Discount</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {campaign.discountPercentage ? `${campaign.discountPercentage}%` : formatCurrency(campaign.discountAmount || 0)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Orders</p>
                    <p className="text-sm font-semibold text-gray-900">{campaign.totalOrders.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Revenue</p>
                    <p className="text-sm font-semibold text-gray-900">{formatCurrency(campaign.totalRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Duration</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {campaign.status === 'active' ? getTimeRemaining(campaign.endDate) : `${formatDate(campaign.startDate)} - ${formatDate(campaign.endDate)}`}
                    </p>
                  </div>
                </div>

                {/* Budget Progress */}
                {campaign.budget && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">Budget Usage</span>
                      <span className="font-medium text-gray-700">
                        {formatCurrency(campaign.usedBudget)} / {formatCurrency(campaign.budget)}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${budgetUsage > 80 ? 'bg-red-500' : budgetUsage > 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                        style={{ width: `${Math.min(budgetUsage, 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
