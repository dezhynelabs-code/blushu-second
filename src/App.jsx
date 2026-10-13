import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ScrollToTop } from './components/ScrollToTop';
import { ErrorBoundary } from './components/ErrorBoundary';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { OrderConfirmation } from './pages/OrderConfirmation';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Wishlist } from './pages/Wishlist';
import { Policy } from './pages/Policy';
import { NotFound } from './pages/NotFound';

// Global Toast Banner
const GlobalNotification = () => {
  const { notification } = useCart();
  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in max-w-sm">
      <div className={`p-4 rounded-2xl shadow-xl border text-xs font-semibold flex items-center gap-3 ${
        notification.type === 'error'
          ? 'bg-red-50 text-red-800 border-red-200'
          : notification.type === 'warning'
          ? 'bg-amber-50 text-amber-800 border-amber-200'
          : 'bg-[#075E50] text-[#EAF5F0] border-[#087F68]'
      }`}>
        <div className="w-2 h-2 rounded-full bg-[#A3E5D0] animate-ping" />
        <span>{notification.message}</span>
      </div>
    </div>
  );
};

export function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col bg-[#F8F8F3] text-[#202A26]">
            <AnnouncementBar />
            <Header />
            <CartDrawer />
            <GlobalNotification />

            <main className="flex-1">
              <ErrorBoundary>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/products/:slug" element={<ProductDetails />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/policy/:slug" element={<Policy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </ErrorBoundary>
            </main>

            <Footer />
          </div>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
