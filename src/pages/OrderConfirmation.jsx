import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../services/orderService';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck, Mail, Phone } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';

export const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    orderService.getOrderById(orderId).then((res) => {
      setOrder(res);
      setLoading(false);
    });
  }, [orderId]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto py-24 text-center">
        <p className="text-sm text-[#69736E]">Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-left">
      <div className="bg-white rounded-3xl border border-[#D1E7DC] p-8 sm:p-12 shadow-sm space-y-8">
        
        {/* Success Header */}
        <div className="text-center space-y-3 pb-8 border-b border-[#E3ECE7]">
          <div className="w-16 h-16 bg-[#EAF5F0] rounded-full flex items-center justify-center mx-auto text-[#087F68]">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#087F68]">
            Order Confirmed
          </span>
          <h1 className="text-3xl font-extrabold text-[#202A26] tracking-tight">
            Thank you for your order!
          </h1>
          <p className="text-xs sm:text-sm text-[#69736E] max-w-md mx-auto">
            Your BLUSHU Aqua Crystal Sunshield order has been received and scheduled for fulfillment.
          </p>
          <div className="inline-block px-4 py-1.5 bg-[#F8F8F3] border border-[#E3ECE7] rounded-full text-xs font-mono font-bold text-[#202A26]">
            Order ID: {orderId}
          </div>
        </div>

        {/* Fulfillment Timeline */}
        <div className="p-5 bg-[#EAF5F0]/60 rounded-2xl border border-[#D1E7DC] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#075E50] uppercase tracking-wider">
            <Truck className="w-4 h-4 text-[#087F68]" />
            <span>Fulfillment Timeline</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-[#202A26]">
            <div className="bg-white p-3 rounded-xl border border-[#D1E7DC]">
              <span className="text-[10px] text-[#69736E] block">Step 1</span>
              <strong className="block mt-0.5">Order Received</strong>
              <span className="text-[11px] text-[#69736E]">Batch verification active</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#D1E7DC]">
              <span className="text-[10px] text-[#69736E] block">Step 2</span>
              <strong className="block mt-0.5">Warehouse Dispatch</strong>
              <span className="text-[11px] text-[#69736E]">Within 24–48 hours</span>
            </div>
            <div className="bg-white p-3 rounded-xl border border-[#D1E7DC]">
              <span className="text-[10px] text-[#69736E] block">Step 3</span>
              <strong className="block mt-0.5">Express Delivery</strong>
              <span className="text-[11px] text-[#69736E]">3–5 business days</span>
            </div>
          </div>
        </div>

        {/* Order Details Grid */}
        {order && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="p-5 bg-[#F8F8F3] rounded-2xl border border-[#E3ECE7] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#69736E]">Delivery Address</h4>
              <p className="text-xs font-semibold text-[#202A26]">{order.customer?.fullName}</p>
              <p className="text-xs text-[#69736E]">
                {order.shippingAddress?.address}
                {order.shippingAddress?.apartment && `, ${order.shippingAddress?.apartment}`}
              </p>
              <p className="text-xs text-[#69736E]">
                {order.shippingAddress?.city}, {order.shippingAddress?.state} - {order.shippingAddress?.pinCode}
              </p>
              <p className="text-xs text-[#69736E] pt-1">Phone: {order.customer?.phone}</p>
            </div>

            <div className="p-5 bg-[#F8F8F3] rounded-2xl border border-[#E3ECE7] space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#69736E]">Payment Summary</h4>
              <p className="text-xs text-[#69736E]">Method: <strong className="text-[#202A26] uppercase">{order.payment?.method}</strong></p>
              <p className="text-xs text-[#69736E]">Status: <strong className="text-[#087F68]">Confirmed</strong></p>
              <div className="pt-2 border-t border-[#E3ECE7] flex justify-between text-xs font-bold text-[#202A26]">
                <span>Total Paid:</span>
                <span className="text-[#087F68]">₹{order.pricing?.total?.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-6 border-t border-[#E3ECE7] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#087F68] hover:bg-[#075E50] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="text-xs text-[#69736E]">
            Questions? Contact <a href={`mailto:${siteConfig.contact.email}`} className="text-[#087F68] font-bold underline">{siteConfig.contact.email}</a>
          </div>
        </div>

      </div>
    </div>
  );
};
