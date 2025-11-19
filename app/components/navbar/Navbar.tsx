"use client";

import {
  Search,
  Menu,
  User,
  ShoppingCart,
  Heart,
  MapPin,
  Store,
  Map,
  GitCompare,
  Info,
  Shield,
  X,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const menuItems = [
    { href: "/shop", label: "Shop", icon: Store },
    { href: "/map", label: "Map", icon: Map },
    { href: "/compare", label: "Compare", icon: GitCompare },
    { href: "/about", label: "About", icon: Info },
    { href: "/admin", label: "Admin", icon: Shield },
  ];

  const transitionClass = "transition-all duration-300 ease-in-out";

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setSearchOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-cyan-400/20 backdrop-blur-xl border-b border-cyan-500/30 shadow-[0_4px_25px_rgba(0,0,0,0.12)]`}
    >
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3 flex items-center justify-between gap-2">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-700 flex items-center justify-center text-white shadow-lg shadow-cyan-300/40 group-hover:scale-105 transition-all">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          <div className="flex flex-col leading-tight select-none">
            <h1 className="text-sm sm:text-lg md:text-xl font-extrabold bg-gradient-to-r from-cyan-600 to-cyan-800 bg-clip-text text-transparent whitespace-nowrap">
              NearByDeals
            </h1>
            <p className="hidden xs:block text-[9px] sm:text-xs text-gray-800 tracking-wide font-medium -mt-0.5 whitespace-nowrap">
              Premium Local Shopping
            </p>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <nav className="hidden lg:flex items-center gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm ${transitionClass} ${
                  active
                    ? "text-white bg-gradient-to-r from-cyan-600 to-cyan-700 shadow-md shadow-cyan-300/50"
                    : "text-gray-800 hover:bg-white/40 hover:text-cyan-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP SEARCH */}
        <div className="hidden md:flex flex-1 max-w-lg mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, stores, categories..."
              className={`w-full pl-11 pr-4 py-2.5 bg-white/60 border border-cyan-500/40 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-cyan-500 focus:bg-white ${transitionClass}`}
            />
            {query && (
              <button
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/70 rounded-full transition"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-1 shrink-0">

          {/* MOBILE SEARCH */}
          <button
            onClick={toggleSearch}
            className={`md:hidden p-2 rounded-full ${
              searchOpen
                ? "bg-white/50 text-cyan-700"
                : "hover:bg-white/40 text-gray-700"
            } ${transitionClass}`}
          >
            {searchOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>

          {/* WISHLIST */}
          <Link
            href="/wishlist"
            className="relative p-2 hover:bg-white/40 rounded-full group transition"
          >
            <Heart className="w-5 h-5 text-gray-700 group-hover:text-cyan-600" />
            <span className="absolute -top-1 -right-1 text-[9px] sm:text-[10px] bg-cyan-600 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold ring-1 ring-white/50">
              3
            </span>
          </Link>

          {/* CART */}
          <Link
            href="/cart"
            className="relative p-2 hover:bg-white/40 rounded-full group transition"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-cyan-700" />
            <span className="absolute -top-1 -right-1 text-[9px] sm:text-[10px] bg-cyan-700 text-white w-4 h-4 rounded-full flex items-center justify-center font-bold ring-1 ring-white/50">
              5
            </span>
          </Link>

          {/* PROFILE */}
          <Link
            href="/profile"
            className="hidden xs:block p-2 hover:bg-white/40 rounded-full group transition"
          >
            <User className="w-5 h-5 text-gray-700 group-hover:text-cyan-700" />
          </Link>

          {/* MOBILE MENU */}
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2 rounded-full ${
              mobileMenuOpen
                ? "bg-white/60 text-cyan-700"
                : "hover:bg-white/40 text-gray-700"
            } transition`}
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE SEARCH BAR */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-4 border-t border-cyan-300/30 pt-3 bg-cyan-100/40 backdrop-blur-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-10 py-2.5 bg-white/60 border border-cyan-400 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-cyan-600"
            />
            {query && (
              <button
                aria-label="Clear search"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-white/70 rounded-full transition"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pb-4 border-t border-cyan-300/30 pt-3 bg-cyan-100/40 backdrop-blur-xl">
          <nav className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={toggleMobileMenu}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-base transition ${
                    active
                      ? "text-white bg-gradient-to-r from-cyan-600 to-cyan-700 shadow-md"
                      : "text-gray-800 hover:bg-white/50 hover:text-cyan-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}
