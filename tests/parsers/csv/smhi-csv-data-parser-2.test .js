const fs = require('fs');
const parser = require('../../../src/parsers/csv/smhi-csv-parser-temperature');

const csvData = fs.readFileSync(
  './tests/parsers/csv/testdata/stockholm-corrected-archive-2.csv',
  'utf8'
);

describe('SMHI data parser parameter 2', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(
      csvData,
      'Representativt dygn',
      'Lufttemperatur'
    );

    expect(parsed.length).toEqual(16);
    expect(parsed[0].Date).toEqual('1859-01-02');
    expect(parsed[0].Value).toEqual('0.2');
    expect(parsed[7].Date).toEqual('1930-01-07');
    expect(parsed[7].Value).toEqual('-3.1');
    expect(parsed[15].Date).toEqual('2019-06-30');
    expect(parsed[15].Value).toEqual('22.2');
  });
});
