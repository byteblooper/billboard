'use client';

import { useState } from 'react';
import { Notice, NoticeType, NoticePriority, RecipientType, Recipient } from './types';

interface NoticeModalProps {
  notice: Notice | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (notice: Partial<Notice>) => void;
  sellers: Recipient[];
  shops: Recipient[];
}

const noticeTypes: { value: NoticeType; label: string; icon: string }[] = [
  { value: 'announcement', label: 'Announcement', icon: '📢' },
  { value: 'update', label: 'Update', icon: '🔄' },
  { value: 'warning', label: 'Warning', icon: '⚠️' },
  { value: 'maintenance', label: 'Maintenance', icon: '🔧' },
  { value: 'promotion', label: 'Promotion', icon: '🎉' },
  { value: 'policy', label: 'Policy', icon: '📋' },
];

const priorities: { value: NoticePriority; label: string; color: string }[] = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-600 border-gray-300' },
  { value: 'medium', label: 'Medium', color: 'bg-blue-100 text-blue-600 border-blue-300' },
  { value: 'high', label: 'High', color: 'bg-orange-100 text-orange-600 border-orange-300' },
  { value: 'urgent', label: 'Urgent', color: 'bg-red-100 text-red-600 border-red-300' },
];

const recipientTypes: { value: RecipientType; label: string; description: string; icon: string }[] = [
  { value: 'all_sellers', label: 'All Sellers', description: 'Send to all registered sellers', icon: '👥' },
  { value: 'individual_seller', label: 'Individual Sellers', description: 'Select specific sellers', icon: '👤' },
  { value: 'all_shops', label: 'All Shops', description: 'Send to all active shops', icon: '🏪' },
  { value: 'individual_shop', label: 'Individual Shops', description: 'Select specific shops', icon: '🏬' },
];

