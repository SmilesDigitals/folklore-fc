import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, ChevronRight } from 'lucide-react';
import { getPostBySlug } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  // انتظار الـ params لضمان التوافق مع Next.js 15
  const { locale, slug } = await params; 
  const post = getPostBySlug(slug, locale);

  // في حال عدم وجود المقال
  if (!post) {
    notFound();
  }

  const isRtl = locale === 'ar';

  return (
    <article className="min-h-screen bg-[#09090b] text-white pb-24 selection:bg-emerald-500 selection:text-white" dir={isRtl ? 'rtl' : 'ltr'}>
      
      {/* Hero Section - Split Layout */}
      <div className="flex flex-col lg:flex-row min-h-[85vh] border-b border-white/5">
        
        {/* Left Side: Text Content */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-20 lg:py-0 bg-[#09090b]">
          <div className="max-w-xl">
            <nav className="flex items-center gap-2 text-emerald-500 mb-10 font-black uppercase text-[10px] tracking-[0.3em]">
              <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">BLOG</Link>
              <ChevronRight size={12} className={isRtl ? 'rotate-180' : ''} />
              <span className="text-white/50">{slug.replace('-', ' ')}</span>
            </nav>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-10 leading-[0.9] uppercase italic">
              {post.metadata.title}
            </h1>

            <div className="flex items-center gap-8 text-white/40 text-[10px] font-bold uppercase tracking-[0.2em] mb-12">
              <div className="flex items-center gap-2">
                <Calendar size={14} className="text-emerald-500" />
                {post.metadata.date}
              </div>
              <div className="flex items-center gap-2 border-l border-white/10 pl-8">
                <User size={14} className="text-emerald-500" />
                Folklore FC Editorial
              </div>
            </div>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed italic border-l-2 border-emerald-500 pl-6 mb-8 max-w-md">
                {post.metadata.description}
            </p>
          </div>
        </div>

        {/* Right Side: Image Content with Hover Effect */}
        <div className="flex-1 relative h-[60vh] lg:h-auto overflow-hidden bg-[#121214] group">
          {post.metadata.image && (
            <img 
              src={post.metadata.image} 
              alt={post.metadata.title}
              className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 ease-in-out"
            />
          )}
          
          {/* Overlays (Grandients) - مع خاصية تجاهل الماوس */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-transparent to-transparent lg:block hidden pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent lg:hidden block pointer-events-none" />
          
          {/* لمسة ضوئية خضراء عند التحويم */}
          <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
        </div>
      </div>

      {/* Main Blog Content */}
      <div className="max-w-3xl mx-auto px-6 pt-24">
          <div className="blog-content-area">
            <MDXRemote source={post.content} />
          </div>

          {/* Footer of the article */}
          <footer className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <Link href={`/${locale}/blog`} className="group flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] text-emerald-500 hover:text-white transition-all">
              <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-2 transition-transform ${isRtl ? 'rotate-180 group-hover:translate-x-2' : ''}`} />
              {isRtl ? 'العودة للمقالات' : 'Back to Stories'}
            </Link>
            <div className="text-[10px] text-white/20 font-bold uppercase tracking-[0.4em]">
              © 2026 Folklore FC - {isRtl ? 'تراث الشعوب' : 'Cultural Heritage'}
            </div>
          </footer>
      </div>
    </article>
  );
}