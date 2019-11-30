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
      useDateAverage: true
    });

    expect(parsed.length).toEqual(7);
    expect(parsed[0].Date).toEqual('1961-01-01');
    expect(parsed[0].Value).toEqual('2.0');
    expect(parsed[3].Date).toEqual('1961-01-04');
    expect(parsed[3].Value).toEqual('1.3');
    expect(parsed[6].Date).toEqual('2019-07-01');
    expect(parsed[6].Value).toEqual('8.5');
  });
});
