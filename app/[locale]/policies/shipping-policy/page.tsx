"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const LEGAL_TEXT: any = {
  en: {
    title: "Shipping Policy",
    lastUpdated: "Last updated: January 25, 2026",
    content: `
      <h2>1. Overview</h2>
      <p>At Folklore FC, all products are made to order and shipped through trusted third-party printing and fulfillment partners.<br />
      This Shipping Policy explains how long it takes to process and deliver your order.</p>
      <p>By placing an order on our website, you agree to the terms outlined below.</p>

      <h2>2. Order Processing (Handling Time)</h2>
      <p><strong>Handling Time: 1–2 business days</strong><br />
      This includes order verification, production, quality checks, and preparation for shipment.</p>
      <p>Orders are processed on business days only (excluding weekends and public holidays).</p>

      <h2>3. Shipping Time (Transit Time)</h2>
      <p>Shipping times vary depending on the destination country.<br />
      Estimated transit times after the order has been shipped are as follows:</p>
      
      <p><strong>🇺🇸 United States / 🇨🇦 Canada / 🇬🇧 United Kingdom / 🇪🇺 Europe / 🇯🇵 Japan</strong></p>
      <p><strong>Transit Time: 3–8 business days</strong></p>

      <p><strong>🇸🇦 Gulf Countries (including Saudi Arabia and GCC region)</strong></p>
      <p><strong>Transit Time: 6–12 business days</strong></p>

      <p>Please note that these are estimated delivery times and may vary due to external factors.</p>

      <h2>4. Shipping Costs</h2>
      <p>Shipping costs are calculated at checkout based on the destination and order details.<br />
      All applicable shipping fees are displayed clearly before payment is completed.</p>

      <h2>5. International Shipping</h2>
      <p>We ship internationally.<br />
      Customers are responsible for any customs duties, import taxes, or fees required by their country. These charges are not included in the product price or shipping cost and are non-refundable.</p>

      <h2>6. Tracking Information</h2>
      <p>Once your order is shipped, you will receive a confirmation email with tracking information (where available) so you can monitor your delivery.</p>

      <h2>7. Delays</h2>
      <p>Folklore FC is not responsible for delays caused by:</p>
      <ul>
        <li>Customs clearance</li>
        <li>Shipping carriers</li>
        <li>Weather conditions</li>
        <li>Force majeure or circumstances beyond our control</li>
      </ul>

      <h2>8. Incorrect Shipping Information</h2>
      <p>Please ensure that your shipping address is accurate and complete.<br />
      Folklore FC is not responsible for orders delayed or lost due to incorrect or incomplete shipping information provided by the customer.</p>

      <h2>9. Contact Us</h2>
      <p>If you have any questions about shipping or your order, please contact us at:<br />
      📧 support@folklorefc.com</p>
    `
  },
  ar: {
    title: "سياسة الشحن",
    lastUpdated: "آخر تحديث: 25 يناير 2026",
    content: `
      <h2>1. نظرة عامة</h2>
      <p>في Folklore FC، يتم تصنيع جميع المنتجات حسب الطلب وشحنها من خلال شركاء طباعة وتلبية موثوقين من جهات خارجية.<br />
      تشرح سياسة الشحن هذه المدة التي تستغرقها معالجة طلبك وتسليمه.</p>
      <p>بتقديم طلب على موقعنا، فإنك توافق على الشروط الموضحة أدناه.</p>

      <h2>2. معالجة الطلب (وقت المناولة)</h2>
      <p><strong>وقت المناولة: 1-2 أيام عمل</strong><br />
      يشمل ذلك التحقق من الطلب والإنتاج وفحوصات الجودة والإعداد للشحن.</p>
      <p>تتم معالجة الطلبات في أيام العمل فقط (باستثناء عطلات نهاية الأسبوع والعطلات الرسمية).</p>

      <h2>3. وقت الشحن (وقت العبور)</h2>
      <p>تختلف أوقات الشحن حسب بلد الوجهة.<br />
      توقيتات العبور المقدرة بعد شحن الطلب هي كما يلي:</p>

      <p><strong>🇺🇸 الولايات المتحدة / 🇨🇦 كندا / 🇬🇧 المملكة المتحدة / 🇪🇺 أوروبا / 🇯🇵 اليابان</strong></p>
      <p><strong>وقت العبور: 3-8 أيام عمل</strong></p>

      <p><strong>🇸🇦 دول الخليج (بما في ذلك المملكة العربية السعودية ومنطقة دول مجلس التعاون الخليجي)</strong></p>
      <p><strong>وقت العبور: 6-12 يوم عمل</strong></p>

      <p>يرجى ملاحظة أن هذه أوقات تسليم تقديرية وقد تختلف بسبب عوامل خارجية.</p>

      <h2>4. تكاليف الشحن</h2>
      <p>يتم حساب تكاليف الشحن عند الدفع بناءً على الوجهة وتفاصيل الطلب.<br />
      يتم عرض جميع رسوم الشحن المطبقة بوضوح قبل إتمام الدفع.</p>

      <h2>5. الشحن الدولي</h2>
      <p>نحن نشحن دوليًا.<br />
      العملاء مسؤولون عن أي رسوم جمركية أو ضرائب استيراد أو رسوم تطلبها بلادهم. هذه الرسوم غير مشمولة في سعر المنتج أو تكلفة الشحن وهي غير قابلة للاسترداد.</p>

      <h2>6. معلومات التتبع</h2>
      <p>بمجرد شحن طلبك، ستتلقى رسالة بريد إلكتروني للتأكيد تحتوي على معلومات التتبع (حيثما كانت متاحة) حتى تتمكن من مراقبة التسليم الخاص بك.</p>

      <h2>7. التأخيرات</h2>
      <p>Folklore FC ليست مسؤولة عن التأخيرات الناجمة عن:</p>
      <ul>
        <li>التخليص الجمركي</li>
        <li>شركات الشحن</li>
        <li>الظروف الجوية</li>
        <li>القوة القاهرة أو الظروف الخارجة عن سيطرتنا</li>
      </ul>

      <h2>8. معلومات شحن غير صحيحة</h2>
      <p>يرجى التأكد من أن عنوان الشحن الخاص بك دقيق وكامل.<br />
      Folklore FC ليست مسؤولة عن الطلبات المتأخرة أو المفقودة بسبب معلومات الشحن غير الصحيحة أو غير المكتملة المقدمة من قبل العميل.</p>

      <h2>9. اتصل بنا</h2>
      <p>إذا كان لديك أي أسئلة حول الشحن أو طلبك، يرجى الاتصال بنا على:<br />
      📧 support@folklorefc.com</p>
    `
  },
  fr: {
    title: "Politique d'Expédition",
    lastUpdated: "Dernière mise à jour : 25 janvier 2026",
    content: `
      <h2>1. Aperçu</h2>
      <p>Chez Folklore FC, tous les produits sont fabriqués sur commande et expédiés par des partenaires d'impression et d'exécution tiers de confiance.<br />
      Cette Politique d'Expédition explique combien de temps il faut pour traiter et livrer votre commande.</p>
      <p>En passant une commande sur notre site Web, vous acceptez les conditions décrites ci-dessous.</p>

      <h2>2. Traitement de la Commande (Délai de Manutention)</h2>
      <p><strong>Délai de Manutention : 1–2 jours ouvrables</strong><br />
      Cela comprend la vérification de la commande, la production, les contrôles de qualité et la préparation de l'expédition.</p>
      <p>Les commandes sont traitées les jours ouvrables uniquement (hors week-ends et jours fériés).</p>

      <h2>3. Délai d'Expédition (Temps de Transit)</h2>
      <p>Les délais d'expédition varient selon le pays de destination.<br />
      Les temps de transit estimés après l'expédition de la commande sont les suivants :</p>

      <p><strong>🇺🇸 États-Unis / 🇨🇦 Canada / 🇬🇧 Royaume-Uni / 🇪🇺 Europe / 🇯🇵 Japon</strong></p>
      <p><strong>Temps de Transit : 3–8 jours ouvrables</strong></p>

      <p><strong>🇸🇦 Pays du Golfe (y compris l'Arabie Saoudite et la région du CCG)</strong></p>
      <p><strong>Temps de Transit : 6–12 jours ouvrables</strong></p>

      <p>Veuillez noter qu'il s'agit de délais de livraison estimés et qu'ils peuvent varier en raison de facteurs externes.</p>

      <h2>4. Frais d'Expédition</h2>
      <p>Les frais d'expédition sont calculés à la caisse en fonction de la destination et des détails de la commande.<br />
      Tous les frais d'expédition applicables sont affichés clairement avant la fin du paiement.</p>

      <h2>5. Expédition Internationale</h2>
      <p>Nous expédions à l'international.<br />
      Les clients sont responsables de tous les droits de douane, taxes d'importation ou frais exigés par leur pays. Ces frais ne sont pas inclus dans le prix du produit ou les frais d'expédition et ne sont pas remboursables.</p>

      <h2>6. Informations de Suivi</h2>
      <p>Une fois votre commande expédiée, vous recevrez un e-mail de confirmation avec les informations de suivi (le cas échéant) afin que vous puissiez suivre votre livraison.</p>

      <h2>7. Retards</h2>
      <p>Folklore FC n'est pas responsable des retards causés par :</p>
      <ul>
        <li>Le dédouanement</li>
        <li>Les transporteurs maritimes</li>
        <li>Les conditions météorologiques</li>
        <li>Force majeure ou circonstances indépendantes de notre volonté</li>
      </ul>

      <h2>8. Informations d'Expédition Incorrectes</h2>
      <p>Veuillez vous assurer que votre adresse d'expédition est exacte et complète.<br />
      Folklore FC n'est pas responsable des commandes retardées ou perdues en raison d'informations d'expédition incorrectes ou incomplètes fournies par le client.</p>

      <h2>9. Contactez-Nous</h2>
      <p>Si vous avez des questions sur l'expédition ou votre commande, veuillez nous contacter à :<br />
      📧 support@folklorefc.com</p>
    `
  },
  es: {
    title: "Política de Envíos",
    lastUpdated: "Última actualización: 25 de enero de 2026",
    content: `
      <h2>1. Descripción General</h2>
      <p>En Folklore FC, todos los productos se fabrican bajo pedido y se envían a través de socios de impresión y cumplimiento externos de confianza.<br />
      Esta Política de Envíos explica cuánto tiempo lleva procesar y entregar su pedido.</p>
      <p>Al realizar un pedido en nuestro sitio web, usted acepta los términos descritos a continuación.</p>

      <h2>2. Procesamiento del Pedido (Tiempo de Manipulación)</h2>
      <p><strong>Tiempo de Manipulación: 1–2 días hábiles</strong><br />
      Esto incluye la verificación del pedido, la producción, los controles de calidad y la preparación para el envío.</p>
      <p>Los pedidos se procesan solo en días hábiles (excluyendo fines de semana y días festivos).</p>

      <h2>3. Tiempo de Envío (Tiempo de Tránsito)</h2>
      <p>Los tiempos de envío varían según el país de destino.<br />
      Los tiempos de tránsito estimados después de que se haya enviado el pedido son los siguientes:</p>

      <p><strong>🇺🇸 Estados Unidos / 🇨🇦 Canadá / 🇬🇧 Reino Unido / 🇪🇺 Europa / 🇯🇵 Japón</strong></p>
      <p><strong>Tiempo de Tránsito: 3–8 días hábiles</strong></p>

      <p><strong>🇸🇦 Países del Golfo (incluida Arabia Saudita y la región del CCG)</strong></p>
      <p><strong>Tiempo de Tránsito: 6–12 días hábiles</strong></p>

      <p>Tenga en cuenta que estos son tiempos de entrega estimados y pueden variar debido a factores externos.</p>

      <h2>4. Costos de Envío</h2>
      <p>Los costos de envío se calculan al finalizar la compra según el destino y los detalles del pedido.<br />
      Todas las tarifas de envío aplicables se muestran claramente antes de completar el pago.</p>

      <h2>5. Envíos Internacionales</h2>
      <p>Enviamos internacionalmente.<br />
      Los clientes son responsables de cualquier derecho de aduana, impuesto de importación o tarifa requerida por su país. Estos cargos no están incluidos en el precio del producto o el costo de envío y no son reembolsables.</p>

      <h2>6. Información de Seguimiento</h2>
      <p>Una vez que se envíe su pedido, recibirá un correo electrónico de confirmación con información de seguimiento (cuando esté disponible) para que pueda monitorear su entrega.</p>

      <h2>7. Retrasos</h2>
      <p>Folklore FC no es responsable de los retrasos causados por:</p>
      <ul>
        <li>Despacho de aduanas</li>
        <li>Transportistas de envío</li>
        <li>Condiciones climáticas</li>
        <li>Fuerza mayor o circunstancias fuera de nuestro control</li>
      </ul>

      <h2>8. Información de Envío Incorrecta</h2>
      <p>Asegúrese de que su dirección de envío sea precisa y completa.<br />
      Folklore FC no es responsable de los pedidos retrasados o perdidos debido a información de envío incorrecta o incompleta proporcionada por el cliente.</p>

      <h2>9. Contáctenos</h2>
      <p>Si tiene alguna pregunta sobre el envío o su pedido, contáctenos en:<br />
      📧 support@folklorefc.com</p>
    `
  },
  ja: {
    title: "配送ポリシー",
    lastUpdated: "最終更新日：2026年1月25日",
    content: `
      <h2>1. 概要</h2>
      <p>Folklore FCでは、すべての製品は注文を受けてから製造され、信頼できるサードパーティの印刷およびフルフィルメントパートナーを通じて発送されます。<br />
      この配送ポリシーでは、注文の処理と配送にかかる時間について説明します。</p>
      <p>当社のウェブサイトで注文することにより、以下に概説する条件に同意したものとみなされます。</p>

      <h2>2. 注文処理（取り扱い時間）</h2>
      <p><strong>取り扱い時間：1〜2営業日</strong><br />
      これには、注文の確認、製造、品質チェック、および発送の準備が含まれます。</p>
      <p>注文は営業日のみ処理されます（週末と祝日を除く）。</p>

      <h2>3. 配送時間（輸送時間）</h2>
      <p>配送時間は仕向国によって異なります。<br />
      注文が発送された後の推定輸送時間は次のとおりです：</p>

      <p><strong>🇺🇸 米国 / 🇨🇦 カナダ / 🇬🇧 英国 / 🇪🇺 ヨーロッパ / 🇯🇵 日本</strong></p>
      <p><strong>輸送時間：3〜8営業日</strong></p>

      <p><strong>🇸🇦 湾岸諸国（サウジアラビアおよびGCC地域を含む）</strong></p>
      <p><strong>輸送時間：6〜12営業日</strong></p>

      <p>これらは推定納期であり、外部要因により異なる場合があることに注意してください。</p>

      <h2>4. 配送料</h2>
      <p>配送料は、目的地と注文の詳細に基づいてチェックアウト時に計算されます。<br />
      適用されるすべての配送料は、支払いが完了する前に明確に表示されます。</p>

      <h2>5. 国際配送</h2>
      <p>私たちは国際的に発送します。<br />
      お客様は、自国で必要とされる関税、輸入税、または手数料に対して責任を負います。これらの料金は製品価格または配送料に含まれておらず、返金されません。</p>

      <h2>6. 追跡情報</h2>
      <p>注文が発送されると、追跡情報（利用可能な場合）を含む確認メールが届き、配送状況を確認できます。</p>

      <h2>7. 遅延</h2>
      <p>Folklore FCは、以下によって引き起こされる遅延について責任を負いません：</p>
      <ul>
        <li>通関手続き</li>
        <li>配送業者</li>
        <li>気象条件</li>
        <li>不可抗力または当社の管理外の状況</li>
      </ul>

      <h2>8. 間違った配送情報</h2>
      <p>配送先住所が正確で完全であることを確認してください。<br />
      Folklore FCは、お客様が提供した誤ったまたは不完全な配送情報による注文の遅延または紛失について責任を負いません。</p>

      <h2>9. お問い合わせ</h2>
      <p>配送または注文についてご質問がある場合は、以下までお問い合わせください：<br />
      📧 support@folklorefc.com</p>
    `
  }
};

export default function ShippingPolicyPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const text = LEGAL_TEXT[locale] || LEGAL_TEXT['en'];
  const isRtl = locale === 'ar';

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto py-12">
        <Link href={`/${locale}`} className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'ml-2 rotate-180' : 'mr-2'}`} />
          {locale === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
        </Link>

        <h1 className="text-4xl md:text-5xl font-black mb-4">{text.title}</h1>
        <p className="text-gray-400 mb-12">{text.lastUpdated}</p>

        <div
          className="prose prose-invert prose-emerald max-w-none text-gray-300 [&>h2]:text-white [&>h2]:font-bold [&>h2]:mt-12 [&>h2]:mb-6 [&>h2]:text-2xl [&>p]:leading-relaxed [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ul]:my-6"
          dangerouslySetInnerHTML={{ __html: text.content }}
        />
      </div>
    </div>
  );
}
