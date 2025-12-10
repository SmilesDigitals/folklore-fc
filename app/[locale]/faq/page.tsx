'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Minus, CreditCard, Truck, RefreshCw, HelpCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

// --- قاموس الترجمة الشامل ---
const TRANSLATIONS: any = {
  en: {
    back: 'Back to Home',
    title: 'FREQUENTLY ASKED QUESTIONS',
    subtitle: 'Everything you need to know about Folklore FC.',
    categories: {
      payment: 'Payment & Orders',
      shipping: 'Shipping & Delivery',
      returns: 'Returns & Exchanges',
      other: 'General'
    },
    questions: [
      {
        category: 'payment',
        q: 'What payment methods do you accept?',
        a: 'We primarily use **PayPal** for secure, instant transactions worldwide. If you do not have a PayPal account, you can often check out as a guest using your credit card through the PayPal gateway.'
      },
      {
        category: 'payment',
        q: 'I am having trouble paying with PayPal. What can I do?',
        a: 'We understand that sometimes technical issues happen. That is why we introduced **"Checkout via WhatsApp"**. Simply select this option at checkout, and your order details will be sent directly to our support team. We will help you complete the payment manually using alternative methods suitable for your region.'
      },
      {
        category: 'shipping',
        q: 'Do you ship internationally?',
        a: 'Yes! Folklore FC ships to over 190 countries worldwide. We believe football culture belongs to everyone, everywhere.'
      },
      {
        category: 'shipping',
        q: 'How long will my order take to arrive?',
        a: 'Standard international shipping takes **7-14 business days**. Express shipping (DHL/FedEx) takes **3-5 business days**. Processing time before shipping is usually 1-2 days.'
      },
      {
        category: 'returns',
        q: 'Can I return or exchange an item?',
        a: 'Absolutely. You have **30 days** from the delivery date to return items. They must be unworn, unwashed, and with original tags attached. Contact us to start the process.'
      },
      {
        category: 'other',
        q: 'How do I contact customer support?',
        a: 'You can reach us anytime via the **"Contact Us"** page, or send us a direct message on Instagram. For urgent order issues, using the WhatsApp button is the fastest way.'
      }
    ],
    stillHaveQuestions: 'Still have questions?',
    contactSupport: 'Contact Support'
  },
  ar: {
    back: 'العودة للرئيسية',
    title: 'الأسئلة الشائعة',
    subtitle: 'كل ما تحتاج معرفته عن فولكلور إف سي.',
    categories: {
      payment: 'الدفع والطلبات',
      shipping: 'الشحن والتوصيل',
      returns: 'الاسترجاع والاستبدال',
      other: 'عام'
    },
    questions: [
      {
        category: 'payment',
        q: 'ما هي طرق الدفع المتاحة؟',
        a: 'نستخدم بشكل أساسي **PayPal** لضمان معاملات آمنة وفورية عالمياً. إذا لم يكن لديك حساب PayPal، يمكنك غالباً الدفع كضيف باستخدام بطاقتك الائتمانية عبر بوابة PayPal.'
      },
      {
        category: 'payment',
        q: 'أواجه مشكلة في الدفع عبر PayPal. ماذا أفعل؟',
        a: 'نحن نتفهم حدوث مشاكل تقنية أحياناً. لهذا السبب وفرنا خيار **"إتمام الطلب عبر WhatsApp"**. اختر هذا الخيار عند الدفع، وسيتم إرسال تفاصيل طلبك لفريق الدعم لدينا. سنقوم بمساعدتك لإتمام الدفع يدوياً بطرق بديلة تناسبك.'
      },
      {
        category: 'shipping',
        q: 'هل تشحون لجميع دول العالم؟',
        a: 'نعم! فولكلور إف سي يشحن لأكثر من 190 دولة حول العالم. نحن نؤمن بأن ثقافة كرة القدم ملك للجميع.'
      },
      {
        category: 'shipping',
        q: 'كم يستغرق وصول الطلب؟',
        a: 'الشحن الدولي العادي يستغرق **7-14 يوم عمل**. الشحن السريع (DHL/FedEx) يستغرق **3-5 أيام عمل**. تجهيز الطلب يستغرق عادة 1-2 يوم.'
      },
      {
        category: 'returns',
        q: 'هل يمكنني إرجاع أو استبدال المنتج؟',
        a: 'بالتأكيد. لديك **30 يوماً** من تاريخ الاستلام لإرجاع المنتجات. يجب أن تكون غير ملبوسة، غير مغسولة، وبالعلامات الأصلية. تواصل معنا لبدء الإجراءات.'
      },
      {
        category: 'other',
        q: 'كيف أتواصل مع خدمة العملاء؟',
        a: 'يمكنك مراسلتنا في أي وقت عبر صفحة **"تواصل معنا"**، أو عبر رسائل إنستغرام. للمشاكل العاجلة، استخدام زر الواتساب هو الطريقة الأسرع.'
      }
    ],
    stillHaveQuestions: 'لا يزال لديك أسئلة؟',
    contactSupport: 'تواصل مع الدعم'
  },
  fr: {
    back: 'Retour à l\'accueil',
    title: 'QUESTIONS FRÉQUENTES',
    subtitle: 'Tout ce que vous devez savoir sur Folklore FC.',
    categories: {
      payment: 'Paiement & Commandes',
      shipping: 'Livraison',
      returns: 'Retours & Échanges',
      other: 'Général'
    },
    questions: [
      {
        category: 'payment',
        q: 'Quels moyens de paiement acceptez-vous ?',
        a: 'Nous utilisons principalement **PayPal** pour des transactions sécurisées. Vous pouvez souvent payer par carte de crédit via PayPal sans créer de compte.'
      },
      {
        category: 'payment',
        q: 'J\'ai des problèmes avec PayPal. Que faire ?',
        a: 'Nous comprenons les soucis techniques. C\'est pourquoi nous proposons **"Commander via WhatsApp"**. Choisissez cette option et notre équipe vous aidera à finaliser le paiement manuellement avec d\'autres méthodes.'
      },
      {
        category: 'shipping',
        q: 'Livrez-vous à l\'international ?',
        a: 'Oui ! Nous livrons dans plus de 190 pays. La culture du football est universelle.'
      },
      {
        category: 'shipping',
        q: 'Quels sont les délais de livraison ?',
        a: 'La livraison standard prend **7-14 jours ouvrables**. La livraison express (DHL/FedEx) prend **3-5 jours ouvrables**.'
      },
      {
        category: 'returns',
        q: 'Puis-je retourner un article ?',
        a: 'Absolument. Vous avez **30 jours** pour retourner les articles non portés et avec les étiquettes d\'origine.'
      },
      {
        category: 'other',
        q: 'Comment contacter le service client ?',
        a: 'Via la page **"Contactez-nous"** ou WhatsApp pour une réponse rapide.'
      }
    ],
    stillHaveQuestions: 'Vous avez encore des questions ?',
    contactSupport: 'Contacter le support'
  },
  es: {
    back: 'Volver al Inicio',
    title: 'PREGUNTAS FRECUENTES',
    subtitle: 'Todo lo que necesitas saber sobre Folklore FC.',
    categories: {
      payment: 'Pago y Pedidos',
      shipping: 'Envíos',
      returns: 'Devoluciones',
      other: 'General'
    },
    questions: [
      {
        category: 'payment',
        q: '¿Qué métodos de pago aceptan?',
        a: 'Utilizamos principalmente **PayPal**. También puedes pagar con tarjeta a través de PayPal como invitado.'
      },
      {
        category: 'payment',
        q: 'Tengo problemas con PayPal. ¿Qué hago?',
        a: 'Ofrecemos **"Pagar vía WhatsApp"**. Selecciona esta opción y nuestro equipo te ayudará a completar el pago manualmente con otros métodos.'
      },
      {
        category: 'shipping',
        q: '¿Hacen envíos internacionales?',
        a: '¡Sí! Enviamos a más de 190 países.'
      },
      {
        category: 'shipping',
        q: '¿Cuánto tarda en llegar mi pedido?',
        a: 'El envío estándar tarda **7-14 días hábiles**. El envío exprés tarda **3-5 días hábiles**.'
      },
      {
        category: 'returns',
        q: '¿Puedo devolver un producto?',
        a: 'Sí, tienes **30 días**. Los artículos deben estar sin usar y con etiquetas.'
      },
      {
        category: 'other',
        q: '¿Cómo contacto con soporte?',
        a: 'A través de la página de contacto o WhatsApp.'
      }
    ],
    stillHaveQuestions: '¿Aún tienes dudas?',
    contactSupport: 'Contactar Soporte'
  },
  ja: {
    back: 'ホームに戻る',
    title: 'よくある質問',
    subtitle: 'Folklore FCに関するすべての情報。',
    categories: {
      payment: 'お支払いと注文',
      shipping: '配送',
      returns: '返品・交換',
      other: '一般'
    },
    questions: [
      {
        category: 'payment',
        q: 'どのような支払い方法がありますか？',
        a: '主に**PayPal**を使用しています。アカウントがなくてもクレジットカードで支払いが可能です。'
      },
      {
        category: 'payment',
        q: 'PayPalで支払いができません。どうすればいいですか？',
        a: '技術的な問題に対応するため、**「WhatsApp経由で注文」**を導入しました。このオプションを選択すると、サポートチームが別の支払い方法を手動でご案内します。'
      },
      {
        category: 'shipping',
        q: '海外発送はしていますか？',
        a: 'はい！世界190カ国以上に発送しています。'
      },
      {
        category: 'shipping',
        q: '注文からどれくらいで届きますか？',
        a: '通常配送は**7〜14営業日**、速達（DHL/FedEx）は**3〜5営業日**かかります。'
      },
      {
        category: 'returns',
        q: '返品や交換はできますか？',
        a: 'はい、到着から**30日以内**であれば可能です。未使用、未洗濯、タグ付きの状態である必要があります。'
      },
      {
        category: 'other',
        q: 'カスタマーサポートへの連絡方法は？',
        a: 'お問い合わせページ、またはWhatsAppをご利用ください。'
      }
    ],
    stillHaveQuestions: 'まだ質問がありますか？',
    contactSupport: 'サポートに連絡'
  }
};

