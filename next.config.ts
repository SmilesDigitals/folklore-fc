import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    // يمكنك إضافة أي إعدادات للمتجر هنا مستقبلاً
    images: {
        domains: ['folklorefc.com'], // أضف دومين موقعك هنا لاحقاً لضمان عمل الصور
    },
};
 
export default withNextIntl(nextConfig);