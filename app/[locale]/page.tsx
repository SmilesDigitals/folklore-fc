'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ShoppingBag, Menu, X, Instagram, Facebook, Mail, 
  ArrowRight, Star, ShieldCheck, Truck 
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../../lib/products';
import { STORE_LOCKED } from '../../lib/config';
import Waitlist from '../components/Waitlist';

// --- القاموس ---
const TRANSLATIONS: any = {
  en: {
    home: 'Home', about: 'About', cart: 'Cart', signIn: 'Sign In',
    heroTitle: 'FOR THE\nCULTURE.',
    heroSubtitle: 'Folklore FC merges heritage with modern streetwear aesthetics.',
    shopCollection: 'Shop Collection', rights: 'All rights reserved.',
    subscribe: 'Subscribe', footerText: 'Exclusive deals, early access, and first look at new products.',
    pitchSide: 'The Pitchside', ourStory: 'Our Story', readStory: 'Read our full story',
    aboutText: 'Folklore FC was born from the streets, not the boardroom. We believe in the power of the beautiful game to unite cultures and tell stories.',
    shop: 'Shop', help: 'Help', shipping: 'Shipping & Returns', contact: 'Contact Us', faq: 'FAQ',
    men: 'MEN', women: 'WOMEN', kids: 'KIDS', showAll: 'Show All', newArrivals: 'New Arrivals'
  },
  ar: {
    home: 'الرئيسية', about: 'من نحن', cart: 'السلة', signIn: 'دخول',
    heroTitle: 'لأجل\nالثقافة.',
    heroSubtitle: 'فولكلور إف سي يجمع بين التراث وجماليات أزياء الشارع الحديثة.',
    shopCollection: 'تصفح المجموعة', rights: 'جميع الحقوق محفوظة.',
    subscribe: 'اشتراك', footerText: 'عروض حصرية، وصول مبكر، ونظرة أولى على المنتجات الجديدة.',
    pitchSide: 'من أرض الملعب', ourStory: 'قصتنا', readStory: 'اقرأ قصتنا الكاملة',
    aboutText: 'ولد فولكلور إف سي من الشوارع، وليس من قاعات الاجتماعات. نحن نؤمن بقوة اللعبة الجميلة لتوحيد الثقافات ورواية القصص.',
    shop: 'المتجر', help: 'المساعدة', shipping: 'الشحن والاسترجاع', contact: 'تواصل معنا', faq: 'الأسئلة الشائعة',
    men: 'رجال', women: 'نساء', kids: 'أطفال', showAll: 'عرض الكل', newArrivals: 'وصل حديثاً'
  },
  fr: { men: 'HOMMES', women: 'FEMMES', kids: 'ENFANTS', showAll: 'Voir Tout', home: 'Accueil', about: 'À Propos', cart: 'Panier', signIn: 'Connexion', heroTitle: 'POUR LA\nCULTURE.', heroSubtitle: 'Folklore FC fusionne héritage et esthétique streetwear.', shopCollection: 'Voir la Collection', rights: 'Tous droits réservés.', subscribe: 'S\'abonner', footerText: 'Offres exclusives et accès anticipé.', pitchSide: 'Le Terrain', ourStory: 'Notre Histoire', readStory: 'Lire notre histoire', aboutText: 'Folklore FC est né de la rue...', shop: 'Boutique', help: 'Aide', shipping: 'Livraison', contact: 'Contactez-nous', faq: 'FAQ' },
  es: { men: 'HOMBRES', women: 'MUJERES', kids: 'NIÑOS', showAll: 'Ver Todo', home: 'Inicio', about: 'Nosotros', cart: 'Carrito', signIn: 'Ingresar', heroTitle: 'POR LA\nCULTURA.', heroSubtitle: 'Folklore FC fusiona la herencia con la estética moderna.', shopCollection: 'Ver Colección', rights: 'Todos los derechos reservados.', subscribe: 'Suscribirse', footerText: 'Ofertas exclusivas.', pitchSide: 'El Campo', ourStory: 'Nuestra Historia', readStory: 'Leer historia', aboutText: 'Folklore FC nació en las calles...', shop: 'Tienda', help: 'Ayuda', shipping: 'Envíos', contact: 'Contacto', faq: 'FAQ' },
  ja: { men: 'メンズ', women: 'レディース', kids: 'キッズ', showAll: 'すべて見る', home: 'ホーム', about: 'アバウト', cart: 'カート', signIn: 'ログイン', heroTitle: '文化の\nために。', heroSubtitle: 'Folklore FCは伝統とモダンを融合。', shopCollection: 'コレクションを見る', rights: '全著作権所有。', subscribe: '登録', footerText: '限定セール。', pitchSide: 'ピッチサイド', ourStory: '私たちの物語', readStory: '全文を読む', aboutText: 'Folklore FCはストリートから生まれました...', shop: 'ショップ', help: 'ヘルプ', shipping: '配送', contact: 'お問い合わせ', faq: 'FAQ' }
};

