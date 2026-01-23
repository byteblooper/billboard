'use client';

import { useState } from 'react';
import { Seller, PenaltyType } from './types';

interface PenaltyModalProps {
  seller: Seller;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (penaltyData: {
    type: PenaltyType;
    reason: string;
    amount?: number;
    endDate?: string;
  }) => void;
}

export default function PenaltyModal({ seller, isOpen, onClose, onSubmit }: PenaltyModalProps) {
  const [penaltyType, setPenaltyType] = useState<PenaltyType>('warning');
  const [reason, setReason] = useState('');
  const [fineAmount, setFineAmount] = useState('');
  const [banDuration, setBanDuration] = useState('7');
  const [customEndDate, setCustomEndDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let endDate: string | undefined;
    if (penaltyType === 'temporary_ban') {
      if (customEndDate) {
        endDate = customEndDate;
      } else {
        const end = new Date();
        end.setDate(end.getDate() + parseInt(banDuration));
        endDate = end.toISOString().split('T')[0];
      }
    }

    onSubmit({
      type: penaltyType,
      reason,
      amount: penaltyType === 'fine' ? parseFloat(fineAmount) : undefined,
      endDate,
    });

    // Reset form
    setPenaltyType('warning');
    setReason('');
    setFineAmount('');
    setBanDuration('7');
    setCustomEndDate('');
  };

  const penaltyTypeOptions: { value: PenaltyType; label: string; description: string; icon: string }[] = [
    {
      value: 'warning',
      label: 'Warning',
      description: 'Send a formal warning to the seller',
      icon: '⚠️',
    },
    {
      value: 'fine',
      label: 'Fine',
      description: 'Deduct a monetary penalty from seller balance',
      icon: '💰',
    },
    {
      value: 'temporary_ban',
      label: 'Temporary Ban',
      description: 'Temporarily suspend seller activities',
      icon: '⏸️',
    },
    {
      value: 'permanent_ban',
      label: 'Permanent Ban',
      description: 'Permanently remove seller from platform',
      icon: '🚫',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative inline-block w-full max-w-lg p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Add Penalty</h3>
              <p className="text-sm text-gray-500">
                Apply a penalty to {seller.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Penalty Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Penalty Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                {penaltyTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPenaltyType(option.value)}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      penaltyType === option.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{option.icon}</span>
                      <span className="font-medium text-gray-900">{option.label}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Fine Amount (conditional) */}
            {penaltyType === 'fine' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fine Amount (BDT)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">৳</span>
                  <input
                    type="number"
                    value={fineAmount}
                    onChange={(e) => setFineAmount(e.target.value)}
                    placeholder="Enter fine amount"
                    min="0"
                    required
                    className="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Ban Duration (conditional) */}
            {penaltyType === 'temporary_ban' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ban Duration
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {['7', '14', '30', '90'].map((days) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => {
                        setBanDuration(days);
                        setCustomEndDate('');
                      }}
                      className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                        banDuration === days && !customEndDate
                          ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {days} days
                    </button>
                  ))}
                </div>
                <div>
                  <label className="text-xs text-gray-500">Or select custom end date:</label>
                  <input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full mt-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Reason */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Penalty
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Describe the reason for this penalty..."
                required
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
              />
            </div>

            {/* Warning for permanent ban */}
            {penaltyType === 'permanent_ban' && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <svg
                    className="w-5 h-5 text-red-500 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-medium text-red-700">
                      Warning: This action is irreversible
                    </p>
                    <p className="text-xs text-red-600 mt-1">
                      The seller will be permanently removed from the platform and will not be able
                      to create a new account.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg transition-colors ${
                  penaltyType === 'permanent_ban'
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                Apply Penalty
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
