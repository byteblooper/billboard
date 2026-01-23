'use client';

import { NotificationCampaign, NotificationType, NotificationStatus } from './types';

interface NotificationListProps {
  notifications: NotificationCampaign[];
  onEdit: (notification: NotificationCampaign) => void;
  onSend: (notificationId: string) => void;
  onCancel: (notificationId: string) => void;
  onDuplicate: (notification: NotificationCampaign) => void;
}

const typeConfig: Record<NotificationType, { label: string; icon: string; color: string }> = {
  push: { label: 'Push', icon: '📱', color: 'bg-blue-100 text-blue-700' },
  email: { label: 'Email', icon: '📧', color: 'bg-green-100 text-green-700' },
  sms: { label: 'SMS', icon: '💬', color: 'bg-purple-100 text-purple-700' },
  in_app: { label: 'In-App', icon: '🔔', color: 'bg-orange-100 text-orange-700' },
};

const statusConfig: Record<NotificationStatus, { label: string; color: string }> = {
  draft: { label: 'Draft', color: 'bg-gray-100 text-gray-700' },
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-700' },
  sending: { label: 'Sending', color: 'bg-yellow-100 text-yellow-700' },
  sent: { label: 'Sent', color: 'bg-green-100 text-green-700' },
  failed: { label: 'Failed', color: 'bg-red-100 text-red-700' },
};

const audienceLabels: Record<string, string> = {
  all: 'All Users',
  active: 'Active Users',
  inactive: 'Inactive Users',
  new: 'New Users',
  premium: 'Premium Users',
  custom: 'Custom Segment',
};

export default function NotificationList({ notifications, onEdit, onSend, onCancel, onDuplicate }: NotificationListProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleString('en-BD', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getOpenRate = (opened: number, delivered: number) => {
    if (delivered === 0) return '0%';
    return ((opened / delivered) * 100).toFixed(1) + '%';
  };

  const getClickRate = (clicked: number, opened: number) => {
    if (opened === 0) return '0%';
    return ((clicked / opened) * 100).toFixed(1) + '%';
  };

  return (
    <div className="space-y-4">
      {notifications.map((notification) => {
        const type = typeConfig[notification.type];
        const status = statusConfig[notification.status];

        return (
          <div
            key={notification.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${type.color}`}>
                      {type.icon} {type.label}
                    </span>
                    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${status.color}`}>
                      {status.label}
                    </span>
                    <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-indigo-100 text-indigo-700">
                      {audienceLabels[notification.targetAudience]}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{notification.name}</h3>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium text-gray-800">{notification.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{notification.body}</p>
                    {notification.imageUrl && (
                      <div className="mt-2">
                        <img
                          src={notification.imageUrl}
                          alt="Notification"
                          className="h-16 rounded-lg object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Preview Image */}
                {notification.imageUrl && (
                  <div className="w-24 h-24 ml-4 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={notification.imageUrl}
                      alt={notification.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>

              {/* Stats */}
              {notification.status === 'sent' && (
                <div className="grid grid-cols-5 gap-4 mt-4 p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500">Recipients</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {notification.totalRecipients.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Delivered</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {notification.delivered.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Opened</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {notification.opened.toLocaleString()}
                      <span className="text-green-600 ml-1">
                        ({getOpenRate(notification.opened, notification.delivered)})
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Clicked</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {notification.clicked.toLocaleString()}
                      <span className="text-blue-600 ml-1">
                        ({getClickRate(notification.clicked, notification.opened)})
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Sent At</p>
                    <p className="text-sm text-gray-600">{notification.sentAt && formatDate(notification.sentAt)}</p>
                  </div>
                </div>
              )}

              {notification.status === 'scheduled' && notification.scheduledAt && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-blue-700">
                    Scheduled for {formatDate(notification.scheduledAt)}
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
                {notification.status === 'draft' && (
                  <>
                    <button
                      onClick={() => onEdit(notification)}
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onSend(notification.id)}
                      className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                      Send Now
                    </button>
                  </>
                )}
                {notification.status === 'scheduled' && (
                  <>
                    <button
                      onClick={() => onEdit(notification)}
                      className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onCancel(notification.id)}
                      className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {notification.status === 'sent' && (
                  <button
                    onClick={() => onDuplicate(notification)}
                    className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                  >
                    Duplicate
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
