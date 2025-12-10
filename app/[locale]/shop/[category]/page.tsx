// app/[locale]/shop/[category]/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { products } from '../../../../lib/products';

// قاموس عناوين الصفحات
const TITLES: any = {
  men: { en: 'Men\'s Collection', ar: 'تشكيلة الرجال', ja: 'メンズコレクション', fr: 'Collection Homme', es: 'Colección Hombre' },
  women: { en: 'Women\'s Collection', ar: 'تشكيلة النساء', ja: 'ウィメンズコレクション', fr: 'Collection Femme', es: 'Colección Mujer' },
  kids: { en: 'Kids\' Collection', ar: 'تشكيلة الأطفال', ja: 'キッズコレクション', fr: 'Collection Enfant', es: 'Colección Niños' }
};

const ProductCard = ({ product, locale }: { product: any, locale: string }) => {
  return (
    <div className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#18181b] border border-[#27272a]">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" loading="lazy"/>
        {product.isNew && ( <span className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1 rounded">NEW SEASON</span> )}
        <div className="absolute bottom-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Link href={`/${locale}/product/${product.id}`} className="flex items-center justify-center bg-white text-black w-10 h-10 rounded-full shadow-lg hover:bg-emerald-400 transition-colors">
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-bold text-white">
            <Link href={`/${locale}/product/${product.id}`}><span aria-hidden="true" className="absolute inset-0" />{product.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-gray-400">{product.category || 'Football Kit'}</p>
        </div>
        <p className="text-sm font-bold text-emerald-400">{product.price} <span className="text-xs text-gray-500">{product.currency || 'USD'}</span></p>
      </div>
    </div>
  );
};

export default function CategoryPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const category = (params?.category as string) || 'men';

  // تصفية المنتجات حسب الفئة والمنطقة
  const categoryProducts = products.filter(p => 
    (p.gender === category) && (!p.region || p.region === locale)
  );

  const title = TITLES[category]?.[locale] || TITLES[category]?.['en'] || category.toUpperCase();

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8">
      <div className="max-w-7xl mx-auto py-12">
        <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>

        <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 uppercase">{title}</h1>
        <p className="text-gray-400 mb-16">Showing all products for {category}.</p>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 border border-[#27272a] rounded-2xl bg-[#18181b]">
            <p>Coming Soon...</p>
          </div>
        )}
      </div>
    </div>
  );
}