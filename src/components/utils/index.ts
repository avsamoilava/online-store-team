import { FilterFn, MinAndMax, Product, ProductInCartType, QueryParams } from '../../types';
import { router } from '../router';
export const navigate = (path: string, e?: Event) => {
  if (e) e.preventDefault();
  history.pushState({}, '', path);
  router.navigate(path);
};
export const disableCurrent = (id?: string) => {
  const activeClass = 'link--current';
  document.querySelector(`.${activeClass}`)?.classList.remove(activeClass);
  if (id) document.getElementById(id)?.classList.add(activeClass);
};
export const sortOptions = [
  'price asc',
  'price desc',
  'rating asc',
  'rating desc',
  'discount asc',
  'discount desc',
];
export function sortProducts(option: string, arr: Product[]) {
  if (!sortOptions.includes(option.replace('_', ' '))) return;
  const [k, order] = option.split('_');
  const key = k === 'discount' ? 'discountPercentage' : k;
  order === 'asc'
    ? arr.sort((a, b) => (a[key as keyof Product] > b[key as keyof Product] ? 1 : -1))
    : arr.sort((a, b) => (a[key as keyof Product] < b[key as keyof Product] ? 1 : -1));
}

export function setQueryString(key: string, value: string) {
  const params = new URLSearchParams(location.search);
  if ((key === 'brand' || key === 'category') && value) {
    const currentValue = params.get(key);
    if (currentValue) {
      if (currentValue.split('*').includes(value)) return location.pathname + location.search;
      if (value.match(/-delete/)) {
        const arr = currentValue.split('*').filter((el) => el !== value.replace(/-delete/, ''));
        value = arr.join('*');
      } else value = `${currentValue}*` + value;
    }
  }
  if (params.has(key)) params.delete(key);
  if (value) params.set(key, value);
  const queryString = params.toString();
  const newPath = location.pathname + `${queryString ? `?${queryString}` : ''}`;
  history.pushState({}, '', newPath);
  return newPath;
}

export const searchProducts = (el: Product, query: string) =>
  el.brand.toLowerCase().includes(query) ||
  el.category.toLowerCase().includes(query) ||
  String(el.price).includes(query) ||
  el.description.toLowerCase().includes(query) ||
  String(el.rating).includes(query) ||
  String(el.stock).includes(query) ||
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
export function filterAndSortProducts(arr: Readonly<Product>[]): Readonly<Product>[] {
  let filteredArray = [...arr];
  const params = getParams();

  Object.keys(params).forEach((key) => {
    if (key === 'category' || key === 'brand') {
      filteredArray = (params[key] as string)
        .split('*')
        .map((c) => filteredArray.filter((el) => filterBy(el, c, key)))
        .flat();
    }
    if (key === 'price' || key === 'stock') {
      const [min, max] = (params[key] as string).split('-').map(Number);
      filteredArray = filterByRange(filteredArray, min, max, key);
    }
    if (key === 'search')
      filteredArray = filteredArray.filter((el) => searchProducts(el, params.search as string));
    if (params.sort) sortProducts(params.sort, filteredArray);
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

export const getProductsInCart = (): ProductInCartType[] =>
  JSON.parse(localStorage.getItem('cart') || '[]');

export const getPriceWithDiscount = (product: Product) =>
  (product.price * (100 - product.discountPercentage)) / 100;

export const getTotalAmount = (arr: ProductInCartType[]) =>
  arr.reduce((a, b) => a + getPriceWithDiscount(b) * b.count, 0);

export const getProductsCount = (arr: ProductInCartType[]) => arr.reduce((a, b) => a + b.count, 0);

export function getProductsByPage<T>(arr: T[], page: number, limit: number) {
  const coef = limit * (page - 1);
  return arr.length >= limit ? arr.filter((_, idx) => idx >= 0 + coef && idx < limit + coef) : arr;
}
