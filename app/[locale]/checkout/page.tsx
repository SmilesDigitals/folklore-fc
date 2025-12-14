'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { MessageCircle, User, CreditCard, ArrowLeft } from 'lucide-react';

// 👇 ضع كود Sandbox Client ID هنا
const PAYPAL_CLIENT_ID = "AVGkqNh70HGdwpGbyZj6OnU3PJIBTv-yYZiKTFlUvvMLE9clVRG_kSUqrvgorXVz5kysl7vGJZLH0lNE"; 

const initialOptions = {
    "clientId": PAYPAL_CLIENT_ID,
    currency: "USD",
    intent: "capture",
};

export default function CheckoutPage() {
  const { items, finalTotal, subtotal, discount } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) {
      router.push('/'); 
    }
  }, [items, router]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: '' // 👈 1. أضفنا هذا الحقل الجديد
  });

  if (items.length === 0) return null;

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsAppCheckout = () => {
    if (!formData.firstName || !formData.address || !formData.phone) {
      alert("Please fill in your shipping details first.");
      return;
    }

    const WHATSAPP_NUMBER = "212707230031"; 

    let message = `🆕 *NEW ORDER REQUEST*\n\n`;
    message += `👤 *Customer Details:*\n`;
    message += `Name: ${formData.firstName} ${formData.lastName}\n`;
    message += `Phone: ${formData.phone}\n`;
    message += `Address: ${formData.address}, ${formData.city}, ${formData.postalCode}, ${formData.country}\n\n`; // أضفنا الرمز البريدي هنا
    
    message += `🛒 *Order Items:*\n`;
    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} (${item.selectedSize}, ${item.selectedColor}) x${item.quantity}\n`;
    });

    message += `\n----------------`;
    message += `\n💵 Subtotal: $${subtotal.toFixed(2)}`;
    if (discount > 0) message += `\n🏷️ Discount: -$${discount.toFixed(2)}`;
    message += `\n💰 *Total Amount:* $${finalTotal.toFixed(2)}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white py-8 px-4 md:py-12">
      <div className="max-w-6xl mx-auto">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* القسم الأيمن: نموذج البيانات */}
          <div className="space-y-8">
            <h1 className="text-3xl font-bold mb-2">Checkout</h1>
            
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
                
                {/* 👇 2. حقل الرمز البريدي الجديد */}
                <input name="postalCode" placeholder="Zip / Postal Code" onChange={handleChange} className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg w-full text-white outline-none focus:border-emerald-500" />
                
                <select 
  name="country" 
  onChange={handleChange} 
  className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg w-full text-white outline-none focus:border-emerald-500 md:col-span-2 appearance-none"
  defaultValue=""
>
  <option value="" disabled>Select Country</option>
  <option value="US">United States 🇺🇸</option>
  <option value="FR">France 🇫🇷</option>
  <option value="ES">Spain 🇪🇸</option>
  <option value="IT">Italy 🇮🇹</option>
  <option value="DE">Germany 🇩🇪</option>
  <option value="GB">United Kingdom 🇬🇧</option>
  <option value="SA">Saudi Arabia 🇸🇦</option>
  <option value="AE">UAE 🇦🇪</option>
  <option value="QA">Qatar 🇶🇦</option>
  <option value="JP">Japan 🇯🇵</option>
  {/* أضف أي دولة أخرى تستهدفها هنا */}
</select>
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
                      <div className="w-12 h-12 rounded overflow-hidden bg-gray-800 border border-[#27272a]">
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

              <div className="border-t border-[#27272a] pt-4 space-y-2">
                 <div className="flex justify-between text-gray-400 text-sm">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} USD</span>
                 </div>
                 {discount > 0 && (
                   <div className="flex justify-between text-emerald-400 text-sm font-medium">
                      <span>Bundle Discount (10%)</span>
                      <span>- {discount.toFixed(2)} USD</span>
                   </div>
                 )}
                 <div className="flex justify-between text-gray-400 text-sm">
                    <span>Shipping</span>
                    <span className="text-emerald-500">Free</span>
                 </div>
                 <div className="flex justify-between items-center text-xl font-bold pt-2 text-white">
                  <span>Total</span>
                  <span>{finalTotal.toFixed(2)} USD</span>
                 </div>
              </div>
            </div>

            <div className="bg-[#18181b] p-6 rounded-2xl border border-[#27272a]">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CreditCard className="text-emerald-500" /> Payment Method
              </h2>

              <div className="mb-6 relative z-0">
                 <p className="text-sm text-gray-400 mb-3">Secure payment via PayPal or Card:</p>
                 
                 <PayPalScriptProvider options={initialOptions}>
                  <PayPalButtons 
                      style={{ layout: "vertical", color: "gold", shape: "rect", label: "pay" }} 
                      
                      createOrder={(data, actions) => {
                          // التحقق من إدخال الرمز البريدي قبل فتح نافذة الدفع
                          if (!formData.postalCode || !formData.address) {
                              alert("Please enter Address and Postal Code first!");
                              throw new Error("Missing Information");
                          }

                          return actions.order.create({
                              purchase_units: [{
                                  amount: {
                                      currency_code: "USD",
                                      value: finalTotal.toFixed(2),
                                  },
                                  shipping: {
                                    name: { full_name: `${formData.firstName} ${formData.lastName}` },
                                    address: {
                                      address_line_1: formData.address,
                                      admin_area_2: formData.city,
                                      postal_code: formData.postalCode, // 👈 3. إرسال الرمز البريدي هنا
                                      country_code: formData.country, // مؤقتاً للتجربة، تأكد من إدخال رمز بريدي أمريكي صالح إذا كنت تجرب (مثل 10001)
                                    }
                                  }
                              }],
                          } as any);
                      }}

                      onApprove={async (data, actions) => {
                          if (actions.order) {
                              const details: any = await actions.order.capture();
                              alert("Transaction completed by " + details.payer?.name?.given_name);
                              router.push('/thank-you');
                          }
                      }}
                      
                      onError={(err) => {
                          console.error("PayPal Error:", err);
                      }}
                  />
              </PayPalScriptProvider>
              </div>

              <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-[#27272a]"></div>
                  <span className="flex-shrink-0 mx-4 text-gray-500 text-sm">OR</span>
                  <div className="flex-grow border-t border-[#27272a]"></div>
              </div>

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
    </div>
  );
}