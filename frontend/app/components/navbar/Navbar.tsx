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
  Info,
  Shield,
  X,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
  Package,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  
  const profileRef = useRef<HTMLDivElement>(null);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // User data from session (only after mounted)
  const user = mounted ? session?.user : null;
  const isAdmin = (user as any)?.role === "admin"; // Add role check if you have it in your user model

  const allMenuItems = [
    { href: "/shop", label: "Shop", icon: Store, adminOnly: false },
    { href: "/map", label: "Map", icon: Map, adminOnly: false },
    { href: "/about", label: "About", icon: Info, adminOnly: false },
    { href: "/admin", label: "Admin", icon: Shield, adminOnly: true },
  ];

  // Filter menu items based on user role - only show admin route to admins
  const menuItems = allMenuItems.filter(
    (item) => !item.adminOnly || isAdmin
  );

  const transitionClass = "transition-all duration-300 ease-in-out";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setSearchOpen(false);
    setProfileDropdownOpen(false);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
    setSearchOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLogout = async () => {
    setProfileDropdownOpen(false);
    await signOut({ callbackUrl: '/' });
  };

  return (
    <header className="sticky top-0 z-50 bg-[#E6E6FA] border-b border-gray-200">
      <div className="w-full max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3 flex items-center justify-between gap-2">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="w-10 h-10 rounded-full bg-white border-2 border-violet-600 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-violet-600" />
          </div>
          <div className="flex flex-col leading-tight select-none">
            <h1 className="text-sm sm:text-lg md:text-xl font-extrabold bg-linear-to-r from-violet-600 to-indigo-700 bg-clip-text text-transparent whitespace-nowrap">
              NearByDeals
            </h1>
            <p className="hidden sm:block text-[9px] sm:text-xs text-gray-800 tracking-wide font-medium -mt-0.5 whitespace-nowrap">
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
                className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm ${transitionClass} ${
                  active
                    ? "text-violet-700"
                    : "text-gray-800 hover:text-violet-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                {item.label}
                <span
                  className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-[60%] bg-violet-600 rounded-full transition-all duration-300 ease-in-out ${
                    active ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
                />
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
              className={`w-full pl-11 pr-4 py-2.5 bg-white/60 border border-violet-500/40 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-violet-500 focus:bg-white ${transitionClass}`}
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
                ? "bg-white/50 text-violet-700"
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
            href="/wilshlist"
            className="relative p-2 hover:bg-white/40 rounded-full group transition"
          >
            <Heart className="w-5 h-5 text-gray-700 group-hover:text-violet-600" />
          </Link>

          {/* CART */}
          <Link
            href="/addtocart"
            className="relative p-2 hover:bg-white/40 rounded-full group transition"
          >
            <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-violet-700" />
          </Link>

          {/* PROFILE / AUTH */}
          <div className="relative" ref={profileRef}>
            {user ? (
              // Logged in - show profile dropdown
              <button
                onClick={toggleProfileDropdown}
                className="hidden sm:flex items-center gap-2 p-1.5 hover:bg-white/40 rounded-full transition"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-violet-400 bg-violet-100 flex items-center justify-center">
                  {user.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || 'User'}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-4 h-4 text-violet-600" />
                  )}
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-600 transition-transform ${profileDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            ) : (
              // Logged out - show auth buttons
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  href="/signin"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-violet-700 hover:bg-white/40 rounded-lg transition"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-white bg-linear-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 rounded-lg shadow-sm transition"
                >
                  <UserPlus className="w-4 h-4" />
                  Sign Up
                </Link>
              </div>
            )}

            {/* Profile Dropdown */}
            {profileDropdownOpen && user && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                {/* User Info */}
                <div className="p-4 bg-linear-to-r from-violet-50 to-indigo-50 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-violet-400 bg-violet-100 flex items-center justify-center">
                      {user.image ? (
                        <Image
                          src={user.image}
                          alt={user.name || 'User'}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-6 h-6 text-violet-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{user.name || (user as any).username || 'User'}</p>
                      <p className="text-xs text-violet-600">{user.email}</p>
                    </div>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="p-2">
                  <Link
                    href="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 rounded-lg transition"
                  >
                    <User className="w-4 h-4" />
                    My Profile
                  </Link>
                  <Link
                    href="/profile"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 rounded-lg transition"
                  >
                    <Package className="w-4 h-4" />
                    My Orders
                  </Link>
                  <Link
                    href="/wilshlist"
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-700 rounded-lg transition"
                  >
                    <Heart className="w-4 h-4" />
                    Wishlist
                  </Link>
                 
                </div>

                {/* Logout */}
                <div className="p-2 border-t border-gray-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* MOBILE MENU */}
          <button
            onClick={toggleMobileMenu}
            className={`lg:hidden p-2 rounded-full ${
              mobileMenuOpen
                ? "bg-white/60 text-violet-700"
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
        <div className="md:hidden px-4 pb-4 border-t border-gray-200 pt-3 bg-[#E6E6FA]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-11 pr-10 py-2.5 bg-white/60 border border-violet-400 rounded-xl text-sm text-gray-800 focus:ring-2 focus:ring-violet-600"
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
        <div className="lg:hidden px-4 pb-4 border-t border-gray-200 pt-3 bg-[#E6E6FA]">
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
                      ? "text-white bg-linear-to-r from-violet-600 to-indigo-700 shadow-md"
                      : "text-gray-800 hover:bg-white/50 hover:text-violet-700"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}

            {/* Mobile Profile/Auth Section */}
            <div className="mt-2 pt-2 border-t border-gray-300">
              {user ? (
                <>
                  <Link
                    href="/profile"
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-base text-gray-800 hover:bg-white/50 hover:text-violet-700 transition"
                  >
                    <User className="w-5 h-5" />
                    My Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMobileMenu();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-base text-red-600 hover:bg-red-50 transition"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-base text-gray-800 hover:bg-white/50 hover:text-violet-700 transition"
                  >
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    onClick={toggleMobileMenu}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-base text-white bg-linear-to-r from-violet-600 to-indigo-700 shadow-md transition"
                  >
                    <UserPlus className="w-5 h-5" />
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
