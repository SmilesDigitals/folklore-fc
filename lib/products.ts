import { Product } from '../types';
import { menList } from './lists/men';
import { womenList } from './lists/women';
import { kidsList } from './lists/kids';

export const products: Product[] = [
  ...menList,
  ...womenList,
  ...kidsList
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};