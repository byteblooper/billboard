'use client';

import React from 'react';

export default function MessagesPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full text-center">
        {/* Construction Icon */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
        </div>

        {/* Main Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          🚧 Under Construction 🚧
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          We&apos;re building a powerful <span className="font-semibold text-gray-800">Messaging System</span> for you.
        </p>

        <p className="text-gray-500 mb-8">
          This page is currently being developed with exciting communication features. Stay tuned!
        </p>

        {/* Progress Indicator */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700">Development Progress</span>
            <span className="text-sm font-bold text-indigo-600">30%</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full transition-all duration-1000"
              style={{ width: '30%' }}
            ></div>
          </div>
        </div>

        {/* Coming Soon Features */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-left">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-4">Coming Soon</h3>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-gray-600">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Real-time Chat with Sellers
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Support Ticket Management
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Automated Responses
            </li>
            <li className="flex items-center gap-3 text-gray-600">
              <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
              Message Templates
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
