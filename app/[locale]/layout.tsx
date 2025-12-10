import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
// لاحظ: حذفنا استيراد RegionProvider لأنه لم يعد ضرورياً
import StoreLayout from "../components/StoreLayout";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Folklore FC",
  description: "Cultural Football Fashion",
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
    <html lang={locale} dir={direction}>
      <body className={inter.className}>
        {/* حذفنا <RegionProvider> وأبقينا فقط StoreLayout */}
        <StoreLayout>
           {children}
           <GoogleAnalytics gaId="G-4CZRCW5K2W" />
        </StoreLayout>
      </body>
    </html>
  );
}