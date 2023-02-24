import { checkPhoneNumValue } from '../components/utils/validation';

describe('Проверка правильности валидации номера телефона', () => {
  test('номер телефона должен начинаться с "+"', () => {
    const cases = [
      { input: '375445556688', expected: false },
      { input: '+375295556688', expected: true },
    ];
    cases.forEach(({ input, expected }) => {
      expect(checkPhoneNumValue(input)).toBe(expected);
    });
  });
  test('номер телефона может содержать только цифры', () => {
    const cases = [
      { input: '+375445556688', expected: true },
      { input: '+aaaBBcccFFWW', expected: false },
    ];
    cases.forEach(({ input, expected }) => {
      expect(checkPhoneNumValue(input)).toBe(expected);
    });
  });
  test('номер телефона должен быть не короче 9 цифр', () => {
    const cases = [
      { input: '+375445556688', expected: true },
      { input: '+37544555668', expected: false },
    ];
    cases.forEach(({ input, expected }) => {
      expect(checkPhoneNumValue(input)).toBe(expected);
    });
  });
});
