import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, ShieldCheck, Sparkles, ArrowRight, Sun, CheckCircle2, Droplets, Clock, RefreshCw, Truck, Lock, Award, Heart } from 'lucide-react';
import { products, getMainProduct } from '../data/products';
import { siteConfig } from '../data/siteConfig';
import { ProductCard } from '../components/ProductCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { NewsletterForm } from '../components/NewsletterForm';

export const Home = () => {
  const mainProduct = getMainProduct();

  return (
    <div className="space-y-20 sm:space-y-28 pb-20">
      
      {/* C. Premium Hero Section */}
      <section className="relative overflow-hidden pt-6 sm:pt-12 lg:pt-16 pb-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF5F0] border border-[#D1E7DC] text-[#075E50] text-xs font-bold tracking-widest uppercase">
                <Sun className="w-3.5 h-3.5 text-[#087F68]" />
                <span>EVERYDAY SUN CARE</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#202A26] tracking-tight leading-[1.1]">
                Your Daily Ritual. <br />
                <span className="text-[#087F68]">Your Sun Shield.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#69736E] leading-relaxed max-w-xl">
                Experience high-performance sun defense designed for seamless everyday wear. 
                BLUSHU Aqua Crystal Sunshield features a lightweight clear gel format delivering 
                high broad-spectrum <strong>SPF 60 PA+++</strong> UVA/UVB protection in a portable 50 g tube.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <Link
                  to={`/products/${mainProduct.slug}`}
                  className="px-8 py-4 rounded-xl bg-[#087F68] hover:bg-[#075E50] text-white text-sm font-bold tracking-wide flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Shop BLUSHU Sunscreen</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/about"
                  className="px-8 py-4 rounded-xl bg-white hover:bg-[#EAF5F0]/60 text-[#202A26] hover:text-[#087F68] border border-[#D1E7DC] text-sm font-bold tracking-wide flex items-center justify-center transition-all"
                >
                  <span>Discover Our Story</span>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-[#E3ECE7] flex flex-wrap items-center gap-6 text-xs text-[#69736E]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#087F68]" />
                  <span>SPF 60 PA+++ Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#087F68]" />
                  <span>Clear Gel Texture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#087F68]" />
                  <span>50 g / 1.76 oz Net Wt.</span>
                </div>
              </div>
            </div>

            {/* Right Hero Product Visual */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-md lg:max-w-lg aspect-4/5 bg-gradient-to-b from-[#F8F8F3] to-[#EAF5F0]/50 rounded-3xl border border-[#D1E7DC]/60 p-8 sm:p-12 flex items-center justify-center shadow-lg overflow-hidden group">
                
                {/* Subtle natural shadow backdrop */}
                <div className="absolute w-64 h-64 bg-[#087F68]/10 rounded-full blur-3xl pointer-events-none" />

                {/* Floating Packaging Badge */}
                <div className="absolute top-6 left-6 z-10 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D1E7DC] shadow-xs">
                  <span className="text-[11px] font-bold text-[#087F68] tracking-widest uppercase">
                    BLUSHU® Official Pack
                  </span>
                </div>

                {/* Floating Price Pill */}
                <div className="absolute bottom-6 right-6 z-10 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-[#D1E7DC] shadow-sm flex items-center gap-2">
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-[#69736E] block font-semibold">MRP</span>
                    <span className="text-sm font-extrabold text-[#202A26]">₹{mainProduct.price}</span>
                  </div>
                </div>

                {/* Product Tube Image */}
                <Link to={`/products/${mainProduct.slug}`} className="relative z-0 group-hover:scale-105 transition-transform duration-700 ease-out">
                  <img
                    src={mainProduct.images[0].src}
                    alt={mainProduct.images[0].alt}
                    className="max-h-[380px] sm:max-h-[440px] w-auto object-contain drop-shadow-2xl select-none"
                    fetchPriority="high"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* D. Product Highlights (3 Elegant Cards) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#EAF5F0] text-[#075E50] text-xs font-bold uppercase tracking-wider mb-2">
            Verified Packaging Specifications
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202A26] tracking-tight">
            Formulation & Sun Shield Highlights
          </h2>
          <p className="mt-2 text-sm text-[#69736E]">
            Derived directly from the official packaging label for complete consumer transparency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {mainProduct.verifiedHighlights.map((highlight, idx) => (
            <div
              key={idx}
              className="p-8 bg-white rounded-2xl border border-[#E3ECE7] hover:border-[#087F68]/40 transition-all card-shadow hover:-translate-y-1 space-y-4 text-left"
            >
              <div className="w-12 h-12 rounded-xl bg-[#EAF5F0] text-[#087F68] flex items-center justify-center">
                {idx === 0 && <Sun className="w-6 h-6" />}
                {idx === 1 && <Shield className="w-6 h-6" />}
                {idx === 2 && <Droplets className="w-6 h-6" />}
              </div>

              <div>
                <span className="text-[11px] font-bold text-[#087F68] tracking-widest uppercase">
                  {highlight.subtitle}
                </span>
                <h3 className="text-xl font-bold text-[#202A26] mt-0.5">
                  {highlight.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-[#69736E] leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* E. Featured Collection Section (4 Products) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-white to-[#F8F8F3] rounded-3xl border border-[#E3ECE7] p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#E3ECE7]">
            <div className="text-left">
              <span className="text-xs font-bold uppercase tracking-widest text-[#087F68]">
                Everyday Sun Care Routine
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202A26] mt-1">
                The BLUSHU Sun Protection Range
              </h2>
              <p className="text-xs sm:text-sm text-[#69736E] mt-1">
                From high-defense clear gels to on-the-go reapplication mists and barrier recovery.
              </p>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-[#087F68] hover:text-[#075E50] flex items-center gap-1 group self-start md:self-auto"
            >
              <span>View Full Shop ({products.length} Products)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>

      {/* F. Brand Story */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#EAF5F0]/60 rounded-3xl p-8 sm:p-14 border border-[#D1E7DC]">
          <div className="lg:col-span-7 space-y-5 text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-[#087F68]">
              About BLUSHU
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#202A26] tracking-tight leading-snug">
              Skincare That Fits Your Everyday.
            </h2>
            <p className="text-sm sm:text-base text-[#69736E] leading-relaxed">
              BLUSHU was conceived around a simple principle: sun protection shouldn't feel like a chore. 
              By embracing a clear gel texture that applies smoothly without chalkiness, BLUSHU Aqua Crystal Sunshield 
              integrates effortlessly into your morning habits.
            </p>
            <p className="text-sm sm:text-base text-[#69736E] leading-relaxed">
              We focus on honest, transparent communication. No exaggerated claims, no unverified certifications — 
              just verified high broad-spectrum UV protection crafted for real, daily life.
            </p>
            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#087F68] hover:text-[#075E50]"
              >
                <span>Read our brand philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="bg-white p-6 rounded-2xl border border-[#D1E7DC] shadow-md max-w-sm w-full space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#EAF5F0] flex items-center justify-center text-[#087F68]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#202A26]">Pure Everyday Formula</h4>
                  <p className="text-[11px] text-[#69736E]">50 g Clear Gel Sunscreen</p>
                </div>
              </div>
              <p className="text-xs text-[#69736E] leading-relaxed">
                Packaged in a lightweight tube with a flip-cap designed for convenient daily carry in your work tote, gym duffle, or travel kit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* G. Product Benefits & Evidence-Based Usage */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#087F68]">
            Evidence-Based Guidance
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202A26] tracking-tight mt-1">
            How to Use Daily Sun Protection
          </h2>
          <p className="mt-2 text-sm text-[#69736E]">
            Follow recognized dermatological best practices for effective UV defense.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainProduct.usageGuide.steps.map((step) => (
            <div
              key={step.step}
              className="p-6 bg-white rounded-2xl border border-[#E3ECE7] space-y-3 text-left shadow-xs hover:border-[#D1E7DC] transition-all"
            >
              <div className="text-xs font-extrabold text-[#087F68] bg-[#EAF5F0] w-8 h-8 rounded-lg flex items-center justify-center">
                {step.step}
              </div>
              <h3 className="text-base font-bold text-[#202A26]">
                {step.title}
              </h3>
              <p className="text-xs text-[#69736E] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-[#F8F8F3] border border-[#E3ECE7] rounded-xl text-center text-xs text-[#69736E] max-w-3xl mx-auto">
          <strong>Important Advisory:</strong> {mainProduct.usageGuide.officialNote}
        </div>
      </section>

      {/* H. Trust Section (Verified customer benefits & policies) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-[#E3ECE7] flex items-start gap-4 text-left">
            <div className="p-3 bg-[#EAF5F0] rounded-xl text-[#087F68] shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#202A26]">Secure Checkout Ready</h4>
              <p className="text-xs text-[#69736E] mt-1">
                Encrypted payment architecture supporting Razorpay, UPI, & Net Banking.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E3ECE7] flex items-start gap-4 text-left">
            <div className="p-3 bg-[#EAF5F0] rounded-xl text-[#087F68] shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#202A26]">Fast Indian Shipping</h4>
              <p className="text-xs text-[#69736E] mt-1">
                Dispatches in 24–48 hours. Free delivery on orders above ₹999.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E3ECE7] flex items-start gap-4 text-left">
            <div className="p-3 bg-[#EAF5F0] rounded-xl text-[#087F68] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#202A26]">Authentic Product Guarantee</h4>
              <p className="text-xs text-[#69736E] mt-1">
                Direct-from-source authentic BLUSHU batches with transparent labeling.
              </p>
            </div>
          </div>

          <div className="p-6 bg-white rounded-2xl border border-[#E3ECE7] flex items-start gap-4 text-left">
            <div className="p-3 bg-[#EAF5F0] rounded-xl text-[#087F68] shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-[#202A26]">7-Day Return Policy</h4>
              <p className="text-xs text-[#69736E] mt-1">
                Eligible for unopened, sealed products as per hygiene standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* I. FAQ Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FAQAccordion />
      </section>

      {/* J. Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#EAF5F0] to-[#F8F8F3] rounded-3xl border border-[#D1E7DC] p-8 sm:p-14 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#087F68]">
            Stay Informed
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#202A26] mt-2 mb-3">
            Join the BLUSHU Sun Care Community
          </h2>
          <p className="text-sm text-[#69736E] max-w-md mx-auto mb-8">
            Receive evidence-backed UV safety tips, seasonal skin advice, and updates on future BLUSHU product drops.
          </p>

          <NewsletterForm />
        </div>
      </section>

    </div>
  );
};
