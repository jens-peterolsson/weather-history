const fs = require('fs');
const parser = require('../../../src/parsers/csv/smhi-csv-parser');

const csvData = fs.readFileSync(
  './tests/parsers/csv/testdata/stockholm-corrected-archive-8.csv',
  'utf8'
);

describe('SMHI data parser parameter 8', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(csvData, {
      dateHeader: { index: 1, text: 'Datum' },
      valueHeader: { index: 3, text: 'Snödjup' },
      useDateAverage: true
    });

    expect(parsed.length).toEqual(19);
    expect(parsed[0].Date).toEqual('1893-01-15');
    expect(parsed[0].Value).toEqual('0.20');
    expect(parsed[5].Date).toEqual('1893-03-14');
    expect(parsed[5].Value).toEqual('0.35');
    expect(parsed[17].Date).toEqual('2010-12-22');
    expect(parsed[17].Value).toEqual('0.37');
    expect(parsed[18].Date).toEqual('2019-02-16');
    expect(parsed[18].Value).toEqual('0.00');
  });
});