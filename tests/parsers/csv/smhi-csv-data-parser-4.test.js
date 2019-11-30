const fs = require('fs');
const parser = require('../../../src/parsers/csv/smhi-csv-parser');

const csvData = fs.readFileSync(
  './tests/parsers/csv/testdata/stockholm-corrected-archive-4.csv',
  'utf8'
);

describe('SMHI data parser parameter 4', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(csvData, {
      dateHeader: { index: 1, text: 'Datum' },
      valueHeader: { index: 3, text: 'Vindhastighet' },
      valueAttributeName: 'windSpeedAverage',
      useDateAverage: true
    });

    expect(parsed.length).toEqual(7);
    expect(parsed[0].date).toEqual('1961-01-01');
    expect(parsed[0].windSpeedAverage).toEqual('2.0');
    expect(parsed[3].date).toEqual('1961-01-04');
    expect(parsed[3].windSpeedAverage).toEqual('1.3');
    expect(parsed[6].date).toEqual('2019-07-01');
    expect(parsed[6].windSpeedAverage).toEqual('8.5');
  });
});
