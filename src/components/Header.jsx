import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X, Shield, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { SearchModal } from './SearchModal';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { totalWishlist } = useWishlist();
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Shop', path: '/shop' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F8F8F3]/95 backdrop-blur-md border-b border-[#E3ECE7]/80 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Mobile Menu Button & Desktop Navigation */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 -ml-2 text-[#202A26] hover:text-[#087F68] transition-colors"
                aria-label="Open mobile menu"
              >
                <Menu className="w-6 h-6" />
              </button>

              <nav className="hidden lg:flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-sm font-medium tracking-wide transition-all relative py-1 ${
                      isActive(link.path)
                        ? 'text-[#087F68] font-semibold'
                        : 'text-[#202A26]/80 hover:text-[#087F68]'
                    }`}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#087F68] rounded-full" />
                    )}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center: Brand Logo / Wordmark */}
            <div className="flex items-center justify-center">
              <Link to="/" className="group flex flex-col items-center">
                <div className="flex items-center tracking-[0.22em] text-2xl sm:text-3xl font-extrabold text-[#087F68] group-hover:text-[#075E50] transition-colors">
                  <span>BLUSHU</span>
                  <span className="text-[10px] font-semibold tracking-normal text-[#087F68] ml-0.5 -mt-3">®</span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-[#69736E] -mt-0.5 hidden sm:block">
                  Aqua Crystal Sunshield
                </span>
              </Link>
            </div>

            {/* Right: Actions (Search, Wishlist, Cart) */}
            <div className="flex items-center gap-1 sm:gap-3">
              {/* Search Toggle */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 text-[#202A26] hover:text-[#087F68] hover:bg-[#EAF5F0]/60 rounded-full transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/wishlist"
                className="p-2.5 text-[#202A26] hover:text-[#087F68] hover:bg-[#EAF5F0]/60 rounded-full transition-colors relative"
                aria-label="View Wishlist"
              >
                <Heart className="w-5 h-5" />
                {totalWishlist > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#087F68] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {totalWishlist}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="p-2.5 text-[#202A26] hover:text-[#087F68] hover:bg-[#EAF5F0]/60 rounded-full transition-colors relative"
                aria-label="Open Shopping Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-[#087F68] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm animate-pulse">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#F8F8F3] shadow-2xl p-6 flex flex-col justify-between z-10 animate-fade-in border-r border-[#E3ECE7]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E3ECE7]">
                <div className="flex items-center tracking-[0.22em] text-2xl font-extrabold text-[#087F68]">
                  <span>BLUSHU</span>
                  <span className="text-[10px] ml-0.5 -mt-2">®</span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#69736E] hover:text-[#202A26] rounded-full"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-3 rounded-xl text-base font-medium transition-all ${
                      isActive(link.path)
                        ? 'bg-[#EAF5F0] text-[#087F68] font-semibold'
                        : 'text-[#202A26] hover:bg-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-[#202A26] hover:bg-white flex items-center justify-between"
                >
                  <span>Wishlist</span>
                  {totalWishlist > 0 && (
                    <span className="px-2 py-0.5 bg-[#EAF5F0] text-[#087F68] text-xs font-bold rounded-full">
                      {totalWishlist} items
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Bottom info in mobile drawer */}
            <div className="pt-6 border-t border-[#E3ECE7] space-y-3">
              <div className="flex items-center gap-2 text-xs text-[#087F68] font-medium bg-[#EAF5F0] p-3 rounded-xl">
                <Shield className="w-4 h-4 shrink-0" />
                <span>SPF 60 PA+++ UVA/UVB Protection</span>
              </div>
              <p className="text-xs text-[#69736E] text-center">
                BLUSHU Everyday Skincare • 50 g Clear Gel
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
