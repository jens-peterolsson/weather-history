const validator = require('../../validators/weatherDateValidator');
const dateAverageCalculator = require('../dateAverageCalculator');

async function parse(data, options) {
  // parse json
  const json = JSON.parse(data);
  const values = json.value;

  const output = values.map(value => {
    let dateValue = value[options.dateHeader.text];

    if (!validator.isDate(dateValue)) {
      dateValue = new Date(dateValue).toISOString().substr(0, 10);
    }

    const weatherItem = { date: dateValue };
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
