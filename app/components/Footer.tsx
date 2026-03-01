"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Mail, Instagram, Facebook } from 'lucide-react';

const TikTokIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);

const footerTranslations = {
    en: {
        about: "About Us",
        shop: "Shop",
        policies: "Policies",
        privacy: "Privacy Policy",
        terms: "Terms & Conditions",
        refund: "Return & Refund Policy",
        shipping: "Shipping Policy",
        faq: "FAQ",
        contact: "Contact Us",
        rights: "All rights reserved.",
        description: "Merging football culture with traditional heritage.",
        subscribe: 'Subscribe',
        footerText: 'Exclusive deals, early access, and first look at new products.'
    },
    ar: {
        about: "من نحن",
        shop: "المتجر",
        policies: "السياسات",
        privacy: "سياسة الخصوصية",
        terms: "الشروط والأحكام",
        refund: "سياسة الاسترجاع والاسترداد",
        shipping: "سياسة الشحن",
        faq: "الأسئلة الشائعة",
        contact: "تواصل معنا",
        rights: "جميع الحقوق محفوظة.",
        description: "دمج ثقافة كرة القدم مع التراث التقليدي.",
        subscribe: 'اشتراك',
        footerText: 'عروض حصرية، وصول مبكر، ونظرة أولى على المنتجات الجديدة.'
    },
    fr: {
        about: "À propos",
        shop: "Boutique",
        policies: "Politiques",
        privacy: "Politique de confidentialité",
        terms: "Conditions générales",
        refund: "Politique de retour et remboursement",
        shipping: "Politique d'expédition",
        faq: "FAQ",
        contact: "Contactez-nous",
        rights: "Tous droits réservés.",
        description: "Fusionner la culture du football avec le patrimoine traditionnel.",
        subscribe: 'S\'abonner',
        footerText: 'Offres exclusives, accès anticipé et avant-premières.'
    },
    es: {
        about: "Sobre nosotros",
        shop: "Tienda",
        policies: "Políticas",
        privacy: "Política de privacidad",
        terms: "Términos y condiciones",
        refund: "Política de devoluciones y reembolsos",
        shipping: "Política de envíos",
        faq: "Preguntas frecuentes",
        contact: "Contáctenos",
        rights: "Todos los derechos reservados.",
        description: "Fusionando la cultura del fútbol con el patrimonio tradicional.",
        subscribe: 'Suscribirse',
        footerText: 'Ofertas exclusivas, acceso anticipado y novedades.'
    },
    ja: {
        about: "私たちについて",
        shop: "ショップ",
        policies: "ポリシー",
        privacy: "プライバシーポリシー",
        terms: "利用規約",
        refund: "返品・返金ポリシー",
        shipping: "配送ポリシー",
        faq: "よくある質問",
        contact: "お問い合わせ",
        rights: "全著作権所有。",
        description: "サッカー文化と伝統的な遺産を融合させる。",
        subscribe: '購読する',
        footerText: '限定セール、早期アクセス、新製品の先行公開.'
    }
};

