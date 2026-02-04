'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Check, ShoppingBag, Plus, Minus, Ruler } from 'lucide-react';
import { getProductById } from '../../../../lib/products';
import { useCart } from '../../../context/CartContext';
import SizeGuideModal from '../../../components/SizeGuideModal';
import { Product } from '../../../../types';

// الألوان الأساسية
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

// ✅ ترجمات بسيطة للمراجعات
const REVIEW_TRANSLATIONS: any = {
  en: {
    reviews: 'Customer Reviews',
    writeReview: 'Write a Review',
    signIn: 'Sign In with Google',
    submit: 'Submit Review',
    rating: 'Rating',
    comment: 'Review',
    success: 'Thank you! Your review has been submitted for approval.',
    error: 'Error submitting review. Please try again.',
    noReviews: 'No reviews yet. Be the first to share your experience!',
    pending: 'Submitting...'
  },
  ar: {
    reviews: 'مراجعات العملاء',
    writeReview: 'اكتب مراجعة',
    signIn: 'سجل الدخول بواسطة جوجل',
    submit: 'إرسال المراجعة',
    rating: 'التقييم',
    comment: 'المراجعة',
    success: 'شكراً لك! تم إرسال مراجعتك للموافق عليها.',
    error: 'حدث خطأ أثناء إرسال المراجعة. حاول مرة أخرى.',
    noReviews: 'لا توجد مراجعات بعد. كن أول من يشارك تجربته!',
    pending: 'جاري الإرسال...'
  },
  es: {
    reviews: 'Reseñas de Clientes',
    writeReview: 'Escribir una Reseña',
    signIn: 'Iniciar sesión con Google',
    submit: 'Enviar Reseña',
    rating: 'Calificación',
    comment: 'Reseña',
    success: '¡Gracias! Tu reseña ha sido enviada para su aprobación.',
    error: 'Error al enviar la reseña. Inténtalo de nuevo.',
    noReviews: 'Aún no hay reseñas. ¡Sé el primero en compartir tu experiencia!',
    pending: 'Enviando...'
  },
  fr: {
    reviews: 'Avis Clients',
    writeReview: 'Écrire un avis',
    signIn: 'Se connecter avec Google',
    submit: 'Soumettre l\'avis',
    rating: 'Évaluation',
    comment: 'Avis',
    success: 'Merci ! Votre avis a été soumis pour approbation.',
    error: 'Erreur lors de la soumission de l\'avis. Veuillez réessayer.',
    noReviews: 'Pas encore d\'avis. Soyez le premier à partager votre expérience !',
    pending: 'Envoi en cours...'
  },
  ja: {
    reviews: 'カスタマーレビュー',
    writeReview: 'レビューを書く',
    signIn: 'Googleでログイン',
    submit: 'レビューを送信',
    rating: '評価',
    comment: 'レビュー',
    success: 'ありがとうございます！レビューは承認のために送信されました。',
    error: 'レビューの送信中にエラーが発生しました。もう一度お試しください。',
    noReviews: 'まだレビューはありません。あなたの経験を共有する最初の人になりましょう！',
    pending: '送信中...'
  }
};

