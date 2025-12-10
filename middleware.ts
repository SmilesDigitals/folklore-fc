import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(request: NextRequest) {
  // 1. اكتشاف الدولة (تذكر أن تعيدها للكود الأصلي قبل الرفع)
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  // const country = request.headers.get('x-vercel-ip-country') || 'US';

  // 2. منطق التوجيه والحدود
  let targetLocale = 'en';

  const ARAB_GROUP = ['SA', 'AE', 'KW', 'QA', 'OM', 'BH', 'EG', 'MA', 'DZ'];
  const EUROPE_FR_GROUP = ['FR', 'BE', 'CH', 'LU', 'MC'];
  const EUROPE_ES_GROUP = ['ES', 'PT', 'AD', 'MX', 'AR', 'CO'];
  const JAPAN_GROUP = ['JP'];

  if (ARAB_GROUP.includes(country)) {
    targetLocale = 'ar';
  } else if (EUROPE_FR_GROUP.includes(country)) {
    targetLocale = 'fr';
  } else if (EUROPE_ES_GROUP.includes(country)) {
    targetLocale = 'es';
  } else if (JAPAN_GROUP.includes(country)) {
    targetLocale = 'ja';
  }

  // 3. إنشاء الميدل وير
  const handleI18n = createMiddleware({
    locales: ['en', 'ar', 'fr', 'es', 'ja'],
    
    defaultLocale: targetLocale as any, 
    
    // ✅ هذا هو السطر السحري الجديد!
    // يمنع المكتبة من استنتاج اللغة من المتصفح، ويجبرها على استخدام دولتنا
    localeDetection: false,
    
    localePrefix: 'always'
  });

  const response = handleI18n(request);

  response.headers.set('x-user-country', country);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};