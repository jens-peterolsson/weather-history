require('./db/mongoose');

const composer = require('./composers/compose-station-data');
const parameters = require('./constants/parameters');
const WeatherData = require('./models/weatherDate');

(async () => {
  const data = await composer.composeFromFiles('tempdata', [
    parameters.correctedArchiveType,
    parameters.latestMonthsType
  ]);

  await Promise.all(
    data.map(async item => {
      const filter = { date: item.date };

      return WeatherData.findOneAndUpdate(filter, item, {
        upsert: true
      });
    })
  );
})();
