/**
 * BLUSHU Central Site Configuration
 * 
 * Edit brand settings, contact info, shipping rules, and payment integration metadata here.
 */

export const siteConfig = {
  brand: {
    name: 'BLUSHU',
    legalName: 'BLUSHU Skincare Labs Pvt. Ltd.',
    tagline: 'Your Daily Ritual. Your Sun Shield.',
    subTagline: 'Skincare That Fits Your Everyday.',
    description: 'Minimal, intentional everyday sun care engineered around transparent gel formulations and high-performance SPF 60 PA+++ protection.'
  },
  
  announcement: {
    enabled: true,
    message: 'Discover your daily sun protection ritual.',
    secondaryMessage: 'Complimentary shipping on orders above ₹999 across India.',
    shippingThreshold: 999
  },

  contact: {
    email: 'care@blushu.com',
    phone: '+91 (0) 80 4567 8900',
    supportHours: 'Mon – Sat: 10:00 AM – 6:00 PM IST',
    registeredOffice: 'BLUSHU Skincare Labs, Indiranagar, Bengaluru, Karnataka 560038, India',
    pressEmail: 'press@blushu.com'
  },

  socialLinks: [
    { name: 'Instagram', url: 'https://instagram.com/blushuskincare', handle: '@blushuskincare' },
    { name: 'Twitter / X', url: 'https://twitter.com/blushucare', handle: '@blushucare' },
    { name: 'Pinterest', url: 'https://pinterest.com/blushuskincare', handle: 'BLUSHU Skincare' }
  ],

  policies: {
    shipping: {
      standardCost: 99,
      freeThreshold: 999,
      dispatchWindow: '24–48 business hours',
      deliveryEstimate: '3–5 business days across India',
      carriers: ['BlueDart', 'Delhivery', 'DTDC']
    },
    returns: {
      returnWindowDays: 7,
      conditionRequired: 'Unopened, sealed in original box with security seal intact due to cosmetic hygiene regulations.',
      refundProcessingDays: '5–7 business days back to source payment account'
    },
    guarantee: {
      authenticity: 'Direct-from-manufacturer authenticity guarantee with verified batch lot tracking.'
    }
  },

  paymentGateway: {
    provider: 'Razorpay / Cashfree (Production Ready)',
    currency: 'INR',
    currencySymbol: '₹',
    mode: 'demo_ready', // Switch to 'live' when Razorpay Key ID and Secret are configured
    integrationGuideUrl: '/checkout#integration-docs',
    supportedMethods: [
      { id: 'upi', name: 'UPI (Google Pay, PhonePe, Paytm, BHIM)', icon: 'smartphone' },
      { id: 'cards', name: 'Credit & Debit Cards (Visa, Mastercard, RuPay)', icon: 'credit-card' },
      { id: 'netbanking', name: 'Net Banking (All Major Indian Banks)', icon: 'landmark' },
      { id: 'cod', name: 'Cash on Delivery (Available in select pin codes)', icon: 'banknote' }
    ]
  }
};
