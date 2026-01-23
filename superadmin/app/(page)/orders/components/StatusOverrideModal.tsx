'use client';

import { useState } from 'react';
import { Order, OrderStatus } from './types';

interface StatusOverrideModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (orderId: string, newStatus: OrderStatus, note: string) => void;
}

const statusActions = [
  {
    status: 'cancelled' as OrderStatus,
    label: 'Cancel Order',
    description: 'Cancel the order and notify customer',
    icon: '❌',
    color: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    confirmColor: 'bg-gray-600 hover:bg-gray-700',
  },
  {
    status: 'refunded' as OrderStatus,
    label: 'Process Refund',
    description: 'Mark order as refunded',
    icon: '💸',
    color: 'bg-orange-100 hover:bg-orange-200 text-orange-700',
    confirmColor: 'bg-orange-600 hover:bg-orange-700',
  },
  {
    status: 'frozen' as OrderStatus,
    label: 'Freeze Order',
    description: 'Temporarily freeze for investigation',
    icon: '🧊',
    color: 'bg-cyan-100 hover:bg-cyan-200 text-cyan-700',
    confirmColor: 'bg-cyan-600 hover:bg-cyan-700',
  },
  {
    status: 'processing' as OrderStatus,
    label: 'Resume Processing',
    description: 'Unfreeze and continue processing',
    icon: '▶️',
    color: 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700',
    confirmColor: 'bg-indigo-600 hover:bg-indigo-700',
  },
  {
    status: 'delivered' as OrderStatus,
    label: 'Mark Delivered',
    description: 'Manually mark as delivered',
    icon: '✅',
    color: 'bg-green-100 hover:bg-green-200 text-green-700',
    confirmColor: 'bg-green-600 hover:bg-green-700',
  },
];

export default function StatusOverrideModal({
  order,
  isOpen,
  onClose,
  onConfirm,
}: StatusOverrideModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus | null>(null);
  const [note, setNote] = useState('');
  const [step, setStep] = useState<'select' | 'confirm'>('select');

  if (!isOpen || !order) return null;

  const handleSelectStatus = (status: OrderStatus) => {
    setSelectedStatus(status);
    setStep('confirm');
  };

  const handleConfirm = () => {
    if (selectedStatus) {
      onConfirm(order.id, selectedStatus, note);
      handleClose();
    }
  };

  const handleClose = () => {
    setSelectedStatus(null);
    setNote('');
    setStep('select');
    onClose();
  };

  const selectedAction = statusActions.find(a => a.status === selectedStatus);

  // Filter available actions based on current status
  const availableActions = statusActions.filter(action => {
    if (order.status === 'delivered' && action.status === 'delivered') return false;
    if (order.status === 'cancelled' && action.status === 'cancelled') return false;
    if (order.status === 'refunded' && action.status === 'refunded') return false;
    if (order.status === 'frozen' && action.status === 'frozen') return false;
    if (order.status !== 'frozen' && action.status === 'processing') return false;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={handleClose} />

        <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {step === 'select' ? 'Override Order Status' : 'Confirm Action'}
                </h2>
                <p className="text-sm text-gray-500">{order.orderNumber}</p>
              </div>
              <button onClick={handleClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 'select' ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 mb-4">
                  Current status: <span className="font-medium">{order.status}</span>
                </p>
                {availableActions.map((action) => (
                  <button
                    key={action.status}
                    onClick={() => handleSelectStatus(action.status)}
                    className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors ${action.color}`}
                  >
                    <span className="text-2xl">{action.icon}</span>
                    <div className="text-left">
                      <p className="font-medium">{action.label}</p>
                      <p className="text-xs opacity-75">{action.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-sm font-medium text-amber-800">
                      You are about to {selectedAction?.label.toLowerCase()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason / Note (required)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Enter the reason for this action..."
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setStep('select')}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleConfirm}
                    disabled={!note.trim()}
                    className={`flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed ${selectedAction?.confirmColor}`}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
