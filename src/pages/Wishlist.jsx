import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';

export const Wishlist = () => {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-16 h-16 bg-[#EAF5F0] rounded-full flex items-center justify-center mx-auto text-[#087F68]">
          <Heart className="w-8 h-8 opacity-60" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202A26]">Your Wishlist is Empty</h1>
        <p className="text-sm text-[#69736E] max-w-sm mx-auto">
          Save your favorite everyday sun care essentials to revisit anytime.
        </p>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#087F68] text-white text-xs font-bold rounded-xl shadow-sm"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 text-left">
      <div className="pb-6 border-b border-[#E3ECE7] mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202A26] tracking-tight">
          Your Saved Sun Care ({wishlist.length})
        </h1>
        <p className="text-xs text-[#69736E] mt-1">
          Items saved to your local browser wishlist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {wishlist.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
