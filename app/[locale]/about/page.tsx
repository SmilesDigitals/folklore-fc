'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

// قاموس الترجمة لصفحة About
const TRANSLATIONS: any = {
  en: {
    back: 'Back to Home',
    title: 'OUR STORY',
    p1: 'Folklore FC is not just a brand; it is a bridge between the beautiful game and the rich heritage of nations.',
    p2: 'Born from a passion for football culture and streetwear aesthetics, we aim to design kits that tell stories. Every pattern, every color, and every stitch represents a chapter of history from the regions we represent.',
    missionTitle: 'Our Mission',
    missionText: 'To unite the world through the universal language of football, providing fans with high-quality, culturally significant apparel that they can wear with pride on the streets and in the stadiums.'
  },
  ar: {
    back: 'العودة للرئيسية',
    title: 'قصتنا',
    p1: 'فولكلور إف سي ليست مجرد علامة تجارية؛ إنها جسر بين اللعبة الجميلة والتراث الغني للأمم.',
    p2: 'نبعت فكرتنا من شغف بثقافة كرة القدم وجماليات أزياء الشارع. نهدف لتصميم أطقم تروي قصصاً. كل نمط، كل لون، وكل غرزة تمثل فصلاً من تاريخ المناطق التي نمثلها.',
    missionTitle: 'مهمتنا',
    missionText: 'توحيد العالم من خلال لغة كرة القدم العالمية، وتزويد المشجعين بملابس عالية الجودة ذات دلالات ثقافية يمكنهم ارتداؤها بفخر في الشوارع وفي الملاعب.'
  },
  fr: {
    back: 'Retour à l\'accueil',
    title: 'NOTRE HISTOIRE',
    p1: 'Folklore FC n\'est pas seulement une marque ; c\'est un pont entre le beau jeu et le riche patrimoine des nations.',
    p2: 'Née d\'une passion pour la culture football et l\'esthétique streetwear, nous visons à concevoir des maillots qui racontent des histoires. Chaque motif, chaque couleur et chaque point représente un chapitre de l\'histoire des régions que nous représentons.',
    missionTitle: 'Notre Mission',
    missionText: 'Unir le monde à travers le langage universel du football, en offrant aux fans des vêtements de haute qualité et culturellement significatifs qu\'ils peuvent porter avec fierté dans les rues et les stades.'
  },
  es: {
    back: 'Volver al Inicio',
    title: 'NUESTRA HISTORIA',
    p1: 'Folklore FC no es solo una marca; es un puente entre el juego bonito y la rica herencia de las naciones.',
    p2: 'Nacidos de una pasión por la cultura del fútbol y la estética streetwear, nuestro objetivo es diseñar equipaciones que cuenten historias. Cada patrón, cada color y cada puntada representa un capítulo de la historia de las regiones que representamos.',
    missionTitle: 'Nuestra Misión',
    missionText: 'Unir al mundo a través del lenguaje universal del fútbol, proporcionando a los aficionados ropa de alta calidad y culturalmente significativa que puedan llevar con orgullo en las calles y en los estadios.'
  },
  ja: {
    back: 'ホームに戻る',
    title: '私たちの物語',
    p1: 'Folklore FCは単なるブランドではありません。美しいゲームと各国の豊かな遺産との架け橋です。',
    p2: 'サッカー文化とストリートウェアの美学への情熱から生まれ、物語を語るキットをデザインすることを目指しています。すべてのパターン、すべての色、すべてのステッチは、私たちが代表する地域の歴史の章を表しています。',
    missionTitle: '私たちの使命',
    missionText: 'サッカーという世界共通語を通じて世界を団結させ、ファンがストリートやスタジアムで誇りを持って着用できる高品質で文化的に重要なアパレルを提供することです。'
  }
};

export default function AboutPage() {
  const params = useParams();
  const locale = (params?.locale as string) || 'en';
  const t = TRANSLATIONS[locale] || TRANSLATIONS['en'];
  const isRtl = locale === 'ar';

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-4xl mx-auto py-12">
        <Link href="/" className={`inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}>
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'ml-2 rotate-180' : 'mr-2'}`} /> 
          {t.back}
        </Link>
        
        <h1 className="text-5xl font-black tracking-tighter mb-8">{t.title}</h1>
        
        <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
          <p>
            <span className="text-emerald-500 font-bold">Folklore FC</span> {t.p1.replace('Folklore FC', '')}
          </p>
          <p>{t.p2}</p>
          
          <div className="aspect-video w-full rounded-2xl overflow-hidden my-8 border border-[#27272a]">
             <img 
               src="/images/about.webp" 
               alt="Team working" 
               className="w-full h-full object-cover opacity-80"
             />
          </div>
          
          <h2 className="text-3xl font-bold text-white mt-12 mb-4">{t.missionTitle}</h2>
          <p>{t.missionText}</p>
        </div>
      </div>
    </div>
  );
}