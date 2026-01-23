'use client';

import { Order } from './types';
import OrderStatusBadge from './OrderStatusBadge';

interface ProblematicOrdersProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onResolve: (order: Order) => void;
}

export default function ProblematicOrders({ orders, onViewOrder, onResolve }: ProblematicOrdersProps) {
  const failedOrders = orders.filter(o => o.status === 'failed');
  const stuckOrders = orders.filter(o => o.status === 'stuck');
  const frozenOrders = orders.filter(o => o.status === 'frozen');

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
    });
  };

  const renderOrderGroup = (
    title: string,
    groupOrders: Order[],
    icon: string,
    bgColor: string,
    borderColor: string,
    textColor: string
  ) => {
    if (groupOrders.length === 0) return null;

    return (
      <div className={`${bgColor} ${borderColor} border rounded-lg p-4`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h4 className={`font-medium ${textColor}`}>{title}</h4>
          </div>
          <span className={`text-sm font-medium ${textColor}`}>{groupOrders.length} orders</span>
        </div>
        <div className="space-y-2">
          {groupOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{order.orderNumber}</p>
                  <p className="text-xs text-gray-500">
                    {order.customerName} • {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-900 text-sm">{formatCurrency(order.total)}</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => onViewOrder(order)}
                    className="p-1.5 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                    title="View"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onResolve(order)}
                    className="p-1.5 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
                    title="Resolve"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const totalProblematic = failedOrders.length + stuckOrders.length + frozenOrders.length;

  if (totalProblematic === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <svg className="w-12 h-12 mx-auto text-green-500 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-medium text-green-800">All Clear!</h3>
        <p className="text-sm text-green-600 mt-1">No problematic orders at the moment</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-semibold text-gray-900">Orders Requiring Attention</h3>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
          {totalProblematic} orders
        </span>
      </div>

      <div className="space-y-4">
        {renderOrderGroup(
          'Failed Orders',
          failedOrders,
          '❌',
          'bg-red-50',
          'border-red-200',
          'text-red-700'
        )}
        {renderOrderGroup(
          'Stuck Orders',
          stuckOrders,
          '⚠️',
          'bg-amber-50',
          'border-amber-200',
          'text-amber-700'
        )}
        {renderOrderGroup(
          'Frozen Orders',
          frozenOrders,
          '🧊',
          'bg-cyan-50',
          'border-cyan-200',
          'text-cyan-700'
        )}
      </div>
    </div>
  );
}
