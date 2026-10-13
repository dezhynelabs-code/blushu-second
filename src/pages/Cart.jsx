import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { QuantitySelector } from '../components/QuantitySelector';
import { Trash2, ArrowRight, ShoppingBag, Truck, ShieldCheck, Tag } from 'lucide-react';

export const Cart = () => {
  const {
    items,
    totalItems,
    subtotal,
    shippingFee,
    total,
    isFreeShipping,
    amountNeededForFreeShipping,
    freeShippingProgress,
    updateQuantity,
    removeFromCart,
    clearCart
  } = useCart();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const navigate = useNavigate();

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoCode.trim()) {
      setPromoError('Please enter a coupon code.');
      return;
    }
    if (promoCode.trim().toUpperCase() === 'BLUSHU10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try BLUSHU10');
    }
  };

  const discountAmount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const finalTotal = total - discountAmount;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-[#EAF5F0] rounded-full flex items-center justify-center mx-auto text-[#087F68]">
          <ShoppingBag className="w-10 h-10 opacity-70" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#202A26]">Your Bag is Empty</h1>
        <p className="text-sm text-[#69736E] max-w-md mx-auto">
          Start your daily sun ritual with BLUSHU Aqua Crystal Sunshield Clear Gel SPF 60 PA+++.
        </p>
        <div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#087F68] hover:bg-[#075E50] text-white text-sm font-bold rounded-xl shadow-md transition-all"
          >
            <span>Explore Sun Care</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="flex items-center justify-between pb-6 border-b border-[#E3ECE7]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202A26] tracking-tight">
            Shopping Bag
          </h1>
          <p className="text-xs text-[#69736E] mt-1">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-[#69736E] hover:text-red-500 transition-colors"
        >
          Clear Bag
        </button>
      </div>

      {/* Free Shipping Meter */}
      <div className="mt-6 p-4 bg-white rounded-2xl border border-[#D1E7DC] space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-[#202A26]">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#087F68]" />
            {isFreeShipping ? (
              <span className="text-[#087F68]">You have earned Complimentary Express Shipping!</span>
            ) : (
              <span>Add ₹{amountNeededForFreeShipping} more to qualify for Free Shipping</span>
            )}
          </span>
          <span>{freeShippingProgress}%</span>
        </div>
        <div className="w-full bg-[#EAF5F0] rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#087F68] h-full transition-all duration-500"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white rounded-2xl border border-[#E3ECE7] flex flex-col sm:flex-row items-center gap-6 shadow-xs"
            >
              <div className="w-24 h-28 bg-[#F8F8F3] rounded-xl p-2 flex items-center justify-center shrink-0 border border-[#E3ECE7]">
                <img
                  src={item.product?.images?.[0]?.src || item.product?.image || '/images/blushu-sunscreen-main.png'}
                  alt={item.product?.name || 'Product'}
                  className="max-h-full object-contain"
                />
              </div>

              <div className="flex-1 text-left w-full sm:w-auto">
                <span className="text-[10px] font-bold text-[#087F68] tracking-widest uppercase">
                  {item.product?.brand || 'BLUSHU'}
                </span>
                <h3 className="text-base font-bold text-[#202A26]">
                  {item.product?.name}
                </h3>
                <p className="text-xs text-[#69736E] mt-0.5">
                  {item.product?.size} {item.product?.labelDetails?.spfRating && `• ${item.product.labelDetails.spfRating}`}
                </p>
                <div className="text-xs font-semibold text-[#202A26] mt-2">
                  ₹{item.product.price.toLocaleString('en-IN')} per unit
                </div>
              </div>

              <div className="flex sm:flex-col items-center justify-between w-full sm:w-auto gap-4">
                <QuantitySelector
                  quantity={item.quantity}
                  onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                  onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                  max={item.product.stockCount}
                  size="sm"
                />
                <div className="text-right flex items-center gap-4 sm:gap-2">
                  <span className="text-base font-extrabold text-[#202A26]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#69736E] hover:text-red-500 transition-colors p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-[#E3ECE7] p-6 shadow-sm space-y-6 text-left">
          <h2 className="text-lg font-bold text-[#202A26] border-b border-[#E3ECE7] pb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-[#69736E]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#202A26]">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between text-[#69736E]">
              <span>Estimated Shipping</span>
              <span>
                {isFreeShipping ? (
                  <span className="text-[#087F68] font-bold">FREE</span>
                ) : (
                  `₹${shippingFee}`
                )}
              </span>
            </div>

            {promoApplied && (
              <div className="flex justify-between text-[#087F68] font-semibold">
                <span>Coupon (BLUSHU10)</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-black text-[#202A26] pt-3 border-t border-[#E3ECE7]">
              <span>Estimated Total</span>
              <span className="text-[#087F68]">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Coupon Code Input */}
          <form onSubmit={handleApplyPromo} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Discount code (e.g. BLUSHU10)"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-[#F8F8F3] border border-[#E3ECE7] rounded-lg uppercase tracking-wider focus:outline-none focus:border-[#087F68]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#F8F8F3] hover:bg-[#EAF5F0] text-[#202A26] hover:text-[#087F68] text-xs font-bold rounded-lg border border-[#E3ECE7] transition-colors"
              >
                Apply
              </button>
            </div>
            {promoError && (
              <p className="text-[11px] text-red-500">{promoError}</p>
            )}
            {promoApplied && (
              <p className="text-[11px] text-[#087F68] font-semibold">10% discount applied!</p>
            )}
          </form>

          {/* Checkout CTA */}
          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 bg-[#087F68] hover:bg-[#075E50] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center justify-center gap-2 text-[11px] text-[#69736E] pt-2">
            <ShieldCheck className="w-4 h-4 text-[#087F68]" />
            <span>Secure 256-bit SSL encrypted checkout</span>
          </div>
        </div>
      </div>
    </div>
  );
};
