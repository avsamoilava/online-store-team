import { checkNameValue } from '../components/utils/validation';

describe('Проверка правильности валидации имени покупателя', () => {
  test('содержит не менее двух слов', () => {
    const cases = [
      { input: '', expected: false },
      { input: 'Petr', expected: false },
      { input: 'Иван Сидоров', expected: true },
      { input: 'Petr Ivanov', expected: true },
    ];
    cases.forEach(({ input, expected }) => {
      expect(checkNameValue(input)).toBe(expected);
    });
  });
  test('длина каждого слова не менее 3 символов', () => {
    const cases = [
      { input: 'Iv An', expected: false },
      { input: 'Iv Anov', expected: false },
      { input: 'Iva Nova', expected: true },
    ];
    cases.forEach(({ input, expected }) => {
      expect(checkNameValue(input)).toBe(expected);
    });
  });
});
