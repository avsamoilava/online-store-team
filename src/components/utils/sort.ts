import { Product, SortOptions } from '../../types';

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
