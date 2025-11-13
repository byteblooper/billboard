import React from 'react'

// Simple inline SVG icons
const MapPin = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const Search = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
)

const Moon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const Bell = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
)

const Heart = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const ShoppingCart = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
)

const User = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const Menu = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)

const Navbar = () => {
  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
  <div className="container mx-auto px-4 py-3">
    <div className="flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer">
        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground hover:text-orange-600 transition-colors">NearByDeals</h1>
          <p className="text-xs text-muted-foreground -mt-0.5">Premium Local Shopping</p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6">
        <button className="text-muted-foreground hover:text-foreground transition-colors">Shop</button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">Map</button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">Compare (0)</button>
        <button className="text-muted-foreground hover:text-foreground transition-colors">About</button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2">
        {/* Loyalty Points */}
        <div className="hidden md:flex items-center gap-2 bg-gradient-to-r from-orange-100 to-amber-100 px-3 py-2 rounded-lg">
          <span className="text-xs font-medium text-orange-800">Points:</span>
          <span className="text-sm font-bold text-orange-900">0</span>
        </div>

        {/* Search Button */}
        <button className="hidden sm:flex p-2 hover:bg-accent rounded-md">
          <Search className="w-4 h-4" />
        </button>

        {/* Theme Toggle */}
        <button className="hidden sm:flex p-2 hover:bg-accent rounded-md">
          <Moon className="w-4 h-4" />
        </button>

        {/* Notifications */}
        <button className="relative hidden sm:flex p-2 hover:bg-accent rounded-md">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500 rounded-full"></span>
        </button>

        {/* Wishlist */}
        <button className="relative p-2 hover:bg-accent rounded-md">
          <Heart className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">0</span>
        </button>

        {/* Cart */}
        <button className="relative p-2 hover:bg-accent rounded-md">
          <ShoppingCart className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-orange-600 text-white text-xs flex items-center justify-center rounded-full">0</span>
        </button>

        {/* Profile */}
        <button className="p-2 hover:bg-accent rounded-md">
          <User className="w-4 h-4" />
        </button>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2 hover:bg-accent rounded-md">
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</header>
  )
}

export default Navbar
