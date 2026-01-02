import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Truck, RefreshCw, ShieldCheck, Clock } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8">
      <div className="max-w-4xl mx-auto py-12">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-12 uppercase">Shipping & Returns</h1>
        
        <div className="space-y-12">
          {/* Shipping Section */}
          <section className="bg-[#18181b] p-8 rounded-2xl border border-[#27272a]">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#09090b] rounded-full border border-[#27272a]">
                <Truck className="text-emerald-500 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Shipping Policy</h2>
            </div>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                We are proud to offer <strong className="text-white text-lg">FREE Worldwide Shipping</strong> on all orders. No minimum purchase required.
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <li className="bg-[#09090b] p-4 rounded-xl border border-[#27272a]">
                  <span className="block text-white font-bold mb-1">Production Time</span>
                  1-3 Business Days (Custom Printed)
                </li>
                <li className="bg-[#09090b] p-4 rounded-xl border border-[#27272a]">
                  <span className="block text-white font-bold mb-1">Estimated Delivery</span>
                  5-15 Business Days via USPS / Global Standard
                </li>
              </ul>
              <p className="text-sm pt-4 italic border-t border-[#27272a] mt-4">
                *Order cut-off time is 2:00 PM (EST). Orders placed after this time will be processed the following business day.
              </p>
            </div>
          </section>

          {/* Returns Section */}
          <section className="bg-[#18181b] p-8 rounded-2xl border border-[#27272a]">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#09090b] rounded-full border border-[#27272a]">
                <RefreshCw className="text-emerald-500 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Returns & Refunds</h2>
            </div>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                Your satisfaction is our priority. If you're not happy with your purchase, we offer <strong className="text-white">FREE Returns</strong> within <strong className="text-white text-lg">30 days</strong> of delivery.
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 items-start">
                  <ShieldCheck className="text-emerald-500 shrink-0 mt-1" size={18} />
                  <p><strong className="text-white">How to Return:</strong> Simply contact our support. We will provide a pre-paid "Download & Print" shipping label for you.</p>
                </div>
                <div className="flex gap-3 items-start">
                  <Clock className="text-emerald-500 shrink-0 mt-1" size={18} />
                  <p><strong className="text-white">Refund Processing:</strong> Once we receive your return, the refund will be processed back to your original payment method within <strong className="text-white font-bold text-lg">5-7 business days</strong>.</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}