'use client';

import { useState } from 'react';
import { NotificationCampaign, NotificationType } from './types';

interface NotificationModalProps {
  notification: NotificationCampaign | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (notification: Partial<NotificationCampaign>) => void;
}

const notificationTypes: { value: NotificationType; label: string; icon: string; description: string }[] = [
  { value: 'push', label: 'Push Notification', icon: '📱', description: 'Mobile push notification' },
  { value: 'email', label: 'Email', icon: '📧', description: 'Email campaign' },
  { value: 'sms', label: 'SMS', icon: '💬', description: 'Text message' },
  { value: 'in_app', label: 'In-App', icon: '🔔', description: 'In-app notification' },
];

const targetAudiences = [
  { value: 'all', label: 'All Users', description: 'Send to all registered users' },
  { value: 'active', label: 'Active Users', description: 'Users active in last 30 days' },
  { value: 'inactive', label: 'Inactive Users', description: 'Users inactive for 30+ days' },
  { value: 'new', label: 'New Users', description: 'Registered in last 7 days' },
  { value: 'premium', label: 'Premium Users', description: 'Paid/premium customers' },
  { value: 'custom', label: 'Custom Segment', description: 'Define custom criteria' },
];

export default function NotificationModal({ notification, isOpen, onClose, onSave }: NotificationModalProps) {
  const [formData, setFormData] = useState({
    name: notification?.name || '',
    type: notification?.type || 'push' as NotificationType,
    title: notification?.title || '',
    body: notification?.body || '',
    imageUrl: notification?.imageUrl || '',
    actionUrl: notification?.actionUrl || '',
    targetAudience: notification?.targetAudience || 'all' as 'all' | 'active' | 'inactive' | 'new' | 'premium' | 'custom',
    customSegment: notification?.customSegment || '',
    scheduleType: notification?.scheduledAt ? 'scheduled' : 'immediate',
    scheduledDate: notification?.scheduledAt ? notification.scheduledAt.split('T')[0] : '',
    scheduledTime: notification?.scheduledAt ? notification.scheduledAt.split('T')[1]?.slice(0, 5) : '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let scheduledAt: string | undefined;
    if (formData.scheduleType === 'scheduled' && formData.scheduledDate && formData.scheduledTime) {
      scheduledAt = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`).toISOString();
    }

    onSave({
      id: notification?.id,
      name: formData.name,
      type: formData.type,
      title: formData.title,
      body: formData.body,
      imageUrl: formData.imageUrl || undefined,
      actionUrl: formData.actionUrl || undefined,
      targetAudience: formData.targetAudience,
      customSegment: formData.customSegment || undefined,
      scheduledAt,
      status: formData.scheduleType === 'scheduled' ? 'scheduled' : 'draft',
      totalRecipients: 0,
      delivered: 0,
      opened: 0,
      clicked: 0,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {notification ? 'Edit Notification' : 'Create Notification Campaign'}
              </h2>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Campaign Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., Flash Sale Announcement"
                required
              />
            </div>

            {/* Notification Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Notification Type</label>
              <div className="grid grid-cols-4 gap-2">
                {notificationTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, type: type.value })}
                    className={`p-3 rounded-lg border-2 text-center transition-all ${
                      formData.type === type.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <p className="text-xs font-medium text-gray-700 mt-1">{type.label}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
              <h4 className="font-medium text-gray-700">Notification Content</h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  placeholder="🔥 Flash Sale is LIVE!"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Body</label>
                <textarea
                  value={formData.body}
                  onChange={(e) => setFormData({ ...formData, body: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  placeholder="Up to 40% off on selected items. Shop now!"
                  required
                />
              </div>
              {(formData.type === 'push' || formData.type === 'email') && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Optional)</label>
                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                    placeholder="https://..."
                  />
                  {formData.imageUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-24 object-cover" />
                    </div>
                  )}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action URL (Optional)</label>
                <input
                  type="text"
                  value={formData.actionUrl}
                  onChange={(e) => setFormData({ ...formData, actionUrl: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
                  placeholder="/sale/flash or https://..."
                />
              </div>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
              <div className="grid grid-cols-2 gap-2">
                {targetAudiences.map((audience) => (
                  <button
                    key={audience.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, targetAudience: audience.value as typeof formData.targetAudience })}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      formData.targetAudience === audience.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <p className="text-sm font-medium text-gray-700">{audience.label}</p>
                    <p className="text-xs text-gray-500">{audience.description}</p>
                  </button>
                ))}
              </div>
              {formData.targetAudience === 'custom' && (
                <div className="mt-3">
                  <input
                    type="text"
                    value={formData.customSegment}
                    onChange={(e) => setFormData({ ...formData, customSegment: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="e.g., cart_abandoned_24h, first_purchase"
                  />
                </div>
              )}
            </div>

            {/* Schedule */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="schedule"
                    value="immediate"
                    checked={formData.scheduleType === 'immediate'}
                    onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Save as Draft</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="schedule"
                    value="scheduled"
                    checked={formData.scheduleType === 'scheduled'}
                    onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value })}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Schedule for later</span>
                </label>
              </div>
              {formData.scheduleType === 'scheduled' && (
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Date</label>
                    <input
                      type="date"
                      value={formData.scheduledDate}
                      onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required={formData.scheduleType === 'scheduled'}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Time</label>
                    <input
                      type="time"
                      value={formData.scheduledTime}
                      onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required={formData.scheduleType === 'scheduled'}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
              >
                {formData.scheduleType === 'scheduled' ? 'Schedule' : 'Save Draft'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
