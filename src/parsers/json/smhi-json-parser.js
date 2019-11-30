const validator = require('../../validators/weatherDateValidator');
const dateAverageCalculator = require('../dateAverageCalculator');

async function parse(data, options) {
  // parse json
  const json = JSON.parse(data);
  const values = json.value;

  const output = values.map(value => {
    const weatherItem = { date: value[options.dateHeader.text] };
    weatherItem[options.valueAttributeName] = value[options.valueHeader.text];

    return weatherItem;
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

module.exports = {
  parse
};
