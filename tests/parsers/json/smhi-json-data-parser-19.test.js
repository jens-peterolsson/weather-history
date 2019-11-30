const fs = require('fs');
const parser = require('../../../src/parsers/json/smhi-json-parser');

const jsonData = fs.readFileSync(
  './tests/parsers/json/testdata/stockholm-latest-months-19.json',
  'utf8'
);

describe('SMHI json data parser parameter 19', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(jsonData, {
      dateHeader: { text: 'ref' },
      valueHeader: { text: 'value' },
      valueAttributeName: 'temperatureMin'
    });

    expect(parsed.length).toEqual(3);
    expect(parsed[0].date).toEqual('2019-08-05');
    expect(parsed[0].temperatureMin).toEqual('12.6');
    expect(parsed[2].date).toEqual('2019-11-28');
    expect(parsed[2].temperatureMin).toEqual('5.8');
  });
});
