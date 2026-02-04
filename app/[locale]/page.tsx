'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { products } from '../../lib/products';
import { STORE_LOCKED } from '../../lib/config';
import Waitlist from '../components/Waitlist';
import Navbar from '../components/Navbar'; // ✅ Import new Navbar
import { Product } from '../../types';

// ✅ القاموس الكامل لجميع اللغات المستهدفة
const TRANSLATIONS: any = {
  en: {
    topBar: 'Free Worldwide Shipping 🌍 | Buy 2 items, Get 10% OFF!',
    home: 'Home', about: 'About', cart: 'Cart', signIn: 'Sign In', blog: 'Blog',
    heroTitle: 'FOR THE\nCULTURE.',
    heroSubtitle: 'Folklore FC merges heritage with modern streetwear aesthetics.',
    shopCollection: 'Shop Collection', rights: 'All rights reserved.',
    subscribe: 'Subscribe', footerText: 'Exclusive deals, early access, and first look at new products.',
    pitchSide: 'The Pitchside', ourStory: 'Our Story', readStory: 'Read our full story',
    aboutText: 'Folklore FC was born from the streets, not the boardroom.',
    shop: 'Shop', help: 'Help', shipping: 'Shipping & Returns', contact: 'Contact Us', faq: 'FAQ',
    men: 'MEN', women: 'WOMEN', kids: 'KIDS', showAll: 'Show All', newArrivals: 'New Arrivals'
  },
  ar: {
    topBar: 'شحن مجاني لجميع دول العالم 🌍 | اشتري قطعتين واحصل على خصم 10%!',
    home: 'الرئيسية', about: 'من نحن', cart: 'السلة', signIn: 'دخول', blog: 'المدونة',
    heroTitle: 'لأجل\nالثقافة.',
    heroSubtitle: 'فولكلور إف سي يجمع بين التراث وجماليات أزياء الشارع الحديثة.',
    shopCollection: 'تصفح المجموعة', rights: 'جميع الحقوق محفوظة.',
    subscribe: 'اشتراك', footerText: 'عروض حصرية، وصول مبكر، ونظرة أولى على المنتجات الجديدة.',
    pitchSide: 'من أرض الملعب', ourStory: 'قصتنا', readStory: 'اقرأ قصتنا الكاملة',
    aboutText: 'ولد فولكلور إف سي من الشوارع، وليس من قاعات الاجتماعات.',
    shop: 'المتجر', help: 'المساعدة', shipping: 'الشحن والاسترجاع', contact: 'تواصل معنا', faq: 'الأسئلة الشائعة',
    men: 'رجال', women: 'نساء', kids: 'أطفال', showAll: 'عرض الكل', newArrivals: 'وصل حديثاً'
  },
  es: {
    topBar: 'Envío gratuito a todo el mundo 🌍 | ¡Compra 2 artículos, 10% DTO!',
    home: 'Inicio', about: 'Sobre Nosotros', cart: 'Carrito', signIn: 'Entrar', blog: 'Blog',
    heroTitle: 'PARA LA\nCULTURA.',
    heroSubtitle: 'Folklore FC fusiona la herencia con la estética del streetwear moderno.',
    shopCollection: 'Comprar Colección', rights: 'Todos los derechos reservados.',
    subscribe: 'Suscribirse', footerText: 'Ofertas exclusivas, acceso anticipado y novedades.',
    pitchSide: 'Desde el Campo', ourStory: 'Nuestra Historia', readStory: 'Leer nuestra historia',
    aboutText: 'Folklore FC nació en las calles, no en los despachos.',
    shop: 'Tienda', help: 'Ayuda', shipping: 'Envío y Devoluciones', contact: 'Contacto', faq: 'FAQ',
    men: 'HOMBRE', women: 'MUJER', kids: 'NIÑOS', showAll: 'Ver Todo', newArrivals: 'Novedades'
  },
  ja: {
    topBar: '全世界送料無料 🌍 | 2点購入で10%OFF!',
    home: 'ホーム', about: '私たちについて', cart: 'カート', signIn: 'ログイン', blog: 'ブログ',
    heroTitle: 'カルチャーの\nために。',
    heroSubtitle: 'Folklore FCは、ヘリテージと現代のストリートウェアの美学を融合させます。',
    shopCollection: 'コレクションを見る', rights: '不許複製・無断転載を禁じます.',
    subscribe: '購読する', footerText: '限定セール、早期アクセス、新製品の先行公開.',
    pitchSide: 'ピッチサイド', ourStory: 'ストーリー', readStory: '全ストーリーを読む',
    aboutText: 'Folklore FCは会議室ではなく、ストリートから生まれました.',
    shop: 'ショップ', help: 'ヘルプ', shipping: '配送と返品', contact: 'お問い合わせ', faq: 'よくある質問',
    men: 'メンズ', women: 'レディース', kids: 'キッズ', showAll: 'すべて見る', newArrivals: '新着商品'
  },
  fr: {
    topBar: 'Livraison gratuite dans le monde 🌍 | -10% pour 2 articles !',
    home: 'Accueil', about: 'À Propos', cart: 'Panier', signIn: 'Connexion', blog: 'Blog',
    heroTitle: 'POUR LA\nCULTURE.',
    heroSubtitle: 'Folklore FC fusionne l\'héritage avec l\'esthétique moderne du streetwear.',
    shopCollection: 'Acheter la Collection', rights: 'Tous droits réservés.',
    subscribe: 'S\'abonner', footerText: 'Offres exclusives, accès anticipé et avant-premières.',
    pitchSide: 'Le Pitchside', ourStory: 'Notre Histoire', readStory: 'Lire notre histoire',
    aboutText: 'Folklore FC est né dans la rue, pas dans une salle de réunion.',
    shop: 'Boutique', help: 'Aide', shipping: 'Livraison & Retours', contact: 'Contact', faq: 'FAQ',
    men: 'HOMMES', women: 'FEMMES', kids: 'ENFANTS', showAll: 'Voir Tout', newArrivals: 'Nouveautés'
  }
};

