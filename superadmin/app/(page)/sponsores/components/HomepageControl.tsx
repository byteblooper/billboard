'use client';

import { HomepageSection } from './types';

interface HomepageControlProps {
  sections: HomepageSection[];
  onToggle: (sectionId: string) => void;
  onReorder: (sectionId: string, direction: 'up' | 'down') => void;
  onEdit: (section: HomepageSection) => void;
}

const sectionTypeConfig: Record<string, { label: string; icon: string; description: string }> = {
  banner_carousel: { label: 'Banner Carousel', icon: '🖼️', description: 'Hero banner slider' },
  featured_products: { label: 'Featured Products', icon: '⭐', description: 'Highlighted products section' },
  featured_sellers: { label: 'Featured Sellers', icon: '🏪', description: 'Top sellers showcase' },
  categories: { label: 'Categories', icon: '📂', description: 'Category navigation grid' },
  deals: { label: 'Deals & Offers', icon: '🔥', description: 'Flash deals and discounts' },
  custom: { label: 'Custom Section', icon: '🔧', description: 'Custom content block' },
};

export default function HomepageControl({ sections, onToggle, onReorder, onEdit }: HomepageControlProps) {
  const sortedSections = [...sections].sort((a, b) => a.position - b.position);

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Homepage Sections</h3>
        <p className="text-sm text-gray-500">Drag to reorder or toggle visibility</p>
      </div>

      {/* Section List */}
      <div className="divide-y divide-gray-200">
        {sortedSections.map((section, index) => {
          const config = sectionTypeConfig[section.type];

          return (
            <div
              key={section.id}
              className={`p-4 flex items-center gap-4 ${!section.isActive ? 'opacity-60 bg-gray-50' : ''}`}
            >
              {/* Reorder Handle */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => onReorder(section.id, 'up')}
                  disabled={index === 0}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => onReorder(section.id, 'down')}
                  disabled={index === sortedSections.length - 1}
                  className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded disabled:opacity-30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Position Badge */}
              <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0">
                <span className="text-sm font-bold text-indigo-600">{section.position}</span>
              </div>

              {/* Section Icon */}
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">{config.icon}</span>
              </div>

              {/* Section Details */}
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{section.name}</h4>
                <p className="text-sm text-gray-500">{config.description}</p>
              </div>

              {/* Config Preview */}
              <div className="flex items-center gap-4">
                {section.config.maxItems !== undefined && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    Max: {section.config.maxItems as number} items
                  </span>
                )}
                {section.config.layout !== undefined && (
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                    {section.config.layout as string}
                  </span>
                )}
              </div>

              {/* Toggle & Edit */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onEdit(section)}
                  className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
                <button
                  onClick={() => onToggle(section.id)}
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    section.isActive ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      section.isActive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          💡 Tip: Sections are displayed in the order shown above. Disabled sections won&apos;t appear on the homepage.
        </p>
      </div>
    </div>
  );
}
