"use client";

import React from "react";
import { MapPin, Clock, Store, TrendingUp, Users, Award, LucideIcon } from "lucide-react";

interface WhyChooseItem {
  icon: LucideIcon;
  title: string;
  desc: string;
  stats: string;
}

const whyChooseUs: WhyChooseItem[] = [
  {
    icon: MapPin,
    title: "Hyper-Local Focus",
    desc: "All products from stores within 50KM radius",
    stats: "50KM Radius",
  },
  {
    icon: Clock,
    title: "Same-Day Delivery",
    desc: "Get your orders delivered on the same day",
    stats: "2-4 Hours",
  },
  {
    icon: Store,
    title: "Verified Stores",
    desc: "Every merchant verified and quality-checked",
    stats: "100% Verified",
  },
  {
    icon: TrendingUp,
    title: "Best Prices",
    desc: "Competitive pricing with exclusive deals",
    stats: "Up to 70% Off",
  },
  {
    icon: Users,
    title: "Community Driven",
    desc: "Real reviews from real local customers",
    stats: "50K+ Reviews",
  },
  {
    icon: Award,
    title: "Premium Support",
    desc: "24/7 customer support for all your needs",
    stats: "24/7 Support",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
        Why Choose NearByDeals?
      </h2>
      <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
        We&apos;re not just another shopping platform. We&apos;re your local
        shopping companion.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {whyChooseUs.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div key={idx} className="relative group">
              <div className="absolute inset-0 bg-linear-to-br from-gray-200/50 to-gray-300/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
              <div className="relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 shadow-md hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-linear-to-br from-violet-600 to-violet-700 rounded-xl flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <span className="text-gray-900 font-bold text-lg">
                    {feature.stats}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