interface Product {
  id: string;
  name: string;
  price: number;
  category?: string;
  image: string;
  isNew?: boolean;
  locale?: string;
  region?: string;
  currency?: string;
  gender?: string;
  reviews?: any[];
}

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg>
);

const Navbar = ({ t, locale }: { t: any, locale: string }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { items, toggleCart } = useCart();
  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 20); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#09090b]/90 backdrop-blur-md shadow-sm border-b border-[#27272a] py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="text-2xl font-black tracking-tighter text-white">FOLKLORE FC</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">{t.home}</button>
            <button onClick={() => document.getElementById('men-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">{t.men}</button>
            <button onClick={() => document.getElementById('women-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">{t.women}</button>
            <button onClick={() => document.getElementById('kids-section')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">{t.kids}</button>
            <Link href={`/${locale}/about`} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">{t.about}</Link>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={toggleCart} className="relative text-white hover:opacity-70 transition-colors">
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full">{cartCount}</span>
              )}
            </button>
            <button onClick={() => alert("Coming Soon!")} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all bg-white text-black hover:bg-gray-200">
              {t.signIn}
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white">
               {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#09090b] border-t border-[#27272a] absolute w-full shadow-lg z-50">
          <div className="px-4 pt-2 pb-6 space-y-4">
            <button onClick={() => {document.getElementById('men-section')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false);}} className="block w-full text-left py-2 text-base font-medium text-white">{t.men}</button>
            <button onClick={() => {document.getElementById('women-section')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false);}} className="block w-full text-left py-2 text-base font-medium text-white">{t.women}</button>
            <button onClick={() => {document.getElementById('kids-section')?.scrollIntoView({ behavior: 'smooth' }); setIsMobileMenuOpen(false);}} className="block w-full text-left py-2 text-base font-medium text-white">{t.kids}</button>
            <Link href={`/${locale}/about`} className="block w-full text-left py-2 text-base font-medium text-white">{t.about}</Link>
            <div onClick={() => { toggleCart(); setIsMobileMenuOpen(false); }} className="border-t border-[#27272a] pt-4 flex items-center justify-between cursor-pointer">
              <span className="text-sm font-medium text-gray-400">{t.cart} ({cartCount})</span>
              <ShoppingBag size={20} className="text-white"/>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = ({ t, locale }: { t: any, locale: string }) => {
  const [redirectUrl, setRedirectUrl] = useState('');
  useEffect(() => {
     if (typeof window !== 'undefined') {
       setRedirectUrl(`${window.location.origin}/${locale}/thank-you`);
     }
  }, [locale]);
  return (
    <footer className="bg-[#09090b] text-white py-16 border-t border-[#27272a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          <div className="lg:col-span-6 space-y-8">
            <h2 className="text-3xl font-black tracking-tighter">FOLKLORE FC</h2>
            <p className="text-gray-400 text-lg max-w-md leading-relaxed">{t.footerText}</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md" action="https://formspree.io/f/mnnezrpv" method="POST">
              <input type="hidden" name="_next" value={redirectUrl} />
              <div className="relative flex-grow">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input type="email" name="email" required placeholder="Email" className="w-full bg-[#18181b] border border-[#27272a] rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"/>
              </div>
              <button className="bg-white text-black font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors">{t.subscribe}</button>
            </form>
          </div>

          <div className="lg:col-span-3 lg:col-start-8">
            <h3 className="font-bold text-lg mb-6 text-white">{t.shop}</h3>
            <ul className="space-y-4 text-gray-400">
              <li><button onClick={() => document.getElementById('men-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">{t.men}</button></li>
              <li><button onClick={() => document.getElementById('women-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">{t.women}</button></li>
              <li><button onClick={() => document.getElementById('kids-section')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-white transition-colors">{t.kids}</button></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
             <h3 className="font-bold text-lg mb-6 text-white">{t.help}</h3>
            <ul className="space-y-4 text-gray-400">
              <li><Link href={`/${locale}/shipping`} className="hover:text-white transition-colors">{t.shipping}</Link></li>
              <li><Link href={`/${locale}/contact`} className="hover:text-white transition-colors">{t.contact}</Link></li>
              <li><Link href={`/${locale}/faq`} className="hover:text-white transition-colors">{t.faq}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#27272a] mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center space-x-6">
            <Instagram size={24} className="text-gray-400 hover:text-white cursor-pointer" />
            <TikTokIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            <Facebook size={24} className="text-gray-400 hover:text-white cursor-pointer" />
          </div>
          <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} Folklore FC. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
};

const ProductCard = ({ product, locale }: { product: Product, locale: string }) => {
  return (
    <div className="group relative">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#18181b] border border-[#27272a]">
        <img src={product.image} alt={product.name} className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105" loading="lazy"/>
        {product.isNew && ( <span className="absolute top-3 left-3 bg-white text-black text-xs font-bold px-2 py-1 rounded">NEW SEASON</span> )}
        <div className="absolute bottom-4 right-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <Link href={`/${locale}/product/${product.id}`} className="flex items-center justify-center bg-white text-black w-10 h-10 rounded-full shadow-lg hover:bg-emerald-400 transition-colors">
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-bold text-white">
            <Link href={`/${locale}/product/${product.id}`}><span aria-hidden="true" className="absolute inset-0" />{product.name}</Link>
          </h3>
          <p className="mt-1 text-sm text-gray-400">{product.category || 'Football Kit'}</p>
        </div>
        <p className="text-sm font-bold text-emerald-400">{product.price} <span className="text-xs text-gray-500">{product.currency || 'USD'}</span></p>
      </div>
    </div>
  );
};

// --- مكون الفئة مع زر Show All السفلي ---
const CategorySection = ({ title, products, locale, t, id, categoryKey }: { title: string, products: Product[], locale: string, t: any, id?: string, categoryKey: string }) => {
  return (
    <section id={id} className="py-20 bg-[#09090b] border-t border-[#27272a]">
      <div className="w-[90%] mx-auto">
        <div className="flex justify-between items-end mb-12">
          <h2 className="text-4xl font-black tracking-tighter text-white uppercase">{title}</h2>
        </div>

        {/* شبكة المنتجات */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
        
        {/* زر Show All الكبير في الأسفل */}
        <div className="mt-16 text-center">
           <Link 
             href={`/${locale}/shop/${categoryKey}`} 
             className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold py-4 px-12 rounded-full hover:bg-emerald-500 hover:text-white transition-all transform hover:-translate-y-1 shadow-lg"
           >
             {t.showAll} <ArrowRight size={20}/>
           </Link>
        </div>
      </div>
    </section>
  );
};

// --- Main Page Component ---
export default function HomePage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  
  if (STORE_LOCKED) {
    return <Waitlist />;
  }

  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];

  // تصفية المنتجات حسب المنطقة
  const regionProducts = products.filter(p => !p.region || p.region === locale);

  const menProducts = regionProducts.filter(p => p.gender === 'men' || !p.gender); 
  const womenProducts = regionProducts.filter(p => p.gender === 'women');
  const kidsProducts = regionProducts.filter(p => p.gender === 'kids');

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#09090b] text-white" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Navbar t={t} locale={locale} />

      <main className="flex-grow">
        
        {/* 1. Hero Section (Banner) - الأول */}
        <section className="relative h-[90vh] w-full bg-black overflow-hidden">
          <img src="/images/home1.webp" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover opacity-60"/>
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-black/40 to-transparent opacity-90" />
          <div className="relative h-full w-[90%] mx-auto flex flex-col justify-end pb-24 sm:pb-32">
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-6 w-fit">Season 25/26 Collection</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tighter mb-6 whitespace-pre-line">
              {t.heroTitle}
            </h1>
            <p className="text-xl text-gray-300 max-w-xl mb-8 leading-relaxed">{t.heroSubtitle}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black font-bold py-4 px-8 rounded-full hover:bg-gray-200 transition-all flex items-center justify-center gap-2" onClick={() => document.getElementById('men-section')?.scrollIntoView({ behavior: 'smooth' })}>
                {t.shopCollection} <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Benefits Strip */}
        <div className="bg-[#09090b] border-b border-[#27272a] py-6">
          <div className="w-[90%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center gap-3"><div className="p-2 bg-[#18181b] rounded-full"><Star className="text-white" size={20} /></div><span className="text-sm font-medium text-gray-300">Premium Quality</span></div>
              <div className="flex items-center justify-center gap-3"><div className="p-2 bg-[#18181b] rounded-full"><ShieldCheck className="text-white" size={20} /></div><span className="text-sm font-medium text-gray-300">Official Merch</span></div>
              <div className="flex items-center justify-center gap-3"><div className="p-2 bg-[#18181b] rounded-full"><Truck className="text-white" size={20} /></div><span className="text-sm font-medium text-gray-300">Global Shipping</span></div>
            </div>
          </div>
        </div>

        {/* 2. Gallery Section (Pitchside) - الثاني */}
        <section className="py-24 bg-[#09090b]">
           <div className="w-[90%] mx-auto">
             <div className="flex flex-col md:flex-row justify-between items-end mb-12"><div><h2 className="text-3xl font-bold tracking-tight text-white">{t.pitchSide}</h2><p className="mt-2 text-gray-400">Captured on 35mm film.</p></div></div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer border border-[#27272a]"><img src="/images/Pitchside1.webp" alt="Stadium" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"/></div>
                 <div className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer border border-[#27272a]"><img src="/images/Pitchside2.webp" alt="Fans" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"/></div>
                 <div className="relative aspect-[4/3] overflow-hidden rounded-lg group cursor-pointer border border-[#27272a]"><img src="/images/Pitchside3.webp" alt="Pitch" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"/></div>
             </div>
           </div>
        </section>

        {/* 3. Men Section - الثالث */}
        <CategorySection id="men-section" title={t.men} products={menProducts} locale={locale} t={t} categoryKey="men" />

        {/* 4. Our Story (الصورة والنص) - الرابع */}
        <section id="about" className="py-24 bg-[#09090b]">
          <div className="w-[90%] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#18181b] border border-[#27272a]">
                 <img src="/images/home2.webp" alt="About" className="absolute inset-0 w-full h-full object-cover opacity-90"/>
              </div>
              <div className="space-y-8">
                <span className="text-sm font-bold tracking-widest text-emerald-500 uppercase">{t.ourStory}</span>
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[0.9] whitespace-pre-line">{t.heroTitle.replace('\n', ' ')}</h2>
                <p className="text-xl text-gray-400 leading-relaxed font-light">{t.aboutText}</p>
                <div className="pt-4">
                  <Link href={`/${locale}/about`} className="inline-block text-white font-bold border-b-2 border-white pb-1 hover:text-emerald-400 hover:border-emerald-400 transition-colors">
                    {t.readStory}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Women & Kids - الخامس والسادس */}
        <CategorySection id="women-section" title={t.women} products={womenProducts} locale={locale} t={t} categoryKey="women" />
        <CategorySection id="kids-section" title={t.kids} products={kidsProducts} locale={locale} t={t} categoryKey="kids" />

      </main>
      <Footer t={t} locale={locale} />
    </div>
  );
}