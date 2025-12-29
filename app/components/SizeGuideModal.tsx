'use client';

import React, { useState } from 'react';
import { X, Ruler, AlertTriangle } from 'lucide-react'; // أضفنا أيقونة التنبيه

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  gender?: string;
}

export default function SizeGuideModal({ isOpen, onClose, gender }: SizeGuideModalProps) {
  const [unit, setUnit] = useState<'inches' | 'cm'>('cm');

  if (!isOpen) return null;

  // 1. بيانات الرجال (Gildan 5000)
  const menSizeData = [
    { size: 'S', widthIn: '18', lengthIn: '28', widthCm: '46', lengthCm: '71' },
    { size: 'M', widthIn: '20', lengthIn: '29', widthCm: '51', lengthCm: '74' },
    { size: 'L', widthIn: '22', lengthIn: '30', widthCm: '56', lengthCm: '76' },
    { size: 'XL', widthIn: '24', lengthIn: '31', widthCm: '61', lengthCm: '79' },
    { size: '2XL', widthIn: '26', lengthIn: '32', widthCm: '66', lengthCm: '81' },
    { size: '3XL', widthIn: '28', lengthIn: '33', widthCm: '71', lengthCm: '84' },
    { size: '4XL', widthIn: '30', lengthIn: '34', widthCm: '76', lengthCm: '86' },
    { size: '5XL', widthIn: '32', lengthIn: '35', widthCm: '81', lengthCm: '89' },
  ];

  // 2. بيانات النساء (Bella + Canvas 3001) - تحديث المقاسات من XS إلى 5XL
  const womenSizeData = [
    { size: 'XS', widthIn: '16.5', lengthIn: '27', widthCm: '42', lengthCm: '69' },
    { size: 'S', widthIn: '18', lengthIn: '28', widthCm: '46', lengthCm: '71' },
    { size: 'M', widthIn: '20', lengthIn: '29', widthCm: '51', lengthCm: '74' },
    { size: 'L', widthIn: '22', lengthIn: '30', widthCm: '56', lengthCm: '76' },
    { size: 'XL', widthIn: '24', lengthIn: '31', widthCm: '61', lengthCm: '79' },
    { size: '2XL', widthIn: '26', lengthIn: '32', widthCm: '66', lengthCm: '81' },
    { size: '3XL', widthIn: '28', lengthIn: '33', widthCm: '71', lengthCm: '84' },
    { size: '4XL', widthIn: '30', lengthIn: '34', widthCm: '76', lengthCm: '86' },
    { size: '5XL', widthIn: '32', lengthIn: '35', widthCm: '81', lengthCm: '89' },
  ];

  const isWomen = gender === 'women';
  const sizeData = isWomen ? womenSizeData : menSizeData;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#18181b] border border-[#27272a] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative flex flex-col">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[#27272a]">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Ruler className="text-emerald-500" /> 
            {isWomen ? "Women's Size Guide" : "Men's Size Guide"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1">
          
          {/* Unit Switcher */}
          <div className="flex justify-center mb-8 bg-[#09090b] p-1 rounded-lg w-fit mx-auto border border-[#27272a]">
            <button onClick={() => setUnit('cm')} className={`px-6 py-2 rounded-md font-bold transition-all ${unit === 'cm' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              CM (EU/Asia)
            </button>
            <button onClick={() => setUnit('inches')} className={`px-6 py-2 rounded-md font-bold transition-all ${unit === 'inches' ? 'bg-emerald-500 text-white' : 'text-gray-400 hover:text-white'}`}>
              Inches (US)
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-[#27272a]">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#27272a] text-gray-300">
                  <th className="p-4 border-b border-[#3f3f46]">Size</th>
                  <th className="p-4 border-b border-[#3f3f46]">Width ({unit})</th>
                  <th className="p-4 border-b border-[#3f3f46]">Length ({unit})</th>
                </tr>
              </thead>
              <tbody className="text-gray-300">
                {sizeData.map((row, index) => (
                  <tr key={row.size} className={index % 2 === 0 ? 'bg-[#18181b]' : 'bg-[#09090b]'}>
                    <td className="p-4 border-b border-[#27272a] font-bold text-white">{row.size}</td>
                    <td className="p-4 border-b border-[#27272a]">{unit === 'inches' ? row.widthIn : row.widthCm}</td>
                    <td className="p-4 border-b border-[#27272a]">{unit === 'inches' ? row.lengthIn : row.lengthCm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Region Tips */}
          <div className="mt-8 space-y-4">
             {/* EU/International - Blue */}
             <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl">
                <h4 className="text-blue-400 font-bold mb-1 flex items-center gap-2">
                  <span>🇪🇺 Europe & 🌍 International</span>
                </h4>
                <p className="text-sm text-gray-300">Sizes are generally true to size. If you prefer a loose fit, go one size up. [cite: 71, 72]</p>
             </div>

             {/* Asia Customers - Yellow/Orange (التنبيه المطلوب) */}
             <div className="bg-yellow-500/10 border border-yellow-500/30 p-4 rounded-xl">
                <h4 className="text-yellow-500 font-bold mb-1 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  <span>🇯🇵 Asia Customers</span>
                </h4>
                <p className="text-sm text-gray-300">
                  US sizes run larger than Asian sizes. We recommend ordering <strong>one size smaller</strong> than your usual Asian size for a fitted look, or your usual size for an oversized look. 
                </p>
             </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[#27272a] bg-[#09090b]/50">
          <button onClick={onClose} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 rounded-xl transition-colors">
            Continue Order
          </button>
        </div>
      </div>
    </div>
  );
}