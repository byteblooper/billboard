import React from "react";
import { Shield, MapPin, Zap, Award } from "lucide-react";

const WhyNearBy = () => {
  const features = [
    {
      id: 1,
      icon: Shield,
      title: "Verified Quality",
      description:
        "100% verified stores with premium products and guaranteed authenticity",
      color: "from-violet-500 to-indigo-600",
      bgColor: "bg-violet-500",
    },
    {
      id: 2,
      icon: MapPin,
      title: "50KM Radius Search",
      description:
        "Comprehensive location-based shopping with real-time distance tracking",
      color: "from-indigo-500 to-violet-600",
      bgColor: "bg-indigo-500",
    },
    {
      id: 3,
      icon: Zap,
      title: "Instant Deals",
      description:
        "Real-time deal notifications and flash sales from nearby premium stores",
      color: "from-violet-600 to-indigo-700",
      bgColor: "bg-violet-600",
    },
    {
      id: 4,
      icon: Award,
      title: "Premium Experience",
      description:
        "Curated luxury shopping with personalized recommendations and rewards",
      color: "from-indigo-600 to-violet-700",
      bgColor: "bg-indigo-600",
    },
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white via-violet-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-violet-600 mb-4">
            Why Choose NearByDeals?
          </h2>
          <p className="text-base md:text-lg text-indigo-700 font-medium max-w-3xl mx-auto">
            Premium shopping experience with verified quality and unbeatable
            local convenience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-violet-100 hover:border-violet-200 hover:-tranviolet-y-2"
              >
                {/* Icon Container */}
                <div className="mb-6 flex justify-center">
                  <div
                    className={`relative w-20 h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}
                  >
                    <Icon className="w-10 h-10 text-white" strokeWidth={2} />

                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity duration-500`}
                    ></div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-violet-800 mb-3 text-center group-hover:text-violet-600 transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-violet-600 text-center leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Line */}
                <div className="mt-6 flex justify-center">
                  <div
                    className={`h-1 w-12 bg-gradient-to-r ${feature.color} rounded-full opacity-0 group-hover:opacity-100 group-hover:w-20 transition-all duration-500`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-100 to-indigo-100 px-6 py-3 rounded-full border border-violet-200">
            <Shield className="w-5 h-5 text-violet-600" />
            <span className="text-indigo-800 font-semibold text-sm">
              Trusted by 50,000+ Happy Customers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyNearBy;
