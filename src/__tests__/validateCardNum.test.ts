import { validateCardNumValue } from '../components/utils/validation';
describe('проверка правильности валидации номера банковской карты', () => {
  test('количество введенных цифр должно быть равно 16', () => {
    const cases = [
      { input: '', expected: false },
      { input: '1234 5667 8956 5125', expected: true },
      { input: '4566555588884444', expected: true },
      { input: '0000 0000 0000 000', expected: false },
    ];
    cases.forEach(({ input, expected }) => {
      expect(validateCardNumValue(input)).toBe(expected);
    });
  });
  test('допускается ввод только цифр', () => {
    const { input, expected } = { input: 'aaaa bbbb cccc rrrr', expected: false };
    expect(validateCardNumValue(input)).toBe(expected);
  });
});
