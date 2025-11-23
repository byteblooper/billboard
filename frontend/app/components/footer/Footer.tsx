"use client";

import React from "react";
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Award,
  Shield,
  Clock,
} from "lucide-react";
import Link from "next/link";

// Demo Data
const trustBadges = [
  { icon: Shield, text: "Verified", color: "text-indigo-400" },
  { icon: Award, text: "Premium", color: "text-violet-400" },
  { icon: Clock, text: "text-violet-300" },
];

const quickLinks = [
  "About Us",
  "How It Works",
  "Shop Categories",
  "Flash Sales",
  "Trending Deals",
  "Become a Partner",
];

const supportLinks = [
  "Help Center",
  "Terms & Conditions",
  "Privacy Policy",
  "Return Policy",
  "FAQs",
  "Contact Us",
];

const contactInfo = [
  {
    icon: MapPin,
    text: "123 Market Street, Downtown, NY 10001",
    isAddress: true,
  },
  { icon: Phone, text: "+880 19326 00504", isAddress: false },
  { icon: Mail, text: "rianhasan1971@gmail.com", isAddress: false },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

const paymentMethods = ["VISA", "MC", "AMEX", "PayPal"];

const Footer = () => {
  return (
    <footer className="bg-gradient-to-tr from-violet-900 via-indigo-900 to-violet-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-6 py-16">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand + About */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-extrabold">NearByDeals</h3>
              </div>
              <p className="text-white/80 text-sm leading-relaxed">
                Discover premium verified stores within 50km. Real-time deals,
                clean UI, and a superior local shopping experience.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              {trustBadges.map((badge, i) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg border border-white/10 hover:bg-white/20 transition"
                  >
                    <Icon className={`w-4 h-4 ${badge.color}`} />
                    <span className="text-xs font-semibold">{badge.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="text-white/90 hover:text-violet-300 transition flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-violet-400 transition-all duration-200"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href="#"
                    className="text-white/90 hover:text-indigo-300 transition flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-indigo-400 transition-all duration-200"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                {contactInfo.map((c, i) => {
                  const Icon = c.icon;
                  return (
                    <li
                      key={i}
                      className={`flex ${
                        c.isAddress ? "items-start" : "items-center"
                      } gap-3 text-white`}
                    >
                      <Icon
                        className={`w-5 h-5 text-indigo-400 ${
                          c.isAddress ? "mt-1" : ""
                        }`}
                      />
                      <span className="text-sm text-white/80">{c.text}</span>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-bold mb-4">Newsletter</h4>
              <p className="text-white/70 text-sm mb-3">
                Get premium deals & updates
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/70 focus:ring-2 focus:ring-violet-400 outline-none transition"
                />
                <button
                  aria-label="Clear search"
                  className="px-4 py-2.5 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-lg hover:scale-105 transition-all"
                >
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/70 text-sm text-center md:text-left">
            © 2025 NearByDeals — All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s, i) => {
              const Icon = s.icon;
              return (
                <Link
                  key={i}
                  href={s.href}
                  aria-label={s.label}
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gradient-to-br hover:from-violet-500 hover:to-indigo-600 hover:scale-110 transition shadow-md shadow-indigo-500/20"
                >
                  <Icon className="w-5 h-5 text-indigo-200 hover:text-white transition" />
                </Link>
              );
            })}
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <span className="text-white text-xs mr-2">We Accept:</span>
            <div className="flex gap-2">
              {paymentMethods.map((p, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 bg-white/10 border border-white/20 rounded text-xs font-bold text-white"
                >
                  {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
