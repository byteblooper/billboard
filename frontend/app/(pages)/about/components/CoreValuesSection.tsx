"use client";

import React from "react";
import { Shield, Zap, Heart, BadgeCheck, LucideIcon } from "lucide-react";

interface CoreValue {
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
}

const coreValues: CoreValue[] = [
  {
    icon: Shield,
    title: "Trust & Safety",
    desc: "Every store is verified, every product guaranteed",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    desc: "Lightning-fast delivery from stores near you",
    color: "from-violet-500 to-indigo-500",
  },
  {
    icon: Heart,
    title: "Community First",
    desc: "Supporting local businesses and neighborhoods",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: BadgeCheck,
    title: "Quality Assured",
    desc: "Premium products at competitive prices",
    color: "from-blue-500 to-indigo-500",
  },
];

const CoreValuesSection: React.FC = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {coreValues.map((value, i) => {
            const Icon = value.icon;
            return (
              <div
                key={i}
                className="p-6 bg-white rounded-3xl shadow-md hover:shadow-xl transition-all transform hover:scale-105 border border-gray-200"
              >
                <div
                  className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-linear-to-br ${value.color}`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
