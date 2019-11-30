const fs = require('fs');
const parser = require('../../../src/parsers/json/smhi-json-parser');

const jsonData = fs.readFileSync(
  './tests/parsers/json/testdata/stockholm-latest-months-20.json',
  'utf8'
);

describe('SMHI json data parser parameter 20', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(jsonData, '20');

    expect(parsed.length).toEqual(2);
    expect(parsed[0].date).toEqual('2019-08-16');
    expect(parsed[0].temperatureMax).toEqual('22.5');
    expect(parsed[1].date).toEqual('2019-11-28');
    expect(parsed[1].temperatureMax).toEqual('7.5');
  });
});
