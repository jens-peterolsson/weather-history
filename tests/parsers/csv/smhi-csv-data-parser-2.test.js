const fs = require('fs');
const parser = require('../../../src/parsers/csv/smhi-csv-parser');

const csvData = fs.readFileSync(
  './tests/parsers/csv/testdata/stockholm-corrected-archive-2.csv',
  'utf8'
);

describe('SMHI data parser parameter 2', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(csvData, {
      dateHeader: { index: 3, text: 'Representativt dygn' },
      valueHeader: { index: 4, text: 'Lufttemperatur' },
      valueAttributeName: 'temperatureAverage'
    });

    expect(parsed.length).toEqual(16);
    expect(parsed[0].date).toEqual('1859-01-01');
    expect(parsed[0].temperatureAverage).toEqual('0.2');
    expect(parsed[7].date).toEqual('1859-01-08');
    expect(parsed[7].temperatureAverage).toEqual('-8.9');
    expect(parsed[15].date).toEqual('2019-06-30');
    expect(parsed[15].temperatureAverage).toEqual('22.2');
  });
});
