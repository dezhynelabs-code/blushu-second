import React, { createContext, useContext, useState, useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

const CartContext = createContext();

const STORAGE_KEY = 'blushu_cart_v1';

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.warn('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save cart to localStorage:', e);
    }
  }, [items]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3200);
  };

  const addToCart = (product, quantity = 1, openDrawer = true) => {
    if (!product || !product.inStock) {
      showNotification('This product is currently out of stock.', 'error');
      return false;
    }

    setItems(prevItems => {
      const existingIndex = prevItems.findIndex(item => item.id === product.id);
      const maxStock = product.stockCount || 99;

      if (existingIndex > -1) {
        const currentQty = prevItems[existingIndex].quantity;
        const newQty = Math.min(currentQty + quantity, maxStock);
        
        if (currentQty >= maxStock) {
          showNotification(`Maximum available stock (${maxStock} units) reached.`, 'warning');
          return prevItems;
        }

        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty
        };
        showNotification(`Added ${product.name} to bag.`);
        return updated;
      } else {
        const qtyToAdd = Math.min(quantity, maxStock);
        showNotification(`Added ${product.name} to bag.`);
        return [...prevItems, { id: product.id, product, quantity: qtyToAdd }];
      }
    });

    if (openDrawer) {
      setIsCartOpen(true);
    }
    return true;
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setItems(prevItems =>
      prevItems.map(item => {
        if (item.id === productId) {
          const maxStock = item.product.stockCount || 99;
          const qty = Math.min(newQuantity, maxStock);
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setItems(prevItems => prevItems.filter(item => item.id !== productId));
    showNotification('Item removed from bag.', 'info');
  };

  const clearCart = () => {
    setItems([]);
  };

  const subtotal = items.reduce((acc, item) => {
    return acc + (item.product.price * item.quantity);
  }, 0);

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const shippingThreshold = siteConfig.announcement.shippingThreshold;
  const isFreeShipping = subtotal >= shippingThreshold;
  const shippingFee = items.length === 0 ? 0 : (isFreeShipping ? 0 : siteConfig.policies.shipping.standardCost);
  const amountNeededForFreeShipping = Math.max(0, shippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));

  const total = subtotal + shippingFee;

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        subtotal,
        shippingFee,
        total,
        isFreeShipping,
        shippingThreshold,
        amountNeededForFreeShipping,
        freeShippingProgress,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        notification
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
