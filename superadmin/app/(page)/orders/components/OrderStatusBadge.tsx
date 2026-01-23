'use client';

import { OrderStatus, PaymentMethod, PaymentStatus, RefundStatus, ReturnStatus } from './types';

interface StatusBadgeProps {
  status: OrderStatus | PaymentStatus | RefundStatus | ReturnStatus;
  type?: 'order' | 'payment' | 'refund' | 'return';
  size?: 'sm' | 'md';
}

const orderStatusConfig: Record<OrderStatus, { label: string; bg: string; text: string; dot: string }> = {
  pending: { label: 'Pending', bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  confirmed: { label: 'Confirmed', bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-500' },
  processing: { label: 'Processing', bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-500' },
  shipped: { label: 'Shipped', bg: 'bg-purple-50', text: 'text-purple-700', dot: 'bg-purple-500' },
  delivered: { label: 'Delivered', bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  cancelled: { label: 'Cancelled', bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-500' },
  refunded: { label: 'Refunded', bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  frozen: { label: 'Frozen', bg: 'bg-cyan-50', text: 'text-cyan-700', dot: 'bg-cyan-500' },
  failed: { label: 'Failed', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  stuck: { label: 'Stuck', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500 animate-pulse' },
};

const paymentStatusConfig: Record<PaymentStatus, { label: string; bg: string; text: string; dot: string }> = {
  pending: { label: 'Pending', bg: 'bg-yellow-50', text: 'text-yellow-700', dot: 'bg-yellow-500' },
  paid: { label: 'Paid', bg: 'bg-green-50', text: 'text-green-700', dot: 'bg-green-500' },
  failed: { label: 'Failed', bg: 'bg-red-50', text: 'text-red-700', dot: 'bg-red-500' },
  refunded: { label: 'Refunded', bg: 'bg-orange-50', text: 'text-orange-700', dot: 'bg-orange-500' },
  partially_refunded: { label: 'Partial Refund', bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-500' },
};

export default function OrderStatusBadge({ status, type = 'order', size = 'md' }: StatusBadgeProps) {
  const config = type === 'payment' 
    ? paymentStatusConfig[status as PaymentStatus] 
    : orderStatusConfig[status as OrderStatus];

  if (!config) return null;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${config.bg} ${config.text} ${
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

interface PaymentMethodBadgeProps {
  method: PaymentMethod;
  size?: 'sm' | 'md';
}

const paymentMethodConfig: Record<PaymentMethod, { label: string; icon: string; color: string }> = {
  cod: { label: 'COD', icon: '💵', color: 'bg-green-100 text-green-700' },
  bkash: { label: 'bKash', icon: '📱', color: 'bg-pink-100 text-pink-700' },
  nagad: { label: 'Nagad', icon: '📲', color: 'bg-orange-100 text-orange-700' },
  card: { label: 'Card', icon: '💳', color: 'bg-blue-100 text-blue-700' },
  bank_transfer: { label: 'Bank', icon: '🏦', color: 'bg-purple-100 text-purple-700' },
};

export function PaymentMethodBadge({ method, size = 'md' }: PaymentMethodBadgeProps) {
  const config = paymentMethodConfig[method];

  return (
    <span className={`inline-flex items-center gap-1 rounded-full font-medium ${config.color} ${
      size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-sm'
    }`}>
      <span>{config.icon}</span>
      {config.label}
    </span>
  );
}
