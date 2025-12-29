// types.ts

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CartItem extends Product {
  cartId: string;
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  image: string;
  region?: string;
  description?: string;
  category?: string;
  isNew?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  altText?: string;
  keywords?: string[];
  // ✅ الإضافات الجديدة
  gender?: string; 
  reviews?: Review[];
}