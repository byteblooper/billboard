"use client";

import React from "react";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <div className="bg-linear-to-br from-violet-600 to-violet-700 rounded-3xl p-12 shadow-xl relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Community Today
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto text-lg">
            Find deals, support local businesses, and get same-day delivery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/shop"
              className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-lg inline-block"
            >
              Start Shopping
            </Link>
            <Link
              href="/signin"
              className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-gray-900 transition-all hover:scale-105 inline-block"
            >
              Become a Partner
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
