"use client";

import { useState, useEffect } from "react";
import { MapPin, X } from "lucide-react";

export default function LocationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal after a short delay
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl border border-violet-100 w-full max-w-sm p-6 sm:p-8">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-violet-400 hover:text-violet-600 transition-colors"
          aria-label="Close"
        >
          <X size={22} />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
            <MapPin size={32} className="text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-violet-900 mb-2">
            Enable Location
          </h2>
          <p className="text-violet-600 text-sm sm:text-base">
            Please turn on your location to find the best deals and stores near
            you.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleClose}
          className="w-full py-3.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2"
        >
          <MapPin size={20} />
          <span>Turn On Location</span>
        </button>

        {/* Skip link */}
        <button
          onClick={handleClose}
          className="w-full mt-3 py-2 text-violet-500 font-medium hover:text-violet-700 transition-colors text-sm"
        >
          Maybe Later
        </button>
      </div>
    </div>
  );
}
