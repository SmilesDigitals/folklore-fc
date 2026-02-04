import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, User, ChevronRight } from 'lucide-react';
import { getPostBySlug } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ReadingProgress from '@/app/components/blog/ReadingProgress';
import ShareButtons from '@/app/components/blog/ShareButtons';
import RelatedPosts from '@/app/components/blog/RelatedPosts';

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const isRtl = locale === 'ar';

  // JSON-LD Schema for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.metadata.title,
    description: post.metadata.description || post.metadata.excerpt,
    image: post.metadata.image ? `https://folklorefc.com${post.metadata.image}` : undefined,
    datePublished: post.metadata.date,
    author: {
      '@type': 'Organization',
      name: 'Folklore FC',
      url: 'https://folklorefc.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Folklore FC',
      logo: {
        '@type': 'ImageObject',
        url: 'https://folklorefc.com/images/logo.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://folklorefc.com/${locale}/blog/${slug}`
    }
  };

  // If schema metadata exists in frontmatter, add Product schema
  const productSchema = post.metadata.schema ? {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: post.metadata.schema.name,
    brand: {
      '@type': 'Brand',
      name: post.metadata.schema.brand
    },
    offers: {
      '@type': 'Offer',
      price: post.metadata.schema.price,
      priceCurrency: post.metadata.schema.currency,
      availability: `https://schema.org/${post.metadata.schema.availability || 'InStock'}`
    },
    image: post.metadata.image ? `https://folklorefc.com${post.metadata.image}` : undefined,
    description: post.metadata.description || post.metadata.excerpt
  } : null;

  return (
    <article className="min-h-screen bg-[#09090b] text-white pb-20 selection:bg-emerald-500 font-sans" dir={isRtl ? 'rtl' : 'ltr'}>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {productSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
        />
      )}

      <ReadingProgress />
      <ShareButtons title={post.metadata.title} />

      {/* Hero Section */}
      <div className="relative flex flex-col lg:flex-row min-h-screen lg:min-h-[85vh] border-b border-white/5 overflow-hidden">

        {/* Image Side - Mobile: Absolute Background / Desktop: Right Side */}
        <div className="absolute inset-0 z-0 lg:relative lg:flex-1 lg:order-2 lg:z-auto bg-[#121214]">
          {post.metadata.image && (
            <img
              src={post.metadata.image}
              alt={post.metadata.title}
              className="w-full h-full object-cover object-center scale-100 lg:scale-100 lg:grayscale lg:hover:grayscale-0 transition-all duration-1000 ease-in-out"
            />
          )}
          {/* Mobile Overlay Gradient - Darker at bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/90 lg:hidden" />
          {/* Desktop Edge Blend */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#09090b] to-transparent pointer-events-none" />
        </div>

        {/* Text Side - Mobile: Spread Content / Desktop: Centered Left Side */}
        <div className="relative z-10 flex-1 flex flex-col justify-between lg:justify-center px-6 py-12 md:px-12 lg:px-20 lg:py-0 lg:bg-[#09090b] lg:order-1 h-full min-h-screen lg:min-h-0">

          {/* Top: Breadcrumbs (Mobile only: pushed down from edge but raised higher than before) */}
          <div className="w-full pt-2 lg:pt-10">
            <nav className="flex items-center gap-2 text-emerald-500 font-black uppercase text-[10px] tracking-[0.2em]">
              <Link href={`/${locale}/blog`} className="hover:text-white transition-colors">BLOG</Link>
              <ChevronRight size={10} className={isRtl ? 'rotate-180' : ''} />
              <span className="text-white/80 truncate max-w-[200px]">{post.metadata.title}</span>
            </nav>
          </div>

          {/* Bottom: Title & Content - Desktop: Pushed down slightly */}
          <div className="max-w-xl mx-auto lg:mx-0 w-full mb-12 lg:mb-0 lg:mt-24">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-6 lg:mb-10 leading-[0.95] uppercase italic drop-shadow-lg lg:drop-shadow-sm">
              {post.metadata.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 lg:gap-8 text-white/80 lg:text-white/40 text-[9px] lg:text-[10px] font-bold uppercase tracking-[0.2em] mb-8 lg:mb-10">
              <div className="flex items-center gap-2">
                <Calendar size={12} className="text-emerald-500" />
                {post.metadata.date}
              </div>
              <div className="flex items-center gap-2 lg:border-l lg:border-white/10 lg:pl-8">
                <User size={12} className="text-emerald-500" />
                Folklore FC Editorial
              </div>
            </div>

            {/* Description / Lead */}
            <div className="relative pl-6 lg:pl-8 py-1 border-l-2 border-emerald-500 max-w-md">
              <p className="text-gray-100 lg:text-gray-400 text-base lg:text-xl leading-relaxed italic font-medium drop-shadow-md lg:drop-shadow-none">
                {post.metadata.description || post.metadata.excerpt}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto px-6 pt-16 lg:pt-24">
        <div className="blog-content-area prose prose-invert max-w-none prose-lg">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer of Article */}
        <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center">
          <Link href={`/${locale}/blog`} className="group flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-emerald-500 hover:text-white transition-all">
            <ArrowLeft className={`w-4 h-4 group-hover:-translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:translate-x-1' : ''}`} />
            {isRtl ? 'العودة للمقالات' : 'Back to Stories'}
          </Link>
          <div className="text-[9px] text-white/20 font-bold uppercase tracking-[0.4em]">
            © 2026 Folklore FC
          </div>
        </div>
      </div>

      <RelatedPosts currentSlug={slug} locale={locale} />
    </article>
  );
}