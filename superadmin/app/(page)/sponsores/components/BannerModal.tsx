'use client';

import { useState } from 'react';
import { Banner, BannerPosition } from './types';

interface BannerModalProps {
  banner: Banner | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (banner: Partial<Banner>) => void;
}

const bannerPositions: { value: BannerPosition; label: string; icon: string; dimensions: string }[] = [
  { value: 'hero', label: 'Hero Slider', icon: '🖼️', dimensions: '1200x400px' },
  { value: 'sidebar', label: 'Sidebar', icon: '📐', dimensions: '300x600px' },
  { value: 'popup', label: 'Popup Modal', icon: '💬', dimensions: '600x400px' },
  { value: 'footer', label: 'Footer', icon: '📋', dimensions: '1200x200px' },
  { value: 'category_top', label: 'Category Top', icon: '📑', dimensions: '1200x300px' },
];

export default function BannerModal({ banner, isOpen, onClose, onSave }: BannerModalProps) {
  const [formData, setFormData] = useState({
    title: banner?.title || '',
    subtitle: banner?.subtitle || '',
    imageUrl: banner?.imageUrl || '',
    mobileImageUrl: banner?.mobileImageUrl || '',
    linkUrl: banner?.linkUrl || '',
    position: banner?.position || 'hero' as BannerPosition,
    priority: banner?.priority || 1,
    startDate: banner?.startDate ? banner.startDate.split('T')[0] : '',
    endDate: banner?.endDate ? banner.endDate.split('T')[0] : '',
    targetAudience: banner?.targetAudience || '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      id: banner?.id,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      isActive: banner?.isActive ?? true,
      clicks: banner?.clicks || 0,
      impressions: banner?.impressions || 0,
    });
    onClose();
  };

  const selectedPosition = bannerPositions.find(p => p.value === formData.position);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />

        <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                {banner ? 'Edit Banner' : 'Create Banner'}
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
            {/* Position Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Banner Position</label>
              <div className="grid grid-cols-3 gap-2">
                {bannerPositions.map((pos) => (
                  <button
                    key={pos.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, position: pos.value })}
                    className={`p-3 rounded-lg border-2 text-left transition-all ${
                      formData.position === pos.value
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xl">{pos.icon}</span>
                    <p className="text-sm font-medium text-gray-700 mt-1">{pos.label}</p>
                    <p className="text-xs text-gray-500">{pos.dimensions}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Banner title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (Optional)</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Banner subtitle"
                />
              </div>
            </div>

            {/* Image URLs */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Desktop Image URL ({selectedPosition?.dimensions})
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://..."
                required
              />
              {formData.imageUrl && (
                <div className="mt-2 rounded-lg overflow-hidden border border-gray-200">
                  <img src={formData.imageUrl} alt="Desktop Preview" className="w-full h-32 object-cover" />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Image URL (Optional)
              </label>
              <input
                type="url"
                value={formData.mobileImageUrl}
                onChange={(e) => setFormData({ ...formData, mobileImageUrl: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://..."
              />
            </div>

            {/* Link URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Click URL (Optional)</label>
              <input
                type="text"
                value={formData.linkUrl}
                onChange={(e) => setFormData({ ...formData, linkUrl: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="/sale/summer or https://..."
              />
            </div>

            {/* Priority & Target Audience */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Display Priority</label>
                <input
                  type="number"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  min={1}
                  max={100}
                />
                <p className="text-xs text-gray-500 mt-1">Lower number = higher priority</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Audience (Optional)</label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., new_users, returning"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
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
                {banner ? 'Save Changes' : 'Create Banner'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
