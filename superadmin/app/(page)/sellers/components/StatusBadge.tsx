'use client';

import { SellerStatus, DocumentStatus } from './types';

interface StatusBadgeProps {
  status: SellerStatus | DocumentStatus;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig: Record<SellerStatus | DocumentStatus, { label: string; bgColor: string; textColor: string; dotColor: string }> = {
  verified: {
    label: 'Verified',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    dotColor: 'bg-green-500',
  },
  unverified: {
    label: 'Unverified',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-700',
    dotColor: 'bg-yellow-500',
  },
  suspended: {
    label: 'Suspended',
    bgColor: 'bg-red-50',
    textColor: 'text-red-700',
    dotColor: 'bg-red-500',
  },
  rejected: {
    label: 'Rejected',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-700',
    dotColor: 'bg-gray-500',
  },
  pending: {
    label: 'Pending',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-700',
    dotColor: 'bg-blue-500',
  },
  approved: {
    label: 'Approved',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    dotColor: 'bg-green-500',
  },
};

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

const dotSizeClasses = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

export default function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bgColor} ${config.textColor} ${sizeClasses[size]}`}
    >
      <span className={`rounded-full ${config.dotColor} ${dotSizeClasses[size]}`} />
      <span>{config.label}</span>
    </span>
  );
}
