const csvParse = require('neat-csv');
const validator = require('../../validators/weatherDateValidator');
const dateAverageCalculator = require('../dateAverageCalculator');

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
    o =>
      validator.isDate(o.date) &&
      validator.isCorrectNumericValue(o[options.valueAttributeName])
  );

  if (options.useDateAverage) {
    result = dateAverageCalculator.calculate(
      result,
      options.valueAttributeName
    );
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

module.exports = {
  parse
};
