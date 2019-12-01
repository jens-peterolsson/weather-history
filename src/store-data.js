require('./db/mongoose');

const composer = require('./composers/compose-station-data');
const parameters = require('./constants/parameters');
const WeatherData = require('./models/weatherDate');

(async () => {
  const data = await composer.composeFromFiles('tempdata', [
    parameters.correctedArchiveType,
    parameters.latestMonthsType
  ]);

  const promises = data.map(async item => {
    const weatherDataEntity = new WeatherData(item);

    // test findByIdAndUpdate?
    await weatherDataEntity.save();
  });

  await Promise.all(promises);
})();
