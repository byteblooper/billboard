'use client';

import { ShopInfo, FormErrors, BD_CITIES, BD_ZONES } from './types';

interface ShopFormProps {
  data: ShopInfo;
  errors: FormErrors;
  onChange: (field: keyof ShopInfo, value: string) => void;
}

export default function ShopForm({ data, errors, onChange }: ShopFormProps) {
  const availableZones = data.location_city ? (BD_ZONES[data.location_city] || ['Downtown']) : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Shop Information</h3>
          <p className="text-sm text-gray-500">Set up shop details and operating hours</p>
        </div>
      </div>

      {/* Shop Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Shop Name <span className="text-red-500">*</span></label>
        <input
          type="text"
          value={data.shopName}
          onChange={(e) => onChange('shopName', e.target.value)}
          placeholder="e.g. My Shop"
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
            errors.shopName ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        />
        {errors.shopName && <p className="mt-1 text-sm text-red-500">{errors.shopName}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">Shop Description <span className="text-red-500">*</span></label>
        <textarea
          value={data.description}
          onChange={(e) => onChange('description', e.target.value)}
          placeholder="Describe your shop and what products/services you offer..."
          rows={3}
          className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors resize-none ${
            errors.description ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
        />
        <p className="mt-1 text-xs text-gray-400">{data.description.length}/500 characters</p>
        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
      </div>

      {/* Contact Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contact Details
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              value={data.shop_contact_email}
              onChange={(e) => onChange('shop_contact_email', e.target.value)}
              placeholder="shop@example.com"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                errors.shop_contact_email ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.shop_contact_email && <p className="mt-1 text-sm text-red-500">{errors.shop_contact_email}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Phone <span className="text-red-500">*</span></label>
            <input
              type="tel"
              value={data.shop_contact_phone}
              onChange={(e) => onChange('shop_contact_phone', e.target.value)}
              placeholder="+880 1XXX-XXXXXX"
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                errors.shop_contact_phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            {errors.shop_contact_phone && <p className="mt-1 text-sm text-red-500">{errors.shop_contact_phone}</p>}
          </div>
        </div>
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Shop Address <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={data.shop_contact_address}
            onChange={(e) => onChange('shop_contact_address', e.target.value)}
            placeholder="e.g. 123 Main St, Gulshan-1"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              errors.shop_contact_address ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.shop_contact_address && <p className="mt-1 text-sm text-red-500">{errors.shop_contact_address}</p>}
        </div>
      </div>

      {/* Location Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Location
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">City <span className="text-red-500">*</span></label>
            <select
              value={data.location_city}
              onChange={(e) => {
                onChange('location_city', e.target.value);
                onChange('location_zone', '');
              }}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors ${
                errors.location_city ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select City</option>
              {BD_CITIES.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {errors.location_city && <p className="mt-1 text-sm text-red-500">{errors.location_city}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Zone/Area <span className="text-red-500">*</span></label>
            <select
              value={data.location_zone}
              onChange={(e) => onChange('location_zone', e.target.value)}
              disabled={!data.location_city}
              className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed ${
                errors.location_zone ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            >
              <option value="">Select Zone</option>
              {availableZones.map((zone) => (
                <option key={zone} value={zone}>{zone}</option>
              ))}
            </select>
            {errors.location_zone && <p className="mt-1 text-sm text-red-500">{errors.location_zone}</p>}
          </div>
        </div>
      </div>

      {/* Business & Hours Section */}
      <div className="border-t border-gray-200 pt-6">
        <h4 className="text-sm font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Business & Operating Hours
        </h4>

        {/* Trade License */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Trade License Number <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={data.trade_licence}
            onChange={(e) => onChange('trade_licence', e.target.value)}
            placeholder="e.g. TL-12345"
            className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
              errors.trade_licence ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
          />
          {errors.trade_licence && <p className="mt-1 text-sm text-red-500">{errors.trade_licence}</p>}
        </div>

        {/* Operating Hours */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Opening Time <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                type="time"
                value={data.shop_open_at}
                onChange={(e) => onChange('shop_open_at', e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                  errors.shop_open_at ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.shop_open_at && <p className="mt-1 text-sm text-red-500">{errors.shop_open_at}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Closing Time <span className="text-red-500">*</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <input
                type="time"
                value={data.shop_close_at}
                onChange={(e) => onChange('shop_close_at', e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                  errors.shop_close_at ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.shop_close_at && <p className="mt-1 text-sm text-red-500">{errors.shop_close_at}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
