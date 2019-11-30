const weatherParameterTypes = ['2', '4', '5', '8', '19', '20'];

const weatherParameterTypeAttributes = {};
weatherParameterTypeAttributes['2'] = 'temperatureAverage';
weatherParameterTypeAttributes['4'] = 'windSpeedAverage';
weatherParameterTypeAttributes['5'] = 'rainAndSnowAmount';
weatherParameterTypeAttributes['8'] = 'snowDepth';
weatherParameterTypeAttributes['19'] = 'temperatureMin';
weatherParameterTypeAttributes['20'] = 'temperatureMax';

const weatherDataSources = [
  { type: 'latest-months', extension: 'json' },
  { type: 'corrected-archive', extension: 'csv' }
];

module.exports = {
  weatherDataSources,
  weatherParameterTypes,
  weatherParameterTypeAttributes
};
