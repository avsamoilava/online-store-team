import { checkEmailValue } from '../components/utils/validation';

describe('Валидация адреса электронной почты', () => {
  test('Функция проверяет, является ли введенный текст электронной почтой', () => {
    const cases = [
      { input: '', expected: false },
      { input: 'abc', expected: false },
      { input: '123', expected: false },
      { input: '@.123', expected: false },
      { input: ' ', expected: false },
      { input: 'abc123', expected: false },
      { input: 'example@yandex.rusdfse', expected: false },
      { input: 'example@yandex.ru', expected: true },
      { input: 'example@gmail.com', expected: true },
      { input: 'test@mail.ru', expected: true },
      { input: 'test@outlook.com', expected: true },
    ];
    cases.forEach(({ input, expected }) => {
      expect(checkEmailValue(input)).toBe(expected);
    });
  });
});
