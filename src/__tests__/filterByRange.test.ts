import { filterByRange } from '../components/utils';

const testProducts = [
  {
    brand: '',
    category: '',
    description: '',
    discountPercentage: 10,
    id: 0,
    images: [''],
    price: 500,
    rating: 0,
    stock: 40,
    thumbnail: '',
    title: '',
  },
  {
    brand: '',
    category: '',
    description: '',
    discountPercentage: 10,
    id: 3,
    images: [''],
    price: 105,
    rating: 0,
    stock: 5,
    thumbnail: '',
    title: '',
  },
  {
    brand: '',
    category: '',
    description: '',
    discountPercentage: 10,
    id: 15,
    images: [''],
    price: 1000,
    rating: 0,
    stock: 96,
    thumbnail: '',
    title: '',
  },
  {
    brand: '',
    category: '',
    description: '',
    discountPercentage: 10,
    id: 84,
    images: [''],
    price: 10,
    rating: 0,
    stock: 80,
    thumbnail: '',
    title: '',
  },
];
test('Функция filterByRange возвращает элементы в заданном диапазоне значений по определенному ключу', () => {
  expect(filterByRange(testProducts, 0, 100, 'price')).toStrictEqual([testProducts[3]]);
  expect(filterByRange(testProducts, 100, 600, 'price')).toStrictEqual([
    testProducts[0],
    testProducts[1],
  ]);
  expect(filterByRange(testProducts, 100, 200, 'stock')).toStrictEqual([]);
  expect(filterByRange(testProducts, 80, 100, 'stock')).toStrictEqual([
    testProducts[2],
    testProducts[3],
  ]);
});
