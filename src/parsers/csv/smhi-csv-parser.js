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

async function parse(data, options) {
  const headers = setHeaders(options);
  const output = await csvParse(data, {
    trim: true,
    skip_empty_lines: true,
    separator: ';',
    headers,
    mapHeaders: header => {
      if (header === options.dateHeader.text) return 'Date';
      if (header === options.valueHeader.text) return 'Value';
      return '';
    }
  });

  let result = output.filter(
    o => isDate(o.Date) && isCorrectNumericValue(o.Value)
  );

  if (options.useDateAverage) {
    result = averageForDateDuplicates(result);
  }

  return result;
}

function setHeaders(options) {
  const maxHeaderIndex =
    options.dateHeader.index > options.valueHeader.index
      ? options.dateHeader.index
      : options.valueHeader.index;

  const headers = [];

  for (let ix = 1; ix <= maxHeaderIndex; ix += 1) {
    if (ix === options.dateHeader.index) headers.push(options.dateHeader.text);
    else if (ix === options.valueHeader.index)
      headers.push(options.valueHeader.text);
    else headers.push('');
  }

  return headers;
}

function averageForDateDuplicates(data) {
  const parsedDates = [];
  const result = [];

  data.forEach(item => {
    if (parsedDates.includes(item.Date)) return;
    parsedDates.push(item.Date);

    const dateValues = data.filter(v => v.Date === item.Date);
    const value = { ...item };

    if (dateValues.length > 1) {
      const sum = dateValues
        .map(dateValue => dateValue.Value)
        .reduce((previous, current) => {
          return Math.round(+current + +previous, 1);
        });

      const average = sum / dateValues.length;
      value.Value = average.toFixed(1).toString();
    }

    result.push(value);
  });

  return result;
}

module.exports = {
  parse
};
