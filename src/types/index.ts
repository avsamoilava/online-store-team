import { Cart } from '../components/view/pages/cart';
import CatalogPage from '../components/view/pages/CatalogPage';
import { Home } from '../components/view/pages/home';
import { Page404 } from '../components/view/pages/page-404';

export interface Product {
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
}

export interface ProductInCartType extends Product {
  count: number;
}

export interface Elements {
  '/': Home;
  '/catalog': CatalogPage;
  '/cart': Cart;
  '404': Page404;
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

export type QueryParams = {
  price: string;
  category: string;
  brand: string;
  stock: string;
  sort: string;
  search: string;
  view: string;
};
