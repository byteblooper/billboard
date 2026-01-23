'use client';

import { useState } from 'react';
import { Shop, ShopRequest } from './components/types';
import { demoShops, demoShopRequests } from './components/demoData';
import { ShopList } from './components';

export default function ShopsPage() {
  const [shops, setShops] = useState<Shop[]>(demoShops);
  const [requests, setRequests] = useState<ShopRequest[]>(demoShopRequests);

  const handleApproveRequest = (request: ShopRequest) => {
    // Create new shop from request
    const newShop: Shop = {
      id: `shop-${Date.now()}`,
      name: request.shopName,
      slug: request.shopName.toLowerCase().replace(/\s+/g, '-'),
      description: request.description,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(request.shopName)}&background=random&color=fff&size=128`,
      banner: '',
      category: request.category,
      status: 'approved',
      sellerId: request.sellerId,
      sellerName: request.sellerName,
      sellerEmail: request.sellerEmail,
      address: request.businessAddress,
      city: request.city,
      phone: request.sellerPhone,
      email: request.sellerEmail,
      products: [],
      metrics: {
        totalProducts: 0,
        activeProducts: 0,
        totalOrders: 0,
        completedOrders: 0,
        cancelledOrders: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
        averageOrderValue: 0,
        rating: 0,
        reviewCount: 0,
      },
      salesHistory: [],
      requestedAt: request.requestedAt,
      approvedAt: new Date().toISOString().split('T')[0],
    };

    setShops((prev) => [...prev, newShop]);
    setRequests((prev) =>
      prev.map((r) => (r.id === request.id ? { ...r, status: 'approved' as const } : r))
    );
  };

  const handleRejectRequest = (request: ShopRequest, reason: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === request.id ? { ...r, status: 'rejected' as const } : r))
    );
  };

  const handleSuspendShop = (shop: Shop) => {
    setShops((prev) =>
      prev.map((s) => (s.id === shop.id ? { ...s, status: 'suspended' as const } : s))
    );
  };

  const handleActivateShop = (shop: Shop) => {
    setShops((prev) =>
      prev.map((s) => (s.id === shop.id ? { ...s, status: 'approved' as const } : s))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Shop Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage shop requests, approve new shops, and monitor existing shops
              </p>
            </div>
          </div>
        </div>

        {/* Shop List */}
        <ShopList
          shops={shops}
          requests={requests}
          onApproveRequest={handleApproveRequest}
          onRejectRequest={handleRejectRequest}
          onSuspendShop={handleSuspendShop}
          onActivateShop={handleActivateShop}
        />
      </div>
    </div>
  );
}
