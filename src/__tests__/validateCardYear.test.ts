import { validateCardYearValue } from '../components/utils/validation';

describe('Валидация срока действия кредитной карты', () => {
  test('Функция допускает ввод только цифр', () => {
    const cases = [
      { input: '12/22', expected: true },
      { input: 'aaa', expected: false },
      { input: 'aa/22', expected: false },
    ];
    cases.forEach(({ input, expected }) => {
      expect(validateCardYearValue(input)).toBe(expected);
    });
  });
  test('месяц не может быть больше 12', () => {
    const cases = [
      { input: '12/22', expected: true },
      { input: '02/28', expected: true },
      { input: '01/26', expected: true },
      { input: '13/22', expected: false },
      { input: '22/28', expected: false },
      { input: '77/26', expected: false },
    ];
    cases.forEach(({ input, expected }) => {
      expect(validateCardYearValue(input)).toBe(expected);
    });
  });
  test('Длина поля без учета разделителя должна быть равна 4', () => {
    const cases = [
      { input: '12/22', expected: true },
      { input: '02/25', expected: true },
      { input: '12/34', expected: true },
      { input: '1234/22', expected: false },
      { input: '1234/1234', expected: false },
      { input: '1/1', expected: false },
    ];
    cases.forEach(({ input, expected }) => {
      expect(validateCardYearValue(input)).toBe(expected);
    });
  });
});
