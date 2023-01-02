import { getPriceWithDiscount } from '../components/utils';
import { Product } from '../types';

const product: Product = {
  brand: '',
  category: '',
  description: '',
  discountPercentage: 10,
  id: 0,
  images: [''],
  price: 100,
  rating: 0,
  stock: 0,
  thumbnail: '',
  title: '',
};

test('Функция getPriceWithDiscount верно рассчитывает стоимость продукта со скидкой', () => {
  expect(getPriceWithDiscount(product)).toBe(90);
});
