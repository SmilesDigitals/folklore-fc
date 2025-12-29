'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ShoppingBag, Plus, Minus, Ruler } from 'lucide-react';
import { getProductById } from '../../../../lib/products';
import { useCart } from '../../../context/CartContext';
import SizeGuideModal from '../../../components/SizeGuideModal';
import { Product } from '../../../../types';

// الألوان الأساسية (تظهر للجميع)
const BASE_COLORS = [
  { name: 'Black', class: 'bg-black border-white/20' },
  { name: 'White', class: 'bg-white border-gray-300' },
  { name: 'Navy Blue', class: 'bg-blue-900 border-blue-700' },
  { name: 'Dark Gray', class: 'bg-gray-800 border-gray-600' }
];

// الألوان الإضافية (تظهر للنساء والأطفال فقط)
const EXTRA_COLORS = [
  { name: 'Light Pink', class: 'bg-pink-300 border-pink-400' },
  { name: 'Light Blue', class: 'bg-sky-300 border-sky-400' }
];

const SIZES = ['S', 'M', 'L', 'XL', 'XXL', '3XL', '4XL', '5XL'];

export default function ProductClient({ id, locale }: { id: string, locale: string }) {
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  useEffect(() => {
    if (id) {
      const found = getProductById(id);
      setProduct(found);
    }
  }, [id]);

  if (!product) return <div className="min-h-screen bg-[#09090b] flex items-center justify-center">Loading...</div>;

  // تحديد الألوان بناءً على الجنس
  const availableColors = (product.gender === 'women' || product.gender === 'kids')
    ? [...BASE_COLORS, ...EXTRA_COLORS]
    : BASE_COLORS;

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) return;
    addItem(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-[#09090b] text-white min-h-screen">
      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} gender={product.gender} />
      
      <Link href={`/${locale}`} className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="w-full max-w-[450px] mx-auto bg-[#18181b] rounded-2xl overflow-hidden aspect-[3/4] border border-[#27272a]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl text-emerald-500 mb-6 font-medium">{product.price} {product.currency}</p>
          <p className="text-gray-400 mb-8 leading-relaxed">{product.description}</p>

          {/* اختيار المقاس */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
               <h3 className="text-sm font-medium">Select Size</h3>
               <button onClick={() => setIsSizeGuideOpen(true)} className="text-xs text-emerald-500 flex items-center gap-1">
                  <Ruler size={14} /> Size Guide
               </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {SIZES.map((size) => (
                <button key={size} onClick={() => setSelectedSize(size)} className={`w-12 h-12 rounded-lg border transition-all ${selectedSize === size ? 'bg-white text-black border-white' : 'border-[#27272a] text-gray-400'}`}>{size}</button>
              ))}
            </div>
          </div>

          {/* اختيار اللون - الآن بـ 4 أو 6 خيارات */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Select Color: <span className="text-emerald-400">{selectedColor}</span></h3>
            <div className="flex flex-wrap gap-4">
              {availableColors.map((color) => (
                <button 
                  key={color.name} 
                  onClick={() => setSelectedColor(color.name)} 
                  className={`w-10 h-10 rounded-full border-2 ${color.class} ${selectedColor === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-[#09090b]' : ''}`} 
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center bg-[#18181b] border border-[#27272a] rounded-full px-4 h-14">
               <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 text-gray-400"><Minus size={20} /></button>
               <span className="font-bold w-8 text-center">{quantity}</span>
               <button onClick={() => setQuantity(q => q + 1)} className="p-2 text-gray-400"><Plus size={20} /></button>
            </div>
            <button onClick={handleAddToCart} disabled={!selectedSize || !selectedColor} className={`flex-1 h-14 rounded-full font-bold transition-all ${isAdded ? 'bg-emerald-500' : 'bg-white text-black'}`}>
                {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}