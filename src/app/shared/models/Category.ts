import { Product } from './Product';

export interface Category {
  id?: string; // UUID
  name: string;
  products?: Product[];
}
