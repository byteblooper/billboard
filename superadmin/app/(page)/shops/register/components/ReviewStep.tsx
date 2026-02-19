'use client';

import { ShopRegistrationData } from './types';

interface ReviewStepProps {
  data: ShopRegistrationData;
  onEdit: (step: 'manager' | 'shop') => void;
}

export default function ReviewStep({ data, onEdit }: ReviewStepProps) {
  const formatTime = (time: string) => {
    if (!time) return '-';
    const [h, m] = time.split(':');
    const hour = parseInt(h);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const display = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    return `${display}:${m} ${ampm}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Review & Confirm</h3>
          <p className="text-sm text-gray-500">Please verify all information before submitting</p>
        </div>
      </div>

      {/* Manager Info Section */}
      <div className="bg-gray-50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Shop Manager
          </h4>
          <button
            onClick={() => onEdit('manager')}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Full Name" value={data.manager.name} />
          <InfoRow label="Email" value={data.manager.email} />
          <InfoRow label="Phone" value={data.manager.phone} />
          <InfoRow label="Password" value={'••••••••'} />
        </div>
      </div>

      {/* Shop Info Section */}
      <div className="bg-gray-50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 flex items-center gap-2">
            <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Shop Details
          </h4>
          <button
            onClick={() => onEdit('shop')}
            className="text-sm text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Shop Name" value={data.shop.shopName} />
          <InfoRow label="Trade License" value={data.shop.trade_licence} />
          <div className="col-span-2">
            <InfoRow label="Description" value={data.shop.description} />
          </div>
        </div>
      </div>

      {/* Contact Info Section */}
      <div className="bg-gray-50 rounded-xl p-5">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          Contact & Location
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Contact Email" value={data.shop.shop_contact_email} />
          <InfoRow label="Contact Phone" value={data.shop.shop_contact_phone} />
          <div className="col-span-2">
            <InfoRow label="Address" value={data.shop.shop_contact_address} />
          </div>
          <InfoRow label="City" value={data.shop.location_city} />
          <InfoRow label="Zone" value={data.shop.location_zone} />
        </div>
      </div>

      {/* Hours Section */}
      <div className="bg-gray-50 rounded-xl p-5">
        <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Operating Hours
        </h4>
        <div className="grid grid-cols-2 gap-4">
          <InfoRow label="Opens At" value={formatTime(data.shop.shop_open_at)} />
          <InfoRow label="Closes At" value={formatTime(data.shop.shop_close_at)} />
        </div>
      </div>

      {/* Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-800">Before submitting</p>
            <p className="text-sm text-amber-700 mt-1">
              A confirmation email will be sent to <strong>{data.manager.email}</strong> with login credentials.
              The shop will be created with <strong>Pending</strong> status until further review.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-0.5">{label}</p>
      <p className="text-sm font-medium text-gray-900">{value || <span className="text-gray-400">Not provided</span>}</p>
    </div>
  );
}
