import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, ArrowRight, ShieldCheck, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { QuantitySelector } from './QuantitySelector';

export const CartDrawer = () => {
  const {
    items,
    totalItems,
    subtotal,
    shippingFee,
    total,
    isFreeShipping,
    amountNeededForFreeShipping,
    freeShippingProgress,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart
  } = useCart();

  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F8F3] shadow-2xl flex flex-col justify-between border-l border-[#E3ECE7] animate-fade-in">
          
          {/* Header */}
          <div className="p-6 border-b border-[#E3ECE7] bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#087F68]" />
                <h2 className="text-lg font-bold text-[#202A26] tracking-tight">Your Bag</h2>
                <span className="text-xs bg-[#EAF5F0] text-[#075E50] px-2 py-0.5 rounded-full font-semibold">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#69736E] hover:text-[#202A26] rounded-full hover:bg-[#F8F8F3] transition-colors"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress */}
            <div className="mt-4 pt-3 border-t border-[#E3ECE7]">
              <div className="flex items-center justify-between text-xs font-medium text-[#202A26] mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#087F68]" />
                  {isFreeShipping ? (
                    <span className="text-[#087F68] font-bold">You unlocked Complimentary Shipping!</span>
                  ) : (
                    <span>Add ₹{amountNeededForFreeShipping} more for Free Shipping</span>
                  )}
                </span>
                <span className="text-[#69736E] font-semibold">{freeShippingProgress}%</span>
              </div>
              <div className="w-full bg-[#EAF5F0] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#087F68] h-full transition-all duration-500 rounded-full"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#EAF5F0] flex items-center justify-center text-[#087F68] mb-4">
                  <ShoppingBag className="w-8 h-8 opacity-70" />
                </div>
                <h3 className="text-base font-bold text-[#202A26] mb-1">Your bag is empty</h3>
                <p className="text-xs text-[#69736E] max-w-xs mb-6">
                  Experience daily clear UV shield with BLUSHU Aqua Crystal Sunshield Clear Gel SPF 60.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/shop');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-[#087F68] hover:bg-[#075E50] text-white text-xs font-semibold tracking-wide transition-colors"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-white rounded-xl border border-[#E3ECE7] flex gap-4 shadow-xs"
                >
                  {/* Product thumbnail */}
                  <div className="w-20 h-24 bg-[#F8F8F3] rounded-lg p-1.5 flex items-center justify-center shrink-0 border border-[#E3ECE7]">
                    <img
                      src={item.product?.images?.[0]?.src || item.product?.image || '/images/blushu-sunscreen-main.png'}
                      alt={item.product?.name || 'Product'}
                      className="max-h-full object-contain"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-[10px] font-bold text-[#087F68] tracking-widest uppercase">
                            {item.product?.brand || 'BLUSHU'}
                          </span>
                          <h4 className="text-sm font-semibold text-[#202A26] leading-tight">
                            {item.product?.name}
                          </h4>
                          <span className="text-xs text-[#69736E] block mt-0.5">
                            {item.product?.size} {item.product?.labelDetails?.spfRating && `• ${item.product.labelDetails.spfRating}`}
                          </span>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#69736E] hover:text-red-500 p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <QuantitySelector
                        quantity={item.quantity}
                        onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                        max={item.product.stockCount}
                        size="sm"
                      />
                      <div className="text-right">
                        <span className="text-sm font-bold text-[#202A26]">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E3ECE7] space-y-4 shadow-lg">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-[#69736E]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#202A26]">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#69736E]">
                  <span>Standard Shipping</span>
                  <span>{isFreeShipping ? <span className="text-[#087F68] font-bold">FREE</span> : `₹${shippingFee}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#202A26] pt-2 border-t border-[#E3ECE7]">
                  <span>Total</span>
                  <span className="text-[#087F68]">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 bg-[#087F68] hover:bg-[#075E50] text-white text-sm font-semibold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#69736E] pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#087F68]" />
                  <span>Verified 100% Authentic BLUSHU Skincare</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
