import { getProductsByPage } from '../components/utils';

const array: number[] = Array(30)
  .fill(0)
  .map((item, index) => {
    return (item += index + 1);
  });

describe('функция корректно определяет массив элементов для отрисовки на одной странице', () => {
  test('возвращает массив элементов в зависимости от заданных номер страницы и количества элементов, отображаемых на одной странице', () => {
    expect(getProductsByPage<number>(array, 1, 4)).toEqual([1, 2, 3, 4]);
    expect(getProductsByPage<number>(array, 2, 6)).toEqual([7, 8, 9, 10, 11, 12]);
    expect(getProductsByPage<number>(array, 3, 2)).toEqual([5, 6]);
    expect(getProductsByPage<number>(array, 2, 25)).toEqual([26, 27, 28, 29, 30]);
  });
});
