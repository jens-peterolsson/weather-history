const fs = require('fs');
const parser = require('../../../src/parsers/json/smhi-json-parser');

const jsonData = fs.readFileSync(
  './tests/parsers/json/testdata/stockholm-latest-months-8.json',
  'utf8'
);

describe('SMHI json data parser parameter 8', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(jsonData, '8');

    expect(parsed.length).toEqual(2);
    expect(parsed[0].date).toEqual('2019-10-07');
    expect(parsed[0].snowDepth).toEqual('0.00');
    expect(parsed[1].date).toEqual('2019-11-26');
    expect(parsed[1].snowDepth).toEqual('0.21');
  });
});
