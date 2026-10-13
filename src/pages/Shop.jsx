import React, { useState } from 'react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, ShieldCheck, Sun } from 'lucide-react';

export const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  const categories = [
    { id: 'all', label: 'All Sun Care' },
    { id: 'gel', label: 'Clear & Matte Gels' },
    { id: 'mist', label: 'Sunscreen Mists' },
    { id: 'recovery', label: 'After-Sun Care' },
    { id: 'spf60', label: 'SPF 60 PA+++' }
  ];

  const filteredProducts = products.filter(product => {
    if (selectedCategory === 'gel') return product.format.toLowerCase().includes('gel');
    if (selectedCategory === 'mist') return product.format.toLowerCase().includes('mist');
    if (selectedCategory === 'recovery') return product.category.toLowerCase().includes('recovery');
    if (selectedCategory === 'spf60') return product.labelDetails?.spfRating === 'SPF 60';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF5F0] text-[#075E50] text-xs font-bold uppercase tracking-wider">
          <Sun className="w-3.5 h-3.5 text-[#087F68]" />
          <span>Verified Daily Sun Protection</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202A26] tracking-tight">
          The BLUSHU Collection
        </h1>
        <p className="text-sm text-[#69736E] leading-relaxed">
          Crafted with intention. Minimalist formulas delivering broad-spectrum SPF 60 PA+++ UV shield for transparent everyday wear.
        </p>
      </div>

      {/* Filter and Count Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white rounded-2xl border border-[#E3ECE7] shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-[#087F68] text-white shadow-xs'
                  : 'bg-[#F8F8F3] text-[#202A26] hover:bg-[#EAF5F0]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4 text-xs text-[#69736E]">
          <span className="font-semibold text-[#202A26]">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
          </span>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#087F68]" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-[#F8F8F3] border border-[#E3ECE7] rounded-lg px-2.5 py-1.5 text-xs text-[#202A26] focus:outline-none focus:border-[#087F68]"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Catalog Transparency Notice */}
      <div className="p-6 bg-[#EAF5F0]/50 rounded-2xl border border-[#D1E7DC] text-center max-w-2xl mx-auto space-y-2">
        <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#075E50] uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-[#087F68]" />
          <span>Authentic Product Guarantee</span>
        </div>
        <p className="text-xs text-[#69736E] leading-relaxed">
          BLUSHU only catalogs products with verified laboratory packaging specifications. Additional SPF skincare formats will appear here upon official release.
        </p>
      </div>

    </div>
  );
};
