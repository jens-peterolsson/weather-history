const axios = require('axios');
const fs = require('fs');
const parameters = require('./constants/parameters');

(async () => {
  const weatherCalls = [];

  parameters.weatherParameterTypes.map((parameter) =>
    parameters.weatherDataSources.map((dataSource) =>
      weatherCalls.push({
        url: `https://opendata-download-metobs.smhi.se/api/version/1.0/parameter/${parameter}/station/98210/period/${dataSource.type}/data.${dataSource.extension}`,
        parameter,
        dataType: dataSource
      })
    )
  );

  const responses = await Promise.all(
    weatherCalls.map((weatherCall) => {
      return callSmhi(weatherCall);
    })
  );

  const date = new Date().toISOString().split('T')[0];

  responses.forEach((response) => {
    if (response.response) {
      writeData(response, date);
    }
  });
})();

function writeData(response, date) {
  let weatherData;
  if (response.dataType.extension === 'json') {
    weatherData = JSON.stringify(response.response.data);
  }

  if (response.dataType.extension === 'csv') {
    weatherData = response.response.data;
  }

  fs.writeFileSync(
    `../data/${date}-parameter-${response.parameter}-${response.dataType.type}.${response.dataType.extension}`,
    weatherData
  );
}

async function callSmhi(weatherCall) {
  try {
    const response = await axios({
      url: weatherCall.url,
      method: 'get'
    });
    return {
      response,
      dataType: weatherCall.dataType,
      parameter: weatherCall.parameter
    };
  } catch (err) {
    if (err.response.status === 404) {
      return {};
    }
    console.log(err);
    throw err;
  }
}
