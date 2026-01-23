'use client';

import { useState, useMemo } from 'react';
import { Order, OrderStatus, PaymentMethod } from './components/types';
import { demoOrders, calculatePaymentAnalytics } from './components/demoData';
import {
  OrderTable,
  OrderDetailModal,
  StatusOverrideModal,
  PaymentAnalyticsCard,
  ProblematicOrders,
  RefundControlPanel,
} from './components';

type ViewTab = 'all' | 'problematic' | 'refunds' | 'analytics';
type FilterStatus = 'all' | OrderStatus;
type FilterPayment = 'all' | PaymentMethod;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>(demoOrders);
  const [activeTab, setActiveTab] = useState<ViewTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [paymentFilter, setPaymentFilter] = useState<FilterPayment>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);

  const analytics = useMemo(() => calculatePaymentAnalytics(orders), [orders]);

  const filteredOrders = useMemo(() => {
    let result = [...orders];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.customerName.toLowerCase().includes(query) ||
          order.shopName.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((order) => order.status === statusFilter);
    }

    if (paymentFilter !== 'all') {
      result = result.filter((order) => order.paymentMethod === paymentFilter);
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders, searchQuery, statusFilter, paymentFilter]);

  const orderStats = useMemo(() => ({
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => ['confirmed', 'processing', 'shipped'].includes(o.status)).length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    problematic: orders.filter(o => ['failed', 'stuck', 'frozen'].includes(o.status)).length,
  }), [orders]);

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailModalOpen(true);
  };

  const handleOverrideStatus = (order: Order) => {
    setSelectedOrder(order);
    setIsOverrideModalOpen(true);
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus, note: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: newStatus,
              notes: note,
              updatedAt: new Date().toISOString(),
              timeline: [
                ...o.timeline,
                {
                  id: `t${Date.now()}`,
                  status: newStatus,
                  description: `Status changed to ${newStatus} - ${note}`,
                  timestamp: new Date().toISOString(),
                  actor: 'Admin',
                },
              ],
            }
          : o
      )
    );
  };

  const handleProcessRefund = (orderId: string, amount: number, note: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              status: 'refunded' as OrderStatus,
              paymentStatus: 'refunded' as const,
              refundRequest: o.refundRequest
                ? { ...o.refundRequest, status: 'completed' as const, processedAt: new Date().toISOString(), processedBy: 'Admin', notes: note }
                : { id: `ref-${Date.now()}`, orderId, amount, reason: note, status: 'completed' as const, requestedAt: new Date().toISOString(), processedAt: new Date().toISOString(), processedBy: 'Admin' },
              timeline: [
                ...o.timeline,
                {
                  id: `t${Date.now()}`,
                  status: 'refunded',
                  description: `Refund processed - ${note}`,
                  timestamp: new Date().toISOString(),
                  actor: 'Admin',
                },
              ],
            }
          : o
      )
    );
  };

  const handleApproveRefund = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order?.refundRequest) {
      handleProcessRefund(orderId, order.refundRequest.amount, 'Refund approved');
    }
  };

  const handleRejectRefund = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && o.refundRequest
          ? {
              ...o,
              refundRequest: { ...o.refundRequest, status: 'rejected' as const, processedAt: new Date().toISOString(), processedBy: 'Admin' },
            }
          : o
      )
    );
  };

  const handleApproveReturn = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && o.returnRequest
          ? {
              ...o,
              returnRequest: { ...o.returnRequest, status: 'approved' as const, processedAt: new Date().toISOString() },
            }
          : o
      )
    );
  };

  const handleRejectReturn = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId && o.returnRequest
          ? {
              ...o,
              returnRequest: { ...o.returnRequest, status: 'rejected' as const, processedAt: new Date().toISOString() },
            }
          : o
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
          <p className="text-sm text-gray-500 mt-1">
            Monitor orders, manage refunds, and track payment analytics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">📦</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
                <p className="text-sm text-gray-500">Total Orders</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">⏳</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{orderStats.pending}</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">🚚</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{orderStats.processing}</p>
                <p className="text-sm text-gray-500">In Progress</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{orderStats.delivered}</p>
                <p className="text-sm text-gray-500">Delivered</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-xl">⚠️</span>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{orderStats.problematic}</p>
                <p className="text-sm text-gray-500">Needs Attention</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl border border-gray-200 mb-6">
          <div className="flex border-b border-gray-200">
            {[
              { id: 'all', label: 'All Orders', icon: '📋' },
              { id: 'problematic', label: 'Problematic', icon: '⚠️', badge: orderStats.problematic },
              { id: 'refunds', label: 'Refunds & Returns', icon: '💸' },
              { id: 'analytics', label: 'Payment Analytics', icon: '📊' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as ViewTab)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-indigo-600 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
                {tab.badge && tab.badge > 0 && (
                  <span className="ml-1 px-2 py-0.5 bg-red-100 text-red-600 text-xs font-medium rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Filters for All Orders tab */}
          {activeTab === 'all' && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search orders, customers, shops..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                  <option value="frozen">Frozen</option>
                  <option value="failed">Failed</option>
                  <option value="stuck">Stuck</option>
                </select>
                <select
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value as FilterPayment)}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                >
                  <option value="all">All Payments</option>
                  <option value="cod">💵 COD</option>
                  <option value="bkash">📱 bKash</option>
                  <option value="nagad">📲 Nagad</option>
                  <option value="card">💳 Card</option>
                  <option value="bank_transfer">🏦 Bank</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        {activeTab === 'all' && (
          <div className="bg-white rounded-xl border border-gray-200">
            <OrderTable
              orders={filteredOrders}
              onViewOrder={handleViewOrder}
              onOverrideStatus={handleOverrideStatus}
            />
          </div>
        )}

        {activeTab === 'problematic' && (
          <ProblematicOrders
            orders={orders}
            onViewOrder={handleViewOrder}
            onResolve={handleOverrideStatus}
          />
        )}

        {activeTab === 'refunds' && (
          <RefundControlPanel
            orders={orders}
            onApproveRefund={handleApproveRefund}
            onRejectRefund={handleRejectRefund}
            onApproveReturn={handleApproveReturn}
            onRejectReturn={handleRejectReturn}
          />
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PaymentAnalyticsCard analytics={analytics} />
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-700">
                    <span className="font-medium">COD vs Online:</span> {analytics.codPercentage.toFixed(1)}% of orders are COD.
                    {analytics.codPercentage > 50 && ' Consider incentivizing online payments for better cash flow.'}
                  </p>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <span className="font-medium">Average Order Value:</span> ৳{analytics.averageOrderValue.toLocaleString()}.
                    {analytics.averageOrderValue > 10000 ? ' High-value orders indicate premium customer base.' : ' Consider upselling strategies.'}
                  </p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-700">
                    <span className="font-medium">Mobile Payments:</span> bKash and Nagad combined account for {
                      ((analytics.paymentMethodBreakdown.find(p => p.method === 'bkash')?.count || 0) + 
                       (analytics.paymentMethodBreakdown.find(p => p.method === 'nagad')?.count || 0)) / analytics.totalOrders * 100
                    }% of transactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        <OrderDetailModal
          order={selectedOrder}
          isOpen={isDetailModalOpen}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedOrder(null);
          }}
          onStatusChange={handleStatusChange}
          onProcessRefund={handleProcessRefund}
        />

        <StatusOverrideModal
          order={selectedOrder}
          isOpen={isOverrideModalOpen}
          onClose={() => {
            setIsOverrideModalOpen(false);
            setSelectedOrder(null);
          }}
          onConfirm={handleStatusChange}
        />
      </div>
    </div>
  );
}
