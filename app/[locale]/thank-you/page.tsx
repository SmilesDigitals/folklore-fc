'use client';

import React from 'react';
// ✅ تأكد أن هذا السطر موجود هكذا (Link من next/link)
import Link from 'next/link'; 
import { useParams, useRouter } from 'next/navigation';
// ✅ الأيقونات فقط من lucide-react
import { CheckCircle, ShoppingBag, ArrowLeft } from 'lucide-react';

const TRANSLATIONS: any = {
  en: { title: 'Thank You!', message: 'We appreciate your support. Your submission has been received successfully.', continue: 'Continue Shopping', back: 'Go Back' },
  ar: { title: 'شكراً لك!', message: 'نحن نقدر دعمك. تم استلام طلبك بنجاح.', continue: 'إكمال التسوق', back: 'الرجوع للخلف' },
  fr: { title: 'Merci !', message: 'Nous apprécions votre soutien. Votre soumission a été reçue avec succès.', continue: 'Continuer vos achats', back: 'Retour' },
  es: { title: '¡Gracias!', message: 'Apreciamos tu apoyo. Tu envío ha sido recibido con éxito.', continue: 'Seguir comprando', back: 'Volver' },
  ja: { title: 'ありがとうございます！', message: 'ご支援ありがとうございます。送信を受け付けました。', continue: '買い物を続ける', back: '戻る' }
};

export default function ThankYouPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as string) || 'en';
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];
  const isRtl = locale === 'ar';

  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col items-center justify-center p-4 text-center" dir={isRtl ? 'rtl' : 'ltr'}>
      
      <div className="mb-8 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center border-2 border-emerald-500">
          <CheckCircle className="w-12 h-12 text-emerald-500" />
        </div>
      </div>

      <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">{t.title}</h1>
      <p className="text-gray-400 text-lg max-w-md mb-12 leading-relaxed">
        {t.message}
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        {/* ✅ هنا Link من next/link ويعمل بشكل صحيح */}
        <Link 
          href="/" 
          className="flex-1 bg-white text-black font-bold py-4 rounded-full hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <ShoppingBag size={20} />
          {t.continue}
        </Link>

        <button 
          onClick={() => router.back()}
          className="flex-1 bg-transparent border border-[#27272a] text-gray-300 font-bold py-4 rounded-full hover:border-white hover:text-white transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft size={20} className={isRtl ? 'rotate-180' : ''} />
          {t.back}
        </button>
      </div>

    </div>
  );
}