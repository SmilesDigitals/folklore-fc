'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem } from '../../types';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  toggleCart: () => void;
  addItem: (product: Product, size: string, color: string, qty: number) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  // 👇 القيم الجديدة التي سنصدرها
  subtotal: number;
  discount: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  // تحميل السلة من localStorage عند بدء التشغيل
  useEffect(() => {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart items from localStorage", error);
        setItems([]);
      }
    }
  }, []);

  // حفظ السلة في localStorage عند أي تغيير
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(items));
  }, [items]);

  // الحسابات الرياضية للخصم
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);

  useEffect(() => {
    // 1. حساب المجموع الفرعي (Subtotal)
    const newSubtotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);
    setSubtotal(newSubtotal);

    // 2. حساب عدد القطع الكلي
    const totalItemsCount = items.reduce((total, item) => total + item.quantity, 0);

    // 3. تطبيق الخصم إذا كان العدد >= 2
    let newDiscount = 0;
    if (totalItemsCount >= 2) {
      newDiscount = newSubtotal * 0.10; // خصم 10%
    }
    setDiscount(newDiscount);

    // 4. المجموع النهائي
    setFinalTotal(newSubtotal - newDiscount);

  }, [items]);

  const toggleCart = () => setIsOpen(!isOpen);

  const addItem = (product: Product, selectedSize: string, selectedColor: string, quantity: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find(
        item => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      if (existingItem) {
        return prevItems.map(item =>
          item.cartId === existingItem.cartId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [...prevItems, {
        ...product,
        selectedSize,
        selectedColor,
        quantity,
        cartId: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`
      }];
    });
    setIsOpen(true);
  };

  const removeItem = (cartId: string) => {
    setItems(prevItems => prevItems.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, qty: number) => {
    setItems(prevItems => prevItems.map(item => {
      if (item.cartId === cartId) {
        return { ...item, quantity: Math.max(1, qty) };
      }
      return item;
    }));
  };

  return (
    <CartContext.Provider value={{
      items,
      isOpen,
      toggleCart,
      addItem,
      removeItem,
      updateQuantity,
      subtotal,    // تصدير القيم الجديدة
      discount,
      finalTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}