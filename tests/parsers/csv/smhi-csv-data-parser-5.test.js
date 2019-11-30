const fs = require('fs');
const parser = require('../../../src/parsers/csv/smhi-csv-parser');

const csvData = fs.readFileSync(
  './tests/parsers/csv/testdata/stockholm-corrected-archive-5.csv',
  'utf8'
);

describe('SMHI data parser parameter 5', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(csvData, {
      dateHeader: { index: 3, text: 'Representativt dygn' },
      valueHeader: { index: 4, text: 'Nederbördsmängd' },
      valueAttributeName: 'rainAndSnowAmount'
    });

    expect(parsed.length).toEqual(17);
    expect(parsed[2].date).toEqual('1859-01-03');
    expect(parsed[2].rainAndSnowAmount).toEqual('0.9');
    expect(parsed[14].date).toEqual('1859-02-13');
    expect(parsed[14].rainAndSnowAmount).toEqual('1.5');
    expect(parsed[15].date).toEqual('2018-08-22');
    expect(parsed[15].rainAndSnowAmount).toEqual('0.0');
  });
});
