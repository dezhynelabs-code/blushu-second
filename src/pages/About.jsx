import React from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { getMainProduct } from '../data/products';
import { ShieldCheck, Sun, CheckCircle2, Award, Sparkles, ArrowRight } from 'lucide-react';

export const About = () => {
  const mainProduct = getMainProduct();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16 text-left">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-[#087F68]">
          Our Brand Philosophy
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#202A26] tracking-tight leading-tight">
          Skincare That Fits Your Everyday.
        </h1>
        <p className="text-base sm:text-lg text-[#69736E] leading-relaxed">
          At BLUSHU, we believe everyday sun protection should feel light, clear, and effortless.
        </p>
      </div>

      {/* Main Narrative Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-[#69736E] text-sm sm:text-base leading-relaxed">
          <p>
            Sun care is the foundation of any enduring skincare routine. Yet so many people skip daily sunscreen because traditional formulas can feel heavy, chalky, or uncomfortable under daily light.
          </p>
          <p>
            BLUSHU was formulated to eliminate those compromises. With our signature <strong>Aqua Crystal Sunshield Clear Gel</strong>, we engineered a transparent texture that glides onto the skin without leaving a residue.
          </p>
          <p>
            Rated at <strong>SPF 60 PA+++</strong>, the product delivers dual broad-spectrum UVA and UVB defense in a compact, travel-friendly 50 g (1.76 oz) tube suitable for desk drawers, workout bags, and morning vanities alike.
          </p>

          <div className="pt-4 border-t border-[#E3ECE7] space-y-3">
            <h3 className="text-base font-bold text-[#202A26]">Our Transparency Commitment</h3>
            <p className="text-xs sm:text-sm text-[#69736E]">
              We communicate only what is verified on our product labels and grounded in recognized dermatological principles. We do not invent clinical trials, celebrity endorsements, or miracle claims. What you see on our tube is what you experience on your skin.
            </p>
          </div>
        </div>

        {/* Product Visual Box */}
        <div className="lg:col-span-5">
          <div className="bg-[#EAF5F0]/60 rounded-3xl border border-[#D1E7DC] p-8 sm:p-10 flex flex-col items-center text-center space-y-6 shadow-sm">
            <div className="w-56 h-64 bg-white rounded-2xl p-4 flex items-center justify-center border border-[#D1E7DC] shadow-xs">
              <img
                src={mainProduct.images[0].src}
                alt={mainProduct.images[0].alt}
                className="max-h-full object-contain drop-shadow-md"
              />
            </div>
            <div>
              <span className="text-xs font-bold text-[#087F68] tracking-widest uppercase">
                {mainProduct.brand}
              </span>
              <h4 className="text-base font-bold text-[#202A26] mt-0.5">
                {mainProduct.name}
              </h4>
              <p className="text-xs text-[#69736E] mt-1">
                {mainProduct.size} • {mainProduct.labelDetails.spfRating} {mainProduct.labelDetails.paRating}
              </p>
            </div>
            <Link
              to={`/products/${mainProduct.slug}`}
              className="px-6 py-3 bg-[#087F68] hover:bg-[#075E50] text-white text-xs font-bold rounded-xl transition-all shadow-xs"
            >
              Shop Aqua Crystal Sunshield
            </Link>
          </div>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="pt-10 border-t border-[#E3ECE7]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-2xl border border-[#E3ECE7] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5F0] text-[#087F68] flex items-center justify-center">
              <Sun className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#202A26]">Everyday Sun Shield</h3>
            <p className="text-xs text-[#69736E] leading-relaxed">
              SPF 60 defense designed for morning application before leaving the house or stepping out into the daylight.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-[#E3ECE7] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5F0] text-[#087F68] flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#202A26]">UVA & UVB Balance</h3>
            <p className="text-xs text-[#69736E] leading-relaxed">
              Engineered with balanced broad-spectrum filters guarding against sunburn (UVB) and premature skin aging (UVA).
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl border border-[#E3ECE7] space-y-3 shadow-xs">
            <div className="w-10 h-10 rounded-xl bg-[#EAF5F0] text-[#087F68] flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#202A26]">Honest Skincare</h3>
            <p className="text-xs text-[#69736E] leading-relaxed">
              Clear formulation transparency with batch traceability, factory packaging integrity, and direct consumer support.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
