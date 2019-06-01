const fs = require('fs');
const parser = require('../src/smhi-csv-data-parser');

const csvData = fs.readFileSync('./tests/testdata/kalmar-latest-months.csv', 'utf8');

describe('SMHI data parser', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(csvData);

    expect(parsed.length).toEqual(5);
    expect(parsed[0].Date).toEqual('2018-01-05');
    expect(parsed[4].Celcius).toEqual('7.0');
  });
});
