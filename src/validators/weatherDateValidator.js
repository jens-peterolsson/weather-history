const validator = require('validator');

function isDate(value) {
  if (!value) return false;

  let date = value.toString();
  if (!validator.isISO8601(date)) return false;

  date = date.replace(/-/g, '');
  const isExpectedDateFormat = date.length === 8 && validator.isInt(date);

  return isExpectedDateFormat;
}

function isCorrectNumericValue(value) {
  if (value === undefined || value === null) return false;

  const stringValue = value.toString();
  const asInteger = stringValue.replace(/\./, '');

  const isIntegerWhenRemovingDecimalPoint = validator.isInt(asInteger);
  return isIntegerWhenRemovingDecimalPoint;
}

module.exports = { isDate, isCorrectNumericValue };
