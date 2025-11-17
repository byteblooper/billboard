'use client'

import { 
  Search, 
  MapPin, 
  Bell, 
  Heart, 
  ShoppingCart, 
  User, 
  Menu,
  Store,
  Map,
  GitCompare,
  Info,
  Award,
  X
} from 'lucide-react'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const pathname = usePathname()

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 cursor-pointer group">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-orange-600 to-amber-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 transition-all duration-300 group-hover:scale-105">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                NearByDeals
              </h1>
              <p className="text-xs text-slate-400 -mt-0.5">Premium Local Shopping</p>
            </div>
          </Link>











          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link 
              href="/" 
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                pathname === '/' 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <Store className="w-4 h-4" />
              Shop
              {pathname === '/' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></span>
              )}
            </Link>
            <Link 
              href="/nearMe" 
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                pathname === '/nearMe' 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <Map className="w-4 h-4" />
              Map
              {pathname === '/nearMe' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></span>
              )}
            </Link>
            <button className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all duration-200 font-medium">
              <GitCompare className="w-4 h-4" />
              Compare
              <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-full font-medium">0</span>
            </button>
            <Link 
              href="/about" 
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                pathname === '/about' 
                  ? 'text-orange-600 bg-orange-50' 
                  : 'text-slate-700 hover:text-orange-600 hover:bg-orange-50'
              }`}
            >
              <Info className="w-4 h-4" />
              About
              {pathname === '/about' && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></span>
              )}
            </Link>
          </nav>







          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-500 transition-colors" />
              <input
                type="text"
                placeholder="Search products, stores, or categories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent focus:bg-white transition-all duration-200"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
          

            {/* Mobile Search Toggle */}
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2.5 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <Search className="w-5 h-5 text-slate-700" />
            </button>

            {/* Notifications */}
            <button className="relative hidden sm:flex p-2.5 hover:bg-slate-50 rounded-lg transition-colors group">
              <Bell className="w-5 h-5 text-slate-700 group-hover:text-orange-600 group-hover:animate-pulse" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white animate-pulse"></span>
            </button>

            {/* Wishlist */}
            <Link href="/wilshlist" className="relative p-2.5 hover:bg-slate-50 rounded-lg transition-all duration-200 group">
              <Heart className="w-5 h-5 text-slate-700 group-hover:fill-red-500 group-hover:text-red-500 transition-all" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs flex items-center justify-center rounded-full font-semibold shadow-lg">
                3
              </span>
            </Link>

            {/* Cart */}
            <Link href="/addtocart" className="relative p-2.5 hover:bg-slate-50 rounded-lg transition-all duration-200 group">
              <ShoppingCart className="w-5 h-5 text-slate-700 group-hover:text-orange-600 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-orange-600 text-white text-xs flex items-center justify-center rounded-full font-semibold shadow-lg">
                5
              </span>
            </Link>

            {/* Profile */}
            <Link href="/profile" className="p-2.5 hover:bg-slate-50 rounded-lg transition-colors group">
              <User className="w-5 h-5 text-slate-700 group-hover:text-orange-600 transition-colors" />
            </Link>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden p-2.5 hover:bg-slate-50 rounded-lg transition-colors">
              <Menu className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {searchOpen && (
          <div className="md:hidden mt-3 animate-in slide-in-from-top-2 duration-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 rounded-full"
                >
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar
