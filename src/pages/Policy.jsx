import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { Shield, Truck, RotateCcw, FileText, ChevronRight } from 'lucide-react';

export const Policy = () => {
  const { slug } = useParams();

  const policyMap = {
    shipping: {
      title: 'Shipping & Delivery Policy',
      icon: Truck,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#69736E] leading-relaxed">
          <p>
            At BLUSHU, we strive to deliver your skincare essentials with speed and reliability across India.
          </p>
          <h3 className="text-base font-bold text-[#202A26] pt-2">Order Dispatch & Processing</h3>
          <p>
            All orders containing in-stock items are processed and dispatched within <strong>24 to 48 business hours</strong> from our fulfillment center in Bengaluru, Karnataka, excluding Sundays and national holidays.
          </p>
          <h3 className="text-base font-bold text-[#202A26] pt-2">Delivery Timelines</h3>
          <p>
            Standard express delivery typically takes <strong>3 to 5 business days</strong> depending on your delivery postal PIN code. Remote and North-Eastern regions may require an additional 2-3 business days.
          </p>
          <h3 className="text-base font-bold text-[#202A26] pt-2">Shipping Charges</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Orders above <strong>₹999</strong>: Complimentary Free Express Shipping</li>
            <li>Orders below ₹999: Flat standard delivery charge of ₹99</li>
          </ul>
        </div>
      )
    },
    returns: {
      title: 'Returns & Refunds Policy',
      icon: RotateCcw,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#69736E] leading-relaxed">
          <p>
            We take utmost care in formulating and packaging your BLUSHU Aqua Crystal Sunshield Clear Gel. Because personal care cosmetics are applied directly to the skin, strict hygiene guidelines apply.
          </p>
          <h3 className="text-base font-bold text-[#202A26] pt-2">Return Eligibility (7 Days)</h3>
          <p>
            Unopened, undamaged products with the original factory cap seal intact are eligible for return or exchange within <strong>7 calendar days</strong> of confirmed courier delivery.
          </p>
          <h3 className="text-base font-bold text-[#202A26] pt-2">Damaged or Incorrect Items</h3>
          <p>
            In the rare event that your product arrives damaged or tampered during transit, please notify our customer care team at <a href={`mailto:${siteConfig.contact.email}`} className="text-[#087F68] font-bold underline">{siteConfig.contact.email}</a> within 48 hours of delivery with photographic evidence of the packaging.
          </p>
          <h3 className="text-base font-bold text-[#202A26] pt-2">Refund Processing</h3>
          <p>
            Approved refunds will be processed within 5–7 business days to the original payment source (UPI, Card, or Net Banking).
          </p>
        </div>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      icon: Shield,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#69736E] leading-relaxed">
          <p>
            BLUSHU Skincare Labs Pvt. Ltd. values your privacy and is dedicated to protecting your personal information.
          </p>
          <h3 className="text-base font-bold text-[#202A26] pt-2">Information We Collect</h3>
          <p>
            We collect basic contact and shipping information (name, email address, contact phone, and delivery location) solely to process and fulfill your orders, provide shipment tracking, and respond to your customer inquiries.
          </p>
          <h3 className="text-base font-bold text-[#202A26] pt-2">Payment Security</h3>
          <p>
            BLUSHU does not store credit card numbers, CVVs, or bank credentials. All transactions are securely routed through PCI-DSS certified payment gateways (Razorpay / Cashfree) over encrypted TLS channels.
          </p>
        </div>
      )
    },
    terms: {
      title: 'Terms & Conditions',
      icon: FileText,
      content: (
        <div className="space-y-4 text-xs sm:text-sm text-[#69736E] leading-relaxed">
          <p>
            By accessing and shopping on the BLUSHU website, you agree to comply with our terms and general conditions of service.
          </p>
          <h3 className="text-base font-bold text-[#202A26] pt-2">Product Usage & Disclaimers</h3>
          <p>
            BLUSHU Aqua Crystal Sunshield Clear Gel is formulated for external cosmetic use only. Although rated SPF 60 PA+++, users should follow all application directions, patch test before first use, avoid contact with eyes, and reapply regularly during prolonged sun exposure.
          </p>
        </div>
      )
    }
  };

  const currentPolicy = policyMap[slug] || policyMap['shipping'];
  const Icon = currentPolicy.icon;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-left">
      <nav className="flex items-center space-x-2 text-xs text-[#69736E] mb-6">
        <Link to="/" className="hover:text-[#087F68]">Home</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span>Legal & Policies</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-[#202A26]">{currentPolicy.title}</span>
      </nav>

      <div className="bg-white rounded-3xl border border-[#E3ECE7] p-8 sm:p-12 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-[#E3ECE7]">
          <div className="p-3 bg-[#EAF5F0] text-[#087F68] rounded-xl">
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#087F68]">Official Policy</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#202A26]">{currentPolicy.title}</h1>
          </div>
        </div>

        {currentPolicy.content}
      </div>
    </div>
  );
};
