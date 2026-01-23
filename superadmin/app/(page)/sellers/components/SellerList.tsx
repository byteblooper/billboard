'use client';

import { useState, useMemo } from 'react';
import { Seller, SellerStatus, SellerTier } from './types';
import SellerCard from './SellerCard';

interface SellerListProps {
  sellers: Seller[];
  onViewSeller: (seller: Seller) => void;
  onApproveSeller: (seller: Seller) => void;
  onRejectSeller: (seller: Seller) => void;
  onSuspendSeller: (seller: Seller) => void;
  onAddPenalty: (seller: Seller) => void;
}

type FilterStatus = 'all' | SellerStatus;
type FilterTier = 'all' | SellerTier;

export default function SellerList({
  sellers,
  onViewSeller,
  onApproveSeller,
  onRejectSeller,
  onSuspendSeller,
  onAddPenalty,
}: SellerListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [tierFilter, setTierFilter] = useState<FilterTier>('all');
  const [sortBy, setSortBy] = useState<'name' | 'revenue' | 'rating' | 'orders'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const filteredSellers = useMemo(() => {
    let result = [...sellers];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (seller) =>
          seller.name.toLowerCase().includes(query) ||
          seller.email.toLowerCase().includes(query) ||
          seller.businessInfo.businessName.toLowerCase().includes(query)
      );
    }

    // Status filter
    if (statusFilter !== 'all') {
      result = result.filter((seller) => seller.status === statusFilter);
    }

    // Tier filter
    if (tierFilter !== 'all') {
      result = result.filter((seller) => seller.tier === tierFilter);
    }

    // Sorting
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'revenue':
          comparison = a.totalRevenue - b.totalRevenue;
          break;
        case 'rating':
          comparison = a.performance.rating - b.performance.rating;
          break;
        case 'orders':
          comparison = a.performance.totalOrders - b.performance.totalOrders;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [sellers, searchQuery, statusFilter, tierFilter, sortBy, sortOrder]);

  const statusCounts = useMemo(() => {
    return {
      all: sellers.length,
      verified: sellers.filter((s) => s.status === 'verified').length,
      unverified: sellers.filter((s) => s.status === 'unverified').length,
      suspended: sellers.filter((s) => s.status === 'suspended').length,
      rejected: sellers.filter((s) => s.status === 'rejected').length,
    };
  }, [sellers]);

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { key: 'all', label: 'All Sellers', color: 'bg-gray-500' },
          { key: 'verified', label: 'Verified', color: 'bg-green-500' },
          { key: 'unverified', label: 'Unverified', color: 'bg-yellow-500' },
          { key: 'suspended', label: 'Suspended', color: 'bg-red-500' },
          { key: 'rejected', label: 'Rejected', color: 'bg-gray-400' },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setStatusFilter(item.key as FilterStatus)}
            className={`p-4 rounded-xl border-2 transition-all ${
              statusFilter === item.key
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <div className="text-left">
                <p className="text-2xl font-bold text-gray-900">
                  {statusCounts[item.key as keyof typeof statusCounts]}
                </p>
                <p className="text-sm text-gray-500">{item.label}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search sellers by name, email, or business..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Tier Filter */}
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value as FilterTier)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="all">All Tiers</option>
            <option value="bronze">🥉 Bronze</option>
            <option value="silver">🥈 Silver</option>
            <option value="gold">🥇 Gold</option>
            <option value="platinum">💎 Platinum</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="name">Sort by Name</option>
            <option value="revenue">Sort by Revenue</option>
            <option value="rating">Sort by Rating</option>
            <option value="orders">Sort by Orders</option>
          </select>

          {/* Sort Order */}
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortOrder === 'asc' ? (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{filteredSellers.length}</span> of{' '}
          <span className="font-medium">{sellers.length}</span> sellers
        </p>
      </div>

      {/* Seller Grid */}
      {filteredSellers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSellers.map((seller) => (
            <SellerCard
              key={seller.id}
              seller={seller}
              onView={onViewSeller}
              onApprove={onApproveSeller}
              onReject={onRejectSeller}
              onSuspend={onSuspendSeller}
              onPenalty={onAddPenalty}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <svg
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No sellers found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
}
