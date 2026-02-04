'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Globe, CreditCard, ShieldCheck, Mail, Printer } from 'lucide-react';
import { useParams } from 'next/navigation';

const TRANSLATIONS: any = {
  en: {
    back: 'Back to Home',
    title: 'ABOUT US',
    intro: 'Folklore FC is an international online apparel brand specializing in made-to-order products.',
    modelTitle: 'How Our Store Works',
    modelText1: 'We operate using a print-on-demand business model, which means every product is produced only after an order is placed. This allows us to reduce waste and offer region-specific collections tailored to different markets.',
    modelList: [
      'Products are designed by Folklore FC',
      'Items are produced on demand by trusted third-party printing partners',
      'Orders are shipped directly to customers through reliable logistics providers'
    ],
    disclaimer: 'Because of this model, available products may vary by country. Customers in different regions may see different collections, prices, or shipping times based on local availability and fulfillment options. All policies, customer support standards, and business practices remain the same across all regions.',
    operateTitle: 'Where We Operate',
    operateText: 'We serve customers internationally, with a focus on the United States, Europe, Japan, and Gulf countries, including Saudi Arabia.',
    paymentTitle: 'Payments & Security',
    paymentText1: 'All payments on our website are processed securely using PayPal.',
    paymentText2: 'We do not offer cash on delivery. Customer payment information is never stored on our servers.',
    commitmentTitle: 'Our Commitment',
    commitmentIntro: 'We are committed to:',
    commitments: [
      'Transparent business practices',
      'Clear shipping and return policies',
      'Secure checkout and data protection',
      'Responsive customer support'
    ],
    contactText: 'If you have any questions about our products, orders, or policies, you can reach us anytime at:'
  },
  ar: {
    back: 'العودة للرئيسية',
    title: 'من نحن',
    intro: 'فولكلور إف سي هي علامة تجارية عالمية للملابس عبر الإنترنت متخصصة في المنتجات المصنوعة حسب الطلب.',
    modelTitle: 'كيف يعمل متجرنا',
    modelText1: 'نحن نعمل باستخدام نموذج الطباعة عند الطلب، مما يعني أن كل منتج يتم إنتاجه فقط بعد تقديم الطلب. يتيح لنا هذا تقليل الهدر وتقديم مجموعات مخصصة لكل منطقة ومناسبة للأسواق المختلفة.',
    modelList: [
      'يتم تصميم المنتجات بواسطة Folklore FC',
      'يتم إنتاج العناصر عند الطلب بواسطة شركاء طباعة موثوقين من أطراف ثالثة',
      'يتم شحن الطلبات مباشرة للعملاء عبر شركات شحن موثوقة'
    ],
    disclaimer: 'بسبب هذا النموذج، قد تختلف المنتجات المتاحة حسب الدولة. قد يرى العملاء في مناطق مختلفة مجموعات وأسعاراً وأوقات شحن مختلفة بناءً على التوافر المحلي وخيارات التنفيذ. تظل جميع السياسات ومعايير دعم العملاء والممارسات التجارية كما هي في جميع المناطق.',
    operateTitle: 'أين نعمل',
    operateText: 'نخدم العملاء دولياً، مع التركيز على الولايات المتحدة، أوروبا، اليابان، ودول الخليج، بما في ذلك المملكة العربية السعودية.',
    paymentTitle: 'الدفع والأمان',
    paymentText1: 'تتم معالجة جميع المدفوعات على موقعنا بشكل آمن باستخدام PayPal.',
    paymentText2: 'نحن لا نقدم خدمة الدفع عند الاستلام. لا يتم تخزين معلومات دفع العملاء أبداً على خوادمنا.',
    commitmentTitle: 'التزامنا',
    commitmentIntro: 'نحن ملتزمون بـ:',
    commitments: [
      'ممارسات تجارية شفافة',
      'سياسات شحن واسترجاع واضحة',
      'دفع آمن وحماية البيانات',
      'دعم عملاء سريع الاستجابة'
    ],
    contactText: 'إذا كان لديك أي أسئلة حول منتجاتنا، طلباتنا، أو سياساتنا، يمكنك التواصل معنا في أي وقت عبر:'
  },
  fr: {
    back: "Retour à l'accueil",
    title: 'À PROPOS DE NOUS',
    intro: 'Folklore FC est une marque internationale de vêtements en ligne spécialisée dans les produits fabriqués à la commande.',
    modelTitle: 'Comment fonctionne notre boutique',
    modelText1: 'Nous fonctionnons selon un modèle d\'impression à la demande, ce qui signifie que chaque produit est fabriqué uniquement après la commande. Cela nous permet de réduire le gaspillage et d\'offrir des collections spécifiques à chaque région et adaptées aux différents marchés.',
    modelList: [
      'Les produits sont conçus par Folklore FC',
      'Les articles sont produits à la demande par des partenaires d\'impression tiers de confiance',
      'Les commandes sont expédiées directement aux clients par des prestataires logistiques fiables'
    ],
    disclaimer: 'En raison de ce modèle, les produits disponibles peuvent varier selon les pays. Les clients de différentes régions peuvent voir des collections, des prix ou des délais d\'expédition différents en fonction de la disponibilité locale et des options de traitement. Toutes les politiques, normes de service client et pratiques commerciales restent les mêmes dans toutes les régions.',
    operateTitle: 'Où nous opérons',
    operateText: 'Nous servons des clients à l\'international, avec un accent sur les États-Unis, l\'Europe, le Japon et les pays du Golfe, y compris l\'Arabie Saoudite.',
    paymentTitle: 'Paiements et Sécurité',
    paymentText1: 'Tous les paiements sur notre site sont traités de manière sécurisée via PayPal.',
    paymentText2: 'Nous ne proposons pas le paiement à la livraison. Les informations de paiement des clients ne sont jamais stockées sur nos serveurs.',
    commitmentTitle: 'Notre Engagement',
    commitmentIntro: 'Nous nous engageons à :',
    commitments: [
      'Des pratiques commerciales transparentes',
      'Des politiques d\'expédition et de retour claires',
      'Un paiement sécurisé et la protection des données',
      'Un service client réactif'
    ],
    contactText: 'Si vous avez des questions sur nos produits, commandes ou politiques, vous pouvez nous contacter à tout moment à :'
  },
  es: {
    back: 'Volver al Inicio',
    title: 'SOBRE NOSOTROS',
    intro: 'Folklore FC es una marca internacional de ropa en línea especializada en productos hechos bajo pedido.',
    modelTitle: 'Cómo funciona nuestra tienda',
    modelText1: 'Operamos utilizando un modelo de negocio de impresión bajo demanda, lo que significa que cada producto se produce solo después de realizar un pedido. Esto nos permite reducir el desperdicio y ofrecer colecciones específicas para cada región adaptadas a diferentes mercados.',
    modelList: [
      'Los productos son diseñados por Folklore FC',
      'Los artículos son producidos bajo demanda por socios de impresión de confianza',
      'Los pedidos se envían directamente a los clientes a través de proveedores logísticos fiables'
    ],
    disclaimer: 'Debido a este modelo, los productos disponibles pueden variar según el país. Los clientes en diferentes regiones pueden ver diferentes colecciones, precios o tiempos de envío según la disponibilidad local y las opciones de cumplimiento. Todas las políticas, estándares de atención al cliente y prácticas comerciales siguen siendo las mismas en todas las regiones.',
    operateTitle: 'Dónde operamos',
    operateText: 'Servimos a clientes internacionalmente, con un enfoque en los Estados Unidos, Europa, Japón y los países del Golfo, incluida Arabia Saudita.',
    paymentTitle: 'Pagos y Seguridad',
    paymentText1: 'Todos los pagos en nuestro sitio web se procesan de forma segura utilizando PayPal.',
    paymentText2: 'No ofrecemos pago contra entrega. La información de pago del cliente nunca se almacena en nuestros servidores.',
    commitmentTitle: 'Nuestro Compromiso',
    commitmentIntro: 'Estamos comprometidos con:',
    commitments: [
      'Prácticas comerciales transparentes',
      'Políticas claras de envío y devolución',
      'Pago seguro y protección de datos',
      'Atención al cliente receptiva'
    ],
    contactText: 'Si tiene alguna pregunta sobre nuestros productos, pedidos o políticas, puede contactarnos en cualquier momento en:'
  },
  ja: {
    back: 'ホームに戻る',
    title: '私たちについて',
    intro: 'Folklore FCは、受注生産品を専門とする国際的なオンラインアパレルブランドです。',
    modelTitle: '当店の仕組み',
    modelText1: '私たちはオンデマンド印刷のビジネスモデルを採用しており、注文が入ってから初めて製品が生産されます。これにより、廃棄物を削減し、さまざまな市場に合わせた地域限定のコレクションを提供することができます。',
    modelList: [
      '製品はFolklore FCによってデザインされています',
      'アイテムは信頼できるサードパーティの印刷パートナーによってオンデマンドで生産されます',
      '注文は信頼できる物流プロバイダーを通じて顧客に直接発送されます'
    ],
    disclaimer: 'このモデルのため、利用可能な製品は国によって異なる場合があります。異なる地域の顧客は、現地の在庫状況やフルフィルメントオプションに基づいて、異なるコレクション、価格、または配送時間を見る場合があります。すべてのポリシー、カスタマーサポート基準、およびビジネス慣行は、すべての地域で同じままです。',
    operateTitle: '活動地域',
    operateText: '私たちは、米国、ヨーロッパ、日本、およびサウジアラビアを含む湾岸諸国を中心に、世界中の顧客にサービスを提供しています。',
    paymentTitle: '支払いとセキュリティ',
    paymentText1: '当社のウェブサイトでのすべての支払いは、PayPalを使用して安全に処理されます。',
    paymentText2: '代金引換は提供していません。顧客の支払い情報が当社のサーバーに保存されることはありません。',
    commitmentTitle: '私たちの約束',
    commitmentIntro: '私たちは以下に尽力しています：',
    commitments: [
      '透明性のあるビジネス慣行',
      '明確な配送および返品ポリシー',
      '安全なチェックアウトとデータ保護',
      '迅速なカスタマーサポート'
    ],
    contactText: '製品、注文、またはポリシーについてご質問がある場合は、いつでも以下までお問い合わせください：'
  }
};

