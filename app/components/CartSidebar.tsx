'use client';

import React from 'react';
import Link from 'next/link';
import { X, Trash2, Plus, Minus, ArrowRight, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useParams, useRouter } from 'next/navigation';

export default function CartSidebar() {
  const {
    items,
    isOpen,
    toggleCart,
    removeItem,
    updateQuantity,
    subtotal,
    discount,
    finalTotal
  } = useCart();
  const { user, openAuthModal } = useAuth();

  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'en';

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
        onClick={toggleCart}
      />

      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-[#09090b] border-l border-[#27272a] shadow-2xl z-[70] transform transition-transform duration-300 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-[#27272a] flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Your Cart ({items.length})</h2>
          <button onClick={toggleCart} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <p className="text-gray-500">Your cart is empty.</p>
              <button onClick={toggleCart} className="text-emerald-500 font-bold hover:underline">
                Start Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartId} className="flex gap-4">
                <div className="w-20 h-24 bg-[#18181b] rounded-lg overflow-hidden border border-[#27272a]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-white text-sm">{item.name}</h3>
                    <button onClick={() => removeItem(item.cartId)} className="text-gray-500 hover:text-red-500 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{item.selectedSize} | {item.selectedColor}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-white">{item.price} {item.currency}</p>
                    <div className="flex items-center gap-3 bg-[#18181b] rounded-full px-2 py-1 border border-[#27272a]">
                      <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="text-gray-400 hover:text-white"><Minus size={14} /></button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="text-gray-400 hover:text-white"><Plus size={14} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#27272a] bg-[#09090b]">

            {/* تفاصيل السعر والخصم */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} USD</span>
              </div>

              {/* يظهر فقط إذا كان هناك خصم */}
              {discount > 0 && (
                <div className="flex justify-between text-emerald-500 font-medium animate-in fade-in slide-in-from-right-4">
                  <span className="flex items-center gap-1"><Tag size={14} /> Bundle Discount (10%)</span>
                  <span>- {discount.toFixed(2)} USD</span>
                </div>
              )}

              <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-[#27272a]">
                <span>Total</span>
                <span>{finalTotal.toFixed(2)} USD</span>
              </div>
            </div>

            <button
              onClick={() => {
                toggleCart();
                if (user) {
                  router.push(`/${locale}/checkout`);
                } else {
                  openAuthModal('checkout');
                }
              }}
              className="w-full bg-white text-black font-bold py-4 rounded-full flex items-center justify-center gap-2 hover:bg-emerald-500 hover:text-white transition-all"
            >
              Checkout <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div >
    </>
  );
}