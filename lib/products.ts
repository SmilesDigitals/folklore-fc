import { Product } from '../types';

// 1. استيراد القوائم الصغيرة
import { menList } from './lists/men';
import { womenList } from './lists/women';
import { kidsList } from './lists/kids';

// 2. دمجهم جميعاً في مصفوفة واحدة كبيرة
// (هذا ما سيراه الموقع)
export const products: Product[] = [
  ...menList,
  ...womenList,
  ...kidsList
];

// 3. دالة البحث عن منتج (تبقى كما هي)
export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};