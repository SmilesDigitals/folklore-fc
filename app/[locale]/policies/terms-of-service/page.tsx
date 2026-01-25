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
      <p>By accessing our website at Folklore FC, you agree to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.</p>

      <h2>2. Use License</h2>
      <p>Permission is granted to temporarily download one copy of the materials (information or software) on Folklore FC's website for personal, non-commercial transitory viewing only.</p>

      <h2>3. Disclaimer</h2>
      <p>The materials on Folklore FC's website are provided on an 'as is' basis. Folklore FC makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>

      <h2>4. Limitations</h2>
      <p>In no event shall Folklore FC or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Folklore FC's website.</p>

      <h2>5. Governing Law</h2>
      <p>These terms and conditions are governed by and construed in accordance with the laws of Spain and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.</p>

      <h2>6. Contact Us</h2>
      <p>If you have any questions about these Terms, please contact us at support@folklorefc.com.</p>
    `
    },
    ar: {
        title: "شروط الخدمة",
        lastUpdated: "آخر تحديث: 25 يناير 2026",
        content: `
      <h2>1. الموافقة على الشروط</h2>
      <p>من خلال الوصول إلى موقعنا الإلكتروني Folklore FC، فإنك توافق على الالتزام بشروط الخدمة هذه، وجميع القوانين واللوائح المعمول بها، وتوافق على أنك مسؤول عن الامتثال لأي قوانين محلية معمول بها.</p>

      <h2>2. ترخيص الاستخدام</h2>
      <p>يتم منح الإذن لتنزيل نسخة واحدة مؤقتاً من المواد (المعلومات أو البرامج) على موقع Folklore FC للمشاهدة الشخصية العابرة غير التجارية فقط.</p>

      <h2>3. إخلاء المسؤولية</h2>
      <p>يتم توفير المواد الموجودة على موقع Folklore FC "كما هي". لا تقدم Folklore FC أي ضمانات، صريحة أو ضمنية، وتنفي وتلغي بموجب هذا جميع الضمانات الأخرى بما في ذلك، دون حصر، الضمانات الضمنية أو شروط التسويق أو الملاءمة لغرض معين.</p>

      <h2>4. القيود</h2>
      <p>لن تكون Folklore FC أو موردوها مسؤولين بأي حال من الأحوال عن أي أضرار (بما في ذلك، دون حصر، الأضرار الناجمة عن فقدان البيانات أو الربح، أو بسبب انقطاع الأعمال) الناشئة عن استخدام أو عدم القدرة على استخدام المواد على موقع Folklore FC.</p>

      <h2>5. القانون الحاكم</h2>
      <p>تخضع هذه الشروط والأحكام وتفسر وفقاً لقوانين إسبانيا وتخضع أنت بشكل لا رجعة فيه للاختصاص القضائي الحصري للمحاكم في تلك الدولة أو الموقع.</p>

      <h2>6. تواصل معنا</h2>
      <p>إذا كان لديك أي أسئلة حول هذه الشروط، يرجى الاتصال بنا على support@folklorefc.com.</p>
    `
    },
    // Add other languages essentially defaulting to English structure for brevity but localized
    fr: {
        title: "Conditions d'Utilisation",
        lastUpdated: "Dernière mise à jour : 25 janvier 2026",
        content: `
      <h2>1. Accord aux Conditions</h2>
      <p>En accédant à notre site web Folklore FC, vous acceptez d'être lié par ces conditions d'utilisation, toutes les lois et réglementations applicables.</p>
      <h2>2. Loi Applicable</h2>
      <p>Ces termes et conditions sont régis et interprétés conformément aux lois de l'Espagne.</p>
    `
    },
    es: {
        title: "Términos de Servicio",
        lastUpdated: "Última actualización: 25 de enero de 2026",
        content: `
      <h2>1. Acuerdo de Términos</h2>
      <p>Al acceder a nuestro sitio web Folklore FC, usted acepta estar sujeto a estos términos de servicio.</p>
      <h2>2. Ley Aplicable</h2>
      <p>Estos términos y condiciones se rigen e interpretan de acuerdo con las leyes de España.</p>
    `
    },
    ja: {
        title: "利用規約",
        lastUpdated: "最終更新日：2026年1月25日",
        content: `
      <h2>1. 規約への同意</h2>
      <p>Folklore FCのウェブサイトにアクセスすることにより、お客様はこれらの利用規約、すべての適用される法律および規制に拘束されることに同意するものとします。</p>
      <h2>2. 準拠法</h2>
      <p>これらの利用規約は、スペインの法律に準拠し、解釈されます。</p>
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
