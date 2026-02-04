import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import StoreLayout from "../components/StoreLayout";
import { GoogleAnalytics } from '@next/third-parties/google';
import { AuthProvider } from '../context/AuthContext';

const inter = Inter({ subsets: ["latin"] });

// 👈 الدالة الجديدة لإصلاح مشاكل الأرشفة ديناميكياً
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = 'https://www.folklorefc.com';

  return {
    metadataBase: new URL(baseUrl),
    title: {
      template: '%s | Folklore FC',
      default: 'Folklore FC | Football Heritage & Streetwear Aesthetics',
    },
    description: 'Merging football culture with traditional heritage. Premium streetwear for the stands.',
    keywords: 'Football culture, streetwear, soccer jerseys, heritage kits, football fashion',

    // الحل النهائي لمشكلة Duplicate و Redirect error
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'en': '/en',
        'ar': '/ar',
        'fr': '/fr',
        'es': '/es',
        'ja': '/ja',
        'x-default': '/en', // اللغة التي يتوجه لها الزوار من خارج هذه الدول
      },
    },

    openGraph: {
      title: 'Folklore FC - For the Culture',
      description: 'Exclusive football-inspired streetwear.',
      images: ['/images/home1.webp'],
    },
  };
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params,
}: Props) {
  const { locale } = await params;

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning={true}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AuthProvider>
          <StoreLayout>
            {children}
            <GoogleAnalytics gaId="G-4CZRCW5K2W" />
          </StoreLayout>
        </AuthProvider>
      </body>
    </html>
  );
}