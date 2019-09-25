const fs = require('fs');
const parser = require('../src/smhi-csv-data-parser');

const csvData = fs.readFileSync('./tests/testdata/stockholm-corrected-archive-20.csv', 'utf8');

describe('SMHI data parser', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(csvData,  'Representativt dygn', 'Lufttemperatur');

    expect(parsed.length).toEqual(16);
    expect(parsed[0].Date).toEqual('1930-01-01');
    expect(parsed[0].Value).toEqual('2.5');
    expect(parsed[7].Date).toEqual('1930-01-08');
    expect(parsed[7].Value).toEqual('8.0');
    expect(parsed[15].Date).toEqual('2019-05-27');
    expect(parsed[15].Value).toEqual('13.4');
  });
});
