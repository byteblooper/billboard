'use client';

import { Order } from './types';
import OrderStatusBadge, { PaymentMethodBadge } from './OrderStatusBadge';
import Link from 'next/link';

interface OrderTableProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onOverrideStatus: (order: Order) => void;
}

export default function OrderTable({ orders, onViewOrder, onOverrideStatus }: OrderTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (orders.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <p className="text-gray-500">No orders found</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Shop</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-50 transition-colors">
              <td className="py-3 px-4">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{order.orderNumber}</p>
                  {(order.status === 'stuck' || order.status === 'failed' || order.status === 'frozen') && (
                    <span className="text-xs text-red-500">⚠️ Needs attention</span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4">
                <div>
                  <p className="text-sm text-gray-900">{order.customerName}</p>
                  <p className="text-xs text-gray-500">{order.customerPhone}</p>
                </div>
              </td>
              <td className="py-3 px-4">
                <div>
                  <p className="text-sm text-gray-900">{order.shopName}</p>
                  <p className="text-xs text-gray-500">{order.sellerName}</p>
                </div>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1">
                  {order.items.slice(0, 2).map((item, idx) => (
                    <img
                      key={idx}
                      src={item.productImage}
                      alt={item.productName}
                      className="w-8 h-8 rounded object-cover"
                      title={item.productName}
                    />
                  ))}
                  {order.items.length > 2 && (
                    <span className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                      +{order.items.length - 2}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4">
                <span className="font-medium text-gray-900 text-sm">{formatCurrency(order.total)}</span>
              </td>
              <td className="py-3 px-4">
                <div className="space-y-1">
                  <PaymentMethodBadge method={order.paymentMethod} size="sm" />
                  <OrderStatusBadge status={order.paymentStatus} type="payment" size="sm" />
                </div>
              </td>
              <td className="py-3 px-4">
                <OrderStatusBadge status={order.status} size="sm" />
              </td>
              <td className="py-3 px-4">
                <span className="text-sm text-gray-500">{formatDate(order.createdAt)}</span>
              </td>
              <td className="py-3 px-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onViewOrder(order)}
                    className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                    title="View Details"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onOverrideStatus(order)}
                    className="p-1.5 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
                    title="Override Status"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
