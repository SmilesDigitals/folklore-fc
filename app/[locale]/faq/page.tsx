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
        q: 'How can I pay for my order?',
        a: 'We currently accept PayPal as the primary payment method on our website. All payments are processed securely through PayPal to ensure your safety and privacy.'
      },
      {
        category: 'payment',
        q: 'What should I do if I face a payment issue?',
        a: 'If you experience any issues during payment, please contact us via WhatsApp for immediate assistance. Our support team will guide you through the process or help resolve the issue.'
      },
      {
        category: 'payment',
        q: 'Do you offer Cash on Delivery (COD)?',
        a: 'No, we do not offer cash on delivery. All orders must be paid online at checkout using PayPal.'
      },
      {
        category: 'payment',
        q: 'Can I cancel or modify my order?',
        a: 'Orders can only be canceled or modified before production begins. Once production has started, changes or cancellations are no longer possible.'
      },
      {
        category: 'shipping',
        q: 'How long does order processing take?',
        a: 'Order processing (handling time) takes 1–2 business days. This includes order verification, production, and preparation for shipment.'
      },
      {
        category: 'shipping',
        q: 'How long does shipping take?',
        a: 'Estimated shipping (transit) times after dispatch are:<br/><br/><strong>USA, Canada, UK, Europe, Japan:</strong> 3–8 business days<br/><strong>Gulf countries (including Saudi Arabia):</strong> 6–12 business days<br/><br/>Please note that delivery times are estimates and may vary.'
      },
      {
        category: 'shipping',
        q: 'Do you ship internationally?',
        a: 'Yes, we ship internationally. Customers are responsible for any customs duties, taxes, or import fees required by their country.'
      },
      {
        category: 'shipping',
        q: 'Can I track my order?',
        a: 'Yes. Once your order is shipped, you will receive a confirmation email with tracking information (when available).'
      },
      {
        category: 'shipping',
        q: 'Why might my order be delayed?',
        a: 'Delays may occur due to customs clearance, shipping carrier delays, weather conditions, or other factors beyond our control.'
      },
      {
        category: 'returns',
        q: 'What is your return and refund policy?',
        a: 'We accept returns and exchanges under specific conditions. If the issue is caused by us (damaged, defective, or wrong item), we cover all costs. If the return is due to customer preference or error, the customer covers return shipping costs. All return or exchange requests must be reported within 7 days of receiving the product. For full details, please refer to our Return & Refund Policy.'
      },
      {
        category: 'other',
        q: 'Are the product images exactly the same as the final product?',
        a: 'We strive for accuracy, but slight variations in color or print placement may occur due to the production process and screen differences.'
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
        q: 'كيف يمكنني الدفع لطلبي؟',
        a: 'نحن نقبل حاليًا PayPal كطريقة دفع أساسية على موقعنا. تتم جميع المدفوعات بشكل آمن من خلال PayPal لضمان سلامتك وخصوصيتك.'
      },
      {
        category: 'payment',
        q: 'ماذا يجب أن أفعل إذا واجهت مشكلة في الدفع؟',
        a: 'إذا واجهت أي مشاكل أثناء الدفع، يرجى الاتصال بنا عبر WhatsApp للحصول على مساعدة فورية. سيقوم فريق الدعم لدينا بإرشادك خلال العملية أو المساعدة في حل المشكلة.'
      },
      {
        category: 'payment',
        q: 'هل تقدمون خدمة الدفع عند الاستلام (COD)؟',
        a: 'لا، نحن لا نقدم خدمة الدفع عند الاستلام. يجب دفع جميع الطلبات عبر الإنترنت عند تسجيل الخروج باستخدام PayPal.'
      },
      {
        category: 'payment',
        q: 'هل يمكنني إلغاء طلبي أو تعديله؟',
        a: 'لا يمكن إلغاء الطلبات أو تعديلها إلا قبل بدء الإنتاج. بمجرد بدء الإنتاج، لم تعد التغييرات أو الإلغاءات ممكنة.'
      },
      {
        category: 'shipping',
        q: 'كم تستغرق معالجة الطلب؟',
        a: 'تستغرق معالجة الطلب (وقت المناولة) 1-2 يوم عمل. وهذا يشمل التحقق من الطلب والإنتاج والإعداد للشحن.'
      },
      {
        category: 'shipping',
        q: 'كم يستغرق الشحن؟',
        a: 'أوقات الشحن المقدرة (العبور) بعد الإرسال هي:<br/><br/><strong>الولايات المتحدة الأمريكية وكندا والمملكة المتحدة وأوروبا واليابان:</strong> 3-8 أيام عمل<br/><strong>دول الخليج (بما في ذلك المملكة العربية السعودية):</strong> 6-12 يوم عمل<br/><br/>يرجى ملاحظة أن أوقات التسليم تقديرية وقد تختلف.'
      },
      {
        category: 'shipping',
        q: 'هل تشحنون دولياً؟',
        a: 'نعم، نحن نشحن دوليًا. يتحمل العملاء مسؤولية أي رسوم جمركية أو ضرائب أو رسوم استيراد تطلبها بلادهم.'
      },
      {
        category: 'shipping',
        q: 'هل يمكنني تتبع طلبي؟',
        a: 'نعم. بمجرد شحن طلبك، ستتلقى رسالة تأكيد إلكترونية تحتوي على معلومات التتبع (عند توفرها).'
      },
      {
        category: 'shipping',
        q: 'لماذا قد يتأخر طلبي؟',
        a: 'قد يحدث تأخير بسبب التخليص الجمركي أو تأخيرات شركة الشحن أو الظروف الجوية أو عوامل أخرى خارجة عن سيطرتنا.'
      },
      {
        category: 'returns',
        q: 'ما هي سياسة الإرجاع والاسترداد الخاصة بكم؟',
        a: 'نقبل الإرجاع والاستبدال بموجب شروط معينة. إذا كانت المشكلة ناتجة عنا (عنصر تالف أو معيب أو خاطئ)، فإننا نغطي جميع التكاليف. إذا كان الإرجاع بسبب تفضيل العميل أو خطأه، فإن العميل يغطي تكاليف شحن الإرجاع. يجب الإبلاغ عن جميع طلبات الإرجاع أو الاستبدال في غضون 7 أيام من استلام المنتج. للحصول على التفاصيل الكاملة، يرجى الرجوع إلى سياسة الإرجاع والاسترداد الخاصة بنا.'
      },
      {
        category: 'other',
        q: 'هل صور المنتج مطابقة تماماً للمنتج النهائي؟',
        a: 'نسعى جاهدين لتحري الدقة، ولكن قد تحدث اختلافات طفيفة في اللون أو موضع الطباعة بسبب عملية الإنتاج واختلافات الشاشة.'
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
        q: 'Comment puis-je payer ma commande ?',
        a: 'Nous acceptons actuellement PayPal comme principal moyen de paiement sur notre site Web. Tous les paiements sont traités en toute sécurité via PayPal pour garantir votre sécurité et votre confidentialité.'
      },
      {
        category: 'payment',
        q: 'Que dois-je faire si je rencontre un problème de paiement ?',
        a: 'Si vous rencontrez des problèmes lors du paiement, veuillez nous contacter via WhatsApp pour une assistance immédiate. Notre équipe de support vous guidera tout au long du processus ou vous aidera à résoudre le problème.'
      },
      {
        category: 'payment',
        q: 'Proposez-vous le paiement à la livraison (COD) ?',
        a: 'Non, nous ne proposons pas le paiement à la livraison. Toutes les commandes doivent être payées en ligne au moment du paiement via PayPal.'
      },
      {
        category: 'payment',
        q: 'Puis-je annuler ou modifier ma commande ?',
        a: 'Les commandes ne peuvent être annulées ou modifiées qu\'avant le début de la production. Une fois la production commencée, les modifications ou annulations ne sont plus possibles.'
      },
      {
        category: 'shipping',
        q: 'Combien de temps prend le traitement de la commande ?',
        a: 'Le traitement de la commande (délai de manutention) prend 1 à 2 jours ouvrables. Cela comprend la vérification de la commande, la production et la préparation de l\'expédition.'
      },
      {
        category: 'shipping',
        q: 'Combien de temps prend l\'expédition ?',
        a: 'Les délais d\'expédition (transit) estimés après expédition sont :<br/><br/><strong>États-Unis, Canada, Royaume-Uni, Europe, Japon :</strong> 3–8 jours ouvrables<br/><strong>Pays du Golfe (y compris l\'Arabie Saoudite) :</strong> 6–12 jours ouvrables<br/><br/>Veuillez noter que les délais de livraison sont des estimations et peuvent varier.'
      },
      {
        category: 'shipping',
        q: 'Expédiez-vous à l\'international ?',
        a: 'Oui, nous expédions à l\'international. Les clients sont responsables de tous les droits de douane, taxes ou frais d\'importation exigés par leur pays.'
      },
      {
        category: 'shipping',
        q: 'Puis-je suivre ma commande ?',
        a: 'Oui. Une fois votre commande expédiée, vous recevrez un e-mail de confirmation avec les informations de suivi (si disponibles).'
      },
      {
        category: 'shipping',
        q: 'Pourquoi ma commande pourrait-elle être retardée ?',
        a: 'Des retards peuvent survenir en raison du dédouanement, des retards des transporteurs, des conditions météorologiques ou d\'autres facteurs indépendants de notre volonté.'
      },
      {
        category: 'returns',
        q: 'Quelle est votre politique de retour et de remboursement ?',
        a: 'Nous acceptons les retours et les échanges sous certaines conditions. Si le problème vient de nous (article endommagé, défectueux ou erroné), nous couvrons tous les frais. Si le retour est dû à la préférence ou à l\'erreur du client, le client couvre les frais d\'expédition de retour. Toutes les demandes de retour ou d\'échange doivent être signalées dans les 7 jours suivant la réception du produit. Pour plus de détails, veuillez consulter notre Politique de Retour et Remboursement.'
      },
      {
        category: 'other',
        q: 'Les images des produits sont-elles exactement les mêmes que le produit final ?',
        a: 'Nous nous efforçons d\'être précis, mais de légères variations de couleur ou de placement d\'impression peuvent survenir en raison du processus de production et des différences d\'écran.'
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
        q: '¿Cómo puedo pagar mi pedido?',
        a: 'Actualmente aceptamos PayPal como método de pago principal en nuestro sitio web. Todos los pagos se procesan de forma segura a través de PayPal para garantizar su seguridad y privacidad.'
      },
      {
        category: 'payment',
        q: '¿Qué debo hacer si tengo un problema con el pago?',
        a: 'Si experimenta algún problema durante el pago, contáctenos a través de WhatsApp para recibir asistencia inmediata. Nuestro equipo de soporte lo guiará a través del proceso o lo ayudará a resolver el problema.'
      },
      {
        category: 'payment',
        q: '¿Ofrecen pago contra reembolso (COD)?',
        a: 'No, no ofrecemos pago contra reembolso. Todos los pedidos deben pagarse en línea al finalizar la compra mediante PayPal.'
      },
      {
        category: 'payment',
        q: '¿Puedo cancelar o modificar mi pedido?',
        a: 'Los pedidos solo se pueden cancelar o modificar antes de que comience la producción. Una vez que ha comenzado la producción, los cambios o cancelaciones ya no son posibles.'
      },
      {
        category: 'shipping',
        q: '¿Cuánto tiempo lleva el procesamiento del pedido?',
        a: 'El procesamiento del pedido (tiempo de manipulación) demora entre 1 y 2 días hábiles. Esto incluye la verificación del pedido, la producción y la preparación para el envío.'
      },
      {
        category: 'shipping',
        q: '¿Cuánto tiempo tarda el envío?',
        a: 'Los tiempos de envío (tránsito) estimados después del despacho son:<br/><br/><strong>EE. UU., Canadá, Reino Unido, Europa, Japón:</strong> 3–8 días hábiles<br/><strong>Países del Golfo (incluida Arabia Saudita):</strong> 6–12 días hábiles<br/><br/>Tenga en cuenta que los tiempos de entrega son estimaciones y pueden variar.'
      },
      {
        category: 'shipping',
        q: '¿Hacen envíos internacionales?',
        a: 'Sí, hacemos envíos internacionales. Los clientes son responsables de los derechos de aduana, impuestos o tarifas de importación que requiera su país.'
      },
      {
        category: 'shipping',
        q: '¿Puedo rastrear mi pedido?',
        a: 'Sí. Una vez que se envíe su pedido, recibirá un correo electrónico de confirmación con información de seguimiento (cuando esté disponible).'
      },
      {
        category: 'shipping',
        q: '¿Por qué podría retrasarse mi pedido?',
        a: 'Pueden ocurrir retrasos debido al despacho de aduanas, retrasos del transportista, condiciones climáticas u otros factores fuera de nuestro control.'
      },
      {
        category: 'returns',
        q: '¿Cuál es su política de devoluciones y reembolsos?',
        a: 'Aceptamos devoluciones y cambios bajo condiciones específicas. Si el problema es causado por nosotros (artículo dañado, defectuoso o incorrecto), cubrimos todos los costos. Si la devolución se debe a la preferencia o error del cliente, el cliente cubre los costos de envío de devolución. Todas las solicitudes de devolución o cambio deben informarse dentro de los 7 días posteriores a la recepción del producto. Para obtener detalles completos, consulte nuestra Política de Devoluciones y Reembolsos.'
      },
      {
        category: 'other',
        q: '¿Son las imágenes del producto exactamente iguales al producto final?',
        a: 'Nos esforzamos por la precisión, pero pueden ocurrir ligeras variaciones en el color o la ubicación de la impresión debido al proceso de producción y las diferencias de pantalla.'
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
        q: '注文の支払い方法は？',
        a: '現在、当社のウェブサイトでの主な支払い方法としてPayPalを受け入れています。すべての支払いはPayPalを通じて安全に処理され、安全性とプライバシーが確保されます。'
      },
      {
        category: 'payment',
        q: '支払いに問題が発生した場合はどうすればよいですか？',
        a: '支払い中に問題が発生した場合は、WhatsApp経由でご連絡ください。サポートチームがプロセスをご案内するか、問題の解決をお手伝いします。'
      },
      {
        category: 'payment',
        q: '代金引換（COD）はありますか？',
        a: 'いいえ、代金引換は提供していません。すべての注文は、チェックアウト時にPayPalを使用してオンラインで支払う必要があります。'
      },
      {
        category: 'payment',
        q: '注文をキャンセルまたは変更できますか？',
        a: '注文は、生産が開始される前にのみキャンセルまたは変更できます。生産が開始されると、変更またはキャンセルはできなくなります。'
      },
      {
        category: 'shipping',
        q: '注文処理にはどのくらい時間がかかりますか？',
        a: '注文処理（取り扱い時間）には1〜2営業日かかります。これには、注文の確認、生産、および発送の準備が含まれます。'
      },
      {
        category: 'shipping',
        q: '配送にはどのくらい時間がかかりますか？',
        a: '発送後の推定配送（輸送）時間は次のとおりです：<br/><br/><strong>米国、カナダ、英国、ヨーロッパ、日本：</strong> 3〜8営業日<br/><strong>湾岸諸国（サウジアラビアを含む）：</strong> 6〜12営業日<br/><br/>納期は推定であり、異なる場合があることに注意してください。'
      },
      {
        category: 'shipping',
        q: '海外発送はしていますか？',
        a: 'はい、海外発送を行っています。お客様は、自国で必要とされる関税、税金、または輸入手数料に対して責任を負います。'
      },
      {
        category: 'shipping',
        q: '注文を追跡できますか？',
        a: 'はい。注文が発送されると、追跡情報（利用可能な場合）を含む確認メールが届きます。'
      },
      {
        category: 'shipping',
        q: '注文が遅れる可能性があるのはなぜですか？',
        a: '通関手続き、配送業者の遅延、気象条件、または当社の管理外のその他の要因により、遅延が発生する場合があります。'
      },
      {
        category: 'returns',
        q: '返品および返金ポリシーは何ですか？',
        a: '特定の条件下で返品および交換を受け付けます。問題が当社（破損、欠陥、または間違った商品）に起因する場合、当社はすべての費用を負担します。返品がお客様の好みまたはエラーによる場合、お客様は返品送料を負担します。すべての返品または交換のリクエストは、商品を受け取ってから7日以内に報告する必要があります。詳細については、返品および返金ポリシーをご覧ください。'
      },
      {
        category: 'other',
        q: '商品画像は最終製品とまったく同じですか？',
        a: '正確さを期すよう努めていますが、製造プロセスや画面の違いただし、色や印刷位置にわずかな違いが生じる場合があります。'
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
        <p className="text-gray-400 leading-relaxed text-base" dangerouslySetInnerHTML={{ __html: answer }} />
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
        <Link href={`/${locale}`} className={`inline-flex items-center text-gray-400 hover:text-white mb-12 transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
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