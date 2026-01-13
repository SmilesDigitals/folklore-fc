import { MetadataRoute } from 'next';
import { menList } from '../lib/lists/men';
import { womenList } from '../lib/lists/women';

const BASE_URL = 'https://folklorefc.com';
const locales = ['en', 'ar', 'fr', 'es', 'ja'];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. روابط الصفحات الرئيسية والأقسام (تبقى لكل اللغات لأنها عامة)
  locales.forEach((locale) => {
    sitemapEntries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    });
    
    ['shop/men', 'shop/women', 'about', 'blog'].forEach((path) => {
      sitemapEntries.push({
        url: `${BASE_URL}/${locale}/${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    });
  });

  // 2. روابط المنتجات مع الفلترة الذكية (الإصلاح المطلوب)
  const allProducts = [...menList, ...womenList];

  allProducts.forEach((product) => {
    // نحدد اللغات التي سيظهر فيها المنتج
    // إذا كان المنتج له منطقة محددة (مثل 'ar')، نضعه فقط في تلك اللغة
    // إذا لم يكن له منطقة (منتج عالمي)، نضعه في كل اللغات
    const targetLocales = product.region 
      ? [product.region] 
      : locales;

    targetLocales.forEach((locale) => {
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