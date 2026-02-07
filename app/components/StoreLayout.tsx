"use client";

import React from 'react';
import { CartProvider } from '../context/CartContext';
import CartSidebar from './CartSidebar';
import { useParams } from 'next/navigation';

import Footer from './Footer';

import AuthModal from './AuthModal';

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const isRtl = locale === 'ar';

  return (
    <CartProvider>
      <div className="min-h-screen bg-[#09090b] text-white selection:bg-emerald-500 selection:text-white" dir={isRtl ? 'rtl' : 'ltr'}>
        <AuthModal />

        {/* حذفنا الـ <nav> من هنا لكي لا يظهر فوق الـ Logo */}

        <main className="transition-opacity duration-500 ease-in-out">
          {children}
        </main>

        <Footer />
        <CartSidebar />
      </div>
    </CartProvider>
  );
}