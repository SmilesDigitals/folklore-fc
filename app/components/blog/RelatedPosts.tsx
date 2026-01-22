
import React from 'react';
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import { ArrowRight } from 'lucide-react';

export default async function RelatedPosts({ currentSlug, locale }: { currentSlug: string, locale: string }) {
    const posts = getAllPosts(locale);
    // تصفية المقال الحالي وعرض 3 مقالات عشوائية أو أحدث 3
    const related = posts
        .filter(post => post.slug !== currentSlug)
        .slice(0, 3);

    if (related.length === 0) return null;

    return (
        <div className="bg-[#121214] border-t border-[#27272a] py-20 mt-20">
            <div className="max-w-7xl mx-auto px-6">
                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-10 flex items-center gap-3">
                    <span className="w-8 h-1 bg-emerald-500 inline-block"></span>
                    Read Next
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {related.map((post) => (
                        <Link key={post.slug} href={`/${locale}/blog/${post.slug}`} className="group block">
                            <div className="aspect-[16/9] overflow-hidden rounded-xl bg-[#18181b] border border-[#27272a] mb-4 relative">
                                {post.metadata.image ? (
                                    <img
                                        src={post.metadata.image}
                                        alt={post.metadata.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-[#18181b] text-gray-700 font-bold uppercase">No Image</div>
                                )}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                            </div>

                            <div className="space-y-2">
                                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{post.metadata.date}</span>
                                <h4 className="text-xl font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors">
                                    {post.metadata.title}
                                </h4>
                                <p className="text-sm text-gray-400 line-clamp-2">
                                    {post.metadata.description}
                                </p>
                                <div className="flex items-center text-xs font-bold text-white uppercase tracking-widest mt-4">
                                    Read Story <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
