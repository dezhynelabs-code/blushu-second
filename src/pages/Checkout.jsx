import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { orderService } from '../services/orderService';
import { paymentService } from '../services/paymentService';
import { siteConfig } from '../data/siteConfig';
import {
  Lock,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Landmark,
  Banknote,
  ArrowRight,
  AlertCircle,
  Loader2,
  CheckCircle2,
  HelpCircle,
  ChevronDown
} from 'lucide-react';

export const Checkout = () => {
  const { items, subtotal, shippingFee, total, isFreeShipping, clearCart } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Karnataka',
    pinCode: '',
    paymentMethod: 'upi'
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [showDocs, setShowDocs] = useState(false);

  if (items.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#202A26]">Your Bag is Empty</h2>
        <p className="text-sm text-[#69736E]">Please add items to your cart before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="inline-block px-6 py-2.5 bg-[#087F68] text-white text-xs font-bold rounded-xl"
        >
          Return to Shop
        </Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Full name is required';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Valid email is required';
    }
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone.replace(/[\s-]/g, ''))) {
      errs.phone = 'Valid 10-digit Indian phone number is required';
    }
    if (!formData.address.trim()) errs.address = 'Street address is required';
    if (!formData.city.trim()) errs.city = 'City is required';
    if (!formData.pinCode.trim() || !/^\d{6}$/.test(formData.pinCode)) {
      errs.pinCode = 'Valid 6-digit postal PIN code is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Process payment via paymentService (Demo sandbox or Live Razorpay)
      const paymentResult = await paymentService.processCheckout({
        orderTotal: total,
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone
        },
        paymentMethod: formData.paymentMethod
      });

      // 2. Create and persist order
      const order = await orderService.createOrder({
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone
        },
        shippingAddress: {
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pinCode: formData.pinCode
        },
        items: items.map(i => ({
          productId: i.product.id,
          name: i.product.name,
          quantity: i.quantity,
          unitPrice: i.product.price,
          totalPrice: i.product.price * i.quantity
        })),
        subtotal,
        shippingFee,
        total,
        paymentMethod: formData.paymentMethod
      });

      // 3. Clear cart and redirect to order confirmation
      clearCart();
      navigate(`/order-confirmation/${order.orderId}`);
    } catch (err) {
      alert(err.message || 'Payment could not be completed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <div className="text-left mb-8 pb-4 border-b border-[#E3ECE7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202A26] tracking-tight">
            Checkout
          </h1>
          <p className="text-xs text-[#69736E] mt-1">
            Fast, secure fulfillment with verified batch BLUSHU products.
          </p>
        </div>

        <button
          onClick={() => setShowDocs(!showDocs)}
          className="text-xs font-semibold text-[#087F68] hover:text-[#075E50] inline-flex items-center gap-1.5 self-start sm:self-auto"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Payment Gateway Backend Architecture</span>
          <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDocs ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Backend Architecture Docs Banner */}
      {showDocs && (
        <div id="integration-docs" className="mb-8 p-6 bg-[#EAF5F0] rounded-2xl border border-[#D1E7DC] text-left text-xs text-[#202A26] space-y-3 animate-fade-in">
          <div className="flex items-center gap-2 font-bold text-[#075E50] text-sm">
            <Lock className="w-4 h-4" />
            <span>Razorpay / Cashfree Production Backend Requirements</span>
          </div>
          <p className="text-[#69736E] leading-relaxed">
            Per strict security best practices, payment secrets (Key Secret) are never placed in client code.
            To transition this demo checkout into live production:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-3 bg-white rounded-xl border border-[#D1E7DC]">
              <span className="font-bold block mb-1">1. Create Order Endpoint</span>
              <code className="text-[11px] text-[#075E50]">POST /api/orders/create</code>
              <p className="text-[11px] text-[#69736E] mt-1">
                Generates <code className="text-[11px]">razorpay_order_id</code> using server secret keys.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#D1E7DC]">
              <span className="font-bold block mb-1">2. Client SDK Trigger</span>
              <code className="text-[11px] text-[#075E50]">window.Razorpay(options).open()</code>
              <p className="text-[11px] text-[#69736E] mt-1">
                Loads standard checkout with customer prefill and order token.
              </p>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#D1E7DC]">
              <span className="font-bold block mb-1">3. Server HMAC Verification</span>
              <code className="text-[11px] text-[#075E50]">POST /api/payments/verify</code>
              <p className="text-[11px] text-[#69736E] mt-1">
                Verifies cryptographic SHA256 signature prior to marking order paid.
              </p>
            </div>
          </div>
          <p className="text-[11px] text-[#075E50] italic">
            Currently running in <strong>Development Sandbox Mode</strong>: Orders are generated and persisted locally so you can test the full e-commerce funnel without live card charges.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start text-left">
        {/* Left Columns: Contact, Address, Payment */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* 1. Contact Information */}
          <div className="p-6 bg-white rounded-2xl border border-[#E3ECE7] space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3ECE7]">
              <h2 className="text-base font-bold text-[#202A26]">1. Contact Information</h2>
              <span className="text-xs text-[#69736E]">Required for dispatch tracking</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#202A26] mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="e.g. Radhika Sharma"
                  className={`w-full px-4 py-2.5 text-xs bg-[#F8F8F3] border rounded-xl focus:outline-none focus:border-[#087F68] ${
                    errors.fullName ? 'border-red-500' : 'border-[#E3ECE7]'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202A26] mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="name@example.com"
                  className={`w-full px-4 py-2.5 text-xs bg-[#F8F8F3] border rounded-xl focus:outline-none focus:border-[#087F68] ${
                    errors.email ? 'border-red-500' : 'border-[#E3ECE7]'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202A26] mb-1">Phone Number (10 digits) *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="9876543210"
                  className={`w-full px-4 py-2.5 text-xs bg-[#F8F8F3] border rounded-xl focus:outline-none focus:border-[#087F68] ${
                    errors.phone ? 'border-red-500' : 'border-[#E3ECE7]'
                  }`}
                />
                {errors.phone && <p className="text-[11px] text-red-500 mt-1">{errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* 2. Shipping Address */}
          <div className="p-6 bg-white rounded-2xl border border-[#E3ECE7] space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3ECE7]">
              <h2 className="text-base font-bold text-[#202A26]">2. Delivery Address</h2>
              <span className="text-xs text-[#69736E]">India Delivery</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#202A26] mb-1">Street Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="House / Flat No., Street, Area"
                  className={`w-full px-4 py-2.5 text-xs bg-[#F8F8F3] border rounded-xl focus:outline-none focus:border-[#087F68] ${
                    errors.address ? 'border-red-500' : 'border-[#E3ECE7]'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-red-500 mt-1">{errors.address}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-[#202A26] mb-1">Apartment, Suite (Optional)</label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleInputChange}
                  placeholder="e.g. Tower 2, Flat 401"
                  className="w-full px-4 py-2.5 text-xs bg-[#F8F8F3] border border-[#E3ECE7] rounded-xl focus:outline-none focus:border-[#087F68]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202A26] mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Bengaluru"
                  className={`w-full px-4 py-2.5 text-xs bg-[#F8F8F3] border rounded-xl focus:outline-none focus:border-[#087F68] ${
                    errors.city ? 'border-red-500' : 'border-[#E3ECE7]'
                  }`}
                />
                {errors.city && <p className="text-[11px] text-red-500 mt-1">{errors.city}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202A26] mb-1">State</label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2.5 text-xs bg-[#F8F8F3] border border-[#E3ECE7] rounded-xl focus:outline-none focus:border-[#087F68]"
                >
                  <option value="Karnataka">Karnataka</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Kerala">Kerala</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Other">Other State</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#202A26] mb-1">PIN Code (6 digits) *</label>
                <input
                  type="text"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleInputChange}
                  placeholder="560038"
                  maxLength={6}
                  className={`w-full px-4 py-2.5 text-xs bg-[#F8F8F3] border rounded-xl focus:outline-none focus:border-[#087F68] ${
                    errors.pinCode ? 'border-red-500' : 'border-[#E3ECE7]'
                  }`}
                />
                {errors.pinCode && <p className="text-[11px] text-red-500 mt-1">{errors.pinCode}</p>}
              </div>
            </div>
          </div>

          {/* 3. Payment Method */}
          <div className="p-6 bg-white rounded-2xl border border-[#E3ECE7] space-y-4 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-[#E3ECE7]">
              <h2 className="text-base font-bold text-[#202A26]">3. Payment Method</h2>
              <span className="text-xs text-[#087F68] font-semibold flex items-center gap-1">
                <Lock className="w-3.5 h-3.5" />
                256-Bit SSL Secured
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'upi',
                  name: 'UPI (Instant via Google Pay, PhonePe, Paytm, QR)',
                  icon: Smartphone,
                  tag: 'Most Popular'
                },
                {
                  id: 'cards',
                  name: 'Credit or Debit Card (Visa, Mastercard, RuPay)',
                  icon: CreditCard
                },
                {
                  id: 'netbanking',
                  name: 'Net Banking (All Indian Scheduled Banks)',
                  icon: Landmark
                },
                {
                  id: 'cod',
                  name: 'Cash on Delivery (Pay at Doorstep)',
                  icon: Banknote
                }
              ].map((pm) => {
                const Icon = pm.icon;
                const isSelected = formData.paymentMethod === pm.id;
                return (
                  <label
                    key={pm.id}
                    className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#087F68] bg-[#EAF5F0]/60 ring-1 ring-[#087F68]'
                        : 'border-[#E3ECE7] hover:border-[#D1E7DC] bg-[#F8F8F3]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={pm.id}
                        checked={isSelected}
                        onChange={handleInputChange}
                        className="text-[#087F68] focus:ring-[#087F68]"
                      />
                      <Icon className={`w-5 h-5 ${isSelected ? 'text-[#087F68]' : 'text-[#69736E]'}`} />
                      <span className="text-xs font-semibold text-[#202A26]">{pm.name}</span>
                    </div>
                    {pm.tag && (
                      <span className="text-[10px] bg-[#087F68] text-white px-2 py-0.5 rounded font-bold">
                        {pm.tag}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary & Place Order */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E3ECE7] p-6 shadow-sm space-y-6 sticky top-28">
          <h3 className="text-lg font-bold text-[#202A26] pb-3 border-b border-[#E3ECE7]">
            Order Review
          </h3>

          {/* Cart items */}
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b border-[#F8F8F3]">
                <div className="w-12 h-14 bg-[#F8F8F3] rounded-lg p-1 shrink-0 border border-[#E3ECE7] flex items-center justify-center">
                  <img
                    src={item.product?.images?.[0]?.src || item.product?.image || '/images/blushu-sunscreen-main.png'}
                    alt={item.product?.name || 'Product'}
                    className="max-h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-semibold text-[#202A26] line-clamp-1">{item.product.name}</h4>
                  <p className="text-[11px] text-[#69736E]">Qty: {item.quantity} × ₹{item.product.price}</p>
                </div>
                <span className="text-xs font-bold text-[#202A26]">
                  ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing breakdown */}
          <div className="space-y-2 text-xs border-t border-[#E3ECE7] pt-4">
            <div className="flex justify-between text-[#69736E]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#202A26]">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-[#69736E]">
              <span>Shipping</span>
              <span>
                {isFreeShipping ? (
                  <span className="text-[#087F68] font-bold">FREE (Complimentary)</span>
                ) : (
                  `₹${shippingFee}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-base font-black text-[#202A26] pt-2 border-t border-[#E3ECE7]">
              <span>Total to Pay</span>
              <span className="text-[#087F68]">₹{total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 bg-[#087F68] hover:bg-[#075E50] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all disabled:opacity-60"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing Order...</span>
              </>
            ) : (
              <>
                <span>Complete Order • ₹{total.toLocaleString('en-IN')}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="space-y-2 pt-2 border-t border-[#E3ECE7] text-[11px] text-[#69736E]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#087F68] shrink-0" />
              <span>Verified BLUSHU Sunscreen Pack BAS001</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#087F68] shrink-0" />
              <span>Full buyer protection & tracking link sent to email</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
