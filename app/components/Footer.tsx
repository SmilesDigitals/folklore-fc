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
        terms: "Terms of Service",
        refund: "Refund Policy",
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
        terms: "شروط الخدمة",
        refund: "سياسة الاسترجاع",
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
        terms: "Conditions d'utilisation",
        refund: "Politique de remboursement",
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
        terms: "Términos de servicio",
        refund: "Política de reembolso",
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
        refund: "返金ポリシー",
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

                {/* Legal/Policies */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm text-emerald-500">{t.policies}</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href={`/${locale}/policies/privacy-policy`} className="hover:text-emerald-500 transition-colors">{t.privacy}</Link></li>
                        <li><Link href={`/${locale}/policies/terms-of-service`} className="hover:text-emerald-500 transition-colors">{t.terms}</Link></li>
                        <li><Link href={`/${locale}/policies/refund-policy`} className="hover:text-emerald-500 transition-colors">{t.refund}</Link></li>
                    </ul>
                </div>

                {/* Contact info summary */}
                <div className="space-y-4">
                    <h3 className="text-white font-bold uppercase tracking-widest text-sm text-emerald-500">{t.contact}</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li><Link href={`/${locale}/contact`} className="hover:text-emerald-500 transition-colors">{t.contact}</Link></li>
                        <li>support@folklorefc.com</li>
                        <li dir="ltr">0707230031</li>
                    </ul>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#27272a] flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
                <p>&copy; {new Date().getFullYear()} Folklore FC. {t.rights}</p>
                <p>Travessía Prat de la Riba, 91–95</p>
            </div>
        </footer>
    );
}
