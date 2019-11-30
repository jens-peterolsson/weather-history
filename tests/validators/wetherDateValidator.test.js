const validator = require('../../src/validators/weatherDateValidator');

describe('Weather validator', () => {
  it('should recognize valid dates', async () => {
    expect(validator.isDate('2019-12-12')).toBe(true);
    expect(validator.isDate('2019-1A-12')).toBe(false);
    expect(validator.isDate(123)).toBe(false);
    expect(validator.isDate('ABC')).toBe(false);
  });
  it('should recognize valid weather values', async () => {
    expect(validator.isCorrectNumericValue()).toBe(false);
    expect(validator.isCorrectNumericValue(null)).toBe(false);
    expect(validator.isCorrectNumericValue(undefined)).toBe(false);
    expect(validator.isCorrectNumericValue(0)).toBe(true);
    expect(validator.isCorrectNumericValue('0.0')).toBe(true);
    expect(validator.isCorrectNumericValue(0.0)).toBe(true);
    expect(validator.isCorrectNumericValue('2019-12-12')).toBe(false);
    expect(validator.isCorrectNumericValue(123)).toBe(true);
    expect(validator.isCorrectNumericValue('ABC')).toBe(false);
    expect(validator.isCorrectNumericValue(12.3)).toBe(true);
    expect(validator.isCorrectNumericValue('12.33')).toBe(true);
    expect(validator.isCorrectNumericValue('-1.3')).toBe(true);
    expect(validator.isCorrectNumericValue('0.0')).toBe(true);
  });
});
