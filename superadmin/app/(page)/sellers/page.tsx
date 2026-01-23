'use client';

import { useState } from 'react';
import { Seller } from './components/types';
import { demoSellers } from './components/demoData';
import { SellerList, SellerProfile, PenaltyModal } from './components';

export default function SellersPage() {
  const [sellers, setSellers] = useState<Seller[]>(demoSellers);
  const [selectedSeller, setSelectedSeller] = useState<Seller | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isPenaltyModalOpen, setIsPenaltyModalOpen] = useState(false);
  const [penaltySeller, setPenaltySeller] = useState<Seller | null>(null);

  const handleViewSeller = (seller: Seller) => {
    setSelectedSeller(seller);
    setIsProfileOpen(true);
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
    setSelectedSeller(null);
  };

  const handleApproveSeller = (seller: Seller) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === seller.id ? { ...s, status: 'verified' as const } : s))
    );
    if (selectedSeller?.id === seller.id) {
      setSelectedSeller({ ...seller, status: 'verified' });
    }
  };

  const handleRejectSeller = (seller: Seller) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === seller.id ? { ...s, status: 'rejected' as const } : s))
    );
    if (selectedSeller?.id === seller.id) {
      setSelectedSeller({ ...seller, status: 'rejected' });
    }
  };

  const handleSuspendSeller = (seller: Seller) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === seller.id ? { ...s, status: 'suspended' as const } : s))
    );
    if (selectedSeller?.id === seller.id) {
      setSelectedSeller({ ...seller, status: 'suspended' });
    }
  };

  const handleOpenPenaltyModal = (seller: Seller) => {
    setPenaltySeller(seller);
    setIsPenaltyModalOpen(true);
  };

  const handleClosePenaltyModal = () => {
    setIsPenaltyModalOpen(false);
    setPenaltySeller(null);
  };

  const handleAddPenalty = (penaltyData: {
    type: 'warning' | 'fine' | 'temporary_ban' | 'permanent_ban';
    reason: string;
    amount?: number;
    endDate?: string;
  }) => {
    if (!penaltySeller) return;

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
      ...penaltySeller,
      penalties: [...penaltySeller.penalties, newPenalty],
      status:
        penaltyData.type === 'temporary_ban' || penaltyData.type === 'permanent_ban'
          ? ('suspended' as const)
          : penaltySeller.status,
    };

    setSellers((prev) =>
      prev.map((s) => (s.id === penaltySeller.id ? updatedSeller : s))
    );

    if (selectedSeller?.id === penaltySeller.id) {
      setSelectedSeller(updatedSeller);
    }

    handleClosePenaltyModal();
  };

  const handleUpdateSeller = (updatedSeller: Seller) => {
    setSellers((prev) =>
      prev.map((s) => (s.id === updatedSeller.id ? updatedSeller : s))
    );
    setSelectedSeller(updatedSeller);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Seller Management</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage all sellers, verify accounts, and handle penalties
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Seller
            </button>
          </div>
        </div>

        {/* Seller List */}
        <SellerList
          sellers={sellers}
          onViewSeller={handleViewSeller}
          onApproveSeller={handleApproveSeller}
          onRejectSeller={handleRejectSeller}
          onSuspendSeller={handleSuspendSeller}
          onAddPenalty={handleOpenPenaltyModal}
        />

        {/* Seller Profile Slide-over */}
        {selectedSeller && (
          <SellerProfile
            seller={selectedSeller}
            isOpen={isProfileOpen}
            onClose={handleCloseProfile}
            onApprove={handleApproveSeller}
            onReject={handleRejectSeller}
            onSuspend={handleSuspendSeller}
            onUpdateSeller={handleUpdateSeller}
          />
        )}

        {/* Penalty Modal */}
        {penaltySeller && (
          <PenaltyModal
            seller={penaltySeller}
            isOpen={isPenaltyModalOpen}
            onClose={handleClosePenaltyModal}
            onSubmit={handleAddPenalty}
          />
        )}
      </div>
    </div>
  );
}
