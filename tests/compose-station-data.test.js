const composer = require('../src/compose-station-data');

describe('Weather station composer validator', () => {
  it('should compose items from separate attribute sources', async () => {
    const sources = [
      {
        date: '2019-12-01',
        temperatureAverage: '2.1'
      },
      {
        date: '2019-12-01',
        windSpeedAverage: '4.6'
      },
      {
        date: '2019-12-01',
        rainAndSnowAmount: '0.1'
      },
      {
        date: '2019-12-01',
        snowDepth: '0.0'
      },
      {
        date: '2019-12-01',
        temperatureMin: '0.7'
      },
      {
        date: '2019-12-01',
        temperatureMax: '3.2'
      },
      {
        date: '2019-12-02',
        temperatureAverage: '0.1'
      },
      {
        date: '2019-12-02',
        temperatureMin: '-2.6'
      },
      {
        date: '2019-12-02',
        temperatureMax: '0.5'
      }
    ];

    const result = composer.compose(sources);

    expect(result.length).toBe(2);

    expect(result[0].date).toBe('2019-12-01');
    expect(result[0].temperatureAverage).toBe('2.1');
    expect(result[0].windSpeedAverage).toBe('4.6');
    expect(result[0].rainAndSnowAmount).toBe('0.1');
    expect(result[0].snowDepth).toBe('0.0');
    expect(result[0].temperatureMin).toBe('0.7');
    expect(result[0].temperatureMax).toBe('3.2');

    expect(result[1].date).toBe('2019-12-02');
    expect(result[1].temperatureAverage).toBe('0.1');
    expect(result[1].windSpeedAverage).toBeUndefined();
    expect(result[1].rainAndSnowAmount).toBeUndefined();
    expect(result[1].snowDepth).toBeUndefined();
    expect(result[1].temperatureMin).toBe('-2.6');
    expect(result[1].temperatureMax).toBe('0.5');
  });
});
