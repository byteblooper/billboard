import React from 'react'
import { MapPin, Mail, Phone, Facebook, Twitter, Instagram, Linkedin, Youtube, Send, Award, Shield, Clock } from 'lucide-react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center shadow-lg">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">NearByDeals</h3>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Premium local shopping experience with verified stores within 50km. Real-time deals, instant notifications, and guaranteed quality.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-semibold">Verified</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-semibold">Premium</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-700">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-semibold">24/7</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'How It Works', 'Shop Categories', 'Flash Sales', 'Trending Deals', 'Become a Partner'].map((link, index) => (

                <li key={index}>
                  <Link href="#" className="text-slate-400 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 transition-all duration-200"></span>
                    {link}

                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Support</h4>
            <ul className="space-y-3">
              {['Help Center', 'Terms & Conditions', 'Privacy Policy', 'Return Policy', 'FAQs', 'Contact Us'].map((link, index) => (

                <li key={index}>
                  <Link href="#" className="text-slate-400 hover:text-orange-500 transition-colors duration-200 flex items-center gap-2 group">
                    <span className="w-0 group-hover:w-2 h-0.5 bg-orange-500 transition-all duration-200"></span>
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold mb-6 text-white">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-slate-400">
                  <MapPin className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">123 Market Street, Downtown, NY 10001</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Phone className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">+880 19326 00504</span>
                </li>
                <li className="flex items-center gap-3 text-slate-400">
                  <Mail className="w-5 h-5 text-orange-500 flex-shrink-0" />
                  <span className="text-sm">rianhasan1971@gmail.com</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-white">Newsletter</h4>
              <p className="text-slate-400 text-sm mb-3">Get exclusive deals and updates</p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                />
                <button className="px-4 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 my-12"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <div className="text-slate-400 text-sm text-center md:text-left">
            <p>© 2025 NearByDeals. All rights reserved. | Crafted with ❤️ for local shoppers</p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {[
              { icon: Facebook, href: '#', label: 'Facebook' },
              { icon: Twitter, href: '#', label: 'Twitter' },
              { icon: Instagram, href: '#', label: 'Instagram' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Youtube, href: '#', label: 'YouTube' }
            ].map((social, index) => {
              const Icon = social.icon
              return (
                <Link
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-slate-800 hover:bg-gradient-to-br hover:from-orange-500 hover:to-orange-600 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                >
                  <Icon className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" />
                </Link>
              )
            })}
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-xs mr-2">We Accept:</span>
            <div className="flex gap-2">
              {['VISA', 'MC', 'AMEX', 'PayPal'].map((payment, index) => (
                <div key={index} className="px-3 py-1.5 bg-slate-800 border border-slate-700 rounded text-xs font-bold text-slate-400">
                  {payment}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Bottom Bar */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500"></div>
    </footer>
  )
}

export default Footer
