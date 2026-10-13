import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-24 sm:py-32 text-center space-y-6">
      <div className="w-16 h-16 bg-[#EAF5F0] rounded-full flex items-center justify-center mx-auto text-[#087F68]">
        <Sun className="w-8 h-8" />
      </div>
      <span className="text-xs font-bold uppercase tracking-widest text-[#087F68]">
        404 — Page Not Found
      </span>
      <h1 className="text-3xl sm:text-4xl font-extrabold text-[#202A26] tracking-tight">
        Lost in the Sun?
      </h1>
      <p className="text-sm text-[#69736E] max-w-sm mx-auto">
        The page you are looking for doesn't exist or has moved. Return to the BLUSHU storefront to continue your sun care ritual.
      </p>
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#087F68] hover:bg-[#075E50] text-white text-xs font-bold rounded-xl transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
};
