import { FilterFn, Product } from '../../types';
import { router } from '../router';

export function sortProducts(option: string, arr: Product[]) {
  if (
    ![
      'price_asc',
      'price_desc',
      'rating_asc',
      'rating_desc',
      'discount_asc',
      'discount_desc',
    ].includes(option)
  )
    return;
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
  if (key === 'brand' || key === 'category') {
    const currentValue = params.get(key);
    if (currentValue) {
      if (currentValue.split('*').includes(value)) return;
      if (value.match(/-delete/)) {
        const arr = currentValue.split('*').filter((el) => el !== value.replace(/-delete/, ''));
        value = arr.join('*');
      } else value = `${currentValue}*` + value;
    }
  }
  if (params.has(key)) params.delete(key);
  if (value) params.set(key, value);
  const queryString = params.toString();
  router.navigate(location.pathname + `${queryString ? `?${queryString}` : ''}`);
}

export const filterProducts = (el: Product, query: string) =>
  // el.brand.toLowerCase().includes(query) ||
  // el.category.toLowerCase().includes(query) ||
  // String(el.price).includes(query) ||
  // el.description.toLowerCase().includes(query) ||
  // String(el.rating).includes(query) ||
  // String(el.stock).includes(query) ||
  el.title.toLowerCase().includes(query);

export const filterBy: FilterFn = (el, query, key) => {
  return el[key].toLowerCase() === query.toLowerCase();
};
export function filterByCategoryAndBrand(arr: Readonly<Product>[]): Readonly<Product>[] {
  const params = new URLSearchParams(location.search);
  const categories = params.get('category')?.split('*');
  const brands = params.get('brand')?.split('*');
  console.log(categories, brands);
  if (categories && brands) {
    const arr1 = categories.map((c) => arr.filter((el) => filterBy(el, c, 'category'))).flat();
    const arr2 = brands.map((b) => arr1.filter((el) => filterBy(el, b, 'brand'))).flat();
    console.log(arr2);
    return arr2;
  }
  if (categories) {
    return categories.map((c) => arr.filter((el) => filterBy(el, c, 'category'))).flat();
  }
  if (brands) {
    return brands.map((b) => arr.filter((el) => filterBy(el, b, 'brand'))).flat();
  }
  return [];
}
export function getInfo(key: 'brand' | 'category', arr: Product[]): string[] {
  const items = arr.map((el) => el[key]);
  return Array.from(new Set(items));
}
