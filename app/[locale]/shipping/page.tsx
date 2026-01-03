'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Truck, RefreshCw, ShieldCheck, Clock } from 'lucide-react';

// ✅ قاموس الترجمات لصفحة الشحن
const TRANSLATIONS: any = {
  en: {
    backHome: 'Back to Home',
    title: 'Shipping & Returns',
    shippingTitle: 'Shipping Policy',
    shippingDesc: 'We are proud to offer FREE Worldwide Shipping on all orders. No minimum purchase required.',
    productionTitle: 'Production Time',
    productionDays: '1-3 Business Days (Custom Printed)',
    deliveryTitle: 'Estimated Delivery',
    deliveryDays: '5-15 Business Days via USPS / Global Standard',
    cutoff: '*Order cut-off time is 2:00 PM (EST). Orders placed after this time will be processed the following business day.',
    returnsTitle: 'Returns & Refunds',
    returnsDesc: "Your satisfaction is our priority. If you're not happy with your purchase, we offer FREE Returns within 30 days of delivery.",
    howToReturn: 'How to Return:',
    howToReturnDesc: 'Simply contact our support. We will provide a pre-paid "Download & Print" shipping label for you.',
    refundProcessing: 'Refund Processing:',
    refundProcessingDesc: 'Once we receive your return, the refund will be processed back to your original payment method within 5-7 business days.'
  },
  ar: {
    backHome: 'العودة للرئيسية',
    title: 'الشحن والاسترجاع',
    shippingTitle: 'سياسة الشحن',
    shippingDesc: 'نحن فخورون بتقديم شحن عالمي مجاني لجميع الطلبات. لا يتطلب أدنى حد للشراء.',
    productionTitle: 'وقت التجهيز',
    productionDays: '1-3 أيام عمل (طباعة مخصصة)',
    deliveryTitle: 'التوصيل المتوقع',
    deliveryDays: '5-15 يوم عمل عبر USPS / الشحن القياسي العالمي',
    cutoff: '*وقت قطع الطلب هو 2:00 ظهراً (EST). الطلبات المقدمة بعد هذا الوقت ستتم معالجتها في يوم العمل التالي.',
    returnsTitle: 'الاسترجاع والاسترداد',
    returnsDesc: 'رضاك هو أولويتنا. إذا لم تكن راضياً عن مشترياتك، فنحن نقدم إرجاعاً مجانياً خلال 30 يوماً من الاستلام.',
    howToReturn: 'كيفية الإرجاع:',
    howToReturnDesc: 'ببساطة تواصل مع الدعم الفني. سنقوم بتزويدك بملصق شحن مدفوع مسبقاً (تحميل وطباعة).',
    refundProcessing: 'معالجة الاسترداد:',
    refundProcessingDesc: 'بمجرد استلامنا للمرتجع، سيتم إعادة المبلغ إلى وسيلة الدفع الأصلية خلال 5-7 أيام عمل.',
  },
  es: {
    backHome: 'Volver al Inicio',
    title: 'Envío y Devoluciones',
    shippingTitle: 'Política de Envío',
    shippingDesc: 'Nos enorgullece ofrecer envío gratuito a todo el mundo en todos los pedidos. Sin compra mínima.',
    productionTitle: 'Tiempo de Producción',
    productionDays: '1-3 días hábiles (impresión personalizada)',
    deliveryTitle: 'Entrega Estimada',
    deliveryDays: '5-15 días hábiles a través de USPS / Estándar Global',
    cutoff: '*La hora límite del pedido es a las 2:00 p.m. (EST). Los pedidos realizados después se procesarán el siguiente día hábil.',
    returnsTitle: 'Devoluciones y Reembolsos',
    returnsDesc: 'Su satisfacción es nuestra prioridad. Si no está satisfecho con su compra, ofrecemos devoluciones GRATUITAS dentro de los 30 días posteriores a la entrega.',
    howToReturn: 'Cómo Devolver:',
    howToReturnDesc: 'Simplemente contacte a nuestro soporte. Le proporcionaremos una etiqueta de envío prepagada.',
    refundProcessing: 'Procesamiento de Reembolso:',
    refundProcessingDesc: 'Una vez recibida su devolución, el reembolso se procesará en su método de pago original en 5-7 días hábiles.'
  },
  fr: {
    backHome: "Retour à l'Accueil",
    title: 'Livraison et Retours',
    shippingTitle: 'Politique de Livraison',
    shippingDesc: 'Nous sommes fiers d\'offrir la livraison gratuite dans le monde entier sur toutes les commandes. Aucun achat minimum requis.',
    productionTitle: 'Délai de Production',
    productionDays: '1-3 jours ouvrables (impression personnalisée)',
    deliveryTitle: 'Livraison Estimée',
    deliveryDays: '5-15 jours ouvrables via USPS / Standard Mondial',
    cutoff: '*L\'heure limite de commande est 14h00 (EST). Les commandes passées après cette heure seront traitées le jour ouvrable suivant.',
    returnsTitle: 'Retours et Remboursements',
    returnsDesc: 'Votre satisfaction est notre priorité. Si vous n\'êtes pas satisfait, nous offrons des retours GRATUITS dans les 30 jours suivant la livraison.',
    howToReturn: 'Comment retourner :',
    howToReturnDesc: 'Contactez simplement notre support. Nous vous fournirons une étiquette de retour prépayée.',
    refundProcessing: 'Traitement du Remboursement :',
    refundProcessingDesc: 'Une fois votre retour reçu, le remboursement sera traité sur votre mode de paiement original sous 5 à 7 jours ouvrables.'
  },
  ja: {
    backHome: 'ホームに戻る',
    title: '配送と返品',
    shippingTitle: '配送ポリシー',
    shippingDesc: '全注文で世界中どこでも送料無料でお届けします。最低購入金額はありません。',
    productionTitle: '製造期間',
    productionDays: '1〜3営業日（カスタムプリント）',
    deliveryTitle: '配送目安',
    deliveryDays: '5〜15営業日（USPS / 国際標準配送）',
    cutoff: '※注文締め切り時間は午後2時（EST）です。それ以降の注文は翌営業日に処理されます。',
    returnsTitle: '返品と返金',
    returnsDesc: 'お客様の満足が私たちの優先事項です。ご購入にご満足いただけない場合は、お届けから30日以内であれば無料で返品を承ります。',
    howToReturn: '返品方法：',
    howToReturnDesc: 'サポートまでご連絡ください。プリペイドの配送ラベル（ダウンロードして印刷）を提供いたします。',
    refundProcessing: '返金処理：',
    refundProcessingDesc: '返品受領後、5〜7営業日以内にお支払い方法と同じ方法で返金処理が行われます。'
  }
};

