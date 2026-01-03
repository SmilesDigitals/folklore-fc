import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*', // لجميع محركات البحث
        allow: ['/', '/en/products/', '/api/og'], // السماح بالدخول للموقع والمنتجات وصور الـ OG
        disallow: [
          '/*/cart',
          '/*/checkout',
          '/*/thank-you',
          '/api/auth/', // منع روابط التحقق فقط
        ],
      },
      {
        userAgent: ['AdsBot-Google', 'Googlebot-Image'], // زواحف جوجل الخاصة بالإعلانات والصور
        allow: '/', // منحها إذن كامل للزحف
      }
    ],
    sitemap: 'https://folklorefc.com/sitemap.xml',
  };
}