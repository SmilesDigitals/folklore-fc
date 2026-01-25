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
      <p>Welcome to Folklore FC. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.</p>

      <h2>2. Important Information and Who We Are</h2>
      <p><strong>Controller</strong><br />Folklore FC is the controller and responsible for your personal data.</p>
      <p><strong>Contact Details</strong><br />
      Email address: support@folklorefc.com<br />
      Postal address: Travessía Prat de la Riba, 91–95</p>

      <h2>3. The Data We Collect About You</h2>
      <p>We may collect, use, store and transfer different kinds of personal data about you which we have grouped together follows:</p>
      <ul>
        <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
        <li><strong>Contact Data</strong> includes billing address, delivery address, email address and telephone numbers.</li>
        <li><strong>Financial Data</strong> includes payment card details (processed securely by our payment providers).</li>
        <li><strong>Transaction Data</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
      </ul>

      <h2>4. How We Use Your Personal Data</h2>
      <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
      <ul>
        <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
        <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
        <li>Where we need to comply with a legal or regulatory obligation.</li>
      </ul>

      <h2>5. Data Security</h2>
      <p>We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed.</p>

      <h2>6. Your Legal Rights</h2>
      <p>Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to access, correct, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.</p>
    `
    },
    ar: {
        title: "سياسة الخصوصية",
        lastUpdated: "آخر تحديث: 25 يناير 2026",
        content: `
      <h2>1. مقدمة</h2>
      <p>مرحبًا بك في Folklore FC. نحن نحترم خصوصيتك وملتزمون بحماية بياناتك الشخصية. ستخبرك سياسة الخصوصية هذه بكيفية تعاملنا مع بياناتك الشخصية عند زيارتك لموقعنا الإلكتروني (بغض النظر عن المكان الذي تزوره منه) وتخبرك بحقوق الخصوصية الخاصة بك وكيف يحميك القانون.</p>

      <h2>2. معلومات مهمة ومن نحن</h2>
      <p><strong>المراقب</strong><br />Folklore FC هي المتحكم والمسؤول عن بياناتك الشخصية.</p>
      <p><strong>بيانات الاتصال</strong><br />
      البريد الإلكتروني: support@folklorefc.com<br />
      العنوان البريدي: Travessía Prat de la Riba, 91–95</p>

      <h2>3. البيانات التي نجمعها عنك</h2>
      <p>قد نقوم بجمع واستخدام وتخزين ونقل أنواع مختلفة من البيانات الشخصية عنك والتي قمنا بتجميعها معًا على النحو التالي:</p>
      <ul>
        <li><strong>بيانات الهوية</strong> تشمل الاسم الأول والاسم الأخير واسم المستخدم أو معرف مشابه.</li>
        <li><strong>بيانات الاتصال</strong> تشمل عنوان إرسال الفواتير وعنوان التسليم وعنوان البريد الإلكتروني وأرقام الهواتف.</li>
        <li><strong>البيانات المالية</strong> تشمل تفاصيل بطاقة الدفع (تتم معالجتها بشكل آمن بواسطة مزودي الدفع لدينا).</li>
        <li><strong>بيانات المعاملات</strong> تشمل تفاصيل حول المدفوعات منك وإليك وتفاصيل أخرى للمنتجات والخدمات التي اشتريتها منا.</li>
      </ul>

      <h2>4. كيف نستخدم بياناتك الشخصية</h2>
      <p>سنستخدم بياناتك الشخصية فقط عندما يسمح لنا القانون بذلك. في الغالب، سنستخدم بياناتك الشخصية في الحالات التالية:</p>
      <ul>
        <li>عندما نحتاج إلى تنفيذ العقد الذي نحن بصدد إبرامه أو أبرمناه معك.</li>
        <li>حيث يكون ذلك ضروريًا لمصالحنا المشروعة (أو مصالح طرف ثالث) ولا تتجاوز مصالحك وحقوقك الأساسية تلك المصالح.</li>
        <li>عندما نحتاج إلى الامتثال لالتزام قانوني أو تنظيمي.</li>
      </ul>

      <h2>5. أمن البيانات</h2>
      <p>لقد وضعنا تدابير أمنية مناسبة لمنع فقدان بياناتك الشخصية عرضًا أو استخدامها أو الوصول إليها بطريقة غير مصرح بها أو تغييرها أو الكشف عنها.</p>

      <h2>6. حقوقك القانونية</h2>
      <p>في ظل ظروف معينة، لديك حقوق بموجب قوانين حماية البيانات فيما يتعلق ببياناتك الشخصية، بما في ذلك الحق في الوصول والتصحيح والمحو والتقييد والنقل والاعتراض على المعالجة وقابلية نقل البيانات (وحيث يكون الأساس القانوني للمعالجة هو الموافقة) سحب الموافقة.</p>
    `
    },
    fr: {
        title: "Politique de Confidentialité",
        lastUpdated: "Dernière mise à jour : 25 janvier 2026",
        content: `
      <h2>1. Introduction</h2>
      <p>Bienvenue chez Folklore FC. Nous respectons votre vie privée et nous nous engageons à protéger vos données personnelles. Cette politique de confidentialité vous informera de la manière dont nous traitons vos données personnelles lorsque vous visitez notre site web et vous informera de vos droits en matière de confidentialité et de la manière dont la loi vous protège.</p>

      <h2>2. Informations Importantes et Qui Nous Sommes</h2>
      <p><strong>Contrôleur</strong><br />Folklore FC est le contrôleur et responsable de vos données personnelles.</p>
      <p><strong>Coordonnées</strong><br />
      Adresse e-mail : support@folklorefc.com<br />
      Adresse postale : Travessía Prat de la Riba, 91–95</p>

      <h2>3. Les Données Que Nous Collectons Sur Vous</h2>
      <p>Nous pouvons collecter, utiliser, stocker et transférer différents types de données personnelles vous concernant :</p>
      <ul>
        <li><strong>Données d'Identité</strong> incluent le prénom, le nom, le nom d'utilisateur ou un identifiant similaire.</li>
        <li><strong>Données de Contact</strong> incluent l'adresse de facturation, l'adresse de livraison, l'adresse e-mail et les numéros de téléphone.</li>
        <li><strong>Données Financières</strong> incluent les détails de la carte de paiement (traités en toute sécurité par nos prestataires de paiement).</li>
        <li><strong>Données de Transaction</strong> incluent les détails des paiements de et vers vous et d'autres détails des produits et services que vous avez achetés chez nous.</li>
      </ul>

      <h2>4. Comment Nous Utilisons Vos Données Personnelles</h2>
      <p>Nous n'utiliserons vos données personnelles que lorsque la loi nous le permet. Le plus souvent, nous utiliserons vos données personnelles dans les circonstances suivantes :</p>
      <ul>
        <li>Lorsque nous devons exécuter le contrat que nous sommes sur le point de conclure ou que nous avons conclu avec vous.</li>
        <li>Lorsque cela est nécessaire pour nos intérêts légitimes (ou ceux d'un tiers) et que vos intérêts et droits fondamentaux ne l'emportent pas sur ces intérêts.</li>
        <li>Lorsque nous devons nous conformer à une obligation légale ou réglementaire.</li>
      </ul>
    `
    },
    es: {
        title: "Política de Privacidad",
        lastUpdated: "Última actualización: 25 de enero de 2026",
        content: `
      <h2>1. Introducción</h2>
      <p>Bienvenido a Folklore FC. Respetamos su privacidad y nos comprometemos a proteger sus datos personales. Esta política de privacidad le informará sobre cómo cuidamos sus datos personales cuando visita nuestro sitio web y le informará sobre sus derechos de privacidad y cómo la ley lo protege.</p>

      <h2>2. Información Importante y Quiénes Somos</h2>
      <p><strong>Controlador</strong><br />Folklore FC es el controlador y responsable de sus datos personales.</p>
      <p><strong>Detalles de Contacto</strong><br />
      Correo electrónico: support@folklorefc.com<br />
      Dirección postal: Travessía Prat de la Riba, 91–95</p>

      <h2>3. Los Datos Que Recopilamos Sobre Usted</h2>
      <p>Podemos recopilar, usar, almacenar y transferir diferentes tipos de datos personales sobre usted:</p>
      <ul>
        <li><strong>Datos de Identidad</strong> incluyen nombre, apellido, nombre de usuario o identificador similar.</li>
        <li><strong>Datos de Contacto</strong> incluyen dirección de facturación, dirección de entrega, dirección de correo electrónico y números de teléfono.</li>
      </ul>
    `
    },
    ja: {
        title: "プライバシーポリシー",
        lastUpdated: "最終更新日：2026年1月25日",
        content: `
      <h2>1. はじめに</h2>
      <p>Folklore FCへようこそ。私たちはあなたのプライバシーを尊重し、個人データを保護することに尽力しています。このプライバシーポリシーは、あなたが当社のウェブサイトを訪問した際の個人データの取り扱い方法、およびあなたのプライバシー権と法律があなたをどのように保護するかについて通知します。</p>

      <h2>2. 重要な情報と私たちについて</h2>
      <p><strong>管理者</strong><br />Folklore FCは、あなたの個人データの管理者であり責任者です。</p>
      <p><strong>連絡先詳細</strong><br />
      メールアドレス：support@folklorefc.com<br />
      住所：Travessía Prat de la Riba, 91–95</p>
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
