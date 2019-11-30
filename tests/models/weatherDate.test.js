const WeatherDate = require('../../src/models/weatherDate');

describe('Weather date model', () => {
  it('should not validate missing date', async () => {
    const tested = new WeatherDate();

    const error = tested.validateSync();
    expect(error).toBeDefined();
  });
  it('should validate when date is set', async () => {
    const tested = new WeatherDate();
    tested.date = '2019-02-27';

    const error = tested.validateSync();
    expect(error).toBeUndefined();
  });
});
