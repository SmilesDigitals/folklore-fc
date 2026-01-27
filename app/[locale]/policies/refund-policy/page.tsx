"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const LEGAL_TEXT: any = {
  en: {
    title: "Return & Refund Policy",
    lastUpdated: "Last updated: January 25, 2026",
    content: `
      <h2>1. Overview</h2>
      <p>At Folklore FC, all products are made to order through third-party printing and fulfillment partners.<br />
      We aim to provide a fair, transparent, and customer-friendly return and refund process, as outlined below.</p>
      <p>By placing an order on our website, you agree to this Return & Refund Policy.</p>

      <h2>2. Returns & Exchanges</h2>
      <p>We accept returns and exchanges under the following conditions:</p>
      
      <h3>✅ Customer-Related Reasons</h3>
      <p>If the return or exchange is requested due to:</p>
      <ul>
        <li>Change of mind</li>
        <li>Incorrect size or color selected by the customer</li>
        <li>No longer wishing to keep the product</li>
      </ul>
      <p>👉 The customer is responsible for return shipping costs.</p>

      <h3>✅ Our Responsibility</h3>
      <p>If the return or exchange is due to:</p>
      <ul>
        <li>A damaged product</li>
        <li>A manufacturing defect</li>
        <li>The wrong item being sent</li>
      </ul>
      <p>👉 Folklore FC will cover all return and reshipment costs, and the customer will not be charged any shipping fees.</p>

      <h2>3. Reporting a Return or Exchange</h2>
      <p>All return or exchange requests must be reported within 7 days of receiving the product.</p>
      <p>To initiate a request, please contact us at:<br />
      📧 support@folklorefc.com</p>
      <p>Please include:</p>
      <ul>
        <li>Order number</li>
        <li>Clear photos of the product (if damaged or incorrect)</li>
        <li>A brief explanation of the reason for the return or exchange</li>
      </ul>
      <p>Requests submitted after 7 days may not be eligible.</p>

      <h2>4. Refunds</h2>
      <p>Once the returned item is received and inspected (if applicable):</p>
      <ul>
        <li>An approved refund will be issued to the original payment method OR</li>
        <li>An approved exchange will be processed</li>
      </ul>
      <p>Refund processing times depend on your payment provider and may take several business days to appear.</p>

      <h2>5. Shipping Costs</h2>
      <ul>
        <li>Shipping costs are non-refundable when the return is due to customer preference or error</li>
        <li>Shipping costs will be fully covered by Folklore FC when the issue is caused by us</li>
      </ul>

      <h2>6. Non-Returnable Situations</h2>
      <p>Returns or exchanges will not be accepted for:</p>
      <ul>
        <li>Requests made after the 7-day reporting period</li>
        <li>Normal variations in color, texture, or print placement</li>
        <li>Damage caused by misuse or improper care</li>
        <li>Delays caused by shipping carriers or customs authorities</li>
      </ul>

      <h2>7. Order Cancellations</h2>
      <p>Orders may be canceled or modified only before production begins.<br />
      Once an order enters production, it can no longer be canceled.</p>

      <h2>8. International Orders</h2>
      <p>We ship internationally.<br />
      Any customs duties, taxes, or import fees are the responsibility of the customer and are non-refundable.</p>

      <h2>9. Contact Us</h2>
      <p>If you have any questions regarding this Return & Refund Policy, please contact us at:<br />
      📧 support@folklorefc.com</p>
    `
  },
  ar: {
    title: "سياسة الإرجاع والاسترداد",
    lastUpdated: "آخر تحديث: 25 يناير 2026",
    content: `
      <h2>1. نظرة عامة</h2>
      <p>في Folklore FC، يتم تصنيع جميع المنتجات حسب الطلب من خلال شركاء طباعة وتلبية تابعين لجهات خارجية.<br />
      نهدف إلى توفير عملية إرجاع واسترداد عادلة وشفافة وصديقة للعملاء، كما هو موضح أدناه.</p>
      <p>بتقديم طلب على موقعنا، فإنك توافق على سياسة الإرجاع والاسترداد هذه.</p>

      <h2>2. الإرجاع والاستبدال</h2>
      <p>نقبل الإرجاع والاستبدال بموجب الشروط التالية:</p>
      
      <h3>✅ أسباب تتعلق بالعميل</h3>
      <p>العميل إذا تم طلب الإرجاع أو الاستبدال بسبب:</p>
      <ul>
        <li>تغيير الرأي</li>
        <li>اختيار مقاس أو لون غير صحيح من قبل العميل</li>
        <li>لم تعد ترغب في الاحتفاظ بالمنتج</li>
      </ul>
      <p>👉 العميل مسؤول عن تكاليف شحن الإرجاع.</p>

      <h3>✅ مسؤوليتنا</h3>
      <p>إذا كان الإرجاع أو الاستبدال بسبب:</p>
      <ul>
        <li>منتج تالف</li>
        <li>عيب في التصنيع</li>
        <li>تم إرسال العنصر الخطأ</li>
      </ul>
      <p>👉 ستغطي Folklore FC جميع تكاليف الإرجاع وإعادة الشحن، ولن يتم تحميل العميل أي رسوم شحن.</p>

      <h2>3. الإبلاغ عن إرجاع أو استبدال</h2>
      <p>يجب الإبلاغ عن جميع طلبات الإرجاع أو الاستبدال في غضون 7 أيام من استلام المنتج.</p>
      <p>لبدء طلب، يرجى الاتصال بنا على:<br />
      📧 support@folklorefc.com</p>
      <p>يرجى تضمين:</p>
      <ul>
        <li>رقم الطلب</li>
        <li>صور واضحة للمنتج (إذا كان تالفًا أو غير صحيح)</li>
        <li>شرح موجز لسبب الإرجاع أو الاستبدال</li>
      </ul>
      <p>قد لا تكون الطلبات المقدمة بعد 7 أيام مؤهلة.</p>

      <h2>4. الاسترداد</h2>
      <p>بمجرد استلام العنصر المرتجع وفحصه (إن وجد):</p>
      <ul>
        <li>سيتم إصدار استرداد معتمد لطريقة الدفع الأصلية أو</li>
        <li>سيتم معالجة استبدال معتمد</li>
      </ul>
      <p>تعتمد أوقات معالجة الاسترداد على مزود الدفع الخاص بك وقد تستغرق عدة أيام عمل لتظهر.</p>

      <h2>5. تكاليف الشحن</h2>
      <ul>
        <li>تكاليف الشحن غير قابلة للاسترداد عندما يكون الإرجاع بسبب تفضيل العميل أو خطأه</li>
        <li>سيتم تغطية تكاليف الشحن بالكامل بواسطة Folklore FC عندما تكون المشكلة ناتجة عنا</li>
      </ul>

      <h2>6. الحالات غير القابلة للإرجاع</h2>
      <p>لن يتم قبول الإرجاع أو الاستبدال في الحالات التالية:</p>
      <ul>
        <li>الطلبات المقدمة بعد فترة الإبلاغ البالغة 7 أيام</li>
        <li>الاختلافات الطبيعية في اللون أو الملمس أو موضع الطباعة</li>
        <li>الأضرار الناجمة عن سوء الاستخدام أو الرعاية غير السليمة</li>
        <li>التأخير الناجم عن شركات الشحن أو السلطات الجمركية</li>
      </ul>

      <h2>7. إلغاء الطلبات</h2>
      <p>يمكن إلغاء الطلبات أو تعديلها فقط قبل بدء الإنتاج.<br />
      بمجرد دخول الطلب مرحلة الإنتاج، لا يمكن إلغاؤه.</p>

      <h2>8. الطلبات الدولية</h2>
      <p>نحن نشحن دوليًا.<br />
      أي رسوم جمركية أو ضرائب أو رسوم استيراد هي مسؤولية العميل وغير قابلة للاسترداد.</p>

      <h2>9. اتصل بنا</h2>
      <p>إذا كان لديك أي أسئلة بخصوص سياسة الإرجاع والاسترداد هذه، يرجى الاتصال بنا على:<br />
      📧 support@folklorefc.com</p>
    `
  },
  fr: {
    title: "Politique de Retour et Remboursement",
    lastUpdated: "Dernière mise à jour : 25 janvier 2026",
    content: `
      <h2>1. Aperçu</h2>
      <p>Chez Folklore FC, tous les produits sont fabriqués sur commande par l'intermédiaire de partenaires d'impression et d'exécution tiers.<br />
      Nous visons à fournir un processus de retour et de remboursement équitable, transparent et convivial, comme indiqué ci-dessous.</p>
      <p>En passant une commande sur notre site Web, vous acceptez cette politique de retour et de remboursement.</p>

      <h2>2. Retours et Échanges</h2>
      <p>Nous acceptons les retours et les échanges dans les conditions suivantes :</p>
      
      <h3>✅ Raisons Liées au Client</h3>
      <p>Si le retour ou l'échange est demandé en raison de :</p>
      <ul>
        <li>Changement d'avis</li>
        <li>Mauvaise taille ou couleur sélectionnée par le client</li>
        <li>Ne souhaite plus garder le produit</li>
      </ul>
      <p>👉 Le client est responsable des frais d'expédition de retour.</p>

      <h3>✅ Notre Responsabilité</h3>
      <p>Si le retour ou l'échange est dû à :</p>
      <ul>
        <li>Un produit endommagé</li>
        <li>Un défaut de fabrication</li>
        <li>Le mauvais article a été envoyé</li>
      </ul>
      <p>👉 Folklore FC couvrira tous les frais de retour et de réexpédition, et le client ne sera facturé aucun frais d'expédition.</p>

      <h2>3. Signaler un Retour ou un Échange</h2>
      <p>Toutes les demandes de retour ou d'échange doivent être signalées dans les 7 jours suivant la réception du produit.</p>
      <p>Pour initier une demande, veuillez nous contacter à :<br />
      📧 support@folklorefc.com</p>
      <p>Veuillez inclure :</p>
      <ul>
        <li>Numéro de commande</li>
        <li>Des photos claires du produit (si endommagé ou incorrect)</li>
        <li>Une brève explication de la raison du retour ou de l'échange</li>
      </ul>
      <p>Les demandes soumises après 7 jours peuvent ne pas être éligibles.</p>

      <h2>4. Remboursements</h2>
      <p>Une fois l'article retourné reçu et inspecté (le cas échéant) :</p>
      <ul>
        <li>Un remboursement approuvé sera émis sur le mode de paiement original OU</li>
        <li>Un échange approuvé sera traité</li>
      </ul>
      <p>Les délais de traitement des remboursements dépendent de votre fournisseur de paiement et peuvent prendre plusieurs jours ouvrables pour apparaître.</p>

      <h2>5. Frais d'Expédition</h2>
      <ul>
        <li>Les frais d'expédition ne sont pas remboursables lorsque le retour est dû à la préférence ou à l'erreur du client</li>
        <li>Les frais d'expédition seront entièrement couverts par Folklore FC lorsque le problème est causé par nous</li>
      </ul>

      <h2>6. Situations Non Retournables</h2>
      <p>Les retours ou les échanges ne seront pas acceptés pour :</p>
      <ul>
        <li>Demandes faites après la période de déclaration de 7 jours</li>
        <li>Variations normales de couleur, de texture ou de placement d'impression</li>
        <li>Dommages causés par une mauvaise utilisation ou un mauvais entretien</li>
        <li>Retards causés par les transporteurs maritimes ou les autorités douanières</li>
      </ul>

      <h2>7. Annulations de Commande</h2>
      <p>Les commandes ne peuvent être annulées ou modifiées qu'avant le début de la production.<br />
      Une fois qu'une commande entre en production, elle ne peut plus être annulée.</p>

      <h2>8. Commandes Internationales</h2>
      <p>Nous expédions à l'international.<br />
      Les droits de douane, taxes ou frais d'importation sont à la charge du client et ne sont pas remboursables.</p>

      <h2>9. Contactez-Nous</h2>
      <p>Si vous avez des questions concernant cette politique de retour et de remboursement, veuillez nous contacter à :<br />
      📧 support@folklorefc.com</p>
    `
  },
  es: {
    title: "Política de Devoluciones y Reembolsos",
    lastUpdated: "Última actualización: 25 de enero de 2026",
    content: `
      <h2>1. Descripción General</h2>
      <p>En Folklore FC, todos los productos se fabrican bajo pedido a través de socios de impresión y cumplimiento externos.<br />
      Nuestro objetivo es proporcionar un proceso de devolución y reembolso justo, transparente y amigable para el cliente, como se describe a continuación.</p>
      <p>Al realizar un pedido en nuestro sitio web, usted acepta esta Política de Devoluciones y Reembolsos.</p>

      <h2>2. Devoluciones y Cambios</h2>
      <p>Aceptamos devoluciones y cambios bajo las siguientes condiciones:</p>
      
      <h3>✅ Razones Relacionadas con el Cliente</h3>
      <p>Si la devolución o el cambio se solicita debido a:</p>
      <ul>
        <li>Cambio de opinión</li>
        <li>Tamaño o color incorrecto seleccionado por el cliente</li>
        <li>Ya no desea conservar el producto</li>
      </ul>
      <p>👉 El cliente es responsable de los costos de envío de devolución.</p>

      <h3>✅ Nuestra Responsabilidad</h3>
      <p>Si la devolución o el cambio se debe a:</p>
      <ul>
        <li>Un producto dañado</li>
        <li>Un defecto de fabricación</li>
        <li>Se envió el artículo incorrecto</li>
      </ul>
      <p>👉 Folklore FC cubrirá todos los costos de devolución y reenvío, y no se le cobrarán gastos de envío al cliente.</p>

      <h2>3. Reportar una Devolución o Cambio</h2>
      <p>Todas las solicitudes de devolución o cambio deben informarse dentro de los 7 días posteriores a la recepción del producto.</p>
      <p>Para iniciar una solicitud, contáctenos en:<br />
      📧 support@folklorefc.com</p>
      <p>Por favor incluya:</p>
      <ul>
        <li>Número de pedido</li>
        <li>Fotos claras del producto (si está dañado o es incorrecto)</li>
        <li>Una breve explicación del motivo de la devolución o cambio</li>
      </ul>
      <p>Las solicitudes enviadas después de 7 días pueden no ser elegibles.</p>

      <h2>4. Reembolsos</h2>
      <p>Una vez que se reciba e inspeccione el artículo devuelto (si corresponde):</p>
      <ul>
        <li>Se emitirá un reembolso aprobado al método de pago original O</li>
        <li>Se procesará un cambio aprobado</li>
      </ul>
      <p>Los tiempos de procesamiento de reembolsos dependen de su proveedor de pagos y pueden demorar varios días hábiles en aparecer.</p>

      <h2>5. Costos de Envío</h2>
      <ul>
        <li>Los costos de envío no son reembolsables cuando la devolución se debe a la preferencia o error del cliente</li>
        <li>Los costos de envío serán cubiertos en su totalidad por Folklore FC cuando el problema sea causado por nosotros</li>
      </ul>

      <h2>6. Situaciones No Devolubles</h2>
      <p>No se aceptarán devoluciones ni cambios para:</p>
      <ul>
        <li>Solicitudes realizadas después del período de informe de 7 días</li>
        <li>Variaciones normales en color, textura o ubicación de impresión</li>
        <li>Daños causados por mal uso o cuidado inadecuado</li>
        <li>Retrasos causados por transportistas o autoridades aduaneras</li>
      </ul>

      <h2>7. Cancelaciones de Pedidos</h2>
      <p>Los pedidos pueden cancelarse o modificarse solo antes de que comience la producción.<br />
      Una vez que un pedido entra en producción, ya no se puede cancelar.</p>

      <h2>8. Pedidos Internacionales</h2>
      <p>Enviamos internacionalmente.<br />
      Cualquier derecho de aduana, impuesto o tarifa de importación es responsabilidad del cliente y no es reembolsable.</p>

      <h2>9. Contáctenos</h2>
      <p>Si tiene alguna pregunta sobre esta Política de Devoluciones y Reembolsos, contáctenos en:<br />
      📧 support@folklorefc.com</p>
    `
  },
  ja: {
    title: "返品・返金ポリシー",
    lastUpdated: "最終更新日：2026年1月25日",
    content: `
      <h2>1. 概要</h2>
      <p>Folklore FCでは、すべての製品はサードパーティの印刷およびフルフィルメントパートナーを通じて注文生産されます。<br />
      以下に概説するように、公正で透明性があり、顧客に優しい返品および返金プロセスを提供することを目指しています。</p>
      <p>当社のウェブサイトで注文することにより、この返品および返金ポリシーに同意したものとみなされます。</p>

      <h2>2. 返品・交換</h2>
      <p>以下の条件下で返品および交換を受け付けます：</p>
      
      <h3>✅ お客様に関連する理由</h3>
      <p>返品または交換が以下による場合：</p>
      <ul>
        <li>心変わり</li>
        <li>お客様が選択したサイズまたは色が間違っている</li>
        <li>製品を保持したくない</li>
      </ul>
      <p>👉 返品の配送料はお客様の負担となります。</p>

      <h3>✅ 当社の責任</h3>
      <p>返品または交換が以下による場合：</p>
      <ul>
        <li>破損した製品</li>
        <li>製造上の欠陥</li>
        <li>間違った商品が送られた</li>
      </ul>
      <p>👉 Folklore FCはすべての返品および再配送料を負担し、お客様に配送料は請求されません。</p>

      <h2>3. 返品または交換の報告</h2>
      <p>すべての返品または交換の要求は、製品を受け取ってから7日以内に報告する必要があります。</p>
      <p>リクエストを開始するには、以下までご連絡ください：<br />
      📧 support@folklorefc.com</p>
      <p>以下を含めてください：</p>
      <ul>
        <li>注文番号</li>
        <li>製品の鮮明な写真（破損または間違っている場合）</li>
        <li>返品または交換の理由の簡単な説明</li>
      </ul>
      <p>7日後に提出されたリクエストは対象外となる場合があります。</p>

      <h2>4. 返金</h2>
      <p>返品された商品を受け取り、検査した後（該当する場合）：</p>
      <ul>
        <li>承認された返金は、元の支払い方法に対して発行されます、または</li>
        <li>承認された交換が処理されます</li>
      </ul>
      <p>返金処理時間は支払いプロバイダーによって異なり、表示されるまでに数営業日かかる場合があります。</p>

      <h2>5. 配送料</h2>
      <ul>
        <li>返品がお客様の好みまたはエラーによる場合、配送料は返金されません</li>
        <li>問題が当社によって引き起こされた場合、配送料はFolklore FCによって完全に負担されます</li>
      </ul>

      <h2>6. 返品不可の状況</h2>
      <p>以下の場合、返品または交換は受け付けられません：</p>
      <ul>
        <li>7日間の報告期間後に行われたリクエスト</li>
        <li>色、質感、または印刷配置の通常の変動</li>
        <li>誤用または不適切なケアによる損傷</li>
        <li>配送業者または税関当局によって引き起こされた遅延</li>
      </ul>

      <h2>7. 注文のキャンセル</h2>
      <p>注文は、生産が開始される前にのみキャンセルまたは変更できます。<br />
      注文が生産に入ると、キャンセルできなくなります。</p>

      <h2>8. 国際注文</h2>
      <p>私たちは国際的に発送します。<br />
      関税、税金、または輸入手数料はお客様の責任であり、返金されません。</p>

      <h2>9. お問い合わせ</h2>
      <p>この返品および返金ポリシーについてご質問がある場合は、以下までお問い合わせください：<br />
      📧 support@folklorefc.com</p>
    `
  }
};

export default function RefundPolicyPage() {
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
