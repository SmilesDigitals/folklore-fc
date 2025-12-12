'use client';

import React, { useState } from 'react';
import { Copy, Check, AlertCircle, CheckCircle2 } from 'lucide-react';
// 👇 1. نستورد قائمة المنتجات الحالية للفحص
import { products } from '../../../lib/products';

export default function AdminGenerator() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    currency: 'USD',
    imageName: '', 
    region: 'en',
    gender: 'men',
    description: ''
  });

  const [generatedCode, setGeneratedCode] = useState('');
  const [copied, setCopied] = useState(false);
  
  // 👇 حالة جديدة لتخزين هل الـ ID مكرر أم لا
  const [idStatus, setIdStatus] = useState<'empty' | 'exists' | 'available'>('empty');

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // 👇 منطق فحص الـ ID
    if (name === 'id') {
      if (value.trim() === '') {
        setIdStatus('empty');
      } else {
        // هل هذا الـ ID موجود في قائمة المنتجات؟
        const exists = products.some((p) => p.id === value.trim());
        setIdStatus(exists ? 'exists' : 'available');
      }
    }
  };

  const generateCode = () => {
    // منع التوليد إذا كان الـ ID مكرراً
    if (idStatus === 'exists') {
      alert("⚠️ Cannot generate: ID already exists!");
      return;
    }

    const imagePath = `/images/${formData.gender}/${formData.imageName}`;

    const code = `
  {
    id: '${formData.id}',
    name: '${formData.name}',
    price: ${formData.price},
    currency: '${formData.currency}',
    image: '${imagePath}',
    region: '${formData.region}',
    gender: '${formData.gender}',
    description: '${formData.description}'
  },`;
    setGeneratedCode(code);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-emerald-500">Product Code Generator</h1>

        <div className="grid gap-4 bg-[#18181b] p-6 rounded-xl border border-[#27272a]">
          
          {/* ID & Name */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">ID</label>
              <div className="relative">
                <input 
                  name="id" 
                  onChange={handleChange} 
                  placeholder="e.g., us-6" 
                  className={`w-full bg-[#09090b] border p-2 rounded text-white outline-none transition-colors
                    ${idStatus === 'exists' ? 'border-red-500 focus:border-red-500' : 
                      idStatus === 'available' ? 'border-emerald-500 focus:border-emerald-500' : 
                      'border-[#27272a] focus:border-emerald-500'}`} 
                />
                {/* أيقونة الحالة */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  {idStatus === 'exists' && <AlertCircle className="text-red-500 w-5 h-5" />}
                  {idStatus === 'available' && <CheckCircle2 className="text-emerald-500 w-5 h-5" />}
                </div>
              </div>
              {/* رسالة الخطأ */}
              {idStatus === 'exists' && <p className="text-red-500 text-xs mt-1">ID already exists!</p>}
              {idStatus === 'available' && <p className="text-emerald-500 text-xs mt-1">ID is valid</p>}
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input name="name" onChange={handleChange} placeholder="Product Name" className="w-full bg-[#09090b] border border-[#27272a] p-2 rounded text-white" />
            </div>
          </div>

          {/* Price & Currency */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Price</label>
              <input name="price" type="number" onChange={handleChange} placeholder="50.00" className="w-full bg-[#09090b] border border-[#27272a] p-2 rounded text-white" />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Currency</label>
              <select name="currency" onChange={handleChange} className="w-full bg-[#09090b] border border-[#27272a] p-2 rounded text-white">
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="SAR">SAR</option>
                <option value="JPY">JPY (¥)</option>
              </select>
            </div>
          </div>

          {/* Image & Description */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Image Filename</label>
              <input name="imageName" onChange={handleChange} placeholder="shirt1.webp" className="w-full bg-[#09090b] border border-[#27272a] p-2 rounded text-white" />
              <p className="text-xs text-gray-500 mt-1">Just filename (e.g. photo.jpg)</p>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Gender</label>
              <select name="gender" onChange={handleChange} className="w-full bg-[#09090b] border border-[#27272a] p-2 rounded text-white">
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="kids">Kids</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div>
              <label className="block text-sm text-gray-400 mb-1">Region</label>
              <select name="region" onChange={handleChange} className="w-full bg-[#09090b] border border-[#27272a] p-2 rounded text-white">
                <option value="en">EN (America/UK)</option>
                <option value="fr">FR (France)</option>
                <option value="es">ES (Spain)</option>
                <option value="ar">AR (Arab)</option>
                <option value="ja">JA (Japan)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Description</label>
            <textarea name="description" onChange={handleChange} rows={3} className="w-full bg-[#09090b] border border-[#27272a] p-2 rounded text-white" />
          </div>

          <button 
            onClick={generateCode} 
            disabled={idStatus === 'exists'} // تعطيل الزر إذا كان مكرراً
            className={`font-bold py-3 rounded mt-2 transition-colors
              ${idStatus === 'exists' ? 'bg-gray-600 cursor-not-allowed text-gray-400' : 'bg-emerald-500 text-white hover:bg-emerald-600'}`}
          >
            {idStatus === 'exists' ? 'Fix ID first' : 'Generate Code'}
          </button>
        </div>

        {generatedCode && (
          <div className="mt-8 bg-[#18181b] p-6 rounded-xl border border-[#27272a] relative group">
            <h3 className="text-gray-400 text-sm mb-2">Copy and paste into <span className="text-emerald-400 font-mono">lib/lists/{formData.gender}.ts</span></h3>
            <pre className="bg-[#09090b] p-4 rounded text-green-400 font-mono text-sm overflow-x-auto">
              {generatedCode}
            </pre>
            <button 
              onClick={copyToClipboard}
              className="absolute top-10 right-8 bg-white/10 hover:bg-white/20 p-2 rounded text-white transition-colors"
              title="Copy"
            >
              {copied ? <Check size={20} className="text-emerald-500" /> : <Copy size={20} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}