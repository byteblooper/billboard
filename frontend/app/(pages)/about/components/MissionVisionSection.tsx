"use client";

import React from "react";
import { Target, Globe, LucideIcon } from "lucide-react";

interface MissionItem {
  title: string;
  icon: LucideIcon;
  desc: string;
}

const missionData: MissionItem[] = [
  {
    title: "Our Mission",
    icon: Target,
    desc: "Empower local communities with seamless shopping experiences connecting customers with verified stores.",
  },
  {
    title: "Our Vision",
    icon: Globe,
    desc: "Become the most trusted local shopping platform bridging traditional retail and modern e-commerce.",
  },
];

const MissionVisionSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12">
      {missionData.map((item, i) => {
        const Icon = item.icon;
        return (
          <div
            key={i}
            className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-gray-200"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-linear-to-br from-violet-600 to-violet-700 mb-6">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {item.title}
            </h2>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        );
      })}
    </section>
  );
};

export default MissionVisionSection;
