'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext'; // تأكد من المسار
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Copy } from 'lucide-react';

export default function CheckoutPage() {
  // ✅ التصحيح هنا: استبدلنا cartTotal بـ finalTotal و subtotal و discount
  const { items, finalTotal, subtotal, discount } = useCart();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('whatsapp'); // whatsapp or paypal

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // تجهيز رسالة الواتساب
  const generateWhatsAppLink = () => {
    const orderDetails = items.map(i => `- ${i.name} (${i.selectedSize}/${i.selectedColor}) x${i.quantity}`).join('%0a');
    
    // تفاصيل الأسعار في الرسالة
    const priceDetails = `%0a----------------%0aSubtotal: $${subtotal.toFixed(2)}%0aDiscount: -$${discount.toFixed(2)}%0aTotal: $${finalTotal.toFixed(2)}`;
    
    const customerInfo = `%0a%0aName: ${formData.name}%0aAddress: ${formData.address}, ${formData.city}, ${formData.country}`;
    
    const text = `New Order from Folklore FC! ⚽👕%0a%0a${orderDetails}${priceDetails}${customerInfo}`;
    
    return `https://wa.me/212707230031?text=${text}`; // 🔴 استبدل الرقم برقمك
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Form Section */}
          <div>
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <div className="space-y-4">
              <input name="name" placeholder="Full Name" onChange={handleChange} className="w-full bg-[#18181b] border border-[#27272a] p-3 rounded text-white" />
              <input name="email" placeholder="Email" onChange={handleChange} className="w-full bg-[#18181b] border border-[#27272a] p-3 rounded text-white" />
              <input name="phone" placeholder="Phone Number" onChange={handleChange} className="w-full bg-[#18181b] border border-[#27272a] p-3 rounded text-white" />
              <input name="address" placeholder="Address" onChange={handleChange} className="w-full bg-[#18181b] border border-[#27272a] p-3 rounded text-white" />
              <div className="grid grid-cols-2 gap-4">
                <input name="city" placeholder="City" onChange={handleChange} className="w-full bg-[#18181b] border border-[#27272a] p-3 rounded text-white" />
                <input name="country" placeholder="Country" onChange={handleChange} className="w-full bg-[#18181b] border border-[#27272a] p-3 rounded text-white" />
              </div>
            </div>

            <h2 className="text-xl font-bold mt-8 mb-4">Payment Method</h2>
            <div className="flex gap-4">
              <button 
                onClick={() => setPaymentMethod('whatsapp')}
                className={`flex-1 p-4 rounded-xl border ${paymentMethod === 'whatsapp' ? 'border-emerald-500 bg-emerald-500/10' : 'border-[#27272a] bg-[#18181b]'}`}
              >
                WhatsApp Checkout
              </button>
              <button 
                onClick={() => setPaymentMethod('paypal')}
                className={`flex-1 p-4 rounded-xl border ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-500/10' : 'border-[#27272a] bg-[#18181b]'}`}
              >
                PayPal
              </button>
            </div>

            {paymentMethod === 'whatsapp' ? (
              <a 
                href={generateWhatsAppLink()}
                target="_blank"
                className="block w-full bg-emerald-500 text-white text-center font-bold py-4 rounded-full mt-8 hover:bg-emerald-600 transition-colors"
              >
                Complete Order on WhatsApp
              </a>
            ) : (
              <div className="mt-8 p-4 bg-[#18181b] rounded-xl text-center text-gray-400">
                PayPal integration coming soon...
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-[#18181b] p-6 rounded-2xl border border-[#27272a] h-fit">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.cartId} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
                  <span>{(item.price * item.quantity).toFixed(2)} USD</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-[#27272a] pt-4 space-y-2">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)} USD</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-500">
                  <span>Discount</span>
                  <span>- {discount.toFixed(2)} USD</span>
                </div>
              )}
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-emerald-500">Free</span>
              </div>
              <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-[#27272a] mt-4">
                <span>Total</span>
                <span>{finalTotal.toFixed(2)} USD</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}