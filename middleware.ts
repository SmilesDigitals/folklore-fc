import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locales = ['en', 'ar', 'fr', 'es', 'ja'];

  // 1. 👈 فكرتك هنا: إذا كان الرابط يحتوي بالفعل على لغة، لا تتدخل واترك جوجل يؤرشفها [cite: 47, 49]
  const hasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (hasLocale) {
    return createMiddleware({
      locales: locales,
      defaultLocale: 'en', // قيمة احتياطية فقط
      localePrefix: 'always',
      localeDetection: false // منع التداخل مع لغة المتصفح [cite: 47]
    })(request);
  }

  // 2. إذا كان الزائر يدخل للرابط الرئيسي "/"، نطبق منطق الدولة الخاص بك [cite: 40, 44]
  const country = request.headers.get('x-vercel-ip-country') || 'US';
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

  // 3. التوجيه للغة الدولة المناسبة مع الحفاظ على الأرشفة [cite: 47, 49]
  return createMiddleware({
    locales: locales,
    defaultLocale: targetLocale as any,
    localeDetection: false,
    localePrefix: 'always'
  })(request);
}

export const config = {
  // استثناء ملفات الصور والنظام لزيادة السرعة [cite: 49]
  matcher: ['/((?!api|_next|.*\\..*).*)']
};