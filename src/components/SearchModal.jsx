import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

export const SearchModal = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const filtered = products.filter(item => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.name.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q) ||
      item.format.toLowerCase().includes(q) ||
      item.shortDescription.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#E3ECE7] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#E3ECE7]">
          <Search className="w-5 h-5 text-[#087F68]" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search sunscreens, SPF 60, clear gel..."
            className="flex-1 bg-transparent text-[#202A26] placeholder-[#69736E] text-base focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#69736E] hover:text-[#202A26] px-2 py-1 bg-[#F8F8F3] rounded"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[#F8F8F3] text-[#69736E] hover:text-[#202A26] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="p-5 max-h-[60vh] overflow-y-auto">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#69736E] mb-3">
            {query.trim() ? `Products Matching "${query}"` : 'Featured Skincare'}
          </div>

          <div className="space-y-3">
            {filtered.map(product => (
              <Link
                key={product.id}
                to={`/products/${product.slug}`}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-[#D1E7DC] hover:bg-[#EAF5F0]/40 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-[#F8F8F3] border border-[#E3ECE7] p-1 flex items-center justify-center shrink-0">
                    <img
                      src={product?.images?.[0]?.src || product?.image || '/images/blushu-sunscreen-main.png'}
                      alt={product?.name || 'Product'}
                      className="max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#087F68] tracking-widest">{product.brand}</span>
                      {product.labelDetails?.spfRating && (
                        <span className="text-[11px] px-1.5 py-0.5 rounded bg-[#EAF5F0] text-[#075E50] font-medium">
                          {product.labelDetails.spfRating} {product.labelDetails.paRating || ''}
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-semibold text-[#202A26] group-hover:text-[#087F68] transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-xs text-[#69736E]">
                      {product.size} • {product.format} • ₹{product.price}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-medium text-[#087F68] group-hover:translate-x-1 transition-transform">
                  <span>View</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            ))}

            {filtered.length === 0 && (
              <div className="text-center py-8 text-[#69736E]">
                <p className="text-sm">No products found matching "{query}".</p>
                <p className="text-xs mt-1 text-[#69736E]/80">Try searching for "sunscreen", "gel", or "SPF 60".</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#F8F8F3] border-t border-[#E3ECE7] flex items-center justify-between text-xs text-[#69736E]">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#087F68]" />
            Authentic BLUSHU Everyday Sun Care
          </span>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  );
};
