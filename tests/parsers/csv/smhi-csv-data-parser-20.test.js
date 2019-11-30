const fs = require('fs');
const parser = require('../../../src/parsers/csv/smhi-csv-parser');

const csvData = fs.readFileSync(
  './tests/parsers/csv/testdata/stockholm-corrected-archive-20.csv',
  'utf8'
);

describe('SMHI csv data parser parameter 20', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(csvData, '20');

    expect(parsed.length).toEqual(16);
    expect(parsed[0].date).toEqual('1930-01-01');
    expect(parsed[0].temperatureMax).toEqual('2.5');
    expect(parsed[7].date).toEqual('1930-01-08');
    expect(parsed[7].temperatureMax).toEqual('8.0');
    expect(parsed[15].date).toEqual('2019-05-27');
    expect(parsed[15].temperatureMax).toEqual('13.4');
  });
});
