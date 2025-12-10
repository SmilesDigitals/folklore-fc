"use client";

import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { MessageCircle, MapPin, User, Mail, Phone, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const { items, cartTotal } = useCart();
  
  // حالة لتخزين بيانات العميل
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 1. الدفع عبر WhatsApp (مع دمج البيانات)
  const handleWhatsAppCheckout = () => {
    // التحقق من تعبئة البيانات
    if (!formData.firstName || !formData.address || !formData.phone) {
      alert("Please fill in your shipping details first.");
      return;
    }

    const WHATSAPP_NUMBER = "212707230031"; // 🔴 ضع رقمك هنا

    let message = `🆕 *NEW ORDER REQUEST*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${formData.firstName} ${formData.lastName}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Email: ${formData.email}\n`;
    message += `Address: ${formData.address}, ${formData.city}, ${formData.country}\n\n`;
    
    message += `🛒 *Order Items:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity}\n`;
    });

    message += `\n💰 *Total Amount:* ${cartTotal.toFixed(2)} ${items[0]?.currency}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  // 2. إعدادات PayPal
  const initialOptions = {
    clientId: "test", // 🔴 استبدل "test" بـ Client ID الحقيقي الخاص بك من PayPal Developer
    currency: "USD",
    intent: "capture",
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* القسم الأيمن: نموذج البيانات */}
        <div className="space-y-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="bg-[#18181b] p-6 rounded-2xl border border-[#27272a]">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <User className="text-emerald-500" /> Shipping Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="firstName" placeholder="First Name" onChange={handleChange} className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg w-full text-white outline-none focus:border-emerald-500" />
              <input name="lastName" placeholder="Last Name" onChange={handleChange} className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg w-full text-white outline-none focus:border-emerald-500" />
              <input name="email" placeholder="Email Address" onChange={handleChange} className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg w-full text-white outline-none focus:border-emerald-500 md:col-span-2" />
              <input name="phone" placeholder="Phone Number" onChange={handleChange} className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg w-full text-white outline-none focus:border-emerald-500 md:col-span-2" />
              <input name="address" placeholder="Street Address" onChange={handleChange} className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg w-full text-white outline-none focus:border-emerald-500 md:col-span-2" />
              <input name="city" placeholder="City" onChange={handleChange} className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg w-full text-white outline-none focus:border-emerald-500" />
              <input name="country" placeholder="Country" onChange={handleChange} className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg w-full text-white outline-none focus:border-emerald-500" />
            </div>
          </div>
        </div>

        {/* القسم الأيسر: ملخص الطلب والدفع */}
        <div className="space-y-8">
          <div className="bg-[#18181b] p-6 rounded-2xl border border-[#27272a]">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            <div className="space-y-4 max-h-60 overflow-y-auto mb-6 pr-2">
              {items.map((item) => (
                <div key={item.cartId} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded overflow-hidden bg-gray-800">
                         <img src={item.image} className="w-full h-full object-cover"/>
                    </div>
                    <div>
                        <p className="font-bold">{item.name}</p>
                        <p className="text-gray-400 text-xs">{item.selectedSize} / {item.selectedColor} x{item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-500">{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#27272a] pt-4 flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span>{cartTotal.toFixed(2)} USD</span>
            </div>
          </div>

          {/* خيارات الدفع */}
          <div className="bg-[#18181b] p-6 rounded-2xl border border-[#27272a]">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <CreditCard className="text-emerald-500" /> Payment Method
            </h2>

            {/* خيار 1: PayPal */}
            <div className="mb-6 relative z-0">
               <p className="text-sm text-gray-400 mb-2">Secure payment via PayPal:</p>
               <PayPalScriptProvider options={initialOptions}>
                <PayPalButtons 
                    style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }} 
                    createOrder={(data, actions) => {
                        return actions.order.create({
                            intent: "CAPTURE",
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "USD", // تأكد أن هذا يطابق عملة حسابك
                                        value: cartTotal.toFixed(2),
                                    },
                                    // هنا نمرر بيانات الشحن لبايبال ليحفظها لك في الإيميل
                                    shipping: {
                                        name: { full_name: `${formData.firstName} ${formData.lastName}` },
                                        address: {
                                            address_line_1: formData.address,
                                            admin_area_2: formData.city,
                                            country_code: "US", // يحتاج كود دولة صحيح (مثال US, SA)
                                        }
                                    }
                                },
                            ],
                        });
                    }}
                    onApprove={async (data, actions) => {
                        if (actions.order) {
                            const details = await actions.order.capture();
                            alert("Transaction completed by " + details.payer?.name?.given_name);
                            // هنا يمكنك إضافة كود لإفراغ السلة
                        }
                    }}
                />
            </PayPalScriptProvider>
            </div>

            <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-[#27272a]"></div>
                <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-[#27272a]"></div>
            </div>

            {/* خيار 2: WhatsApp */}
            <button 
              onClick={handleWhatsAppCheckout}
              className="w-full mt-4 bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-lg font-bold transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Complete Order via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}