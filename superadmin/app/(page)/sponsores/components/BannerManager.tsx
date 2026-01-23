'use client';

import { Banner, BannerPosition } from './types';

interface BannerManagerProps {
  banners: Banner[];
  onEdit: (banner: Banner) => void;
  onToggle: (bannerId: string) => void;
  onDelete: (bannerId: string) => void;
  onReorder: (bannerId: string, direction: 'up' | 'down') => void;
}

const positionConfig: Record<BannerPosition, { label: string; icon: string; color: string }> = {
  hero: { label: 'Hero Slider', icon: '🖼️', color: 'bg-indigo-100 text-indigo-700' },
  sidebar: { label: 'Sidebar', icon: '📐', color: 'bg-purple-100 text-purple-700' },
  popup: { label: 'Popup', icon: '💬', color: 'bg-pink-100 text-pink-700' },
  footer: { label: 'Footer', icon: '📋', color: 'bg-gray-100 text-gray-700' },
  category_top: { label: 'Category Top', icon: '📑', color: 'bg-blue-100 text-blue-700' },
};

export default function BannerManager({ banners, onEdit, onToggle, onDelete, onReorder }: BannerManagerProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-BD', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getCTR = (clicks: number, impressions: number) => {
    if (impressions === 0) return '0%';
    return ((clicks / impressions) * 100).toFixed(2) + '%';
  };

  const groupedBanners = banners.reduce((acc, banner) => {
    if (!acc[banner.position]) acc[banner.position] = [];
    acc[banner.position].push(banner);
    return acc;
  }, {} as Record<BannerPosition, Banner[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedBanners).map(([position, positionBanners]) => {
        const config = positionConfig[position as BannerPosition];
        const sortedBanners = [...positionBanners].sort((a, b) => a.priority - b.priority);

        return (
          <div key={position} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Position Header */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-lg ${config.color}`}>
                  {config.icon} {config.label}
                </span>
                <span className="text-sm text-gray-500">{sortedBanners.length} banners</span>
              </div>
            </div>

            {/* Banners List */}
            <div className="divide-y divide-gray-200">
              {sortedBanners.map((banner, index) => (
                <div key={banner.id} className={`p-4 flex gap-4 ${!banner.isActive ? 'opacity-60 bg-gray-50' : ''}`}>
                  {/* Banner Preview */}
                  <div className="w-48 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Banner Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900">{banner.title}</h4>
                        {banner.subtitle && (
                          <p className="text-sm text-gray-500 mt-0.5">{banner.subtitle}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-gray-500 mr-2">Priority: {banner.priority}</span>
                        <button
                          onClick={() => onReorder(banner.id, 'up')}
                          disabled={index === 0}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </button>
                        <button
                          onClick={() => onReorder(banner.id, 'down')}
                          disabled={index === sortedBanners.length - 1}
                          className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-6 mt-3">
                      <div>
                        <p className="text-xs text-gray-500">Impressions</p>
                        <p className="text-sm font-semibold text-gray-900">{banner.impressions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Clicks</p>
                        <p className="text-sm font-semibold text-gray-900">{banner.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">CTR</p>
                        <p className="text-sm font-semibold text-green-600">{getCTR(banner.clicks, banner.impressions)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Period</p>
                        <p className="text-sm text-gray-600">{formatDate(banner.startDate)} - {formatDate(banner.endDate)}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        onClick={() => onToggle(banner.id)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-lg ${
                          banner.isActive
                            ? 'text-yellow-700 bg-yellow-50 hover:bg-yellow-100'
                            : 'text-green-700 bg-green-50 hover:bg-green-100'
                        }`}
                      >
                        {banner.isActive ? 'Deactivate' : 'Activate'}
                      </button>
                      <button
                        onClick={() => onEdit(banner)}
                        className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      {banner.linkUrl && (
                        <a
                          href={banner.linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100"
                        >
                          Preview Link
                        </a>
                      )}
                      <button
                        onClick={() => onDelete(banner.id)}
                        className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-lg hover:bg-red-100"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
