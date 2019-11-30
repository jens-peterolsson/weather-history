const weatherParameterTypes = ['2', '4', '5', '8', '19', '20'];

const weatherParameterTypeAttributes = {};
weatherParameterTypeAttributes['2'] = 'temperatureAverage';
weatherParameterTypeAttributes['4'] = 'windSpeedAverage';
weatherParameterTypeAttributes['5'] = 'rainAndSnowAmount';
weatherParameterTypeAttributes['8'] = 'snowDepth';
weatherParameterTypeAttributes['19'] = 'temperatureMin';
weatherParameterTypeAttributes['20'] = 'temperatureMax';

const latestMonthsType = 'latest-months';
const correctedArchiveType = 'corrected-archive';

const weatherDataSources = [
  {
    type: latestMonthsType,
    extension: 'json',
    mappings: [
      {
        parameterType: '2',
        dateHeader: { text: 'ref' },
        valueHeader: { text: 'value' },
        valueAttributeName: 'temperatureAverage'
      },
      {
        parameterType: '4',
        dateHeader: { text: 'date' },
        valueHeader: { text: 'value' },
        valueAttributeName: 'windSpeedAverage',
        useDateAverage: true
      },
      {
        parameterType: '5',
        dateHeader: { text: 'ref' },
        valueHeader: { text: 'value' },
        valueAttributeName: 'rainAndSnowAmount'
      },
      {
        parameterType: '8',
        dateHeader: { text: 'date' },
        valueHeader: { text: 'value' },
        valueAttributeName: 'snowDepth'
      },
      {
        parameterType: '19',
        dateHeader: { text: 'ref' },
        valueHeader: { text: 'value' },
        valueAttributeName: 'temperatureMin'
      },
      {
        parameterType: '20',
        dateHeader: { text: 'ref' },
        valueHeader: { text: 'value' },
        valueAttributeName: 'temperatureMax'
      }
    ]
  },
  {
    type: correctedArchiveType,
    extension: 'csv',
    mappings: [
      {
        parameterType: '2',
        dateHeader: { index: 3, text: 'Representativt dygn' },
        valueHeader: { index: 4, text: 'Lufttemperatur' },
        valueAttributeName: 'temperatureAverage'
      },
      {
        parameterType: '4',
        dateHeader: { index: 1, text: 'Datum' },
        valueHeader: { index: 3, text: 'Vindhastighet' },
        valueAttributeName: 'windSpeedAverage',
        useDateAverage: true
      },
      {
        parameterType: '5',
        dateHeader: { index: 3, text: 'Representativt dygn' },
        valueHeader: { index: 4, text: 'Nederbördsmängd' },
        valueAttributeName: 'rainAndSnowAmount'
      },
      {
        parameterType: '8',
        dateHeader: { index: 1, text: 'Datum' },
        valueHeader: { index: 3, text: 'Snödjup' },
        valueAttributeName: 'snowDepth'
      },
      {
        parameterType: '19',
        dateHeader: { index: 3, text: 'Representativt dygn' },
        valueHeader: { index: 4, text: 'Lufttemperatur' },
        valueAttributeName: 'temperatureMin'
      },
      {
        parameterType: '20',
        dateHeader: { index: 3, text: 'Representativt dygn' },
        valueHeader: { index: 4, text: 'Lufttemperatur' },
        valueAttributeName: 'temperatureMax'
      }
    ]
  }
];

function getOptions(parameterType, extension) {
  const options = weatherDataSources
    .filter(source => source.extension === extension)[0]
    .mappings.filter(mapping => mapping.parameterType === parameterType)[0];

  return options;
}

module.exports = {
  latestMonthsType,
  correctedArchiveType,
  weatherDataSources,
  weatherParameterTypes,
  weatherParameterTypeAttributes,
  getOptions
};
