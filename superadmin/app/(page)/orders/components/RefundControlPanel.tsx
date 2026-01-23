'use client';

import { Order } from './types';
import OrderStatusBadge from './OrderStatusBadge';

interface RefundControlPanelProps {
  orders: Order[];
  onApproveRefund: (orderId: string) => void;
  onRejectRefund: (orderId: string) => void;
  onApproveReturn: (orderId: string) => void;
  onRejectReturn: (orderId: string) => void;
}

export default function RefundControlPanel({
  orders,
  onApproveRefund,
  onRejectRefund,
  onApproveReturn,
  onRejectReturn,
}: RefundControlPanelProps) {
  const pendingRefunds = orders.filter(
    o => o.refundRequest && (o.refundRequest.status === 'requested' || o.refundRequest.status === 'processing')
  );
  const pendingReturns = orders.filter(
    o => o.returnRequest && o.returnRequest.status === 'requested'
  );
  const completedRefunds = orders.filter(
    o => o.refundRequest && o.refundRequest.status === 'completed'
  );

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

  const totalPendingRefundAmount = pendingRefunds.reduce(
    (sum, o) => sum + (o.refundRequest?.amount || 0),
    0
  );

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">💸</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingRefunds.length}</p>
              <p className="text-sm text-gray-500">Pending Refunds</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">📦</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingReturns.length}</p>
              <p className="text-sm text-gray-500">Pending Returns</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalPendingRefundAmount)}</p>
              <p className="text-sm text-gray-500">Pending Amount</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <span className="text-xl">✅</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{completedRefunds.length}</p>
              <p className="text-sm text-gray-500">Completed Refunds</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Pending Refunds */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>💸</span> Pending Refund Requests
          </h3>
          {pendingRefunds.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No pending refund requests</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingRefunds.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">{order.customerName}</p>
                    </div>
                    <span className="text-lg font-bold text-orange-600">
                      {formatCurrency(order.refundRequest!.amount)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{order.refundRequest!.reason}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formatDate(order.refundRequest!.requestedAt)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onApproveRefund(order.id)}
                        className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onRejectRefund(order.id)}
                        className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pending Returns */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <span>📦</span> Pending Return Requests
          </h3>
          {pendingReturns.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No pending return requests</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingReturns.map((order) => (
                <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-gray-900">{order.orderNumber}</p>
                      <p className="text-sm text-gray-500">{order.customerName}</p>
                    </div>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">
                      {order.returnRequest!.items.length} item(s)
                    </span>
                  </div>
                  <div className="space-y-1 mb-3">
                    {order.returnRequest!.items.map((item, idx) => (
                      <p key={idx} className="text-sm text-gray-600">
                        {item.quantity}x {item.productName} - <span className="text-gray-500">{item.reason}</span>
                      </p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">
                      {formatDate(order.returnRequest!.requestedAt)}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => onApproveReturn(order.id)}
                        className="px-3 py-1.5 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => onRejectReturn(order.id)}
                        className="px-3 py-1.5 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
