'use client';

import { Notice, NoticeType, NoticePriority, NoticeStatus } from './types';

interface NoticeViewModalProps {
  notice: Notice | null;
  isOpen: boolean;
  onClose: () => void;
}

const typeConfig: Record<NoticeType, { label: string; icon: string; color: string }> = {
  announcement: { label: 'Announcement', icon: '📢', color: 'bg-blue-100 text-blue-700' },
  update: { label: 'Update', icon: '🔄', color: 'bg-indigo-100 text-indigo-700' },
  warning: { label: 'Warning', icon: '⚠️', color: 'bg-yellow-100 text-yellow-700' },
  maintenance: { label: 'Maintenance', icon: '🔧', color: 'bg-gray-100 text-gray-700' },
  promotion: { label: 'Promotion', icon: '🎉', color: 'bg-green-100 text-green-700' },
  policy: { label: 'Policy', icon: '📋', color: 'bg-purple-100 text-purple-700' },
};

const priorityConfig: Record<NoticePriority, { label: string; color: string }> = {
  low: { label: 'Low', color: 'bg-gray-100 text-gray-600' },
  medium: { label: 'Medium', color: 'bg-blue-100 text-blue-600' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-600' },
  urgent: { label: 'Urgent', color: 'bg-red-100 text-red-600' },
};

const statusConfig: Record<NoticeStatus, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700' },
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-700' },
  sent: { label: 'Sent', color: 'bg-green-100 text-green-700' },
  archived: { label: 'Archived', color: 'bg-gray-100 text-gray-500' },
};

const recipientTypeLabels: Record<string, string> = {
  all_sellers: 'All Sellers',
  individual_seller: 'Selected Sellers',
  all_shops: 'All Shops',
  individual_shop: 'Selected Shops',
};

export default function NoticeViewModal({ notice, isOpen, onClose }: NoticeViewModalProps) {
  if (!isOpen || !notice) return null;

  const type = typeConfig[notice.type];
  const priority = priorityConfig[notice.priority];
  const status = statusConfig[notice.status];

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-BD', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getReadRate = (readCount: number, recipientCount: number) => {
    if (recipientCount === 0) return '0%';
    return ((readCount / recipientCount) * 100).toFixed(1) + '%';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Notice Details</h2>
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
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${type.color}`}>
                {type.icon} {type.label}
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${priority.color}`}>
                {priority.label}
              </span>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${status.color}`}>
                {status.label}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-xl font-bold text-gray-900 mb-4">{notice.title}</h3>

            {/* Content */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-gray-700 whitespace-pre-wrap">{notice.content}</p>
            </div>

            {/* Meta Information */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Recipient Type</p>
                <p className="text-sm font-medium text-gray-900">{recipientTypeLabels[notice.recipientType]}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Total Recipients</p>
                <p className="text-sm font-medium text-gray-900">{notice.recipientCount}</p>
              </div>
              {notice.status === 'sent' && (
                <>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Read Count</p>
                    <p className="text-sm font-medium text-green-600">{notice.readCount}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Read Rate</p>
                    <p className="text-sm font-medium text-green-600">
                      {getReadRate(notice.readCount, notice.recipientCount)}
                    </p>
                  </div>
                </>
              )}
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Created By</p>
                <p className="text-sm font-medium text-gray-900">{notice.createdBy}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-500">Created At</p>
                <p className="text-sm font-medium text-gray-900">{formatDate(notice.createdAt)}</p>
              </div>
              {notice.scheduledAt && (
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Scheduled For</p>
                  <p className="text-sm font-medium text-blue-600">{formatDate(notice.scheduledAt)}</p>
                </div>
              )}
              {notice.sentAt && (
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Sent At</p>
                  <p className="text-sm font-medium text-green-600">{formatDate(notice.sentAt)}</p>
                </div>
              )}
              {notice.expiresAt && (
                <div className="bg-orange-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Expires At</p>
                  <p className="text-sm font-medium text-orange-600">{formatDate(notice.expiresAt)}</p>
                </div>
              )}
            </div>

            {/* Recipients List */}
            {notice.recipients.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-3">Recipients</h4>
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
                  {notice.recipients.map((recipient) => (
                    <div key={recipient.id} className="flex items-center gap-3 p-3">
                      {recipient.avatar && (
                        <img
                          src={recipient.avatar}
                          alt={recipient.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{recipient.name}</p>
                        <p className="text-xs text-gray-500">
                          {recipient.email}
                          {recipient.shopName && ` • ${recipient.shopName}`}
                        </p>
                      </div>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        recipient.type === 'seller' ? 'bg-indigo-100 text-indigo-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {recipient.type === 'seller' ? 'Seller' : 'Shop'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <button
              onClick={onClose}
              className="w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
