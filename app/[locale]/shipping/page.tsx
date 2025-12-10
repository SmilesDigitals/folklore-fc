import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Truck, RefreshCw, ShieldCheck } from 'lucide-react';

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8">
      <div className="max-w-4xl mx-auto py-12">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-12">SHIPPING & RETURNS</h1>
        
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
                We ship worldwide via DHL Express and FedEx. All orders are processed within 1-2 business days.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-white">Standard Shipping:</strong> 5-7 business days.</li>
                <li><strong className="text-white">Express Shipping:</strong> 2-3 business days.</li>
              </ul>
              <p className="text-sm pt-4">
                *Customs duties and taxes are calculated at checkout based on your location.
              </p>
            </div>
          </section>

          {/* Returns Section */}
          <section className="bg-[#18181b] p-8 rounded-2xl border border-[#27272a]">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#09090b] rounded-full border border-[#27272a]">
                <RefreshCw className="text-emerald-500 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Returns & Exchanges</h2>
            </div>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                We accept returns within <strong className="text-white">30 days</strong> of delivery. Items must be unworn, unwashed, and with original tags attached.
              </p>
              <p>
                To initiate a return, please contact our support team. Return shipping costs are the responsibility of the customer unless the item is defective.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}