'use client';

import { Notice, NoticeType, NoticePriority, NoticeStatus } from './types';

interface NoticeListProps {
  notices: Notice[];
  onView: (notice: Notice) => void;
  onEdit: (notice: Notice) => void;
  onSend: (noticeId: string) => void;
  onDelete: (noticeId: string) => void;
  onArchive: (noticeId: string) => void;
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

export default function NoticeList({ notices, onView, onEdit, onSend, onDelete, onArchive }: NoticeListProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-BD', {
      month: 'short',
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
    <div className="space-y-4">
      {notices.map((notice) => {
        const type = typeConfig[notice.type];
        const priority = priorityConfig[notice.priority];
        const status = statusConfig[notice.status];

        return (
          <div
            key={notice.id}
            className={`bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
              notice.status === 'archived' ? 'opacity-60' : ''
            }`}
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${type.color}`}>
                      {type.icon} {type.label}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${priority.color}`}>
                      {priority.label}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{notice.title}</h3>
                </div>
              </div>

              {/* Content Preview */}
              <p className="text-sm text-gray-600 line-clamp-2 mb-4">{notice.content}</p>

              {/* Meta Info */}
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">To:</span>
                  <span className="font-medium text-gray-700">
                    {recipientTypeLabels[notice.recipientType]}
                    {notice.recipientCount > 0 && ` (${notice.recipientCount})`}
                  </span>
                </div>
                {notice.status === 'sent' && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Read:</span>
                    <span className="font-medium text-green-600">
                      {notice.readCount}/{notice.recipientCount} ({getReadRate(notice.readCount, notice.recipientCount)})
                    </span>
                  </div>
                )}
                {notice.status === 'scheduled' && notice.scheduledAt && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Scheduled:</span>
                    <span className="font-medium text-blue-600">{formatDate(notice.scheduledAt)}</span>
                  </div>
                )}
                {notice.sentAt && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Sent:</span>
                    <span className="text-gray-600">{formatDate(notice.sentAt)}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-gray-500">By:</span>
                  <span className="text-gray-600">{notice.createdBy}</span>
                </div>
              </div>

              {/* Recipients Preview (for individual notices) */}
              {notice.recipients.length > 0 && notice.recipients.length <= 5 && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                  <span className="text-xs text-gray-500">Recipients:</span>
                  <div className="flex items-center gap-1">
                    {notice.recipients.map((recipient) => (
                      <span
                        key={recipient.id}
                        className="px-2 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full"
                      >
                        {recipient.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => onView(notice)}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                >
                  View
                </button>
                {notice.status === 'draft' && (
                  <>
                    <button
                      onClick={() => onEdit(notice)}
                      className="px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onSend(notice.id)}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                      Send Now
                    </button>
                    <button
                      onClick={() => onDelete(notice.id)}
                      className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
                    >
                      Delete
                    </button>
                  </>
                )}
                {notice.status === 'scheduled' && (
                  <>
                    <button
                      onClick={() => onEdit(notice)}
                      className="px-3 py-1.5 text-sm font-medium text-indigo-700 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onSend(notice.id)}
                      className="px-3 py-1.5 text-sm font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100"
                    >
                      Send Now
                    </button>
                  </>
                )}
                {notice.status === 'sent' && (
                  <button
                    onClick={() => onArchive(notice.id)}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    Archive
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {notices.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <span className="text-4xl">📭</span>
          <p className="text-gray-500 mt-2">No notices found</p>
        </div>
      )}
    </div>
  );
}
