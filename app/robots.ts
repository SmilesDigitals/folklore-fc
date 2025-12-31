import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/*/cart',         // منع السلة بكل اللغات
        '/*/checkout',     // منع الدفع
        '/*/thank-you',    // منع صفحة الشكر
        '/api/',           // منع روابط الـ API
      ],
    },
    sitemap: 'https://folklorefc.com/sitemap.xml',
  };
}