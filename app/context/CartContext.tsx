"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, Product } from '../../types';

interface CartContextType {
  items: CartItem[];
  // تعديل: دالة الإضافة تقبل الكمية الآن
  addItem: (product: Product, size: string, color: string, quantity?: number) => void;
  removeItem: (cartId: string) => void;
  // جديد: دالة لتحديث الكمية
  updateQuantity: (cartId: string, quantity: number) => void;
  cartOpen: boolean;
  toggleCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('folklore-cart');
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('folklore-cart', JSON.stringify(items));
    }
  }, [items, isMounted]);

  // 1. تعديل دالة الإضافة
  const addItem = (product: Product, size: string, color: string, quantity: number = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find(
        item => item.id === product.id && item.selectedSize === size && item.selectedColor === color
      );
      
      if (existingItem) {
        return currentItems.map(item => 
          item.id === product.id && item.selectedSize === size && item.selectedColor === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      const newItem: CartItem = {
        ...product,
        cartId: `${product.id}-${Date.now()}`,
        selectedSize: size,
        selectedColor: color,
        quantity: quantity
      };

      return [...currentItems, newItem];
    });
    setCartOpen(true);
  };

  // 2. دالة تحديث الكمية (جديدة)
  const updateQuantity = (cartId: string, quantity: number) => {
    if (quantity < 1) return; // لا نسمح بأقل من 1
    setItems((currentItems) => currentItems.map(item => 
      item.cartId === cartId ? { ...item, quantity } : item
    ));
  };

  const removeItem = (cartId: string) => {
    setItems((currentItems) => currentItems.filter(item => item.cartId !== cartId));
  };

  const toggleCart = () => setCartOpen(!cartOpen);

  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = items.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, cartOpen, toggleCart, cartTotal, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};