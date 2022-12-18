import { FilterFn, MinAndMax, Product, QueryParams } from '../../types';
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

export const searchProducts = (el: Product, query: string) =>
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

export const getParams = (): Partial<QueryParams> =>
  Object.fromEntries(new URLSearchParams(location.search).entries());

function filterByRange(
  arr: Readonly<Product>[],
  min: number,
  max: number,
  key: string
): Readonly<Product>[] {
  return arr.filter((el) => el[key as keyof Product] >= min && el[key as keyof Product] <= max);
}
export function filterProducts(arr: Readonly<Product>[]): Readonly<Product>[] {
  let filteredArray = [...arr];
  const params = getParams();
  ///////////////
  delete params['sort'];
  ///////////////

  Object.keys(params).forEach((key) => {
    if (key === 'category' || key === 'brand') {
      filteredArray = (params[key] as string)
        .split('*')
        .map((c) => filteredArray.filter((el) => filterBy(el, c, key)))
        .flat();
    }
    if (params.price) {
      const [min, max] = params.price.split('-').map(Number);
      filteredArray = filterByRange(filteredArray, min, max, 'price');
    }
    if (params.stock) {
      const [min, max] = params.stock.split('-').map(Number);
      filteredArray = filterByRange(filteredArray, min, max, 'stock');
    }
    if (params.search)
      filteredArray = filteredArray.filter((el) => searchProducts(el, params.search as string));
  });

  return filteredArray;
}

export function getInfo(key: 'brand' | 'category', arr: Product[]): string[] {
  const items = arr.map((el) => el[key]);
  return Array.from(new Set(items));
}
export function getMinAndMax(key: 'price' | 'stock', arr: Product[]): MinAndMax {
  const items = arr.map((el) => el[key]).sort((a, b) => (a > b ? 1 : -1));
  return { min: items[0], max: items[items.length - 1] };
}
