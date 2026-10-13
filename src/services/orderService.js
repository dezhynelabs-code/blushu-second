/**
 * BLUSHU Order Service
 * 
 * Handles order creation, persistence (for client review), and prepares
 * production payload ready for backend order management systems.
 */

const ORDERS_STORAGE_KEY = 'blushu_orders_history';

export const orderService = {
  createOrder: async (orderData) => {
    // Generate order ID with BLUSHU-YYYY-XXXX format
    const timestamp = Date.now().toString().slice(-6);
    const orderId = `BLU-${new Date().getFullYear()}-${timestamp}`;

    const orderPayload = {
      orderId,
      createdAt: new Date().toISOString(),
      status: 'confirmed',
      customer: orderData.customer,
      shippingAddress: orderData.shippingAddress,
      items: orderData.items,
      pricing: {
        subtotal: orderData.subtotal,
        shippingFee: orderData.shippingFee,
        total: orderData.total,
        currency: 'INR'
      },
      payment: {
        method: orderData.paymentMethod,
        status: orderData.paymentMethod === 'cod' ? 'pending_delivery' : 'verified_demo',
        transactionId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
      }
    };

    // Store in localStorage for user session review
    try {
      const existing = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      existing.unshift(orderPayload);
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn('Could not store order in localStorage:', e);
    }

    return Promise.resolve(orderPayload);
  },

  getOrderById: async (orderId) => {
    try {
      const orders = JSON.parse(localStorage.getItem(ORDERS_STORAGE_KEY) || '[]');
      const found = orders.find(o => o.orderId === orderId);
      return Promise.resolve(found || null);
    } catch (e) {
      return Promise.resolve(null);
    }
  }
};
