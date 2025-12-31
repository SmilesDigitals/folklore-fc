import { MetadataRoute } from 'next';
import { menList } from '../lib/lists/men';
import { womenList } from '../lib/lists/women';

const BASE_URL = 'https://folklorefc.com'; // استبدله برابط موقعك الحقيقي
const locales = ['en', 'ar', 'fr', 'es', 'ja']; // اللغات المدعومة 

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. روابط الصفحات الرئيسية والأقسام لكل لغة
  locales.forEach((locale) => {
    // الصفحة الرئيسية
    sitemapEntries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });

    // صفحات الأقسام
    ['men', 'women', 'about'].forEach((page) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/${page === 'about' ? 'about' : `shop/${page}`}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // 2. روابط المنتجات (الرجال) لكل لغة [cite: 74]
  menList.forEach((product) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  // 3. روابط المنتجات (النساء) لكل لغة [cite: 1]
  womenList.forEach((product) => {
    locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}