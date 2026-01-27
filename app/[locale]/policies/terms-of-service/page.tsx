"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const LEGAL_TEXT: any = {
  en: {
    title: "Terms of Service",
    lastUpdated: "Last updated: January 25, 2026",
    content: `
      <h2>1. Agreement to Terms</h2>
      <p>Welcome to Folklore FC.<br />
      By accessing or using our website, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with these terms, please do not use our website.</p>

      <h2>2. Use of the Website</h2>
      <p>You may use our website for personal and lawful purposes only.<br />
      You agree not to misuse the website, interfere with its operation, or attempt unauthorized access to any part of the site.</p>

      <h2>3. Products and Services</h2>
      <p>Folklore FC offers apparel and related products sold online.<br />
      All products are made and fulfilled through third-party printing and shipping partners once an order is placed.</p>
      <p>We make every effort to display accurate product descriptions, images, and prices. However, slight variations in color or appearance may occur due to the production process.</p>

      <h2>4. Orders and Payments</h2>
      <p>All prices are displayed clearly on the product pages</p>
      <p>Payments must be completed online at checkout</p>
      <p>Cash on delivery is not available</p>
      <p>Orders are only confirmed once payment is successfully processed</p>
      <p>We reserve the right to refuse or cancel any order in case of suspected fraud, pricing errors, or technical issues.</p>

      <h2>5. Shipping and Fulfillment</h2>
      <p>Orders are produced and shipped by trusted third-party fulfillment partners.<br />
      Shipping times and costs vary depending on destination and are explained in our Shipping Policy.</p>
      <p>Folklore FC is not responsible for delays caused by customs, carriers, or circumstances beyond our control.</p>

      <h2>6. Returns and Refunds</h2>
      <p>Returns, exchanges, and refunds are handled according to our Return & Refund Policy, which forms part of these Terms.<br />
      Please review that policy carefully before making a purchase.</p>

      <h2>7. Intellectual Property</h2>
      <p>All content on this website, including logos, designs, text, and images, is the property of Folklore FC or its licensors and is protected by applicable intellectual property laws.</p>
      <p>You may not reproduce, distribute, or use any content without prior written permission.</p>

      <h2>8. Disclaimer</h2>
      <p>The website and its content are provided on an “as is” and “as available” basis.<br />
      We do not guarantee that the website will be error-free or uninterrupted.</p>

      <h2>9. Limitation of Liability</h2>
      <p>To the maximum extent permitted by law, Folklore FC shall not be liable for any indirect, incidental, or consequential damages arising from the use of our website or products.</p>

      <h2>10. Governing Law</h2>
      <p>These Terms shall be governed by and interpreted in accordance with the laws of Spain, without regard to conflict of law principles.</p>

      <h2>11. Changes to These Terms</h2>
      <p>We reserve the right to update or modify these Terms at any time.<br />
      Changes will be effective once posted on this page.</p>

      <h2>12. Contact Us</h2>
      <p>If you have any questions regarding these Terms of Service, please contact us at:<br />
      📧 support@folklorefc.com</p>
    `
  },
  ar: {
    title: "شروط الخدمة",
    lastUpdated: "آخر تحديث: 25 يناير 2026",
    content: `
      <h2>1. الموافقة على الشروط</h2>
      <p>مرحبًا بك في Folklore FC.<br />
      من خلال الوصول إلى موقعنا أو استخدامه، فإنك توافق على الالتزام بشروط الخدمة هذه وجميع القوانين واللوائح المعمول بها. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام موقعنا.</p>

      <h2>2. استخدام الموقع</h2>
      <p>يمكنك استخدام موقعنا لأغراض شخصية وقانونية فقط.<br />
      أنت توافق على عدم إساءة استخدام الموقع، أو التدخل في تشغيله، أو محاولة الوصول غير المصرح به إلى أي جزء من الموقع.</p>

      <h2>3. المنتجات والخدمات</h2>
      <p>تقدم Folklore FC الملابس والمنتجات ذات الصلة المباعة عبر الإنترنت.<br />
      يتم تصنيع جميع المنتجات وتلبيتها من خلال شركاء طباعة وشحن تابعين لجهات خارجية بمجرد تقديم الطلب.</p>
      <p>نحن نبذل قصارى جهدنا لعرض وصف منتجات وصور وأسعار دقيقة. ومع ذلك، قد تحدث اختلافات طفيفة في اللون أو المظهر بسبب عملية الإنتاج.</p>

      <h2>4. الطلبات والمدفوعات</h2>
      <p>يتم عرض جميع الأسعار بوضوح على صفحات المنتج</p>
      <p>يجب إتمام المدفوعات عبر الإنترنت عند الدفع</p>
      <p>خدمة الدفع عند الاستلام غير متاحة</p>
      <p>يتم تأكيد الطلبات فقط بمجرد معالجة الدفع بنجاح</p>
      <p>نحتفظ بالحق في رفض أو إلغاء أي طلب في حالة الاشتباه في الاحتيال أو أخطاء التسعير أو المشكلات الفنية.</p>

      <h2>5. الشحن والتلبية</h2>
      <p>يتم إنتاج الطلبات وشحنها بواسطة شركاء تلبية موثوقين من جهات خارجية.<br />
      تختلف أوقات الشحن وتكاليفه حسب الوجهة وهي موضحة في سياسة الشحن الخاصة بنا.</p>
      <p>Folklore FC ليست مسؤولة عن التأخيرات الناجمة عن الجمارك أو شركات النقل أو الظروف الخارجة عن سيطرتنا.</p>

      <h2>6. الإرجاع والاسترداد</h2>
      <p>يتم التعامل مع المرتجعات والاستبدال والاسترداد وفقًا لسياسة الإرجاع والاسترداد الخاصة بنا، والتي تشكل جزءًا من هذه الشروط.<br />
      يرجى مراجعة تلك السياسة بعناية قبل إجراء عملية شراء.</p>

      <h2>7. الملكية الفكرية</h2>
      <p>جميع المحتويات الموجودة على هذا الموقع، بما في ذلك الشعارات والتصميمات والنصوص والصور، هي ملك لشركة Folklore FC أو الجهات المرخصة لها ومحمية بموجب قوانين الملكية الفكرية المعمول بها.</p>
      <p>لا يجوز لك إعادة إنتاج أو توزيع أو استخدام أي محتوى دون إذن كتابي مسبق.</p>

      <h2>8. إخلاء المسؤولية</h2>
      <p>يتم توفير الموقع ومحتواه على أساس "كما هو" و "كما هو متاح".<br />
      نحن لا نضمن أن الموقع سيكون خاليًا من الأخطاء أو غير منقطع.</p>

      <h2>9. حدود المسؤولية</h2>
      <p>إلى أقصى حد يسمح به القانون، لن تكون Folklore FC مسؤولة عن أي أضرار غير مباشرة أو عرضية أو تبعية تنشأ عن استخدام موقعنا أو منتجاتنا.</p>

      <h2>10. القانون الحاكم</h2>
      <p>تخضع هذه الشروط وتفسر وفقًا لقوانين إسبانيا، دون النظر إلى تعارض مبادئ القانون.</p>

      <h2>11. التغييرات على هذه الشروط</h2>
      <p>نحتفظ بالحق في تحديث أو تعديل هذه الشروط في أي وقت.<br />
      ستكون التغييرات سارية بمجرد نشرها على هذه الصفحة.</p>

      <h2>12. اتصل بنا</h2>
      <p>إذا كان لديك أي أسئلة بخصوص شروط الخدمة هذه، يرجى الاتصال بنا على:<br />
      📧 support@folklorefc.com</p>
    `
  },
  fr: {
    title: "Conditions Générales",
    lastUpdated: "Dernière mise à jour : 25 janvier 2026",
    content: `
      <h2>1. Acceptation des Conditions</h2>
      <p>Bienvenue chez Folklore FC.<br />
      En accédant à ou en utilisant notre site Web, vous acceptez d'être lié par ces Conditions Générales et toutes les lois et réglementations applicables. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site Web.</p>

      <h2>2. Utilisation du Site Web</h2>
      <p>Vous ne pouvez utiliser notre site Web qu'à des fins personnelles et légales.<br />
      Vous acceptez de ne pas abuser du site Web, de ne pas interférer avec son fonctionnement ou de tenter un accès non autorisé à toute partie du site.</p>

      <h2>3. Produits et Services</h2>
      <p>Folklore FC propose des vêtements et des produits connexes vendus en ligne.<br />
      Tous les produits sont fabriqués et expédiés par des partenaires d'impression et d'expédition tiers une fois la commande passée.</p>
      <p>Nous nous efforçons d'afficher des descriptions de produits, des images et des prix précis. Cependant, de légères variations de couleur ou d'apparence peuvent survenir en raison du processus de production.</p>

      <h2>4. Commandes et Paiements</h2>
      <p>Tous les prix sont affichés clairement sur les pages produits</p>
      <p>Les paiements doivent être effectués en ligne lors du passage à la caisse</p>
      <p>Le paiement à la livraison n'est pas disponible</p>
      <p>Les commandes ne sont confirmées qu'une fois le paiement traité avec succès</p>
      <p>Nous nous réservons le droit de refuser ou d'annuler toute commande en cas de suspicion de fraude, d'erreurs de prix ou de problèmes techniques.</p>

      <h2>5. Expédition et Livraison</h2>
      <p>Les commandes sont produites et expédiées par des partenaires logistiques tiers de confiance.<br />
      Les délais et les frais d'expédition varient selon la destination et sont expliqués dans notre Politique d'Expédition.</p>
      <p>Folklore FC n'est pas responsable des retards causés par les douanes, les transporteurs ou des circonstances indépendantes de notre volonté.</p>

      <h2>6. Retours et Remboursements</h2>
      <p>Les retours, les échanges et les remboursements sont traités conformément à notre Politique de Retour et Remboursement, qui fait partie intégrante de ces Conditions.<br />
      Veuillez lire attentivement cette politique avant d'effectuer un achat.</p>

      <h2>7. Propriété Intellectuelle</h2>
      <p>Tout le contenu de ce site Web, y compris les logos, les conceptions, les textes et les images, est la propriété de Folklore FC ou de ses concédants de licence et est protégé par les lois applicables sur la propriété intellectuelle.</p>
      <p>Vous ne pouvez pas reproduire, distribuer ou utiliser tout contenu sans autorisation écrite préalable.</p>

      <h2>8. Clause de Non-responsabilité</h2>
      <p>Le site Web et son contenu sont fournis « tels quels » et « selon la disponibilité ».<br />
      Nous ne garantissons pas que le site Web sera exempt d'erreurs ou ininterrompu.</p>

      <h2>9. Limitation de Responsabilité</h2>
      <p>Dans la mesure maximale permise par la loi, Folklore FC ne sera pas responsable des dommages indirects, accessoires ou consécutifs découlant de l'utilisation de notre site Web ou de nos produits.</p>

      <h2>10. Loi Applicable</h2>
      <p>Ces Conditions sont régies et interprétées conformément aux lois de l'Espagne, sans égard aux principes de conflit de lois.</p>

      <h2>11. Modifications de Ces Conditions</h2>
      <p>Nous nous réservons le droit de mettre à jour ou de modifier ces Conditions à tout moment.<br />
      Les modifications entreront en vigueur une fois publiées sur cette page.</p>

      <h2>12. Contactez-Nous</h2>
      <p>Si vous avez des questions concernant ces Conditions Générales, veuillez nous contacter à :<br />
      📧 support@folklorefc.com</p>
    `
  },
  es: {
    title: "Términos y Condiciones",
    lastUpdated: "Última actualización: 25 de enero de 2026",
    content: `
      <h2>1. Acuerdo de Términos</h2>
      <p>Bienvenido a Folklore FC.<br />
      Al acceder o utilizar nuestro sitio web, usted acepta estar sujeto a estos Términos de Servicio y todas las leyes y regulaciones aplicables. Si no está de acuerdo con estos términos, por favor no utilice nuestro sitio web.</p>

      <h2>2. Uso del Sitio Web</h2>
      <p>Puede utilizar nuestro sitio web solo para fines personales y legales.<br />
      Usted acepta no hacer un uso indebido del sitio web, interferir con su funcionamiento o intentar un acceso no autorizado a cualquier parte del sitio.</p>

      <h2>3. Productos y Servicios</h2>
      <p>Folklore FC ofrece ropa y productos relacionados vendidos en línea.<br />
      Todos los productos se fabrican y cumplen a través de socios de impresión y envío externos una vez que se realiza un pedido.</p>
      <p>Hacemos todo lo posible para mostrar descripciones de productos, imágenes y precios precisos. Sin embargo, pueden ocurrir ligeras variaciones en el color o la apariencia debido al proceso de producción.</p>

      <h2>4. Pedidos y Pagos</h2>
      <p>Todos los precios se muestran claramente en las páginas de productos</p>
      <p>Los pagos deben completarse en línea al finalizar la compra</p>
      <p>El pago contra reembolso no está disponible</p>
      <p>Los pedidos solo se confirman una vez que el pago se procesa con éxito</p>
      <p>Nos reservamos el derecho de rechazar o cancelar cualquier pedido en caso de sospecha de fraude, errores de precios o problemas técnicos.</p>

      <h2>5. Envío y Cumplimiento</h2>
      <p>Los pedidos son producidos y enviados por socios de cumplimiento externos de confianza.<br />
      Los tiempos y costos de envío varían según el destino y se explican en nuestra Política de Envíos.</p>
      <p>Folklore FC no es responsable de los retrasos causados por aduanas, transportistas o circunstancias fuera de nuestro control.</p>

      <h2>6. Devoluciones y Reembolsos</h2>
      <p>Las devoluciones, cambios y reembolsos se manejan de acuerdo con nuestra Política de Devoluciones y Reembolsos, que forma parte de estos Términos.<br />
      Por favor, revise esa política cuidadosamente antes de realizar una compra.</p>

      <h2>7. Propiedad Intelectual</h2>
      <p>Todo el contenido de este sitio web, incluidos logotipos, diseños, textos e imágenes, es propiedad de Folklore FC o de sus licenciantes y está protegido por las leyes de propiedad intelectual aplicables.</p>
      <p>No puede reproducir, distribuir o utilizar ningún contenido sin permiso previo por escrito.</p>

      <h2>8. Descargo de Responsabilidad</h2>
      <p>El sitio web y su contenido se proporcionan "tal cual" y "según disponibilidad".<br />
      No garantizamos que el sitio web esté libre de errores o ininterrumpido.</p>

      <h2>9. Limitación de Responsabilidad</h2>
      <p>En la medida máxima permitida por la ley, Folklore FC no será responsable de ningún daño indirecto, incidental o consecuente que surja del uso de nuestro sitio web o productos.</p>

      <h2>10. Ley Aplicable</h2>
      <p>Estos Términos se regirán e interpretarán de acuerdo con las leyes de España, sin tener en cuenta los principios de conflicto de leyes.</p>

      <h2>11. Cambios a Estos Términos</h2>
      <p>Nos reservamos el derecho de actualizar o modificar estos Términos en cualquier momento.<br />
      Los cambios serán efectivos una vez publicados en esta página.</p>

      <h2>12. Contáctenos</h2>
      <p>Si tiene alguna pregunta sobre estos Términos de Servicio, contáctenos en:<br />
      📧 support@folklorefc.com</p>
    `
  },
  ja: {
    title: "利用規約",
    lastUpdated: "最終更新日：2026年1月25日",
    content: `
      <h2>1. 規約への同意</h2>
      <p>Folklore FCへようこそ。<br />
      当社のウェブサイトにアクセスまたは使用することにより、お客様は本利用規約および適用されるすべての法律および規制に拘束されることに同意するものとします。これらの条件に同意しない場合は、当社のウェブサイトを使用しないでください。</p>

      <h2>2. ウェブサイトの利用</h2>
      <p>お客様は、個人的かつ合法的な目的でのみ当社のウェブサイトを使用できます。<br />
      お客様は、ウェブサイトを悪用したり、その運営を妨害したり、サイトのいかなる部分への不正アクセスを試みたりしないことに同意するものとします。</p>

      <h2>3. 製品とサービス</h2>
      <p>Folklore FCは、オンラインで販売されるアパレルおよび関連製品を提供しています。<br />
      注文が行われると、すべての製品はサードパーティの印刷および配送パートナーを通じて製造および履行されます。</p>
      <p>私たちは、正確な製品説明、画像、および価格を表示するためにあらゆる努力を払っています。ただし、製造プロセスにより、色や外観にわずかな違いが生じる場合があります。</p>

      <h2>4. 注文と支払い</h2>
      <p>すべての価格は製品ページに明確に表示されます</p>
      <p>支払いはチェックアウト時にオンラインで完了する必要があります</p>
      <p>代金引換は利用できません</p>
      <p>支払いが正常に処理された後にのみ注文が確定されます</p>
      <p>詐欺の疑い、価格設定の誤り、または技術的な問題が発生した場合、注文を拒否またはキャンセルする権利を留保します。</p>

      <h2>5. 配送と履行</h2>
      <p>注文は、信頼できるサードパーティの履行パートナーによって製造および出荷されます。<br />
      配送時間と費用は目的地によって異なり、配送ポリシーで説明されています。</p>
      <p>Folklore FCは、税関、運送業者、または当社の管理外の状況によって引き起こされる遅延について責任を負いません。</p>

      <h2>6. 返品と返金</h2>
      <p>返品、交換、および返金は、本規約の一部を構成する返品および返金ポリシーに従って処理されます。<br />
      購入する前に、そのポリシーをよく確認してください。</p>

      <h2>7. 知的財産</h2>
      <p>ロゴ、デザイン、テキスト、画像を含むこのウェブサイト上のすべてのコンテンツは、Folklore FCまたはそのライセンサーの財産であり、適用される知的財産法によって保護されています。</p>
      <p>書面による事前の許可なしに、コンテンツを複製、配布、または使用することはできません。</p>

      <h2>8. 免責事項</h2>
      <p>ウェブサイトとそのコンテンツは、「現状のまま」および「利用可能な範囲」で提供されます。<br />
      ウェブサイトにエラーがなく、中断されないことを保証するものではありません。</p>

      <h2>9. 責任の制限</h2>
      <p>法律で認められる最大限の範囲で、Folklore FCは、当社のウェブサイトまたは製品の使用から生じる間接的、付随的、または結果的な損害について責任を負わないものとします。</p>

      <h2>10. 準拠法</h2>
      <p>これらの規約は、法の抵触の原則に関係なく、スペインの法律に準拠し、解釈されるものとします。</p>

      <h2>11. 本規約の変更</h2>
      <p>私たちは、いつでもこれらの規約を更新または変更する権利を留保します。<br />
      変更は、このページに掲載された時点で有効になります。</p>

      <h2>12. お問い合わせ</h2>
      <p>これらの利用規約についてご質問がある場合は、以下までお問い合わせください：<br />
      📧 support@folklorefc.com</p>
    `
  }
};

export default function TermsPage() {
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
