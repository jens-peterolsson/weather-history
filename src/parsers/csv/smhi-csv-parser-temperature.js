const csvParse = require('neat-csv');

function isDate(value) {
  if (!value) return false;

  const date = value.replace(/-/g, '');
  const isExpectedDateFormat = date.length === 8 && !Number.isNaN(date);

  return isExpectedDateFormat;
}

function isCorrectNumericValue(value) {
  if (!value) return false;

  const asInteger = value.replace(/\./, '');
  const isInteger = value.includes('.') && !Number.isNaN(asInteger);

  return isInteger;
}

async function parse(data, dateHeader, valueHeader) {
  const output = await csvParse(data, {
    trim: true,
    skip_empty_lines: true,
    separator: ';',
    headers: ['', '', dateHeader, valueHeader],
    mapHeaders: header => {
      if (header === dateHeader) return 'Date';
      if (header === valueHeader) return 'Value';
      return '';
    }
  });

  const result = output.filter(o => isDate(o.Date) && isCorrectNumericValue(o.Value));
  return result;
}

module.exports = {
  parse
};
