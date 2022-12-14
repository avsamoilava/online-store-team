import { Product, SortOptions } from '../../types';

export function sortProducts(option: SortOptions, arr: Product[]) {
  switch (option) {
    case 'price asc':
      arr.sort((a, b) => (a.price > b.price ? 1 : -1));
      break;
    case 'price desc':
      arr.sort((a, b) => (a.price < b.price ? 1 : -1));
      break;
    case 'rating asc':
      arr.sort((a, b) => (a.rating > b.rating ? 1 : -1));
      break;
    case 'rating desc':
      arr.sort((a, b) => (a.rating < b.rating ? 1 : -1));
      break;
    case 'discount asc':
      arr.sort((a, b) => (a.discountPercentage > b.discountPercentage ? 1 : -1));
      break;
    case 'discount desc':
      arr.sort((a, b) => (a.discountPercentage < b.discountPercentage ? 1 : -1));
      break;
  }
}
