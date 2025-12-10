'use client';

import React from 'react';
import { Mail, ArrowRight, Lock } from 'lucide-react';

export default function Waitlist() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* خلفية جمالية خفيفة */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-10"></div>

      <div className="max-w-2xl w-full z-20 text-center space-y-12">
        
        {/* الشعار والقفل */}
        <div className="flex flex-col items-center gap-4">
          <Lock className="w-8 h-8 text-emerald-500 animate-pulse" />
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter">FOLKLORE FC</h1>
          <span className="px-3 py-1 border border-red-500 text-red-500 text-xs font-bold tracking-widest uppercase rounded-full">
            Store Locked
          </span>
        </div>

        {/* القصة (Reverse Psychology) */}
        <div className="space-y-6 text-gray-400 leading-relaxed font-light text-lg border-l-2 border-[#27272a] pl-6 text-left">
          <p>
            <strong className="text-white block mb-2">They told us it wouldn't work.</strong>
            When we started, they said mixing heritage with street football was a mistake. They said no one cares about the story behind the kit, just the logo.
          </p>
          <p>
            We built this brand in a garage, stitching history into fabric. We are not fast fashion. We are not for everyone. We are for those who understand the culture.
          </p>
          <p className="text-white font-medium">
            We only open our doors once a month for 24 hours. The rest of the time, we create.
          </p>
        </div>

        {/* نموذج جمع الإيميلات */}
        <div className="bg-[#18181b] p-8 rounded-2xl border border-[#27272a] shadow-2xl">
          <h2 className="text-2xl font-bold mb-2">Join the Inner Circle</h2>
          <p className="text-gray-500 text-sm mb-6">Get notified 1 hour before the store unlocks. Limited stock available.</p>
          
          <form 
            action="https://formspree.io/f/mnnezrpv" // 🔴 ضع رابطك هنا
            method="POST"
            className="flex flex-col sm:flex-row gap-3"
          >
            <div className="relative flex-grow">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email" 
                name="email"
                required
                placeholder="Enter your email" 
                className="w-full bg-[#09090b] border border-[#27272a] rounded-lg py-4 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
            <button className="bg-white text-black font-bold py-4 px-8 rounded-lg hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2 group">
              Join Waitlist
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

        <p className="text-zinc-600 text-xs uppercase tracking-widest">
          Next Drop: <span className="text-emerald-500">Coming Soon</span>
        </p>

      </div>
    </div>
  );
}