'use client';

import { useState } from 'react';
import { Order, OrderStatus } from './types';
import OrderStatusBadge, { PaymentMethodBadge } from './OrderStatusBadge';

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (orderId: string, newStatus: OrderStatus, note: string) => void;
  onProcessRefund: (orderId: string, amount: number, note: string) => void;
}

export default function OrderDetailModal({
  order,
  isOpen,
  onClose,
  onStatusChange,
  onProcessRefund,
}: OrderDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'timeline' | 'refund'>('details');

  if (!isOpen || !order) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Order Details</h2>
                <p className="text-sm text-gray-500">{order.orderNumber}</p>
              </div>
              <div className="flex items-center gap-3">
                <OrderStatusBadge status={order.status} />
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mt-4">
              {[
                { id: 'details', label: 'Details' },
                { id: 'timeline', label: 'Timeline' },
                { id: 'refund', label: 'Refund/Return' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {activeTab === 'details' && (
              <div className="space-y-6">
                {/* Alert for problematic orders */}
                {(order.status === 'stuck' || order.status === 'failed' || order.status === 'frozen') && (
                  <div className={`p-4 rounded-lg ${
                    order.status === 'failed' ? 'bg-red-50 border border-red-200' :
                    order.status === 'stuck' ? 'bg-amber-50 border border-amber-200' :
                    'bg-cyan-50 border border-cyan-200'
                  }`}>
                    <div className="flex items-start gap-3">
                      <svg className={`w-5 h-5 mt-0.5 ${
                        order.status === 'failed' ? 'text-red-500' :
                        order.status === 'stuck' ? 'text-amber-500' :
                        'text-cyan-500'
                      }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                      <div>
                        <p className="font-medium text-gray-900">
                          {order.status === 'failed' ? 'Order Failed' :
                           order.status === 'stuck' ? 'Order Stuck' :
                           'Order Frozen'}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {order.failureReason || order.stuckReason || order.notes}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6">
                  {/* Customer Info */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Customer Information</h3>
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-500">Name:</span> {order.customerName}</p>
                      <p><span className="text-gray-500">Email:</span> {order.customerEmail}</p>
                      <p><span className="text-gray-500">Phone:</span> {order.customerPhone}</p>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.address}<br />
                      {order.shippingAddress.area}, {order.shippingAddress.city}<br />
                      {order.shippingAddress.zipCode}
                    </p>
                  </div>
                </div>

                {/* Shop Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Shop Information</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-900">{order.shopName}</p>
                      <p className="text-xs text-gray-500">Seller: {order.sellerName}</p>
                    </div>
                    <button className="text-sm text-indigo-600 hover:text-indigo-700">
                      View Shop →
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Order Items</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    {order.items.map((item, idx) => (
                      <div key={item.id} className={`flex items-center gap-4 p-4 ${idx !== 0 ? 'border-t border-gray-100' : ''}`}>
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.productName}</p>
                          <p className="text-xs text-gray-500">SKU: {item.sku}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">x{item.quantity}</p>
                          <p className="font-medium text-gray-900">{formatCurrency(item.totalPrice)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Payment Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Payment Summary</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="text-gray-900">{formatCurrency(order.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="text-gray-900">{formatCurrency(order.shippingCost)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Discount</span>
                        <span className="text-green-600">-{formatCurrency(order.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="font-medium text-gray-900">Total</span>
                      <span className="font-bold text-gray-900">{formatCurrency(order.total)}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-gray-500 text-sm">Payment Method</span>
                      <PaymentMethodBadge method={order.paymentMethod} size="sm" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 text-sm">Payment Status</span>
                      <OrderStatusBadge status={order.paymentStatus} type="payment" size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-4">
                <h3 className="font-medium text-gray-900">Order Timeline</h3>
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                  {order.timeline.map((event, idx) => (
                    <div key={event.id} className="relative flex items-start gap-4 pb-6">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                        idx === order.timeline.length - 1 ? 'bg-indigo-500' : 'bg-gray-300'
                      }`}>
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1 bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium text-gray-900">{event.description}</p>
                          <span className="text-xs text-gray-500">{formatDate(event.timestamp)}</span>
                        </div>
                        {event.actor && (
                          <p className="text-xs text-gray-500">By: {event.actor}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'refund' && (
              <div className="space-y-6">
                {/* Refund Request */}
                {order.refundRequest ? (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="font-medium text-orange-800 mb-3">Refund Request</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Amount</span>
                        <span className="font-medium text-gray-900">{formatCurrency(order.refundRequest.amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className={`font-medium ${
                          order.refundRequest.status === 'completed' ? 'text-green-600' :
                          order.refundRequest.status === 'rejected' ? 'text-red-600' :
                          'text-orange-600'
                        }`}>
                          {order.refundRequest.status.charAt(0).toUpperCase() + order.refundRequest.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Reason:</span>
                        <p className="text-gray-900 mt-1">{order.refundRequest.reason}</p>
                      </div>
                      {order.refundRequest.notes && (
                        <div>
                          <span className="text-gray-600">Notes:</span>
                          <p className="text-gray-900 mt-1">{order.refundRequest.notes}</p>
                        </div>
                      )}
                    </div>
                    {order.refundRequest.status === 'requested' || order.refundRequest.status === 'processing' ? (
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => onProcessRefund(order.id, order.refundRequest!.amount, 'Approved')}
                          className="flex-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700"
                        >
                          Approve Refund
                        </button>
                        <button className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700">
                          Reject Refund
                        </button>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <p className="text-gray-500">No refund request for this order</p>
                    {order.paymentStatus === 'paid' && order.status !== 'refunded' && (
                      <button
                        onClick={() => onProcessRefund(order.id, order.total, 'Admin initiated')}
                        className="mt-3 px-4 py-2 bg-orange-600 text-white text-sm font-medium rounded-lg hover:bg-orange-700"
                      >
                        Initiate Refund
                      </button>
                    )}
                  </div>
                )}

                {/* Return Request */}
                {order.returnRequest && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h3 className="font-medium text-purple-800 mb-3">Return Request</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status</span>
                        <span className="font-medium text-purple-600">
                          {order.returnRequest.status.charAt(0).toUpperCase() + order.returnRequest.status.slice(1)}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Items to return:</span>
                        <ul className="mt-2 space-y-1">
                          {order.returnRequest.items.map((item, idx) => (
                            <li key={idx} className="text-gray-900">
                              {item.quantity}x {item.productName} - {item.reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    {order.returnRequest.status === 'requested' && (
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700">
                          Approve Return
                        </button>
                        <button className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700">
                          Reject Return
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
