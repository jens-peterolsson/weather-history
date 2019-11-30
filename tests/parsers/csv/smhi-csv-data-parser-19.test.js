const fs = require('fs');
const parser = require('../../../src/parsers/csv/smhi-csv-parser');

const csvData = fs.readFileSync(
  './tests/parsers/csv/testdata/stockholm-corrected-archive-19.csv',
  'utf8'
);

describe('SMHI csv data parser parameter 19', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(csvData, '19');

    expect(parsed.length).toEqual(14);
    expect(parsed[0].date).toEqual('1882-01-01');
    expect(parsed[0].temperatureMin).toEqual('-1.2');
    expect(parsed[7].date).toEqual('1882-01-08');
    expect(parsed[7].temperatureMin).toEqual('-3.0');
    expect(parsed[13].date).toEqual('2014-06-16');
    expect(parsed[13].temperatureMin).toEqual('11.7');
  });
});
