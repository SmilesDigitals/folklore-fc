import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
// لاحظ: حذفنا استيراد RegionProvider لأنه لم يعد ضرورياً
import StoreLayout from "../components/StoreLayout";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://folklorefc.com'), 
  title: 'Folklore FC | Football Heritage & Streetwear Aesthetics',
  description: 'Merging football culture with traditional heritage. Premium streetwear for the stands.',
  keywords: 'Football culture, streetwear, soccer jerseys, heritage kits, football fashion',
  
  // 👈 هذا هو الجزء الجديد لإصلاح مشكلة الأرشفة
  alternates: {
    canonical: '/', 
    languages: {
      'en': '/en',
      'ar': '/ar',
      'fr': '/fr',
      'es': '/es',
      'ja': '/ja',
    },
  },

  openGraph: {
    title: 'Folklore FC - For the Culture',
    description: 'Exclusive football-inspired streetwear.',
    images: ['/images/home1.webp'],
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;
  const direction = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        {/* حذفنا <RegionProvider> وأبقينا فقط StoreLayout */}
        <StoreLayout>
           {children}
           <GoogleAnalytics gaId="G-4CZRCW5K2W" />
        </StoreLayout>
      </body>
    </html>
  );
}