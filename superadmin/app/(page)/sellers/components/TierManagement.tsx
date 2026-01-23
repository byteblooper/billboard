'use client';

import { Seller, SellerTier } from './types';
import SellerTierBadge from './SellerTierBadge';

interface TierManagementProps {
  seller: Seller;
  onChangeTier: (newTier: SellerTier) => void;
}

const tierRequirements: Record<SellerTier, { minOrders: number; minRating: number; maxCancellation: number; minRevenue: number }> = {
  bronze: { minOrders: 0, minRating: 0, maxCancellation: 100, minRevenue: 0 },
  silver: { minOrders: 100, minRating: 4.0, maxCancellation: 10, minRevenue: 100000 },
  gold: { minOrders: 500, minRating: 4.5, maxCancellation: 5, minRevenue: 500000 },
  platinum: { minOrders: 1000, minRating: 4.7, maxCancellation: 2, minRevenue: 2000000 },
};

const tierBenefits: Record<SellerTier, string[]> = {
  bronze: [
    'Basic seller dashboard',
    'Standard support',
    'Up to 100 product listings',
  ],
  silver: [
    'Priority support',
    'Featured in category pages',
    'Up to 500 product listings',
    '5% reduced commission',
  ],
  gold: [
    '24/7 dedicated support',
    'Homepage featured products',
    'Unlimited product listings',
    '10% reduced commission',
    'Early access to promotions',
  ],
  platinum: [
    'Personal account manager',
    'Premium placement in search',
    'Unlimited listings + analytics',
    '15% reduced commission',
    'Exclusive promotional events',
    'Custom marketing support',
  ],
};

export default function TierManagement({ seller, onChangeTier }: TierManagementProps) {
  const tiers: SellerTier[] = ['bronze', 'silver', 'gold', 'platinum'];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      notation: 'compact',
    }).format(amount);
  };

  const checkEligibility = (tier: SellerTier) => {
    const req = tierRequirements[tier];
    return (
      seller.performance.totalOrders >= req.minOrders &&
      seller.performance.rating >= req.minRating &&
      seller.performance.cancellationRate <= req.maxCancellation &&
      seller.totalRevenue >= req.minRevenue
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
          />
        </svg>
        Seller Tier Management
      </h3>

      {/* Current Tier */}
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Current Tier</p>
            <div className="mt-1">
              <SellerTierBadge tier={seller.tier} size="lg" />
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Seller Since</p>
            <p className="font-medium text-gray-900">
              {new Date(seller.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {tiers.map((tier) => {
          const isCurrentTier = seller.tier === tier;
          const isEligible = checkEligibility(tier);
          const req = tierRequirements[tier];

          return (
            <div
              key={tier}
              className={`p-4 rounded-lg border-2 transition-all ${
                isCurrentTier
                  ? 'border-indigo-500 bg-indigo-50'
                  : isEligible
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div className="text-center mb-3">
                <SellerTierBadge tier={tier} size="md" />
              </div>

              <div className="space-y-1 text-xs text-gray-600 mb-3">
                <p>
                  Orders: {seller.performance.totalOrders}/{req.minOrders}
                  {seller.performance.totalOrders >= req.minOrders ? ' ✓' : ''}
                </p>
                <p>
                  Rating: {seller.performance.rating.toFixed(1)}/{req.minRating}
                  {seller.performance.rating >= req.minRating ? ' ✓' : ''}
                </p>
                <p>
                  Cancel: {seller.performance.cancellationRate}%/{req.maxCancellation}%
                  {seller.performance.cancellationRate <= req.maxCancellation ? ' ✓' : ''}
                </p>
                <p>
                  Revenue: {formatCurrency(seller.totalRevenue)}/{formatCurrency(req.minRevenue)}
                  {seller.totalRevenue >= req.minRevenue ? ' ✓' : ''}
                </p>
              </div>

              {isCurrentTier ? (
                <span className="block text-center text-xs font-medium text-indigo-600 py-1.5 bg-indigo-100 rounded">
                  Current Tier
                </span>
              ) : (
                <button
                  onClick={() => onChangeTier(tier)}
                  className={`w-full text-xs font-medium py-1.5 rounded transition-colors ${
                    isEligible
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                  }`}
                >
                  {isEligible ? 'Upgrade' : 'Set Tier'}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Current Tier Benefits */}
      <div className="p-4 bg-white rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">
          {seller.tier.charAt(0).toUpperCase() + seller.tier.slice(1)} Tier Benefits
        </h4>
        <ul className="space-y-2">
          {tierBenefits[seller.tier].map((benefit, index) => (
            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {benefit}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
