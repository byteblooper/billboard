'use client';

import { ShopStatus, ShopCategory } from './types';

interface StatusBadgeProps {
  status: ShopStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<ShopStatus, { label: string; bgColor: string; textColor: string; dotColor: string }> = {
  pending: {
    label: 'Pending',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    dotColor: 'bg-yellow-500',
  },
  approved: {
    label: 'Approved',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    dotColor: 'bg-green-500',
  },
  rejected: {
    label: 'Rejected',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    dotColor: 'bg-red-500',
  },
  suspended: {
    label: 'Suspended',
    bgColor: 'bg-gray-100',
    textColor: 'text-gray-700',
    dotColor: 'bg-gray-500',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

export default function ShopStatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bgColor} ${config.textColor} ${sizeClasses[size]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor}`} />
      <span>{config.label}</span>
    </span>
  );
}

interface CategoryBadgeProps {
  category: ShopCategory;
  size?: 'sm' | 'md';
}

const categoryConfig: Record<ShopCategory, { label: string; icon: string; color: string }> = {
  electronics: { label: 'Electronics', icon: '💻', color: 'bg-blue-100 text-blue-700' },
  fashion: { label: 'Fashion', icon: '👗', color: 'bg-pink-100 text-pink-700' },
  grocery: { label: 'Grocery', icon: '🛒', color: 'bg-green-100 text-green-700' },
  beauty: { label: 'Beauty', icon: '💄', color: 'bg-purple-100 text-purple-700' },
  sports: { label: 'Sports', icon: '⚽', color: 'bg-cyan-100 text-cyan-700' },
  home: { label: 'Home', icon: '🏠', color: 'bg-orange-100 text-orange-700' },
  books: { label: 'Books', icon: '📚', color: 'bg-indigo-100 text-indigo-700' },
  other: { label: 'Other', icon: '📦', color: 'bg-gray-100 text-gray-700' },
};

export function CategoryBadge({ category, size = 'md' }: CategoryBadgeProps) {
  const config = categoryConfig[category];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${config.color} ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
      }`}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
