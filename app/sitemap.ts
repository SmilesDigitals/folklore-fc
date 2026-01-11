import { MetadataRoute } from 'next';
import { menList } from '../lib/lists/men';
import { womenList } from '../lib/lists/women';

const BASE_URL = 'https://folklorefc.com';
const locales = ['en', 'ar', 'fr', 'es', 'ja'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    // 1. الصفحة الرئيسية [cite: 96]
    sitemapEntries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });

    // 2. الصفحات الثابتة (إضافة blog هنا) [cite: 96, 97]
    ['men', 'women', 'about', 'blog'].forEach((page) => {
      let path = page;
      if (page === 'men' || page === 'women') path = `shop/${page}`;
      
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // 3. روابط المنتجات (الرجال والنساء) 
  [...menList, ...womenList].forEach((product) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  // ملاحظة: بمجرد زيادة مقالات المدونة، سنضيف كوداً هنا لجلب روابط المقالات تلقائياً.
  return sitemapEntries;
}