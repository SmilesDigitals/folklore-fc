import { Metadata } from 'next';
import { getProductById } from '../../../../lib/products';
import ProductClient from './ProductClient';

type Props = {
  params: Promise<{ id: string; locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  
  if (!product) return { title: 'Product Not Found | Folklore FC' };

  // هنا السحر! نستخدم البيانات الاحترافية إذا وجدت، وإلا نستخدم البيانات العادية
  return {
    title: product.metaTitle || `${product.name} | Folklore FC`,
    description: product.metaDescription || product.description,
    keywords: product.keywords?.join(', '),
    openGraph: {
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.description,
      images: product.image ? [{
        url: product.image,
        alt: product.altText || product.name
      }] : [],
    },
    // تحسين للذكاء الاصطناعي (Twitter/X)
    twitter: {
      card: 'summary_large_image',
      title: product.metaTitle || product.name,
      description: product.metaDescription || product.description,
      images: [product.image],
    }
  };
}

export default async function Page({ params }: Props) {
  const { id, locale } = await params;
  return <ProductClient id={id} locale={locale} />;
}