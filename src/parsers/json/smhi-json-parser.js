const validator = require('../../validators/weatherDateValidator');
const dateAverageCalculator = require('../dateAverageCalculator');

async function parse(data, options) {
  // parse json
  const output = [];

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

module.exports = {
  parse
};
