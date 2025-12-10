"use client";

import React from 'react';
import CartSidebar from './CartSidebar';
// 1. استيراد مزود خدمة السلة
import { CartProvider } from '../context/CartContext';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    // 2. تغليف الموقع بالكامل بـ CartProvider
    <CartProvider>
      <div className="min-h-screen bg-[#09090b] text-white selection:bg-emerald-500 selection:text-white">
        {/* محتوى الصفحة */}
        <main className="transition-opacity duration-500 ease-in-out">
          {children}
        </main>

        {/* الشريط الجانبي للسلة */}
        <CartSidebar />
      </div>
    </CartProvider>
  );
}