export default function AboutPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];
  const isRtl = locale === 'ar';

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto py-12">
        {/* Back Button */}
        <Link href={`/${locale}`} className={`inline-flex items-center text-gray-400 hover:text-white mb-12 transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'ml-2 rotate-180' : 'mr-2'}`} />
          {t.back}
        </Link>

        {/* Header */}
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 uppercase text-white">{t.title}</h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-16 border-l-4 border-emerald-500 pl-6">
          {t.intro}
        </p>

        <div className="space-y-16">

          {/* How Our Store Works */}
          <section className="bg-[#18181b] p-8 rounded-3xl border border-[#27272a]">
            <div className="flex items-center gap-3 mb-6">
              <Printer className="text-emerald-500" size={28} />
              <h2 className="text-2xl font-bold uppercase tracking-tight">{t.modelTitle}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed mb-6">
              {t.modelText1}
            </p>
            <ul className="space-y-4 mb-8">
              {t.modelList.map((item: string, index: number) => (
                <li key={index} className="flex items-start gap-3 text-gray-300">
                  <div className="min-w-2 h-2 rounded-full bg-emerald-500 mt-2.5"></div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="bg-[#09090b] p-4 rounded-xl border border-[#27272a]/50 text-sm text-gray-400 italic">
              {t.disclaimer}
            </div>
          </section>

          {/* Where We Operate */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Globe className="text-emerald-500" size={28} />
              <h2 className="text-2xl font-bold uppercase tracking-tight">{t.operateTitle}</h2>
            </div>
            <p className="text-gray-300 leading-relaxed text-lg">
              {t.operateText}
            </p>
          </section>

          {/* Payments & Security */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#18181b] p-8 rounded-3xl border border-[#27272a]">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-emerald-500" size={28} />
                <h2 className="text-2xl font-bold uppercase tracking-tight">{t.paymentTitle}</h2>
              </div>
              <p className="text-gray-300 mb-4">{t.paymentText1}</p>
              <p className="text-gray-400 text-sm">{t.paymentText2}</p>
            </div>

            <div className="bg-[#18181b] p-8 rounded-3xl border border-[#27272a]">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="text-emerald-500" size={28} />
                <h2 className="text-2xl font-bold uppercase tracking-tight">{t.commitmentTitle}</h2>
              </div>
              <p className="text-gray-300 mb-4">{t.commitmentIntro}</p>
              <ul className="space-y-2">
                {t.commitments.map((item: string, index: number) => (
                  <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Contact */}
          <section className="text-center pt-8 border-t border-[#27272a]">
            <p className="text-gray-400 mb-4">{t.contactText}</p>
            <a href="mailto:support@folklorefc.com" className="inline-flex items-center gap-2 text-2xl font-bold text-emerald-500 hover:text-white transition-colors">
              <Mail /> support@folklorefc.com
            </a>
          </section>

        </div>
      </div>
    </div>
  );
}