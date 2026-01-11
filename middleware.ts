import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. الحصول على رمز الدولة من Vercel (أو افتراضياً US) [cite: 84, 85]
  const country = request.headers.get('x-vercel-ip-country') || 'US';

  // 2. تحديد اللغة التلقائية بناءً على مجموعات الدول التي حددتها [cite: 86, 87]
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

  // 3. إعداد الميدل وير الخاص باللغات [cite: 91]
  const handleI18n = createMiddleware({
    locales: ['en', 'ar', 'fr', 'es', 'ja'],
    defaultLocale: targetLocale as any,
    localeDetection: false, // نعتمد على منطق الدولة الخاص بنا [cite: 91]
    localePrefix: 'always'
  });

  const response = handleI18n(request);
  
  // حفظ رمز الدولة في الـ headers لاستخدامه لاحقاً إذا احتجت [cite: 92]
  response.headers.set('x-user-country', country);

  return response;
}

// تحديد الروابط التي يجب أن يراقبها الميدل وير
export const config = {
  // استثناء ملفات الصور والنظام والـ API لزيادة السرعة [cite: 92]
  matcher: ['/((?!api|_next|.*\\..*).*)']
};