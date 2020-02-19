const repo = require('./db/sqlRepo');

const composer = require('./composers/compose-station-data');
const parameters = require('./constants/parameters');

(async () => {
  const data = await composer.composeFromFiles('tempdata', [
    // parameters.correctedArchiveType
    parameters.latestMonthsType
  ]);

  for (let ix = 0; ix < data.length; ix += 1) {
    const item = data[ix];

    try {
      // eslint-disable-next-line no-await-in-loop
      await repo.upsert(item);
    } catch (err) {
      console.log(err);
      return;
    }
  }
})();

console.log('Main done.');
