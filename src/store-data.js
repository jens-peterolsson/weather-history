const repo = require('./db/sqlRepo');

const composer = require('./composers/compose-station-data');
const parameters = require('./constants/parameters');

(async () => {
  try {
    const data = await composer.composeFromFiles('tempdata', [
      // parameters.correctedArchiveType
      parameters.latestMonthsType
    ]);

    const promises = data.map((item) => repo.upsert(item));
    await Promise.all(promises);
  } catch (err) {
    console.log(err);
  }
})();

console.log('Main done.');
