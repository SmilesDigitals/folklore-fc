"use client";

import React from 'react';
import Link from 'next/link'; // نستخدم Link للانتقال
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, cartOpen, toggleCart, cartTotal } = useCart();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={toggleCart}
      />
      
      <div className="relative w-full max-w-md bg-[#09090b] border-l border-[#27272a] h-full shadow-2xl flex flex-col transform transition-transform duration-300">
        
        <div className="p-6 border-b border-[#27272a] flex justify-between items-center bg-[#09090b]">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" /> Your Cart
          </h2>
          <button 
            onClick={toggleCart}
            className="p-2 hover:bg-[#27272a] rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 space-y-4">
              <ShoppingBag className="w-16 h-16 opacity-20" />
              <p>Your cart is empty</p>
              <button 
                onClick={toggleCart}
                className="text-emerald-500 hover:text-emerald-400 font-medium"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartId} className="flex gap-4 bg-[#18181b] p-4 rounded-xl border border-[#27272a]">
                <div className="w-20 h-24 rounded-lg overflow-hidden flex-shrink-0 border border-[#27272a]">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-white text-sm line-clamp-1">{item.name}</h3>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
                      <span className="bg-[#27272a] px-2 py-1 rounded border border-[#3f3f46]">{item.selectedSize}</span>
                      <span className="bg-[#27272a] px-2 py-1 rounded border border-[#3f3f46] flex items-center gap-1">
                         <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: item.selectedColor === 'White' ? '#fff' : item.selectedColor === 'Black' ? '#000' : item.selectedColor === 'Navy Blue' ? '#1e3a8a' : '#374151' }} />
                         {item.selectedColor}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-3">
                    <div className="flex items-center gap-2 bg-[#27272a] rounded-lg px-2 py-1 border border-[#3f3f46]">
                        <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} disabled={item.quantity <= 1} className="text-gray-400 hover:text-white disabled:opacity-30"><Minus size={14} /></button>
                        <span className="text-sm font-bold text-white w-4 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="text-gray-400 hover:text-white"><Plus size={14} /></button>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="font-bold text-emerald-500">{(item.price * item.quantity).toFixed(2)} {item.currency}</span>
                        <button onClick={() => removeItem(item.cartId)} className="text-gray-500 hover:text-red-500 transition-colors p-1"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-[#27272a] bg-[#09090b]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-400">Total</span>
              <span className="text-2xl font-bold text-white">
                {cartTotal.toFixed(2)} <span className="text-sm text-gray-500">{items[0]?.currency}</span>
              </span>
            </div>
            
            {/* زر الانتقال لصفحة الدفع بدلاً من الواتساب المباشر */}
            <Link 
              href="/checkout" // هذا الرابط سنقوم بإنشائه الآن
              onClick={toggleCart} // نغلق السلة عند الضغط
              className="w-full bg-white hover:bg-gray-200 text-black py-4 rounded-full font-bold transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Proceed to Checkout
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}