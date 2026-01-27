"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const LEGAL_TEXT: any = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: January 25, 2026",
    content: `
      <h2>1. Introduction</h2>
      <p>Welcome to Folklore FC. We are committed to protecting your privacy and ensuring transparency regarding how your personal data is collected, used, and protected when you visit or make a purchase from our website.</p>
      <p>By accessing or using our website, you agree to the practices described in this Privacy Policy.</p>

      <h2>2. Who We Are</h2>
      <p>Folklore FC is responsible for processing your personal data.</p>
      <p><strong>Contact Information:</strong><br />
      Email: support@folklorefc.com<br />
      Address: Travessía Prat de la Riba, 91–95</p>

      <h2>3. Countries We Serve</h2>
      <p>We operate internationally and primarily serve customers in the following countries: United States (USA), France (FR), Spain (ES), Japan (JP), and Saudi Arabia (KSA).</p>
      <p>Your data may be processed in accordance with applicable international data protection laws, including GDPR where applicable.</p>

      <h2>4. Information We Collect</h2>
      <p>We may collect and process the following categories of personal data:</p>
      <ul>
        <li><strong>Identity Data:</strong> Full name or account identifier</li>
        <li><strong>Contact Data:</strong> Email address, phone number, billing and shipping address</li>
        <li><strong>Order & Transaction Data:</strong> Purchased products, order history, payment status</li>
        <li><strong>Payment Information:</strong> Payments are processed securely by third-party payment providers; we do not store credit or debit card details</li>
        <li><strong>Technical Data:</strong> IP address, browser type, operating system, device information</li>
        <li><strong>Usage Data:</strong> Pages visited, interactions with the website</li>
      </ul>

      <h2>5. How We Use Your Data</h2>
      <p>We use your personal data to:</p>
      <ul>
        <li>Process and fulfill orders</li>
        <li>Arrange printing, packaging, and shipping of products</li>
        <li>Communicate order confirmations and support requests</li>
        <li>Improve website functionality and user experience</li>
        <li>Analyze website performance using Google Analytics</li>
        <li>Comply with legal and regulatory obligations</li>
      </ul>
      <p>We do not offer cash on delivery. All payments must be completed online.</p>

      <h2>6. Third-Party Services & Data Sharing</h2>
      <p>We may share your data with trusted third parties strictly for operational purposes, including:</p>
      <ul>
        <li>Payment processors (secure online payment gateways)</li>
        <li>Printing and fulfillment partners responsible for producing and shipping products</li>
        <li>Shipping and logistics providers</li>
        <li>Analytics services such as Google Analytics</li>
      </ul>
      <p>These partners receive only the information necessary to perform their services and are contractually obligated to protect your data.</p>

      <h2>7. Cookies and Analytics</h2>
      <p>Our website uses cookies and similar technologies to:</p>
      <ul>
        <li>Ensure essential site functionality</li>
        <li>Measure traffic and usage patterns</li>
        <li>Improve performance and user experience</li>
      </ul>
      <p>We use Google Analytics to collect anonymous statistical data. You may disable cookies through your browser settings, though some features may not function properly.</p>

      <h2>8. Data Security</h2>
      <p>We use appropriate technical and organizational security measures to safeguard your personal data. All data transfers occur over secure encrypted connections (HTTPS).</p>

      <h2>9. Data Retention</h2>
      <p>We retain personal data only for as long as necessary to fulfill the purposes described in this policy, including legal, accounting, and operational requirements.</p>

      <h2>10. Your Rights</h2>
      <p>Depending on your location, you may have the right to:</p>
      <ul>
        <li>Request access to your personal data</li>
        <li>Request correction or deletion</li>
        <li>Object to or restrict processing</li>
        <li>Request data portability</li>
        <li>Withdraw consent where applicable</li>
      </ul>
      <p>To exercise any of these rights, please contact us at support@folklorefc.com.</p>

      <h2>11. Children’s Privacy</h2>
      <p>Our website is not intended for individuals under the age of 13 (or 16 where required by local law). We do not knowingly collect personal data from children.</p>

      <h2>12. Changes to This Policy</h2>
      <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>

      <h2>13. Contact Us</h2>
      <p>If you have any questions about this Privacy Policy or our data practices, please contact us at: 📧 support@folklorefc.com</p>
    `
  },
  ar: {
    title: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث: 25 يناير 2026",
    content: `
      <h2>1. مقدمة</h2>
      <p>مرحبًا بك في Folklore FC. نحن ملتزمون بحماية خصوصيتك وضمان الشفافية فيما يتعلق بكيفية جمع بياناتك الشخصية واستخدامها وحمايتها عند زيارتك لموقعنا أو إجراء عملية شراء منه.</p>
      <p>من خلال الوصول إلى موقعنا أو استخدامه، فإنك توافق على الممارسات الموضحة في سياسة الخصوصية هذه.</p>

      <h2>2. من نحن</h2>
      <p>Folklore FC هي المسؤولة عن معالجة بياناتك الشخصية.</p>
      <p><strong>معلومات الاتصال:</strong><br />
      البريد الإلكتروني: support@folklorefc.com<br />
      العنوان: Travessía Prat de la Riba, 91–95</p>

      <h2>3. الدول التي نخدمها</h2>
      <p>نحن نعمل دوليًا ونخدم العملاء بشكل أساسي في البلدان التالية: الولايات المتحدة (USA)، فرنسا (FR)، إسبانيا (ES)، اليابان (JP)، والمملكة العربية السعودية (KSA).</p>
      <p>قد تتم معالجة بياناتك وفقًا لقوانين حماية البيانات الدولية المعمول بها، بما في ذلك اللائحة العامة لحماية البيانات (GDPR) عند الاقتضاء.</p>

      <h2>4. المعلومات التي نجمعها</h2>
      <p>قد نقوم بجمع ومعالجة الفئات التالية من البيانات الشخصية:</p>
      <ul>
        <li><strong>بيانات الهوية:</strong> الاسم الكامل أو معرف الحساب</li>
        <li><strong>بيانات الاتصال:</strong> عنوان البريد الإلكتروني، رقم الهاتف، عنوان الفواتير والشحن</li>
        <li><strong>بيانات الطلب والمعاملات:</strong> المنتجات المشتراة، سجل الطلبات، حالة الدفع</li>
        <li><strong>معلومات الدفع:</strong> تتم معالجة المدفوعات بشكل آمن بواسطة مزودي خدمات دفع خارجيين؛ نحن لا نقوم بتخزين تفاصيل بطاقة الائتمان أو الخصم</li>
        <li><strong>البيانات التقنية:</strong> عنوان IP، نوع المتصفح، نظام التشغيل، معلومات الجهاز</li>
        <li><strong>بيانات الاستخدام:</strong> الصفحات التي تمت زيارتها، التفاعلات مع الموقع</li>
      </ul>

      <h2>5. كيف نستخدم بياناتك</h2>
      <p>نستخدم بياناتك الشخصية لـ:</p>
      <ul>
        <li>معالجة وتنفيذ الطلبات</li>
        <li>ترتيب طباعة وتغليف وشحن المنتجات</li>
        <li>إرسال تأكيدات الطلبات وطلبات الدعم</li>
        <li>تحسين وظائف الموقع وتجربة المستخدم</li>
        <li>تحليل أداء الموقع باستخدام Google Analytics</li>
        <li>الامتثال للالتزامات القانونية والتنظيمية</li>
      </ul>
      <p>نحن لا نقدم خدمة الدفع عند الاستلام. يجب إتمام جميع المدفوعات عبر الإنترنت.</p>

      <h2>6. خدمات الطرف الثالث ومشاركة البيانات</h2>
      <p>قد نشارك بياناتك مع أطراف ثالثة موثوقة لأغراض تشغيلية بحتة، بما في ذلك:</p>
      <ul>
        <li>معالجات الدفع (بوابات الدفع الآمنة عبر الإنترنت)</li>
        <li>شركاء الطباعة والتنفيذ المسؤولون عن إنتاج وشحن المنتجات</li>
        <li>مقدمو خدمات الشحن والخدمات اللوجستية</li>
        <li>خدمات التحليلات مثل Google Analytics</li>
      </ul>
      <p>تتلقى هذه الأطراف المعلومات الضرورية فقط لأداء خدماتهم وهم ملزمون تعاقديًا بحماية بياناتك.</p>

      <h2>7. ملفات تعريف الارتباط والتحليلات</h2>
      <p>يستخدم موقعنا ملفات تعريف الارتباط وتقنيات مماثلة لـ:</p>
      <ul>
        <li>ضمان وظائف الموقع الأساسية</li>
        <li>قياس حركة المرور وأنماط الاستخدام</li>
        <li>تحسين الأداء وتجربة المستخدم</li>
      </ul>
      <p>نستخدم Google Analytics لجمع بيانات إحصائية مجهولة المصدر. يمكنك تعطيل ملفات تعريف الارتباط من خلال إعدادات المتصفح الخاص بك، على الرغم من أن بعض الميزات قد لا تعمل بشكل صحيح.</p>

      <h2>8. أمن البيانات</h2>
      <p>نستخدم تدابير أمنية تقنية وتنظيمية مناسبة لحماية بياناتك الشخصية. تتم جميع عمليات نقل البيانات عبر اتصالات مشفرة آمنة (HTTPS).</p>

      <h2>9. الاحتفاظ بالبيانات</h2>
      <p>نحتفظ بالبيانات الشخصية فقط طالما كان ذلك ضروريًا لتحقيق الأغراض الموضحة في هذه السياسة، بما في ذلك المتطلبات القانونية والمحاسبية والتشغيلية.</p>

      <h2>10. حقوقك</h2>
      <p>بناءً على موقعك، قد يكون لديك الحق في:</p>
      <ul>
        <li>طلب الوصول إلى بياناتك الشخصية</li>
        <li>طلب التصحيح أو الحذف</li>
        <li>الاعتراض على المعالجة أو تقييدها</li>
        <li>طلب نقل البيانات</li>
        <li>سحب الموافقة عند الاقتضاء</li>
      </ul>
      <p>لممارسة أي من هذه الحقوق، يرجى الاتصال بنا على support@folklorefc.com.</p>

      <h2>11. خصوصية الأطفال</h2>
      <p>موقعنا غير مخصص للأفراد الذين تقل أعمارهم عن 13 عامًا (أو 16 عامًا حيثما يقتضي القانون المحلي). نحن لا نجمع بيانات شخصية عن عمد من الأطفال.</p>

      <h2>12. التغييرات على هذه السياسة</h2>
      <p>قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سيتم نشر أي تغييرات على هذه الصفحة مع تاريخ مراجعة محدث.</p>

      <h2>13. اتصل بنا</h2>
      <p>إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو ممارسات البيانات الخاصة بنا، يرجى الاتصال بنا على: 📧 support@folklorefc.com</p>
    `
  },
  fr: {
    title: "Politique de Confidentialité",
    lastUpdated: "Dernière mise à jour : 25 janvier 2026",
    content: `
      <h2>1. Introduction</h2>
      <p>Bienvenue chez Folklore FC. Nous nous engageons à protéger votre vie privée et à assurer la transparence concernant la collecte, l'utilisation et la protection de vos données personnelles lorsque vous visitez ou effectuez un achat sur notre site web.</p>
      <p>En accédant à ou en utilisant notre site web, vous acceptez les pratiques décrites dans cette Politique de Confidentialité.</p>

      <h2>2. Qui Sommes-Nous</h2>
      <p>Folklore FC est responsable du traitement de vos données personnelles.</p>
      <p><strong>Coordonnées :</strong><br />
      E-mail : support@folklorefc.com<br />
      Adresse : Travessía Prat de la Riba, 91–95</p>

      <h2>3. Pays Que Nous Servons</h2>
      <p>Nous opérons à l'international et servons principalement des clients dans les pays suivants : États-Unis (USA), France (FR), Espagne (ES), Japon (JP) et Arabie Saoudite (KSA).</p>
      <p>Vos données peuvent être traitées conformément aux lois internationales applicables en matière de protection des données, y compris le RGPD le cas échéant.</p>

      <h2>4. Informations Que Nous Collectons</h2>
      <p>Nous pouvons collecter et traiter les catégories suivantes de données personnelles :</p>
      <ul>
        <li><strong>Données d'Identité :</strong> Nom complet ou identifiant de compte</li>
        <li><strong>Données de Contact :</strong> Adresse e-mail, numéro de téléphone, adresse de facturation et de livraison</li>
        <li><strong>Données de Commande & Transaction :</strong> Produits achetés, historique des commandes, statut du paiement</li>
        <li><strong>Informations de Paiement :</strong> Les paiements sont traités en toute sécurité par des prestataires de paiement tiers ; nous ne stockons pas les détails des cartes de crédit ou de débit</li>
        <li><strong>Données Techniques :</strong> Adresse IP, type de navigateur, système d'exploitation, informations sur l'appareil</li>
        <li><strong>Données d'Utilisation :</strong> Pages visitées, interactions avec le site web</li>
      </ul>

      <h2>5. Comment Nous Utilisons Vos Données</h2>
      <p>Nous utilisons vos données personnelles pour :</p>
      <ul>
        <li>Traiter et exécuter les commandes</li>
        <li>Organiser l'impression, l'emballage et l'expédition des produits</li>
        <li>Communiquer les confirmations de commande et les demandes de support</li>
        <li>Améliorer les fonctionnalités du site web et l'expérience utilisateur</li>
        <li>Analyser les performances du site web à l'aide de Google Analytics</li>
        <li>Respecter les obligations légales et réglementaires</li>
      </ul>
      <p>Nous ne proposons pas le paiement à la livraison. Tous les paiements doivent être effectués en ligne.</p>

      <h2>6. Services Tiers et Partage de Données</h2>
      <p>Nous pouvons partager vos données avec des tiers de confiance strictement à des fins opérationnelles, notamment :</p>
      <ul>
        <li>Processeurs de paiement (passerelles de paiement en ligne sécurisées)</li>
        <li>Partenaires d'impression et d'exécution responsables de la production et de l'expédition des produits</li>
        <li>Prestataires d'expédition et de logistique</li>
        <li>Services d'analyse tels que Google Analytics</li>
      </ul>
      <p>Ces partenaires ne reçoivent que les informations nécessaires pour effectuer leurs services et sont contractuellement tenus de protéger vos données.</p>

      <h2>7. Cookies et Analytique</h2>
      <p>Notre site web utilise des cookies et des technologies similaires pour :</p>
      <ul>
        <li>Assurer les fonctionnalités essentielles du site</li>
        <li>Mesurer le trafic et les modèles d'utilisation</li>
        <li>Améliorer les performances et l'expérience utilisateur</li>
      </ul>
      <p>Nous utilisons Google Analytics pour collecter des données statistiques anonymes. Vous pouvez désactiver les cookies via les paramètres de votre navigateur, bien que certaines fonctionnalités puissent ne pas fonctionner correctement.</p>

      <h2>8. Sécurité des Données</h2>
      <p>Nous utilisons des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles. Tous les transferts de données se font via des connexions cryptées sécurisées (HTTPS).</p>

      <h2>9. Conservation des Données</h2>
      <p>Nous ne conservons les données personnelles que le temps nécessaire pour atteindre les objectifs décrits dans cette politique, y compris les exigences légales, comptables et opérationnelles.</p>

      <h2>10. Vos Droits</h2>
      <p>Selon votre localisation, vous pouvez avoir le droit de :</p>
      <ul>
        <li>Demander l'accès à vos données personnelles</li>
        <li>Demander la correction ou la suppression</li>
        <li>Vous opposer au traitement ou le restreindre</li>
        <li>Demander la portabilité des données</li>
        <li>Retirer votre consentement le cas échéant</li>
      </ul>
      <p>Pour exercer l'un de ces droits, veuillez nous contacter à support@folklorefc.com.</p>

      <h2>11. Confidentialité des Enfants</h2>
      <p>Notre site web n'est pas destiné aux personnes de moins de 13 ans (ou 16 ans lorsque la loi locale l'exige). Nous ne collectons pas sciemment de données personnelles auprès des enfants.</p>

      <h2>12. Modifications de Cette Politique</h2>
      <p>Nous pouvons mettre à jour cette Politique de Confidentialité de temps à autre. Tout changement sera publié sur cette page avec une date de révision mise à jour.</p>

      <h2>13. Contactez-Nous</h2>
      <p>Si vous avez des questions concernant cette Politique de Confidentialité ou nos pratiques en matière de données, veuillez nous contacter à : 📧 support@folklorefc.com</p>
    `
  },
  es: {
    title: "Política de Privacidad",
    lastUpdated: "Última actualización: 25 de enero de 2026",
    content: `
      <h2>1. Introducción</h2>
      <p>Bienvenido a Folklore FC. Estamos comprometidos con proteger su privacidad y garantizar la transparencia sobre cómo se recopilan, utilizan y protegen sus datos personales cuando visita o realiza una compra en nuestro sitio web.</p>
      <p>Al acceder o utilizar nuestro sitio web, usted acepta las prácticas descritas en esta Política de Privacidad.</p>

      <h2>2. Quiénes Somos</h2>
      <p>Folklore FC es responsable del procesamiento de sus datos personales.</p>
      <p><strong>Información de Contacto:</strong><br />
      Correo electrónico: support@folklorefc.com<br />
      Dirección: Travessía Prat de la Riba, 91–95</p>

      <h2>3. Países Que Servimos</h2>
      <p>Operamos internacionalmente y servimos principalmente a clientes en los siguientes países: Estados Unidos (USA), Francia (FR), España (ES), Japón (JP) y Arabia Saudita (KSA).</p>
      <p>Sus datos pueden ser procesados de acuerdo con las leyes internacionales de protección de datos aplicables, incluido el RGPD donde corresponda.</p>

      <h2>4. Información Que Recopilamos</h2>
      <p>Podemos recopilar y procesar las siguientes categorías de datos personales:</p>
      <ul>
        <li><strong>Datos de Identidad:</strong> Nombre completo o identificador de cuenta</li>
        <li><strong>Datos de Contacto:</strong> Dirección de correo electrónico, número de teléfono, dirección de facturación y envío</li>
        <li><strong>Datos de Pedidos y Transacciones:</strong> Productos comprados, historial de pedidos, estado del pago</li>
        <li><strong>Información de Pago:</strong> Los pagos son procesados de forma segura por proveedores de pago externos; no almacenamos detalles de tarjetas de crédito o débito</li>
        <li><strong>Datos Técnicos:</strong> Dirección IP, tipo de navegador, sistema operativo, información del dispositivo</li>
        <li><strong>Datos de Uso:</strong> Páginas visitadas, interacciones con el sitio web</li>
      </ul>

      <h2>5. Cómo Usamos Sus Datos</h2>
      <p>Usamos sus datos personales para:</p>
      <ul>
        <li>Procesar y cumplir con los pedidos</li>
        <li>Organizar la impresión, el embalaje y el envío de productos</li>
        <li>Comunicar confirmaciones de pedidos y solicitudes de soporte</li>
        <li>Mejorar la funcionalidad del sitio web y la experiencia del usuario</li>
        <li>Analizar el rendimiento del sitio web utilizando Google Analytics</li>
        <li>Cumplir con obligaciones legales y regulatorias</li>
      </ul>
      <p>No ofrecemos pago contra reembolso. Todos los pagos deben completarse en línea.</p>

      <h2>6. Servicios de Terceros e Intercambio de Datos</h2>
      <p>Podemos compartir sus datos con terceros de confianza estrictamente para fines operativos, incluyendo:</p>
      <ul>
        <li>Procesadores de pago (pasarelas de pago en línea seguras)</li>
        <li>Socios de impresión y cumplimiento responsables de producir y enviar productos</li>
        <li>Proveedores de envío y logística</li>
        <li>Servicios de análisis como Google Analytics</li>
      </ul>
      <p>Estos socios reciben solo la información necesaria para realizar sus servicios y están obligados contractualmente a proteger sus datos.</p>

      <h2>7. Cookies y Análisis</h2>
      <p>Nuestro sitio web utiliza cookies y tecnologías similares para:</p>
      <ul>
        <li>Garantizar la funcionalidad esencial del sitio</li>
        <li>Medir el tráfico y los patrones de uso</li>
        <li>Mejorar el rendimiento y la experiencia del usuario</li>
      </ul>
      <p>Utilizamos Google Analytics para recopilar datos estadísticos anónimos. Puede desactivar las cookies a través de la configuración de su navegador, aunque algunas funciones pueden no funcionar correctamente.</p>

      <h2>8. Seguridad de los Datos</h2>
      <p>Utilizamos medidas de seguridad técnicas y organizativas adecuadas para salvaguardar sus datos personales. Todas las transferencias de datos ocurren a través de conexiones cifradas seguras (HTTPS).</p>

      <h2>9. Retención de Datos</h2>
      <p>Retenemos datos personales solo durante el tiempo necesario para cumplir con los fines descritos en esta política, incluidos los requisitos legales, contables y operativos.</p>

      <h2>10. Sus Derechos</h2>
      <p>Dependiendo de su ubicación, puede tener derecho a:</p>
      <ul>
        <li>Solicitar acceso a sus datos personales</li>
        <li>Solicitar corrección o eliminación</li>
        <li>Oponerse o restringir el procesamiento</li>
        <li>Solicitar la portabilidad de datos</li>
        <li>Retirar el consentimiento cuando corresponda</li>
      </ul>
      <p>Para ejercer cualquiera de estos derechos, contáctenos en support@folklorefc.com.</p>

      <h2>11. Privacidad de los Niños</h2>
      <p>Nuestro sitio web no está destinado a personas menores de 13 años (o 16 donde lo exija la ley local). No recopilamos datos personales de niños a sabiendas.</p>

      <h2>12. Cambios en Esta Política</h2>
      <p>Podemos actualizar esta Política de Privacidad de vez en cuando. Cualquier cambio se publicará en esta página con una fecha de revisión actualizada.</p>

      <h2>13. Contáctenos</h2>
      <p>Si tiene alguna pregunta sobre esta Política de Privacidad o nuestras prácticas de datos, contáctenos en: 📧 support@folklorefc.com</p>
    `
  },
  ja: {
    title: "プライバシーポリシー",
    lastUpdated: "最終更新日：2026年1月25日",
    content: `
      <h2>1. はじめに</h2>
      <p>Folklore FCへようこそ。私たちは、お客様のプライバシーを保護し、当社のウェブサイトを訪問または購入する際に個人データがどのように収集、使用、保護されるかについての透明性を確保することに尽力しています。</p>
      <p>当社のウェブサイトにアクセスまたは使用することにより、お客様はこのプライバシーポリシーに記載されている慣行に同意したものとみなされます。</p>

      <h2>2. 私たちについて</h2>
      <p>Folklore FCは、お客様の個人データの処理に責任を負います。</p>
      <p><strong>連絡先情報：</strong><br />
      メール：support@folklorefc.com<br />
      住所：Travessía Prat de la Riba, 91–95</p>

      <h2>3. サービス提供国</h2>
      <p>私たちは国際的に事業を展開しており、主に以下の国の顧客にサービスを提供しています：アメリカ合衆国（USA）、フランス（FR）、スペイン（ES）、日本（JP）、およびサウジアラビア（KSA）。</p>
      <p>お客様のデータは、該当する場合、GDPRを含む適用される国際データ保護法に従って処理される場合があります。</p>

      <h2>4. 収集する情報</h2>
      <p>私たちは、以下のカテゴリの個人データを収集および処理する場合があります：</p>
      <ul>
        <li><strong>本人確認データ：</strong> 氏名またはアカウント識別子</li>
        <li><strong>連絡先データ：</strong> メールアドレス、電話番号、請求先住所および配送先住所</li>
        <li><strong>注文および取引データ：</strong> 購入した製品、注文履歴、支払い状況</li>
        <li><strong>支払い情報：</strong> 支払いはサードパーティの支払いプロバイダーによって安全に処理されます。私たちはクレジットカードまたはデビットカードの詳細を保存しません</li>
        <li><strong>技術データ：</strong> IPアドレス、ブラウザタイプ、オペレーティングシステム、デバイス情報</li>
        <li><strong>利用データ：</strong> 訪問したページ、ウェブサイトとのやり取り</li>
      </ul>

      <h2>5. データの使用方法</h2>
      <p>私たちは、お客様の個人データを以下の目的で使用します：</p>
      <ul>
        <li>注文の処理と履行</li>
        <li>製品の印刷、梱包、出荷の手配</li>
        <li>注文確認およびサポートリクエストの連絡</li>
        <li>ウェブサイトの機能とユーザーエクスペリエンスの向上</li>
        <li>Google Analyticsを使用したウェブサイトのパフォーマンス分析</li>
        <li>法的および規制上の義務の遵守</li>
      </ul>
      <p>代金引換は提供しておりません。すべての支払いはオンラインで完了する必要があります。</p>

      <h2>6. 第三者サービスとデータ共有</h2>
      <p>私たちは、運用上の目的で厳密に信頼できる第三者とデータを共有する場合があります。これには以下が含まれます：</p>
      <ul>
        <li>決済処理業者（安全なオンライン決済ゲートウェイ）</li>
        <li>製品の製造および出荷を担当する印刷およびフルフィルメントパートナー</li>
        <li>配送および物流プロバイダー</li>
        <li>Google Analyticsなどの分析サービス</li>
      </ul>
      <p>これらのパートナーは、サービスを実行するために必要な情報のみを受け取り、データを保護する契約上の義務を負っています。</p>

      <h2>7. クッキーと分析</h2>
      <p>当社のウェブサイトでは、以下の目的でクッキーおよび類似の技術を使用しています：</p>
      <ul>
        <li>不可欠なサイト機能の確保</li>
        <li>トラフィックと使用パターンの測定</li>
        <li>パフォーマンスとユーザーエクスペリエンスの向上</li>
      </ul>
      <p>私たちはGoogle Analyticsを使用して、匿名の統計データを収集しています。ブラウザの設定でクッキーを無効にすることはできますが、一部の機能が正しく動作しない場合があります。</p>

      <h2>8. データセキュリティ</h2>
      <p>私たちは、個人データを保護するために適切な技術的および組織的なセキュリティ対策を講じています。すべてのデータ転送は、安全な暗号化接続（HTTPS）を介して行われます。</p>

      <h2>9. データ保持</h2>
      <p>私たちは、法的、会計的、および運用上の要件を含む、本ポリシーに記載された目的を達成するために必要な期間のみ、個人データを保持します。</p>

      <h2>10. お客様の権利</h2>
      <p>お住まいの地域によっては、以下の権利がある場合があります：</p>
      <ul>
        <li>個人データへのアクセス要求</li>
        <li>訂正または削除の要求</li>
        <li>処理への異議申し立てまたは制限</li>
        <li>データポータビリティの要求</li>
        <li>該当する場合の同意の撤回</li>
      </ul>
      <p>これらの権利を行使するには、support@folklorefc.comまでお問い合わせください。</p>

      <h2>11. 子供のプライバシー</h2>
      <p>当社のウェブサイトは、13歳（または現地の法律で義務付けられている場合は16歳）未満の個人を対象としていません。私たちは故意に子供から個人データを収集することはありません。</p>

      <h2>12. 本ポリシーの変更</h2>
      <p>私たちは、このプライバシーポリシーを随時更新する場合があります。変更があった場合は、このページに更新された改訂日とともに掲載されます。</p>

      <h2>13. お問い合わせ</h2>
      <p>このプライバシーポリシーまたは当社のデータ慣行についてご質問がある場合は、以下までお問い合わせください：📧 support@folklorefc.com</p>
    `
  }
};

export default function PrivacyPolicyPage() {
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
