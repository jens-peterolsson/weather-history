require('./db/mongoose');

const composer = require('./composers/compose-station-data');
const parameters = require('./constants/parameters');
const WeatherData = require('./models/weatherDate');

(async () => {
  const data = await composer.composeFromFiles('tempdata', [
    parameters.correctedArchiveType
    // parameters.latestMonthsType
  ]);

  for (let ix = 0; ix < data.length; ix += 1) {
    const item = data[ix];
    const filter = { date: item.date };

    console.log(item);

    try {
      // eslint-disable-next-line no-await-in-loop
      await WeatherData.findOneAndUpdate(filter, item, {
        upsert: true,
        new: true
      });
    } catch (err) {
      console.log(err);
    }
  }
})();

console.log('Main done.');
