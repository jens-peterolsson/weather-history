const fs = require('fs');
const parser = require('../../../src/parsers/json/smhi-json-parser');

const jsonData = fs.readFileSync(
  './tests/parsers/json/testdata/stockholm-latest-months-2.json',
  'utf8'
);

describe('SMHI json data parser parameter 2', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(jsonData, '2');

    expect(parsed.length).toEqual(3);
    expect(parsed[0].date).toEqual('2019-07-22');
    expect(parsed[0].temperatureAverage).toEqual('19.5');
    expect(parsed[2].date).toEqual('2019-11-28');
    expect(parsed[2].temperatureAverage).toEqual('6.8');
  });
});