// --- مكون السؤال الواحد (Accordion Item) ---
const FAQItem = ({ question, answer, isOpen, onClick }: { question: string, answer: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-[#27272a]">
      <button 
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`text-lg font-medium transition-colors ${isOpen ? 'text-emerald-500' : 'text-white group-hover:text-emerald-400'}`}>
          {question}
        </span>
        <div className={`p-1 rounded-full border transition-all ${isOpen ? 'border-emerald-500 bg-emerald-500/10' : 'border-[#27272a] group-hover:border-white'}`}>
          {isOpen ? <Minus className="w-5 h-5 text-emerald-500" /> : <Plus className="w-5 h-5 text-gray-400 group-hover:text-white" />}
        </div>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-gray-400 leading-relaxed text-base">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default function FAQPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];
  const isRtl = locale === 'ar';

  // حالة لتتبع السؤال المفتوح حالياً
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // أيقونات للتصنيفات
  const getIcon = (cat: string) => {
    switch (cat) {
      case 'payment': return <CreditCard className="w-5 h-5" />;
      case 'shipping': return <Truck className="w-5 h-5" />;
      case 'returns': return <RefreshCw className="w-5 h-5" />;
      default: return <HelpCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto py-12">
        <Link href="/" className={`inline-flex items-center text-gray-400 hover:text-white mb-12 transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'ml-2 rotate-180' : 'mr-2'}`} /> 
          {t.back}
        </Link>

        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">{t.title}</h1>
          <p className="text-gray-400 text-lg">{t.subtitle}</p>
        </div>

        <div className="space-y-12">
          {/* تكرار الأسئلة مع التصنيفات */}
          {Object.keys(t.categories).map((catKey) => {
            // تصفية الأسئلة لهذا التصنيف
            const categoryQuestions = t.questions.filter((q: any) => q.category === catKey);
            if (categoryQuestions.length === 0) return null;

            return (
              <div key={catKey} className="bg-[#18181b] rounded-2xl border border-[#27272a] overflow-hidden">
                <div className="bg-[#27272a]/50 p-6 flex items-center gap-3 border-b border-[#27272a]">
                  <span className="text-emerald-500">{getIcon(catKey)}</span>
                  <h2 className="font-bold text-xl">{t.categories[catKey]}</h2>
                </div>
                <div className="px-6">
                  {categoryQuestions.map((item: any, idx: number) => {
                    // نحتاج لحساب Index فريد لكل سؤال في الصفحة
                    const globalIndex = t.questions.indexOf(item);
                    return (
                      <FAQItem 
                        key={idx}
                        question={item.q}
                        answer={item.a}
                        isOpen={openIndex === globalIndex}
                        onClick={() => toggleFAQ(globalIndex)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* قسم المساعدة الإضافي */}
        <div className="mt-20 text-center bg-gradient-to-b from-[#18181b] to-[#09090b] border border-[#27272a] rounded-2xl p-12">
          <h3 className="text-2xl font-bold mb-4">{t.stillHaveQuestions}</h3>
          <Link 
            href={`/${locale}/contact`}
            className="inline-flex items-center justify-center bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"
          >
            {t.contactSupport}
          </Link>
        </div>

      </div>
    </div>
  );
}