export default function ShippingPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto py-12">
        <Link href={`/${locale}`} className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className={`w-4 h-4 transition-transform ${locale === 'ar' ? 'ml-2 rotate-180' : 'mr-2'}`} /> 
          {t.backHome}
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-12 uppercase text-left">{t.title}</h1>
        
        <div className="space-y-12">
          {/* Shipping Section */}
          <section className="bg-[#18181b] p-8 rounded-2xl border border-[#27272a] text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#09090b] rounded-full border border-[#27272a]">
                <Truck className="text-emerald-500 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">{t.shippingTitle}</h2>
            </div>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                {t.shippingDesc.split('FREE Worldwide Shipping').map((part: string, i: number) => (
                  <React.Fragment key={i}>
                    {part}
                    {i === 0 && <strong className="text-white text-lg">FREE Worldwide Shipping</strong>}
                  </React.Fragment>
                ))}
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <li className="bg-[#09090b] p-4 rounded-xl border border-[#27272a]">
                  <span className="block text-white font-bold mb-1">{t.productionTitle}</span>
                  {t.productionDays}
                </li>
                <li className="bg-[#09090b] p-4 rounded-xl border border-[#27272a]">
                  <span className="block text-white font-bold mb-1">{t.deliveryTitle}</span>
                  {t.deliveryDays}
                </li>
              </ul>
              <p className="text-sm pt-4 italic border-t border-[#27272a] mt-4">
                {t.cutoff}
              </p>
            </div>
          </section>

          {/* Returns Section */}
          <section className="bg-[#18181b] p-8 rounded-2xl border border-[#27272a] text-left">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#09090b] rounded-full border border-[#27272a]">
                <RefreshCw className="text-emerald-500 w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">{t.returnsTitle}</h2>
            </div>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                {t.returnsDesc.split('FREE Returns').map((part: string, i: number) => (
                  <React.Fragment key={i}>
                    {part}
                    {i === 0 && <strong className="text-white">FREE Returns</strong>}
                  </React.Fragment>
                ))}
              </p>
              <div className="space-y-3 mt-4">
                <div className="flex gap-3 items-start">
                  <ShieldCheck className="text-emerald-500 shrink-0 mt-1" size={18} />
                  <p><strong className="text-white">{t.howToReturn}</strong> {t.howToReturnDesc}</p>
                </div>
                <div className="flex gap-3 items-start">
                  <Clock className="text-emerald-500 shrink-0 mt-1" size={18} />
                  <p><strong className="text-white">{t.refundProcessing}</strong> {t.refundProcessingDesc}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}