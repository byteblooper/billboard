'use client';

import { SellerTier } from './types';

interface SellerTierBadgeProps {
  tier: SellerTier;
  size?: 'sm' | 'md' | 'lg';
}

const tierConfig: Record<SellerTier, { label: string; bgColor: string; textColor: string; icon: string }> = {
  bronze: {
    label: 'Bronze',
    bgColor: 'bg-amber-100',
    textColor: 'text-amber-800',
    icon: '🥉',
  },
  silver: {
    label: 'Silver',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    icon: '🥈',
  },
  gold: {
    label: 'Gold',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
    icon: '🥇',
  },
  platinum: {
    label: 'Platinum',
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    icon: '💎',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export default function SellerTierBadge({ tier, size = 'md' }: SellerTierBadgeProps) {
  const config = tierConfig[tier];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${config.bgColor} ${config.textColor} ${sizeClasses[size]}`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
