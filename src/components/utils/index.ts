import { Product, SortOptions } from '../../types';
import { router } from '../router';

export function sortProducts(option: SortOptions, arr: Product[]) {
  switch (option) {
    case 'price_asc':
      arr.sort((a, b) => (a.price > b.price ? 1 : -1));
      break;
    case 'price_desc':
      arr.sort((a, b) => (a.price < b.price ? 1 : -1));
      break;
    case 'rating_asc':
      arr.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      break;
    case 'rating_desc':
      arr.sort((a, b) => (a.rating < b.rating ? 1 : -1));
      break;
    case 'discount_asc':
      arr.sort((a, b) => (a.discountPercentage > b.discountPercentage ? 1 : -1));
      break;
    case 'discount_desc':
      arr.sort((a, b) => (a.discountPercentage < b.discountPercentage ? 1 : -1));
      break;
  }
}

export function setQueryString(key: string, value: string): void {
  const params = new URLSearchParams(location.search);
  if (params.has(key)) params.delete(key);
  if (value) params.set(key, value);
  router.navigate(location.pathname + `?${params.toString()}`);
}