export default function NoticeModal({ notice, isOpen, onClose, onSave, sellers, shops }: NoticeModalProps) {
  const [formData, setFormData] = useState({
    title: notice?.title || '',
    content: notice?.content || '',
    type: notice?.type || 'announcement' as NoticeType,
    priority: notice?.priority || 'medium' as NoticePriority,
    recipientType: notice?.recipientType || 'all_sellers' as RecipientType,
    selectedRecipients: notice?.recipients?.map(r => r.id) || [] as string[],
    scheduleType: (notice?.scheduledAt ? 'scheduled' : 'immediate') as 'immediate' | 'scheduled',
    scheduledDate: notice?.scheduledAt ? notice.scheduledAt.split('T')[0] : '',
    scheduledTime: notice?.scheduledAt ? notice.scheduledAt.split('T')[1]?.slice(0, 5) || '' : '',
    expiresAt: notice?.expiresAt ? notice.expiresAt.split('T')[0] : '',
  });

  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const getAvailableRecipients = (): Recipient[] => {
    if (formData.recipientType === 'individual_seller') return sellers;
    if (formData.recipientType === 'individual_shop') return shops;
    return [];
  };

  const filteredRecipients = getAvailableRecipients().filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleRecipient = (recipientId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedRecipients: prev.selectedRecipients.includes(recipientId)
        ? prev.selectedRecipients.filter((id) => id !== recipientId)
        : [...prev.selectedRecipients, recipientId],
    }));
  };

  const selectAllRecipients = () => {
    setFormData((prev) => ({
      ...prev,
      selectedRecipients: filteredRecipients.map((r) => r.id),
    }));
  };

  const clearAllRecipients = () => {
    setFormData((prev) => ({
      ...prev,
      selectedRecipients: [],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let scheduledAt: string | undefined;
    if (formData.scheduleType === 'scheduled' && formData.scheduledDate && formData.scheduledTime) {
      scheduledAt = new Date(`${formData.scheduledDate}T${formData.scheduledTime}`).toISOString();
    }

    const allRecipients = [...sellers, ...shops];
    const selectedRecipientObjects = allRecipients.filter((r) =>
      formData.selectedRecipients.includes(r.id)
    );

    let recipientCount = 0;
    if (formData.recipientType === 'all_sellers') recipientCount = sellers.length;
    else if (formData.recipientType === 'all_shops') recipientCount = shops.length;
    else recipientCount = formData.selectedRecipients.length;

    onSave({
      id: notice?.id,
      title: formData.title,
      content: formData.content,
      type: formData.type,
      priority: formData.priority,
      recipientType: formData.recipientType,
      recipients: selectedRecipientObjects,
      recipientCount,
      scheduledAt,
      expiresAt: formData.expiresAt ? new Date(formData.expiresAt).toISOString() : undefined,
      status: formData.scheduleType === 'scheduled' ? 'scheduled' : 'draft',
    });
    onClose();
  };

  const showRecipientSelection =
    formData.recipientType === 'individual_seller' || formData.recipientType === 'individual_shop';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="relative bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {notice ? 'Edit Notice' : 'Create Notice'}
              </h2>
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Recipient Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Send To</label>
              <div className="grid grid-cols-2 gap-3">
                {recipientTypes.map((rt) => (
                  <button
                    key={rt.value}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, recipientType: rt.value, selectedRecipients: [] })
                    }
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.recipientType === rt.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{rt.icon}</span>
                      <div>
                        <p className="font-medium text-gray-900">{rt.label}</p>
                        <p className="text-xs text-gray-500">{rt.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recipient Selection */}
            {showRecipientSelection && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-gray-700">
                    Select {formData.recipientType === 'individual_seller' ? 'Sellers' : 'Shops'}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={selectAllRecipients}
                      className="text-xs text-indigo-600 hover:text-indigo-700"
                    >
                      Select All
                    </button>
                    <span className="text-gray-300">|</span>
                    <button
                      type="button"
                      onClick={clearAllRecipients}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Clear
                    </button>
                  </div>
                </div>

                {/* Search */}
                <div className="relative mb-3">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
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
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                {/* Recipients List */}
                <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg divide-y divide-gray-100">
                  {filteredRecipients.map((recipient) => (
                    <label
                      key={recipient.id}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={formData.selectedRecipients.includes(recipient.id)}
                        onChange={() => toggleRecipient(recipient.id)}
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      {recipient.avatar && (
                        <img
                          src={recipient.avatar}
                          alt={recipient.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{recipient.name}</p>
                        <p className="text-xs text-gray-500 truncate">
                          {recipient.email}
                          {recipient.shopName && ` • ${recipient.shopName}`}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>

                {formData.selectedRecipients.length > 0 && (
                  <p className="text-sm text-indigo-600 mt-2">
                    {formData.selectedRecipients.length} recipient(s) selected
                  </p>
                )}
              </div>
            )}

            {/* Notice Type & Priority */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notice Type</label>
                <div className="grid grid-cols-3 gap-2">
                  {noticeTypes.map((type) => (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, type: type.value })}
                      className={`p-2 rounded-lg border-2 text-center transition-all ${
                        formData.type === type.value
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg">{type.icon}</span>
                      <p className="text-xs font-medium text-gray-700 mt-1">{type.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <div className="grid grid-cols-2 gap-2">
                  {priorities.map((p) => (
                    <button
                      key={p.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, priority: p.value })}
                      className={`p-2 rounded-lg border-2 text-center transition-all ${
                        formData.priority === p.value
                          ? `border-indigo-500 ${p.color}`
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="text-sm font-medium">{p.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter notice title..."
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={6}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your notice content here..."
                required
              />
            </div>

            {/* Schedule */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Schedule</label>
              <div className="flex gap-4 mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="schedule"
                    value="immediate"
                    checked={formData.scheduleType === 'immediate'}
                    onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value as 'immediate' | 'scheduled' })}
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
                    onChange={(e) => setFormData({ ...formData, scheduleType: e.target.value as 'immediate' | 'scheduled' })}
                    className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">Schedule for later</span>
                </label>
              </div>

              {formData.scheduleType === 'scheduled' && (
                <div className="grid grid-cols-2 gap-4">
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

            {/* Expiry */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date (Optional)
              </label>
              <input
                type="date"
                value={formData.expiresAt}
                onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                Notice will be automatically archived after this date
              </p>
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
                {formData.scheduleType === 'scheduled' ? 'Schedule Notice' : 'Save Draft'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
