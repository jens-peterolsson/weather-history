const axios = require('axios');
const fs = require('fs');

// 10 = not for corrected
const weatherParametersToRetrieve = [2, 4, 5, 8, 19, 20];
const dataTypes = [
  { type: 'latest-months', extension: 'json' },
  { type: 'corrected-archive', extension: 'csv' }
];

// array with items for: file extension, parameter type, correction or latest and timestamp, loop and promise.all
(async () => {
  const weatherCalls = [];

  weatherParametersToRetrieve.map(parameter =>
    dataTypes.map(dataType =>
      weatherCalls.push({
        url: `https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/${parameter}/station/98210/period/${dataType.type}/data.${dataType.extension}`,
        parameter,
        dataType
      })
    )
  );

  let responses;

  try {
    responses = await Promise.all(
      weatherCalls.map(async weatherCall => {
        const response = await axios({
          url: weatherCall.url,
          method: 'get'
        });

        return {
          response,
          dataType: weatherCall.dataType,
          parameter: weatherCall.parameter
        };
      })
    );
  } catch (err) {
    console.log(err);
  }

  const date = new Date().toISOString().split('T')[0];

  responses.forEach(response => {
    let weatherData;
    if (response.dataType.extension === 'json') {
      weatherData = JSON.stringify(response.response.data);
    }

    if (response.dataType.extension === 'csv') {
      weatherData = response.response.data;
    }

    fs.writeFileSync(
      `../example-data/${date}-parameter-${response.parameter}-${response.dataType.type}.${response.dataType.extension}`,
      weatherData
    );
  });
})();
