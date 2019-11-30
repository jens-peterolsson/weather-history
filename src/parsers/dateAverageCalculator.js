function calculate(data, valueAttributeName) {
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
  calculate
};
