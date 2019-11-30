const fs = require('fs');
const parser = require('../../../src/parsers/json/smhi-json-parser');

const jsonData = fs.readFileSync(
  './tests/parsers/json/testdata/stockholm-latest-months-4.json',
  'utf8'
);

describe('SMHI json data parser parameter 4', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(jsonData, {
      dateHeader: { text: 'date' },
      valueHeader: { text: 'value' },
      valueAttributeName: 'windSpeedAverage',
      useDateAverage: true
    });

    expect(parsed.length).toEqual(2);
    expect(parsed[0].date).toEqual('2019-07-22');
    expect(parsed[0].windSpeedAverage).toEqual('2.5');
    expect(parsed[1].date).toEqual('2019-10-13');
    expect(parsed[1].windSpeedAverage).toEqual('0.0');
  });
});
