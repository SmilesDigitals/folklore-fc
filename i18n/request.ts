import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
 
  // إذا لم يتم العثور على لغة، نستخدم الإنجليزية
  if (!locale || !['en', 'ar', 'fr', 'es', 'ja'].includes(locale)) {
    locale = 'en';
  }
 
  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});