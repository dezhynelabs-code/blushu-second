import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, Zap, Shield, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { QuantitySelector } from './QuantitySelector';

export const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, setIsCartOpen } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, quantity, true);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, quantity, false);
    navigate('/checkout');
  };

  return (
    <div className="group bg-white rounded-2xl border border-[#E3ECE7] hover:border-[#087F68]/40 transition-all duration-300 card-shadow hover:shadow-xl flex flex-col justify-between overflow-hidden">
      {/* Top Media & Badges */}
      <div className="relative p-6 sm:p-8 bg-[#F8F8F3]/60 flex items-center justify-center min-h-[300px] sm:min-h-[360px] overflow-hidden">
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 items-start">
          {product.badge && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-[#087F68] text-white shadow-xs">
              {product.badge}
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-[#EAF5F0] text-[#075E50] border border-[#D1E7DC]">
            {product.labelDetails?.spfRating} {product.labelDetails?.paRating}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wide bg-white text-[#202A26] border border-[#E3ECE7] shadow-xs">
            {product.format}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all shadow-xs ${
            isFavorited
              ? 'bg-[#087F68] text-white shadow-md'
              : 'bg-white/80 hover:bg-white text-[#69736E] hover:text-[#087F68]'
          }`}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

        {/* Product Image Link */}
        <Link
          to={`/products/${product.slug}`}
          className="w-full flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
        >
          <img
            src={product.images[0].src}
            alt={product.images[0].alt}
            className="max-h-[260px] sm:max-h-[300px] w-auto object-contain drop-shadow-md"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Product Information */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-[#69736E] mb-1">
            <span className="font-bold text-[#087F68] tracking-widest uppercase">
              {product.brand}
            </span>
            <span className="flex items-center gap-1 font-medium text-[#075E50]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#087F68]" />
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </span>
          </div>

          <Link to={`/products/${product.slug}`}>
            <h3 className="text-lg font-bold text-[#202A26] group-hover:text-[#087F68] transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-[#69736E] mt-1 line-clamp-2">
            {product.shortDescription}
          </p>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-[#202A26]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            <span className="text-xs text-[#69736E]">
              ({product.size})
            </span>
          </div>
        </div>

        {/* Quantity and Actions */}
        <div className="pt-3 border-t border-[#E3ECE7] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#69736E]">Select Quantity:</span>
            <QuantitySelector
              quantity={quantity}
              onIncrease={() => setQuantity(q => Math.min(product.stockCount, q + 1))}
              onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
              max={product.stockCount}
              size="sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className="w-full py-2.5 px-3 rounded-xl border border-[#087F68] text-[#087F68] hover:bg-[#EAF5F0] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Bag</span>
            </button>

            <button
              onClick={handleBuyNow}
              className="w-full py-2.5 px-3 rounded-xl bg-[#087F68] hover:bg-[#075E50] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