export default function Footer() {
    const params = useParams();
    const locale = (params?.locale as string) || 'en';
    const t = footerTranslations[locale as keyof typeof footerTranslations] || footerTranslations.en;
    const isRtl = locale === 'ar';

    const [redirectUrl, setRedirectUrl] = useState('');

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setRedirectUrl(`${window.location.origin}/${locale}/thank-you`);
        }
    }, [locale]);

    return (
        <footer className="bg-[#09090b] border-t border-[#27272a] py-12 px-6 mt-12 text-white" dir={isRtl ? 'rtl' : 'ltr'}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

                {/* Brand Column + Subscribe + Socials */}
                <div className="space-y-6">
                    <Link href={`/${locale}`} className="text-2xl font-black tracking-tighter text-white">
                        FOLKLORE FC
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        {t.description}
                    </p>

                    {/* Subscribe Form */}
                    <div className="space-y-3 pt-2">
                        <p className="text-gray-400 text-xs">
                            {t.footerText}
                        </p>
                        <form
                            className="flex flex-col gap-3"
                            action="https://formspree.io/f/mnnezrpv"
                            method="POST"
                        >
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                                <input type="hidden" name="_next" value={redirectUrl} />
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Email Address"
                                    className="w-full bg-[#18181b] border border-[#27272a] rounded-lg py-2.5 pl-9 pr-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 transition-all"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-white text-black font-bold py-2.5 px-4 rounded-lg hover:bg-emerald-500 hover:text-white transition-all text-sm w-full"
                            >
                                {t.subscribe}
                            </button>
                        </form>
                    </div>

                    {/* Social Icons */}
                    <div className="flex gap-4 pt-2">
                        <a href="https://www.instagram.com/folklorefc.official/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
                            <Instagram size={18} />
                        </a>
                        <a href="https://www.facebook.com/profile.php?id=61586932982800" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
                            <Facebook size={18} />
                        </a>
                        <a href="https://tiktok.com/@folklorefc" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-all">
                            <TikTokIcon className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Shop Links */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm text-emerald-500">{t.shop}</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href={`/${locale}/shop/men`} className="hover:text-emerald-500 transition-colors">Men</Link></li>
                        <li><Link href={`/${locale}/shop/women`} className="hover:text-emerald-500 transition-colors">Women</Link></li>
                    </ul>
                </div>

                <div className="space-y-4">
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm text-emerald-500">{t.policies}</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href={`/${locale}/policies/privacy-policy`} className="hover:text-emerald-500 transition-colors">{t.privacy}</Link></li>
                        <li><Link href={`/${locale}/policies/terms-of-service`} className="hover:text-emerald-500 transition-colors">{t.terms}</Link></li>
                        <li><Link href={`/${locale}/policies/refund-policy`} className="hover:text-emerald-500 transition-colors">{t.refund}</Link></li>
                        <li><Link href={`/${locale}/policies/shipping-policy`} className="hover:text-emerald-500 transition-colors">{t.shipping}</Link></li>
                        <li><Link href={`/${locale}/faq`} className="hover:text-emerald-500 transition-colors">{t.faq}</Link></li>
                        <li><Link href={`/${locale}/about`} className="hover:text-emerald-500 transition-colors">{t.about}</Link></li>
                    </ul>
                </div>

                {/* Contact info summary */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm text-emerald-500">{t.contact}</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href={`/${locale}/contact`} className="hover:text-emerald-500 transition-colors">{t.contact}</Link></li>
                        <li>support@folklorefc.com</li>
                        <li dir="ltr">+212707230031</li>
                    </ul>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#27272a] flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-6">
                <p className="text-center md:text-left">&copy; {new Date().getFullYear()} Folklore FC. {t.rights}</p>
                <div className="flex items-center gap-3">
                    {/* Visa */}
                    <svg className="h-6 w-auto" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="20" rx="4" fill="#18181b" stroke="#27272a" /><path d="M12.8 14H11.2L12.2 7.6H13.8L12.8 14ZM21.9 8.2C21.6 8 21.1 7.8 20.3 7.8C18.7 7.8 17.5 8.7 17.5 10C17.5 11 18.5 11.5 19.3 11.9C20.1 12.3 20.3 12.6 20.3 12.9C20.3 13.5 19.5 13.8 18.8 13.8C17.8 13.8 17.3 13.5 16.7 13.2L16.4 13L16.2 14.3C16.8 14.6 17.7 14.8 18.6 14.8C20.4 14.8 21.6 13.9 21.6 12.5C21.6 11 19.6 10.9 19.6 10.1C19.6 9.8 20 9.4 20.7 9.4C21.2 9.4 21.7 9.5 22 9.7L22.1 9.8L22.4 8.4L21.9 8.2ZM16.9 7.6H15.6C15 7.6 14.6 7.9 14.4 8.5L12.4 14H14.1L14.4 13H16.4L16.6 14H18.1L16.9 7.6ZM14.9 11.7L15.6 9.5L16.1 11.7H14.9ZM25.5 7.6H24.3L22.6 14H24.2L24.5 12.6H26.3L26.5 14H28L25.5 7.6ZM24.8 11.3L25.4 8.9L26 11.3H24.8Z" fill="white" /></svg>
                    {/* Mastercard */}
                    <svg className="h-6 w-auto" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="20" rx="4" fill="#18181b" stroke="#27272a" /><circle cx="12" cy="10" r="4.5" fill="#FF5F00" /><circle cx="18" cy="10" r="4.5" fill="#EB001B" /><path d="M15 13.3C14.1 12.6 13.5 11.4 13.5 10C13.5 8.6 14.1 7.4 15 6.7C15.9 7.4 16.5 8.6 16.5 10C16.5 11.4 15.9 12.6 15 13.3Z" fill="#F79E1B" /></svg>
                    {/* PayPal */}
                    <svg className="h-6 w-auto" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="20" rx="4" fill="#18181b" stroke="#27272a" /><path d="M11.6 15H10.1L11.6 5.5H15.9C17.7 5.5 18.8 6.4 18.5 8.1C18.2 10.3 16.6 11.2 14.7 11.2H13.5L12.9 11.2L12.2 15H11.6ZM13.8 10.3H14.5C15.8 10.3 16.8 9.8 17 8.3C17.2 7.3 16.4 6.4 15.2 6.4H12.8L12.3 9.4L13.8 10.3Z" fill="#003087" /><path d="M14.7 11.2H13.5L12.9 11.2L11.8 18H13.2L13.6 15H15.4C17.1 15 18.1 14.1 18.4 12.4C18.6 11.6 18.2 11.2 17.5 11.2C16.3 11.2 15 11.2 14.7 11.2Z" fill="#0079C1" /></svg>
                </div>
                <p className="text-center md:text-right">Travessía Prat de la Riba, 91-95, 08849<br /> Sant Climent de Llobregat, Barcelona, Spain</p>
            </div>
        </footer>
    );
}
