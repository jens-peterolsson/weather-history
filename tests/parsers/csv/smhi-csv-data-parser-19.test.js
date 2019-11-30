const fs = require('fs');
const parser = require('../../../src/parsers/csv/smhi-csv-parser');

const csvData = fs.readFileSync(
  './tests/parsers/csv/testdata/stockholm-corrected-archive-19.csv',
  'utf8'
);

describe('SMHI data parser parameter 19', () => {
  it('should parse file into objects', async () => {
    const parsed = await parser.parse(csvData, {
      dateHeader: { index: 3, text: 'Representativt dygn' },
      valueHeader: { index: 4, text: 'Lufttemperatur' }
    });

    expect(parsed.length).toEqual(14);
    expect(parsed[0].Date).toEqual('1882-01-01');
    expect(parsed[0].Value).toEqual('-1.2');
    expect(parsed[7].Date).toEqual('1882-01-08');
    expect(parsed[7].Value).toEqual('-3.0');
    expect(parsed[13].Date).toEqual('2014-06-16');
    expect(parsed[13].Value).toEqual('11.7');
  });
});
