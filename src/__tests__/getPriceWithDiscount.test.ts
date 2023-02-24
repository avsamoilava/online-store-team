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
  const cases = [
    { input: { ...emptyProduct, discountPercentage: 10, price: 100 }, expected: 90 },
    { input: { ...emptyProduct, discountPercentage: 15, price: 100 }, expected: 85 },
    { input: { ...emptyProduct, discountPercentage: 20, price: 100 }, expected: 80 },
    { input: { ...emptyProduct, discountPercentage: 1, price: 200 }, expected: 198 },
    { input: { ...emptyProduct, discountPercentage: 2, price: 200 }, expected: 196 },
    { input: { ...emptyProduct, discountPercentage: 3, price: 200 }, expected: 194 },
    { input: { ...emptyProduct, discountPercentage: 10, price: 1000 }, expected: 900 },
    { input: { ...emptyProduct, discountPercentage: 90, price: 1000 }, expected: 100 },
  ];
  cases.forEach(({ input, expected }) => {
    expect(getPriceWithDiscount(input)).toBe(expected);
  });
});
