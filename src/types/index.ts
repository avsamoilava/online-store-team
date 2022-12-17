export type Product = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

export interface Elements {
  [key: string]: HTMLElement;
}

export type CatalogRenderFn = (page?: number, data?: Readonly<Product>[]) => void;
export type FilterFn = (el: Product, query: string, key: 'brand' | 'category') => boolean;

export type ApiResponse = {
  products: Product[];
  limit: number;
  skip: number;
  total: number;
};

export type MinAndMax = {
  min: number;
  max: number;
};

export type SortOptions =
  | 'price_asc'
  | 'price_desc'
  | 'rating_asc'
  | 'rating_desc'
  | 'discount_asc'
  | 'discount_desc';
