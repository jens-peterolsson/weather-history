const fs = require('fs');
const parser = require('../../../src/parsers/json/smhi-json-parser');

const jsonData = fs.readFileSync(
  './tests/parsers/json/testdata/stockholm-latest-months-5.json',
  'utf8'
);

describe('SMHI json data parser parameter 5', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(jsonData, {
      dateHeader: { text: 'ref' },
      valueHeader: { text: 'value' },
      valueAttributeName: 'rainAndSnowAmount'
    });

    expect(parsed.length).toEqual(3);
    expect(parsed[0].date).toEqual('2019-07-21');
    expect(parsed[0].rainAndSnowAmount).toEqual('7.9');
    expect(parsed[1].date).toEqual('2019-11-22');
    expect(parsed[1].rainAndSnowAmount).toEqual('0.5');
    expect(parsed[2].date).toEqual('2019-11-23');
    expect(parsed[2].rainAndSnowAmount).toEqual('0.0');
  });
});
