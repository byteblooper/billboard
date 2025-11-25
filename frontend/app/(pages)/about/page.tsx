"use client";

import React from "react";
import Image from "next/image";
import {
  MapPin,
  Users,
  Store,
  Award,
  TrendingUp,
  Shield,
  Zap,
  Heart,
  Clock,
  BadgeCheck,
  Globe,
  Target,
} from "lucide-react";

// Demo Data
const statsData = [
  { value: "50K+", label: "Active Users" },
  { value: "2,000+", label: "Partner Stores" },
  { value: "100K+", label: "Products" },
  { value: "50KM", label: "Radius" },
];

const coreValues = [
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

const whyChooseUs = [
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

const teamMembers = [
  {
    name: "David Kim",
    role: "Head of Operations",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    name: "Lisa Anderson",
    role: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    name: "Maria Garcia",
    role: "Customer Success",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
    gradient: "from-indigo-500 to-yellow-500",
  },
  {
    name: "Robert Taylor",
    role: "Business Development",
    image:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop",
    gradient: "from-red-500 to-violet-500",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white overflow-hidden">
        {/* Optional background shapes for extra depth */}
        <div className="absolute inset-0">
          <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20 filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-24 -right-16 w-96 h-96 bg-violet-600 rounded-full opacity-20 filter blur-3xl animate-pulse"></div>
        </div>

        <div className=" mx-auto px-4 py-24 relative z-10 flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Glassy Text Panel */}
          <div
            className="md:w-2/3 text-center md:text-left space-y-6 
                    bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-lg"
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 px-4 py-2 rounded-full mb-4 justify-center md:justify-start">
              <Award className="w-4 h-4 text-white/70" />
              <span className="text-sm font-semibold text-white/70">
                About NearByDeals
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              Connecting You to Local Deals Within 50KM
            </h1>

            {/* Description */}
            <p className="text-white/70 text-lg md:text-xl leading-relaxed">
              We bring verified stores, instant deals, and premium products
              right to your fingertips.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-6">
              {statsData.map((stat, idx) => (
                <div key={idx} className="text-center md:text-left">
                  <div className="text-3xl md:text-4xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Mission & Vision */}
      <section className="container mx-auto px-4 py-20 grid md:grid-cols-2 gap-12">
        {[
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
        ].map((item, i) => (
          <div
            key={i}
            className="relative bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-gray-200"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-violet-600 to-violet-700 mb-6">
              <item.icon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {item.title}
            </h2>
            <p className="text-gray-600">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* Core Values */}
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
                    className={`w-16 h-16 rounded-xl flex items-center justify-center mb-4 bg-gradient-to-br ${value.color}`}
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

      {/* Why Choose Us */}
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
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
                <div className="relative bg-white rounded-2xl p-8 border border-gray-200 hover:border-gray-300 shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-violet-700 rounded-xl flex items-center justify-center flex-shrink-0">
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

      {/* Team Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="group relative bg-white rounded-3xl shadow-md p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-2 border border-gray-200"
              >
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="bg-gradient-to-br from-violet-600 to-violet-700 rounded-3xl p-12 shadow-xl relative overflow-hidden">
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Our Community Today
          </h2>
          <p className="text-white mb-8 max-w-2xl mx-auto">
            Find deals, support local businesses, and get same-day delivery.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-4 bg-white text-gray-900 font-bold rounded-xl hover:scale-105 transition-transform shadow-lg">
              Start Shopping
            </button>
            <button className="px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-gray-900 transition-all hover:scale-105">
              Become a Partner
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