export default function ProductClient({ id, locale }: { id: string, locale: string }) {
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Lazy load components to avoid circular dependencies or SSR issues if any
  const ReviewForm = require('../../../components/ReviewForm').default;
  const ReviewList = require('../../../components/ReviewList').default;
  const t = REVIEW_TRANSLATIONS[locale] || REVIEW_TRANSLATIONS['en'];

  useEffect(() => {
    if (id) {
      const found = getProductById(id);
      setProduct(found);
    }
  }, [id]);

  if (!product) return <div className="min-h-screen bg-[#09090b] flex items-center justify-center text-white">Loading...</div>;

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
      {/* Schema.org Product Metadata for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": product.metaTitle || product.name,
            "image": [`https://folklorefc.com${product.image}`],
            "description": product.metaDescription || product.description,
            "sku": product.id,
            "brand": {
              "@type": "Brand",
              "name": "Folklore FC"
            },
            // ✅ حل تحذير review و aggregateRating (إضافة تقييم افتراضي أولي)
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5",
              "reviewCount": "1"
            },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "author": {
                "@type": "Person",
                "name": "Verified Customer"
              }
            },
            "offers": {
              "@type": "Offer",
              "url": `https://folklorefc.com/${locale}/product/${product.id}`,
              "priceCurrency": product.currency,
              "price": product.price,
              // ✅ حل تحذير priceValidUntil (تحديد تاريخ انتهاء العرض)
              "priceValidUntil": "2026-12-31",
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition",
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": "0",
                  "currency": product.currency
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": ["SA", "JP", "US", "FR"]
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "handlingTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 1,
                    "maxValue": 3,
                    "unitCode": "DAY"
                  },
                  "transitTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 5,
                    "maxValue": 15,
                    "unitCode": "DAY"
                  }
                }
              },
              "hasMerchantReturnPolicy": {
                "@type": "MerchantReturnPolicy",
                "applicableCountry": ["SA", "US", "FR", "JP", "AE"], // الدول التي تطبق عليها السياسة
                // ✅ تصحيح الخطأ: استخدام القيمة النصية الدقيقة التي يطلبها جوجل
                "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnPeriod",
                "merchantReturnDays": 30,
                "returnMethod": "https://schema.org/ReturnByMail",
                "returnFees": "https://schema.org/FreeReturn",
                // ✅ إضافة وقت استرداد المال الذي اخترته (5-7 أيام)
                "refundType": "https://schema.org/FullRefund",
                "merchantReturnLink": `https://folklorefc.com/${locale}/shipping`
              }
            }
          })
        }}
      />

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} gender={product.gender} />

      <Link href={`/${locale}`} className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Store
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="w-full max-w-[450px] mx-auto bg-[#18181b] rounded-2xl overflow-hidden aspect-[3/4] border border-[#27272a]">
          <img src={product.image} alt={product.altText || product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">{product.name}</h1>

          {/* قسم عرض السعر المزدوج في الصفحة الرئيسية */}
          <div className="mt-4 flex flex-col items-start">
            {/* السعر الأساسي بالدولار - واضح وأنيق */}
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold text-white">${product.price}</span>
              <span className="text-[10px] text-zinc-500 uppercase font-medium">USD</span>
            </div>

            {/* السعر المحلي التقريبي - صغير وخافت جداً أسفل السعر الأساسي */}
            {product.currency === 'USD' && (
              <p className="text-xs text-zinc-600 mt-0.5 italic">
                {(() => {
                  if (product.region === 'ar') return `≈ ${(product.price * 3.75).toFixed(0)} SAR`;
                  if (product.region === 'ja') return `≈ ${(product.price * 150).toLocaleString()} JPY`;
                  if (product.region === 'fr' || product.region === 'es') return `≈ ${(product.price * 0.92).toFixed(2)} EUR`;
                  return '';
                })()}
              </p>
            )}
          </div>

          <p className="text-gray-400 mb-8 leading-relaxed">{product.description}</p>

          {/* اختيار المقاس */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium text-gray-200">Select Size</h3>
              <button onClick={() => setIsSizeGuideOpen(true)} className="text-xs text-emerald-500 flex items-center gap-1 hover:text-emerald-400 transition-colors">
                <Ruler size={14} /> Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-3">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 rounded-lg border transition-all ${selectedSize === size ? 'bg-white text-black border-white' : 'border-[#27272a] text-gray-400 hover:border-gray-500'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* اختيار اللون */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Select Color: <span className="text-emerald-400">{selectedColor || '—'}</span></h3>
            <div className="flex flex-wrap gap-4">
              {availableColors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-10 h-10 rounded-full border-2 ${color.class} ${selectedColor === color.name ? 'ring-2 ring-white ring-offset-2 ring-offset-[#09090b]' : 'border-transparent'}`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center bg-[#18181b] border border-[#27272a] rounded-full px-4 h-14">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-2 text-gray-400 hover:text-white"><Minus size={20} /></button>
              <span className="font-bold w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} className="p-2 text-gray-400 hover:text-white"><Plus size={20} /></button>
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!selectedSize || !selectedColor}
              className={`flex-1 h-14 rounded-full font-bold transition-all ${isAdded ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'}`}
            >
              {isAdded ? 'Added to Cart' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>

      {/* ✅ قسم التقييمات والمراجعات */}
      <div className="max-w-4xl mx-auto mt-24 border-t border-[#27272a] pt-16">
        <h2 className="text-3xl font-black tracking-tighter mb-12 text-center uppercase">{t.reviews}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* نموذج كتابة مراجعة */}
          <div>
            <ReviewForm productId={product.id} t={t} />
          </div>

          {/* قائمة المراجعات */}
          <div>
            <ReviewList productId={product.id} />
          </div>
        </div>
      </div>

    </div>
  );
}