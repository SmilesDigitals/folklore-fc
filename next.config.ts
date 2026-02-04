import createNextIntlPlugin from 'next-intl/plugin';

import type { NextConfig } from 'next';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
    // يمكنك إضافة أي إعدادات للمتجر هنا مستقبلاً
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'folklorefc.com',
            },
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com', // For Google Auth profile pictures
            }
        ],
    },
};

export default withNextIntl(nextConfig);