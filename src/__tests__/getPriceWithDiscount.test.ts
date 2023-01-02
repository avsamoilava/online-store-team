import { getPriceWithDiscount } from '../components/utils';

const emptyProduct = {
  brand: '',
  category: '',
  description: '',
  id: 0,
  images: [''],
  rating: 0,
  stock: 0,
  thumbnail: '',
  title: '',
};

test('Функция getPriceWithDiscount верно рассчитывает стоимость продукта со скидкой', () => {
  expect(getPriceWithDiscount({ ...emptyProduct, discountPercentage: 10, price: 100 })).toBe(90);
  expect(getPriceWithDiscount({ ...emptyProduct, discountPercentage: 15, price: 100 })).toBe(85);
  expect(getPriceWithDiscount({ ...emptyProduct, discountPercentage: 20, price: 100 })).toBe(80);
  expect(getPriceWithDiscount({ ...emptyProduct, discountPercentage: 1, price: 200 })).toBe(198);
  expect(getPriceWithDiscount({ ...emptyProduct, discountPercentage: 2, price: 200 })).toBe(196);
  expect(getPriceWithDiscount({ ...emptyProduct, discountPercentage: 3, price: 200 })).toBe(194);
  expect(getPriceWithDiscount({ ...emptyProduct, discountPercentage: 10, price: 1000 })).toBe(900);
  expect(getPriceWithDiscount({ ...emptyProduct, discountPercentage: 90, price: 1000 })).toBe(100);
});
