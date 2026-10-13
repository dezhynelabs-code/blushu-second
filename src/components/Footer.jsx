import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { Mail, Phone, Clock, MapPin, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#202A26] text-[#EAF5F0] pt-16 pb-12 border-t border-[#075E50]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#303E39]">
          
          {/* Brand Col (2 cols wide on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="inline-block">
              <div className="flex items-center tracking-[0.22em] text-2xl font-extrabold text-white">
                <span>BLUSHU</span>
                <span className="text-[10px] ml-0.5 -mt-2 text-[#087F68]">®</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#A3E5D0] block">
                Aqua Crystal Sunshield Clear Gel
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[#AAB5B0] leading-relaxed max-w-sm">
              {siteConfig.brand.description}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-[#A3E5D0]">
              <ShieldCheck className="w-4 h-4 text-[#087F68]" />
              <span>SPF 60 PA+++ UVA/UVB Defense • 50 g Net Wt.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A3E5D0]">
              Explore
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#AAB5B0]">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">Shop Sunscreen</Link>
              </li>
              <li>
                <Link to="/products/blushu-aqua-crystal-sunsheild" className="hover:text-white transition-colors">
                  Product Details
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Our Story</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A3E5D0]">
              Policies
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#AAB5B0]">
              <li>
                <Link to="/policy/shipping" className="hover:text-white transition-colors">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/policy/returns" className="hover:text-white transition-colors">Returns & Refunds</Link>
              </li>
              <li>
                <Link to="/policy/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/policy/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-white transition-colors">Payment Integration</Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#A3E5D0]">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-[#AAB5B0]">
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 mt-0.5 text-[#087F68] shrink-0" />
                <span>{siteConfig.contact.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 mt-0.5 text-[#087F68] shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 mt-0.5 text-[#087F68] shrink-0" />
                <span>{siteConfig.contact.supportHours}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#087F68] shrink-0" />
                <span>{siteConfig.contact.registeredOffice}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7B8B84]">
          <div>
            © {new Date().getFullYear()} {siteConfig.brand.legalName}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            {siteConfig.socialLinks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#A3E5D0] transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
