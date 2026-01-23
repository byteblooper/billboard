'use client';

import { User, UserStatus, OrderStatus } from './types';

interface UserDetailModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (userId: string, status: UserStatus) => void;
}

const statusConfig: Record<UserStatus, { label: string; color: string }> = {
  active: { label: 'Active', color: 'bg-green-100 text-green-700' },
  inactive: { label: 'Inactive', color: 'bg-gray-100 text-gray-700' },
  suspended: { label: 'Suspended', color: 'bg-yellow-100 text-yellow-700' },
  banned: { label: 'Banned', color: 'bg-red-100 text-red-700' },
};

const orderStatusConfig: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  processing: { label: 'Processing', color: 'bg-blue-100 text-blue-700' },
  shipped: { label: 'Shipped', color: 'bg-indigo-100 text-indigo-700' },
  delivered: { label: 'Delivered', color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelled', color: 'bg-gray-100 text-gray-700' },
  refunded: { label: 'Refunded', color: 'bg-red-100 text-red-700' },
};

export default function UserDetailModal({ user, isOpen, onClose, onStatusChange }: UserDetailModalProps) {
  if (!isOpen || !user) return null;

  const status = statusConfig[user.status];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-BD', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const cartTotal = user.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const wishlistTotal = user.wishlist.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="relative bg-white rounded-2xl shadow-xl max-w-5xl w-full max-h-[95vh] overflow-y-auto">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">User Details</h2>
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

          {/* Content */}
          <div className="p-6">
            {/* User Profile Section */}
            <div className="flex items-start gap-6 mb-8 pb-6 border-b border-gray-200">
              <div className="flex-shrink-0">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                    {user.name.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${status.color}`}>
                    {status.label}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{user.phone}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">{user.address}, {user.city}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Joined</p>
                    <p className="font-medium text-gray-900">{formatDate(user.joinedAt)}</p>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total Spent</p>
                <p className="text-2xl font-bold text-indigo-600">{formatCurrency(user.totalSpent)}</p>
                <p className="text-sm text-gray-500 mt-2">{user.totalOrders} orders</p>
              </div>
            </div>

            {/* Status Actions */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Change Status</h4>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(statusConfig) as UserStatus[]).map((statusKey) => (
                  <button
                    key={statusKey}
                    onClick={() => onStatusChange(user.id, statusKey)}
                    disabled={user.status === statusKey}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                      user.status === statusKey
                        ? 'bg-indigo-600 text-white cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {statusConfig[statusKey].label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              <div className="bg-indigo-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-indigo-600">{user.totalOrders}</p>
                <p className="text-sm text-gray-600">Total Orders</p>
              </div>
              <div className="bg-green-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-green-600">{formatCurrency(user.totalSpent)}</p>
                <p className="text-sm text-gray-600">Total Spent</p>
              </div>
              <div className="bg-orange-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-orange-600">{user.cart.length}</p>
                <p className="text-sm text-gray-600">Items in Cart</p>
              </div>
              <div className="bg-pink-50 rounded-xl p-4">
                <p className="text-2xl font-bold text-pink-600">{user.wishlist.length}</p>
                <p className="text-sm text-gray-600">Wishlist Items</p>
              </div>
            </div>

            {/* Cart Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  🛒 Cart Items
                  <span className="text-sm font-normal text-gray-500">({user.cart.length} items)</span>
                </h4>
                {user.cart.length > 0 && (
                  <p className="text-sm font-medium text-indigo-600">Total: {formatCurrency(cartTotal)}</p>
                )}
              </div>
              {user.cart.length > 0 ? (
                <div className="bg-gray-50 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="text-left px-4 py-2 text-xs font-semibold text-gray-600">Product</th>
                        <th className="text-left px-4 py-2 text-xs font-semibold text-gray-600">Shop</th>
                        <th className="text-right px-4 py-2 text-xs font-semibold text-gray-600">Price</th>
                        <th className="text-center px-4 py-2 text-xs font-semibold text-gray-600">Qty</th>
                        <th className="text-right px-4 py-2 text-xs font-semibold text-gray-600">Total</th>
                        <th className="text-left px-4 py-2 text-xs font-semibold text-gray-600">Added</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {user.cart.map((item) => (
                        <tr key={item.id} className="bg-white">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-10 h-10 rounded-lg object-cover"
                              />
                              <span className="text-sm font-medium text-gray-900">{item.productName}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">{item.shopName}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-right">{formatCurrency(item.price)}</td>
                          <td className="px-4 py-3 text-sm text-gray-900 text-center">{item.quantity}</td>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900 text-right">
                            {formatCurrency(item.price * item.quantity)}
                          </td>
                          <td className="px-4 py-3 text-xs text-gray-500">
                            {new Date(item.addedAt).toLocaleDateString('en-BD', { month: 'short', day: 'numeric' })}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <span className="text-3xl">🛒</span>
                  <p className="text-gray-500 mt-2">Cart is empty</p>
                </div>
              )}
            </div>

            {/* Wishlist Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  ❤️ Wishlist
                  <span className="text-sm font-normal text-gray-500">({user.wishlist.length} items)</span>
                </h4>
                {user.wishlist.length > 0 && (
                  <p className="text-sm font-medium text-pink-600">Total Value: {formatCurrency(wishlistTotal)}</p>
                )}
              </div>
              {user.wishlist.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {user.wishlist.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-full h-32 object-cover"
                      />
                      <div className="p-3">
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">{item.productName}</p>
                        <p className="text-xs text-gray-500">{item.shopName}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-sm font-semibold text-indigo-600">{formatCurrency(item.price)}</p>
                          <span
                            className={`px-2 py-0.5 text-xs rounded-full ${
                              item.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {item.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <span className="text-3xl">❤️</span>
                  <p className="text-gray-500 mt-2">Wishlist is empty</p>
                </div>
              )}
            </div>

            {/* Orders Section */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2 mb-4">
                📦 Order History
                <span className="text-sm font-normal text-gray-500">({user.orders.length} orders)</span>
              </h4>
              {user.orders.length > 0 ? (
                <div className="space-y-4">
                  {user.orders.map((order) => {
                    const orderStatus = orderStatusConfig[order.status];
                    return (
                      <div key={order.id} className="bg-gray-50 rounded-xl p-4">
                        {/* Order Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                            <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                          </div>
                          <div className="text-right">
                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${orderStatus.color}`}>
                              {orderStatus.label}
                            </span>
                            {order.deliveredAt && (
                              <p className="text-xs text-gray-500 mt-1">Delivered: {formatDate(order.deliveredAt)}</p>
                            )}
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2 mb-4">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex items-center gap-3 bg-white rounded-lg p-2">
                              <img
                                src={item.productImage}
                                alt={item.productName}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                                <p className="text-xs text-gray-500">{item.shopName}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{formatCurrency(item.price)}</p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Order Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>💳 {order.paymentMethod}</span>
                            <span>📍 {order.shippingAddress}</span>
                          </div>
                          <p className="text-lg font-bold text-indigo-600">{formatCurrency(order.totalAmount)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-gray-50 rounded-xl p-8 text-center">
                  <span className="text-3xl">📦</span>
                  <p className="text-gray-500 mt-2">No orders yet</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Last Active: {formatDate(user.lastActiveAt)}
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
