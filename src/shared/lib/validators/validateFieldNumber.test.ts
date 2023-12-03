import { validateFieldNumber } from './validateFieldNumber';

describe('validateFieldNumber', () => {
  test('Correct value', () => {
    expect(validateFieldNumber(10)).toBe(true);
  });
  test('Empty value', () => {
    expect(validateFieldNumber(Number(undefined))).toBe(false);
  });
  test('Zero value', () => {
    expect(validateFieldNumber(0)).toBe(false);
  });
});

export {};
