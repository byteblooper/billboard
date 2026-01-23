'use client';

import { useState } from 'react';
import { Seller, SellerTier, PenaltyType } from './types';
import StatusBadge from './StatusBadge';
import SellerTierBadge from './SellerTierBadge';
import DocumentViewer from './DocumentViewer';
import PerformanceMetrics from './PerformanceMetrics';
import PenaltyHistory from './PenaltyHistory';
import TierManagement from './TierManagement';
import PenaltyModal from './PenaltyModal';

interface SellerProfileProps {
  seller: Seller;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (seller: Seller) => void;
  onReject: (seller: Seller) => void;
  onSuspend: (seller: Seller) => void;
  onUpdateSeller: (seller: Seller) => void;
}

type TabType = 'overview' | 'documents' | 'performance' | 'penalties' | 'tier';

export default function SellerProfile({
  seller,
  isOpen,
  onClose,
  onApprove,
  onReject,
  onSuspend,
  onUpdateSeller,
}: SellerProfileProps) {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [isPenaltyModalOpen, setIsPenaltyModalOpen] = useState(false);

  if (!isOpen) return null;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'overview', label: 'Overview', icon: '📋' },
    { id: 'documents', label: 'Documents', icon: '📄' },
    { id: 'performance', label: 'Performance', icon: '📊' },
    { id: 'penalties', label: 'Penalties', icon: '⚠️' },
    { id: 'tier', label: 'Tier', icon: '🏆' },
  ];

  const handleDocumentApprove = (documentId: string) => {
    const updatedDocuments = seller.documents.map((doc) =>
      doc.id === documentId ? { ...doc, status: 'approved' as const } : doc
    );
    onUpdateSeller({ ...seller, documents: updatedDocuments });
  };

  const handleDocumentReject = (documentId: string) => {
    const updatedDocuments = seller.documents.map((doc) =>
      doc.id === documentId ? { ...doc, status: 'rejected' as const } : doc
    );
    onUpdateSeller({ ...seller, documents: updatedDocuments });
  };

  const handleRemovePenalty = (penaltyId: string) => {
    const updatedPenalties = seller.penalties.map((p) =>
      p.id === penaltyId ? { ...p, isActive: false } : p
    );
    onUpdateSeller({ ...seller, penalties: updatedPenalties });
  };

  const handleAddPenalty = (penaltyData: {
    type: PenaltyType;
    reason: string;
    amount?: number;
    endDate?: string;
  }) => {
    const newPenalty = {
      id: `p${Date.now()}`,
      type: penaltyData.type,
      reason: penaltyData.reason,
      amount: penaltyData.amount,
      startDate: new Date().toISOString().split('T')[0],
      endDate: penaltyData.endDate,
      isActive: true,
      createdBy: 'Admin User',
    };

    const updatedSeller = {
      ...seller,
      penalties: [...seller.penalties, newPenalty],
      status: penaltyData.type === 'temporary_ban' || penaltyData.type === 'permanent_ban'
        ? 'suspended' as const
        : seller.status,
    };

    onUpdateSeller(updatedSeller);
    setIsPenaltyModalOpen(false);
  };

  const handleChangeTier = (newTier: SellerTier) => {
    onUpdateSeller({ ...seller, tier: newTier });
  };

  return (
    <>
      <div className="fixed inset-0 z-40 overflow-hidden">
        <div className="flex h-full">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            onClick={onClose}
          />

          {/* Slide-over panel */}
          <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="w-screen max-w-3xl">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                {/* Header */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200">
                  <div className="px-6 py-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <img
                          src={seller.avatar}
                          alt={seller.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h2 className="text-xl font-semibold text-gray-900">{seller.name}</h2>
                          <p className="text-sm text-gray-500">{seller.businessInfo.businessName}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <StatusBadge status={seller.status} size="sm" />
                            <SellerTierBadge tier={seller.tier} size="sm" />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="flex gap-2 mt-4">
                      {seller.status === 'unverified' && (
                        <>
                          <button
                            onClick={() => onApprove(seller)}
                            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                          >
                            ✓ Approve Seller
                          </button>
                          <button
                            onClick={() => onReject(seller)}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                          >
                            ✕ Reject
                          </button>
                        </>
                      )}
                      {seller.status !== 'suspended' && seller.status !== 'rejected' && (
                        <button
                          onClick={() => onSuspend(seller)}
                          className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                          ⊘ Suspend
                        </button>
                      )}
                      <button
                        onClick={() => setIsPenaltyModalOpen(true)}
                        className="px-4 py-2 text-sm font-medium text-orange-600 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                      >
                        ⚠ Add Penalty
                      </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex gap-1 mt-4 -mb-px">
                      {tabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors ${
                            activeTab === tab.id
                              ? 'text-indigo-600 bg-indigo-50 border-b-2 border-indigo-600'
                              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                          }`}
                        >
                          <span>{tab.icon}</span>
                          <span>{tab.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 px-6 py-6">
                  {/* Overview Tab */}
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      {/* Contact Info */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Email</p>
                            <p className="text-sm text-gray-900">{seller.email}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Phone</p>
                            <p className="text-sm text-gray-900">{seller.phone}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Joined</p>
                            <p className="text-sm text-gray-900">{formatDate(seller.createdAt)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Last Active</p>
                            <p className="text-sm text-gray-900">{formatDate(seller.lastActive)}</p>
                          </div>
                        </div>
                      </div>

                      {/* Business Info */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-3">Business Information</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Business Name</p>
                            <p className="text-sm text-gray-900">{seller.businessInfo.businessName}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Business Type</p>
                            <p className="text-sm text-gray-900">{seller.businessInfo.businessType}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Registration Number</p>
                            <p className="text-sm text-gray-900">{seller.businessInfo.registrationNumber}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Tax ID</p>
                            <p className="text-sm text-gray-900">{seller.businessInfo.taxId}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Established</p>
                            <p className="text-sm text-gray-900">{seller.businessInfo.establishedYear}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Website</p>
                            <p className="text-sm text-gray-900">
                              {seller.businessInfo.website || 'N/A'}
                            </p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-xs text-gray-500">Address</p>
                          <p className="text-sm text-gray-900">
                            {seller.businessInfo.address}, {seller.businessInfo.city},{' '}
                            {seller.businessInfo.state} {seller.businessInfo.zipCode},{' '}
                            {seller.businessInfo.country}
                          </p>
                        </div>
                      </div>

                      {/* Financial Summary */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-green-50 rounded-lg p-4">
                          <p className="text-xs text-green-600">Total Revenue</p>
                          <p className="text-2xl font-bold text-green-700">
                            {formatCurrency(seller.totalRevenue)}
                          </p>
                        </div>
                        <div className={`rounded-lg p-4 ${seller.balance >= 0 ? 'bg-blue-50' : 'bg-red-50'}`}>
                          <p className={`text-xs ${seller.balance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                            Current Balance
                          </p>
                          <p className={`text-2xl font-bold ${seller.balance >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
                            {formatCurrency(seller.balance)}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Documents Tab */}
                  {activeTab === 'documents' && (
                    <DocumentViewer
                      documents={seller.documents}
                      onApprove={handleDocumentApprove}
                      onReject={handleDocumentReject}
                    />
                  )}

                  {/* Performance Tab */}
                  {activeTab === 'performance' && (
                    <PerformanceMetrics metrics={seller.performance} />
                  )}

                  {/* Penalties Tab */}
                  {activeTab === 'penalties' && (
                    <PenaltyHistory
                      penalties={seller.penalties}
                      onRemovePenalty={handleRemovePenalty}
                    />
                  )}

                  {/* Tier Tab */}
                  {activeTab === 'tier' && (
                    <TierManagement seller={seller} onChangeTier={handleChangeTier} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Penalty Modal */}
      <PenaltyModal
        seller={seller}
        isOpen={isPenaltyModalOpen}
        onClose={() => setIsPenaltyModalOpen(false)}
        onSubmit={handleAddPenalty}
      />
    </>
  );
}
