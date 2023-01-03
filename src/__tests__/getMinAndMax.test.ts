import { getMinAndMax } from '../components/utils';
import { Product } from '../types';

const testProducts: Product[] = [
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

describe('функция корректно определяет элементы с наибольшим и наименьшим значениями указанного ключа', () => {
  test('наименьший и наибольший элемент по прайсу', () => {
    expect(getMinAndMax('price', testProducts)).toEqual({ min: 10, max: 1000 });
  });
  test('наименьший и наибольший элемент по стоку', () => {
    expect(getMinAndMax('stock', testProducts)).toEqual({ min: 5, max: 96 });
  });
});
