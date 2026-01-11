import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, ChevronRight } from 'lucide-react';
import { getPostBySlug } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const isRtl = locale === 'ar';

  return (
    <article className="min-h-screen bg-[#09090b] text-white pb-20 selection:bg-emerald-500" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Hero Section - تصميم متجاوب (Responsive) */}
      <div className="flex flex-col lg:flex-row min-h-screen lg:min-h-[85vh] border-b border-white/5">
        
        {/* الجانب النصي: يظهر أولاً في الجوال */}
        <div className="flex-1 flex flex-col justify-center px-6 py-12 md:px-12 lg:px-20 lg:py-0 bg-[#09090b]">
          <div className="max-w-xl mx-auto lg:mx-0 w-full">
            
            {/* Breadcrumbs - مسار الصفحة */}
            <nav className="flex items-center gap-2 text-emerald-500 mb-6 lg:mb-10 font-black uppercase text-[10px] tracking-[0.2em]">
              <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">BLOG</Link>
              <ChevronRight size={10} className={isRtl ? 'rotate-180' : ''} />
              <span className="text-white/40 truncate">{slug.replace('-', ' ')}</span>
            </nav>
            
            {/* العنوان: حجم مرن يتغير حسب الشاشة */}
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-8 lg:mb-10 leading-[1] lg:leading-[0.9] uppercase italic drop-shadow-sm">
              {post.metadata.title}
            </h1>

            {/* المعلومات الوصفية (Metadata) */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-8 text-white/40 text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] mb-10">
              <div className="flex items-center gap-2">
                <Calendar size={12} className="text-emerald-500" />
                {post.metadata.date}
              </div>
              <div className="flex items-center gap-2 lg:border-l lg:border-white/10 lg:pl-8">
                <User size={12} className="text-emerald-500" />
                Folklore FC Editorial
              </div>
            </div>

            {/* الوصف القصير مع خط التمييز الأخضر */}
            <div className="relative pl-6 lg:pl-8 py-1 border-l-2 border-emerald-500 max-w-md">
                <p className="text-gray-400 text-base lg:text-xl leading-relaxed italic font-medium">
                   {post.metadata.description}
                </p>
            </div>
          </div>
        </div>

        {/* الجانب البصري: يظهر تحت النص في الجوال وبجانبه في الحاسوب */}
        <div className="flex-1 relative h-[50vh] md:h-[60vh] lg:h-auto overflow-hidden bg-[#121214] group order-first lg:order-last">
          {post.metadata.image && (
            <img 
              src={post.metadata.image} 
              alt={post.metadata.title}
              className="w-full h-full object-cover object-center lg:grayscale lg:group-hover:grayscale-0 lg:group-hover:scale-105 transition-all duration-1000 ease-in-out"
            />
          )}
          {/* تدرج لوني لإدماج الصورة مع الخلفية */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#09090b] pointer-events-none" />
        </div>
      </div>

      {/* محتوى المقال الأساسي */}
      <div className="max-w-3xl mx-auto px-6 pt-16 lg:pt-24">
          <div className="blog-content-area prose prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </div>

          {/* تذييل الصفحة */}
          <footer className="mt-20 lg:mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <Link href={`/${locale}/blog`} className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 hover:text-white transition-all">
              <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
              {isRtl ? 'العودة للمقالات' : 'Back to Stories'}
            </Link>
            <div className="text-[9px] text-white/20 font-bold uppercase tracking-[0.4em]">
              © 2026 Folklore FC - Football Heritage
            </div>
          </footer>
      </div>
    </article>
  );
}