import { MetadataRoute } from 'next';

const BASE_URL = 'https://www.folklorefc.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/*/product/', '/*/blog/', '/api/og'],
        disallow: [
          '/*/cart',
          '/*/checkout',
          '/*/thank-you',
          '/*/about',
          '/*/shipping',
          '/*/contact',
          '/*/faq',
          '/api/auth/', // منع روابط التحقق فقط
        ],
      },
      {
        userAgent: ['AdsBot-Google', 'Googlebot-Image'],
        allow: '/',
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}