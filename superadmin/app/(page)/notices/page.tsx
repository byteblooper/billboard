'use client';

import { useState, useMemo } from 'react';
import {
  NoticeList,
  NoticeModal,
  NoticeStatsCard,
  NoticeViewModal,
  Notice,
  NoticeStatus,
  NoticeType,
  RecipientType,
  demoNotices,
  demoSellers,
  demoShops,
  calculateNoticeStats,
} from './components';

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>(demoNotices);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<NoticeStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<NoticeType | 'all'>('all');
  const [recipientFilter, setRecipientFilter] = useState<RecipientType | 'all'>('all');

  // Calculate stats
  const stats = useMemo(() => calculateNoticeStats(notices), [notices]);

  // Filter notices
  const filteredNotices = useMemo(() => {
    return notices.filter((notice) => {
      const matchesSearch =
        notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || notice.status === statusFilter;
      const matchesType = typeFilter === 'all' || notice.type === typeFilter;
      const matchesRecipient = recipientFilter === 'all' || notice.recipientType === recipientFilter;

      return matchesSearch && matchesStatus && matchesType && matchesRecipient;
    });
  }, [notices, searchQuery, statusFilter, typeFilter, recipientFilter]);

  // Handlers
  const handleCreateNotice = () => {
    setSelectedNotice(null);
    setIsModalOpen(true);
  };

  const handleEditNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  const handleViewNotice = (notice: Notice) => {
    setSelectedNotice(notice);
    setIsViewModalOpen(true);
  };

  const handleSaveNotice = (noticeData: Partial<Notice>) => {
    if (noticeData.id) {
      // Update existing notice
      setNotices((prev) =>
        prev.map((n) =>
          n.id === noticeData.id
            ? { ...n, ...noticeData, updatedAt: new Date().toISOString() }
            : n
        )
      );
    } else {
      // Create new notice
      const newNotice: Notice = {
        id: `notice-${Date.now()}`,
        title: noticeData.title || '',
        content: noticeData.content || '',
        type: noticeData.type || 'announcement',
        priority: noticeData.priority || 'medium',
        status: noticeData.status || 'draft',
        recipientType: noticeData.recipientType || 'all_sellers',
        recipients: noticeData.recipients || [],
        recipientCount: noticeData.recipientCount || 0,
        readCount: 0,
        scheduledAt: noticeData.scheduledAt,
        expiresAt: noticeData.expiresAt,
        createdBy: 'Admin',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotices((prev) => [newNotice, ...prev]);
    }
  };

  const handleSendNotice = (noticeId: string) => {
    if (confirm('Are you sure you want to send this notice now?')) {
      setNotices((prev) =>
        prev.map((n) =>
          n.id === noticeId
            ? { ...n, status: 'sent' as NoticeStatus, sentAt: new Date().toISOString() }
            : n
        )
      );
    }
  };

  const handleDeleteNotice = (noticeId: string) => {
    if (confirm('Are you sure you want to delete this notice?')) {
      setNotices((prev) => prev.filter((n) => n.id !== noticeId));
    }
  };

  const handleArchiveNotice = (noticeId: string) => {
    setNotices((prev) =>
      prev.map((n) => (n.id === noticeId ? { ...n, status: 'archived' as NoticeStatus } : n))
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notices</h1>
          <p className="text-gray-500 mt-1">
            Send announcements and updates to sellers and shops
          </p>
        </div>
        <button
          onClick={handleCreateNotice}
          className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create Notice
        </button>
      </div>

      {/* Stats */}
      <NoticeStatsCard stats={stats} />

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Search */}
          <div className="lg:col-span-2">
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
                placeholder="Search notices..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as NoticeStatus | 'all')}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="all">All Status</option>
            <option value="draft">Draft</option>
            <option value="scheduled">Scheduled</option>
            <option value="sent">Sent</option>
            <option value="archived">Archived</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as NoticeType | 'all')}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="all">All Types</option>
            <option value="announcement">📢 Announcement</option>
            <option value="update">🔄 Update</option>
            <option value="warning">⚠️ Warning</option>
            <option value="maintenance">🔧 Maintenance</option>
            <option value="promotion">🎉 Promotion</option>
            <option value="policy">📋 Policy</option>
          </select>

          {/* Recipient Filter */}
          <select
            value={recipientFilter}
            onChange={(e) => setRecipientFilter(e.target.value as RecipientType | 'all')}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white"
          >
            <option value="all">All Recipients</option>
            <option value="all_sellers">All Sellers</option>
            <option value="individual_seller">Individual Sellers</option>
            <option value="all_shops">All Shops</option>
            <option value="individual_shop">Individual Shops</option>
          </select>
        </div>
      </div>

      {/* Notice List */}
      <NoticeList
        notices={filteredNotices}
        onView={handleViewNotice}
        onEdit={handleEditNotice}
        onSend={handleSendNotice}
        onDelete={handleDeleteNotice}
        onArchive={handleArchiveNotice}
      />

      {/* Create/Edit Modal */}
      <NoticeModal
        notice={selectedNotice}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNotice}
        sellers={demoSellers}
        shops={demoShops}
      />

      {/* View Modal */}
      <NoticeViewModal
        notice={selectedNotice}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </div>
  );
}
