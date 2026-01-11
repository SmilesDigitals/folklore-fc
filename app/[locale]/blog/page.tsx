import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, BookOpen } from 'lucide-react';
import { getAllPosts } from '@/lib/blog';
// ... باقي الـ imports

export default async function BlogListPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; // إضافة await هنا
  const posts = getAllPosts(locale);
  // ... باقي الكود كما هو

  // نصوص الترجمة البسيطة لعنوان الصفحة
  const titles: any = {
    en: "Our Stories",
    ar: "قصصنا",
    fr: "Nos Histoires",
    es: "Nuestras Historias",
    ja: "ストーリー"
  };

  const backText: any = {
    en: "Back to Home",
    ar: "العودة للرئيسية",
    fr: "Retour à l'accueil",
    es: "Volver al inicio",
    ja: "ホームに戻る"
  };

  const isRtl = locale === 'ar';

  return (
    <div className="min-h-screen bg-[#09090b] text-white p-8" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="max-w-6xl mx-auto py-12">
        
        {/* زر العودة */}
        <Link href={`/${locale}`} className="inline-flex items-center text-gray-400 hover:text-white mb-12 transition-colors">
          <ArrowLeft className={`w-4 h-4 ${isRtl ? 'ml-2 rotate-180' : 'mr-2'}`} /> 
          {backText[locale] || backText['en']}
        </Link>

        <header className="mb-16">
          <h1 className="text-3xl font-black tracking-tighter mb-4 uppercase italic italic">
            {titles[locale] || titles['en']}
          </h1>
          <div className="h-2 w-24 bg-emerald-500 rounded-full"></div>
        </header>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/${locale}/blog/${post.slug}`}
                className="group bg-[#18181b] border border-[#27272a] rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 flex flex-col"
              >
                {/* مكان الصورة (إذا أضفت روابط صور في الملفات) */}
                <div className="aspect-video bg-[#27272a] relative overflow-hidden">
                  {post.metadata.image ? (
                    <img 
                      src={post.metadata.image} 
                      alt={post.metadata.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#3f3f46]">
                      <BookOpen size={48} />
                    </div>
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-xs text-emerald-500 mb-3 font-bold uppercase tracking-widest">
                    <Calendar size={14} />
                    {post.metadata.date}
                  </div>
                  
                  <h2 className="text-2xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">
                    {post.metadata.title}
                  </h2>
                  
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-1">
                    {post.metadata.description}
                  </p>

                  <div className="text-sm font-black uppercase tracking-tighter flex items-center gap-2">
                    {isRtl ? 'اقرأ المزيد' : 'Read More'}
                    <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-[#18181b] rounded-3xl border border-dashed border-[#27272a]">
            <p className="text-gray-500 text-xl italic">
              {isRtl ? 'لا توجد مقالات منشورة بعد.' : 'No stories published yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}