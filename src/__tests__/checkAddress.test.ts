import { checkAddressValue } from '../components/utils/validation';

describe('Валидация адреса доставки', () => {
  test('Введенный текст содержит не менее трех слов', () => {
    const cases = [
      { input: '123', expected: false },
      { input: 'abc abc', expected: false },
      { input: 'asdcblknsd123', expected: false },
      { input: 'abc,afs', expected: false },
      { input: '12345 abcavb', expected: false },
      { input: 'minsk, testa 666-66', expected: true },
      { input: 'minsk, belarus, minsk, belarus', expected: true },
      { input: 'minsk, belarus, street', expected: true },
    ];
    cases.forEach(({ input, expected }) => {
      expect(checkAddressValue(input)).toBe(expected);
    });
  });
  test('Длина каждого слова не менее 5 символов', () => {
    const cases = [
      { input: 'abc abc abc', expected: false },
      { input: 'asdcblknsd123 asdcblknsd123 ab', expected: false },
      { input: 'minsk, ul test', expected: false },
      { input: 'minsk, testa 666-66', expected: true },
      { input: 'minsk, belarus, minsk, belarus', expected: true },
      { input: 'minsk, belarus, street', expected: true },
    ];
    cases.forEach(({ input, expected }) => {
      expect(checkAddressValue(input)).toBe(expected);
    });
  });
});
