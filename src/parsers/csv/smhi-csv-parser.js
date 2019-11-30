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
      if (header === options.dateHeader.text) return 'date';
      if (header === options.valueHeader.text)
        return options.valueAttributeName;
      return '';
    }
  });

  let result = output.filter(
    o => isDate(o.date) && isCorrectNumericValue(o[options.valueAttributeName])
  );

  if (options.useDateAverage) {
    result = averageForDateDuplicates(result, options.valueAttributeName);
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

function averageForDateDuplicates(data, valueAttributeName) {
  const parsedDates = [];
  const result = [];

  data.forEach(item => {
    if (parsedDates.includes(item.date)) return;
    parsedDates.push(item.date);

    const dateValues = data.filter(v => v.date === item.date);
    const value = { ...item };

    if (dateValues.length > 1) {
      const sum = dateValues
        .map(dateValue => dateValue[valueAttributeName])
        .reduce((previous, current) => {
          return Math.round(+current + +previous, 1);
        });

      const average = sum / dateValues.length;
      value[valueAttributeName] = average.toFixed(1).toString();
    }

    result.push(value);
  });

  return result;
}

module.exports = {
  parse
};
