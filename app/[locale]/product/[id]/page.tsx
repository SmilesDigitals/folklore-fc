"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Check, ShoppingBag, Plus, Minus, Star, X } from 'lucide-react';

import { getProductById } from '../../../../lib/products';
import { Product } from '../../../../types';
import { useCart } from '../../../context/CartContext';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const BASE_COLORS = [
  { name: 'Black', class: 'bg-black border-white/20' },
  { name: 'White', class: 'bg-white border-gray-300' },
  { name: 'Dark Gray', class: 'bg-gray-800 border-gray-600' },
  { name: 'Navy Blue', class: 'bg-blue-900 border-blue-700' }
];

const EXTRA_COLORS = [
  { name: 'Light Pink', class: 'bg-pink-300 border-pink-400' },
  { name: 'Light Blue', class: 'bg-sky-300 border-sky-400' }
];

export default function ProductPage() {
  const params = useParams();
  const id = params?.id as string;
  const locale = (params?.locale as string) || 'en';
  
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // ✅ متغير جديد لحفظ رابط التوجيه
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    if (id) {
      const found = getProductById(id);
      setProduct(found as any);
    }
    
    // ✅ هذا الكود يكتشف رابط موقعك الحالي تلقائياً (سواء كان localhost أو IP أو Vercel)
    if (typeof window !== 'undefined') {
      setRedirectUrl(`${window.location.origin}/${locale}/thank-you`);
    }
  }, [id, locale]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor || !product) return;
    addItem(product, selectedSize, selectedColor, quantity);
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const incrementQty = () => setQuantity(q => q + 1);
  const decrementQty = () => setQuantity(q => q > 1 ? q - 1 : 1);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} 
      />
    ));
  };

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#09090b] text-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
        <p>Loading Product...</p>
      </div>
    );
  }

  const currentColors = (product.gender === 'women' || product.gender === 'kids')
    ? [...BASE_COLORS, ...EXTRA_COLORS]
    : BASE_COLORS;

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* قسم الصورة */}
        <div className="flex flex-col items-center justify-start w-full">
            <div className="w-full max-w-[450px] bg-[#18181b] rounded-2xl overflow-hidden aspect-[3/4] border border-[#27272a] shadow-2xl">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
        </div>

        {/* قسم التفاصيل */}
        <div>
          <h1 className="text-4xl font-bold mb-2 text-white">{product.name}</h1>
          <p className="text-2xl text-emerald-500 mb-6 font-medium">
            {product.price} {product.currency}
          </p>
          <p className="text-gray-400 mb-8 leading-relaxed">{product.description}</p>

          {/* اختيار المقاس */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3 text-gray-300">Select Size</h3>
            <div className="flex flex-wrap gap-3">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all font-medium text-sm
                    ${selectedSize === size 
                      ? 'bg-white text-black border-white shadow-lg scale-105' 
                      : 'border-[#27272a] bg-[#18181b] text-gray-400 hover:border-gray-500 hover:text-white'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* اختيار اللون */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3 text-gray-300">
              Select Color: <span className="text-emerald-400 ml-2">{selectedColor}</span>
            </h3>
            <div className="flex flex-wrap gap-4">
              {currentColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 rounded-full border-2 transition-all ${color.class} 
                    ${selectedColor === color.name 
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-[#09090b] scale-110' 
                      : 'hover:scale-110 opacity-80 hover:opacity-100'}`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* منطقة الأزرار */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <div className="flex items-center justify-between bg-[#18181b] border border-[#27272a] rounded-full px-4 h-14 w-full sm:w-auto min-w-[140px]">
              <button onClick={decrementQty} className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-[#27272a] rounded-full">
                <Minus size={20} />
              </button>
              <span className="font-bold text-white text-lg w-8 text-center">{quantity}</span>
              <button onClick={incrementQty} className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-[#27272a] rounded-full">
                <Plus size={20} />
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className={`flex-1 h-14 rounded-full font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300
                ${isAdded 
                  ? 'bg-emerald-500 text-white scale-95' 
                  : (selectedSize && selectedColor)
                    ? 'bg-white text-black hover:bg-gray-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                    : 'bg-[#27272a] text-gray-600 cursor-not-allowed'}`}
            >
              {isAdded ? <><Check className="w-6 h-6" /> Added</> : <><ShoppingBag className="w-5 h-5" /> Add to Cart</>}
            </button>
          </div>
          
          {(!selectedSize || !selectedColor) && (
              <p className="text-gray-500 text-xs mt-4">Please select both size and color.</p>
          )}

          {/* قسم التقييمات */}
          <div className="mt-20 border-t border-[#27272a] pt-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Reviews ({product.reviews?.length || 0})</h2>
              
              <button 
                onClick={() => setShowReviewForm(!showReviewForm)}
                className="text-sm font-medium text-emerald-500 hover:text-emerald-400 border border-emerald-500/50 px-4 py-2 rounded-full hover:bg-emerald-500/10 transition-colors"
              >
                {showReviewForm ? 'Close Form' : 'Write a Review'}
              </button>
            </div>

            {showReviewForm && (
              <div className="bg-[#18181b] p-6 rounded-2xl border border-[#27272a] mb-8 animate-in fade-in slide-in-from-top-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-white">Share your experience</h3>
                    <button onClick={() => setShowReviewForm(false)} className="text-gray-500 hover:text-white"><X size={18}/></button>
                </div>
                
                <form action="https://formspree.io/f/mnnezrpv" method="POST" className="space-y-4">
                    
                    {/* ✅ هنا نستخدم المتغير الجديد الذي يحتوي على الرابط الكامل الصحيح */}
                    <input type="hidden" name="_next" value={redirectUrl} />
                    
                    <input type="hidden" name="product_name" value={product.name} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" required placeholder="Your Name" className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg text-white w-full outline-none focus:border-emerald-500" />
                        <select name="rating" className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg text-white w-full outline-none focus:border-emerald-500">
                            <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                            <option value="4">⭐⭐⭐⭐ - Good</option>
                            <option value="3">⭐⭐⭐ - Average</option>
                            <option value="2">⭐⭐ - Poor</option>
                            <option value="1">⭐ - Terrible</option>
                        </select>
                    </div>
                    <textarea name="comment" required rows={3} placeholder="Write your review here..." className="bg-[#09090b] border border-[#27272a] p-3 rounded-lg text-white w-full outline-none focus:border-emerald-500"></textarea>
                    <button type="submit" className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-emerald-500 hover:text-white transition-colors">Submit Review</button>
                </form>
              </div>
            )}

            <div className="space-y-6">
              {product.reviews && product.reviews.length > 0 ? (
                product.reviews.map((review) => (
                  <div key={review.id} className="bg-[#18181b] p-6 rounded-2xl border border-[#27272a]">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-white">{review.user}</h4>
                        <span className="text-xs text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex gap-1">{renderStars(review.rating)}</div>
                    </div>
                    <p className="text-gray-300 leading-relaxed">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 italic">No reviews yet. Be the first to review this product!</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}