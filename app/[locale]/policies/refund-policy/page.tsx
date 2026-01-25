"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const LEGAL_TEXT: any = {
    en: {
        title: "Refund Policy",
        lastUpdated: "Last updated: January 25, 2026",
        content: `
      <h2>1. Returns</h2>
      <p>We accept returns within 30 days of the original purchase date. To be eligible for a return, your item must be unused, in the same condition that you received it, and in the original packaging.</p>

      <h2>2. Refunds</h2>
      <p>Once we receive your return, we will inspect it and notify you that we have received your returned item. We will immediately notify you on the status of your refund after inspecting the item.</p>
      <p>If your return is approved, we will initiate a refund to your credit card (or original method of payment). You will receive the credit within a certain amount of days, depending on your card issuer's policies.</p>

      <h2>3. Shipping</h2>
      <p>You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable.</p>

      <h2>4. Contact Us</h2>
      <p>If you have any questions on how to return your item to us, contact us at support@folklorefc.com.</p>
    `
    },
    ar: {
        title: "سياسة الاسترجاع",
        lastUpdated: "آخر تحديث: 25 يناير 2026",
        content: `
      <h2>1. الإرجاع</h2>
      <p>نقبل المرتجعات في غضون 30 يوماً من تاريخ الشراء الأصلي. لكي تكون مؤهلاً للإرجاع، يجب أن يكون العنصر الخاص بك غير مستخدم وفي نفس الحالة التي استلمته بها وفي العبوة الأصلية.</p>

      <h2>2. استرداد الأموال</h2>
      <p>بمجرد استلامنا للمرتجع، سنقوم بفحصه وإخطارك بأننا استلمنا العنصر المرتجع. سنخطرك على الفور بحالة استرداد الأموال بعد فحص العنصر.</p>
      <p>إذا تمت الموافقة على عودتك، فسوف نبدأ في رد الأموال إلى بطاقة الائتمان الخاصة بك (أو طريقة الدفع الأصلية). سوف تتلقى الرصيد في غضون عدد معين من الأيام، اعتماداً على سياسات مصدر بطاقتك.</p>

      <h2>3. الشحن</h2>
      <p>ستكون مسؤولاً عن دفع تكاليف الشحن الخاصة بك لإرجاع العنصر الخاص بك. تكاليف الشحن غير قابلة للاسترداد.</p>

      <h2>4. اتصل بنا</h2>
      <p>إذا كان لديك أي أسئلة حول كيفية إرجاع العنصر إلينا، اتصل بنا على support@folklorefc.com.</p>
    `
    },
    fr: {
        title: "Politique de Remboursement",
        lastUpdated: "Dernière mise à jour : 25 janvier 2026",
        content: `
      <h2>1. Retours</h2>
      <p>Nous acceptons les retours dans les 30 jours suivant la date d'achat initiale.</p>
      <h2>2. Remboursements</h2>
      <p>Une fois votre retour reçu et inspecté, nous vous informerons de l'approbation ou du rejet de votre remboursement.</p>
    `
    },
    es: {
        title: "Política de Reembolso",
        lastUpdated: "Última actualización: 25 de enero de 2026",
        content: `
      <h2>1. Devoluciones</h2>
      <p>Aceptamos devoluciones dentro de los 30 días posteriores a la fecha de compra original.</p>
      <h2>2. Reembolsos</h2>
      <p>Una vez que recibamos su devolución, la inspeccionaremos y le notificaremos el estado de su reembolso.</p>
    `
    },
    ja: {
        title: "返金ポリシー",
        lastUpdated: "最終更新日：2026年1月25日",
        content: `
      <h2>1. 返品</h2>
      <p>最初の購入日から30日以内の返品を受け付けます。</p>
      <h2>2. 返金</h2>
      <p>返品を受け取り検査した後、返金の状況をお知らせします。</p>
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
