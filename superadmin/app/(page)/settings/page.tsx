'use client';

import React from 'react';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {/* Construction Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🚧 Under Construction 🚧
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          We&apos;re working hard to bring you an amazing <span className="font-semibold text-gray-800">Settings</span> experience.
        </p>

        <p className="text-gray-500 mb-8">
          This page is currently being built with exciting new features. Please check back soon!
        </p>

        {/* Progress Indicator */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Development Progress</span>
            <span className="text-sm font-bold text-orange-600">45%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-1000"
              style={{ width: '45%' }}
            ></div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Coming Soon</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-600">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              Platform Configuration
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              Commission & Fee Settings
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              Payment Gateway Integration
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
              Email & Notification Templates
            </li>
          </ul>
        </div>

        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="mt-8 px-6 py-3 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );
}