// ✅ المكون الذي تم تعديله لعرض السعر المزدوج
const ProductCard = ({ product, locale }: { product: Product, locale: string }) => {
  return (
    <div className="group relative">
      {/* ✅ تغليف حاوية الصورة بالكامل برابط */}
      <Link href={`/${locale}/product/${product.id}`} className="cursor-pointer">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#18181b] border border-[#27272a]">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {product.isNew && (<span className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1 rounded">NEW SEASON</span>)}

          {/* تم تغيير الرابط الداخلي للسهم إلى div لتجنب تداخل الروابط (Nested Links) وهو خطأ برمي */}
          <div className="absolute bottom-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <div className="flex items-center justify-center bg-white text-black w-10 h-10 rounded-full shadow-lg hover:bg-emerald-400 transition-colors">
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-bold text-white">
            <Link href={`/${locale}/product/${product.id}`}>{product.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-gray-400">{product.category || 'Football Kit'}</p>
        </div>

        {/* قسم التسعير المزدوج المطور */}
        <div className="text-right">
          <div className="flex items-center justify-end gap-1">
            <span className="text-sm font-bold text-emerald-400">${product.price}</span>
            <span className="text-sm text-gray-500 uppercase">USD</span>
          </div>

          {product.currency === 'USD' && (
            <p className="text-[10px] text-zinc-600 italic font-medium mt-0.5">
              {(() => {
                if (product.region === 'ar') return `≈ ${(product.price * 3.75).toFixed(0)} SAR`;
                if (product.region === 'ja') return `≈ ${(product.price * 150).toLocaleString()} JPY`;
                if (product.region === 'fr' || product.region === 'es') return `≈ ${(product.price * 0.92).toFixed(2)} EUR`;
                return '';
              })()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const CategorySection = ({ title, products, locale, t, id, categoryKey }: { title: string, products: Product[], locale: string, t: any, id?: string, categoryKey: string }) => {
  return (
    <section id={id} className="py-20 bg-[#09090b] border-t border-[#27272a]">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase">{title}</h2>
          {/* رابط صغير في الأعلى للشاشات الكبيرة */}
          <Link href={`/${locale}/shop/${categoryKey}`} className="hidden sm:flex items-center text-sm font-medium text-emerald-500 hover:text-emerald-400 gap-1 transition-colors">
            {t.showAll} <ArrowRight size={16} />
          </Link>
        </div>

        {/* شبكة المنتجات */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>

        {/* ✅ الزر الذي كان مفقوداً: Show All Button في الأسفل */}
        <div className="mt-16 text-center">
          <Link
            href={`/${locale}/shop/${categoryKey}`}
            className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold py-4 px-12 rounded-full hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg group"
          >
            {t.showAll}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default function HomePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';

  if (STORE_LOCKED) { return <Waitlist />; }

  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];
  const regionProducts = products.filter(p => !p.region || p.region === locale);
  const menProducts = regionProducts.filter(p => p.gender === 'men' || !p.gender);
  const womenProducts = regionProducts.filter(p => p.gender === 'women');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#09090b] text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar t={t} locale={locale} />
      <main className="flex-grow pt-[32px]">
        {/* Banner Section */}
        <section className="relative h-[90vh] w-full bg-black overflow-hidden">
          <img src="/images/home1.webp" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/40 to-transparent opacity-90" />
          <div className="relative h-full w-[90%] mx-auto flex flex-col justify-end pb-24 sm:pb-32">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 whitespace-pre-line">{t.heroTitle}</h1>
            <p className="text-xl text-gray-300 max-w-xl mb-8 leading-relaxed">{t.heroSubtitle}</p>
            <button className="bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-gray-200 transition-all w-fit" onClick={() => document.getElementById('men-section')?.scrollIntoView({ behavior: 'smooth' })}>
              {t.shopCollection}
            </button>
          </div>
        </section>

        <CategorySection id="men-section" title={t.men} products={menProducts} locale={locale} t={t} categoryKey="men" />
        <CategorySection id="women-section" title={t.women} products={womenProducts} locale={locale} t={t} categoryKey="women" />
      </main>
    </div>
  );
}