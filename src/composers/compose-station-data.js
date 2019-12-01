const fs = require('fs');
const path = require('path');

const csvParser = require('../parsers/csv/smhi-csv-parser');
const jsonParser = require('../parsers/json/smhi-json-parser');
const parameters = require('../constants/parameters');

async function composeFromFiles(folderPath, updateTypes) {
  const extensions = parameters.weatherDataSources
    .filter(source => updateTypes.includes(source.type))
    .map(type => type.extension);

  const files = fs.readdirSync(folderPath);
  const sources = [];

  const promises = files.map(async file => {
    const extension = path.extname(file).substr(1);

    if (!extensions.includes(extension)) return;

    const filePath = path.join(folderPath, file);
    const data = fs.readFileSync(filePath, 'utf8');

    const startIndexType = file.indexOf('-parameter-') + 11;
    const remainder = file.substr(startIndexType);

    const parameterType = remainder.split('-')[0];
    const parser = extension === 'csv' ? csvParser : jsonParser;
    const transformedData = await parser.parse(data, parameterType);

    sources.push(...transformedData);
  });

  await Promise.all(promises);

  const result = compose(sources);
  return result;
}

function compose(sources) {
  const result = [];

  sources.forEach(source => {
    const dateItems = result.filter(dateItem => dateItem.date === source.date);
    const isAdded = dateItems.length;

    const dateItem = isAdded ? dateItems[0] : { date: source.date };

    const attributes = Object.keys(source).filter(key => key !== 'date');
    attributes.forEach(attribute => {
      dateItem[attribute] = source[attribute];
    });

    if (!isAdded) result.push(dateItem);
  });

  return result.sort((a, b) => (a.date > b.date ? 1 : -1));
}

module.exports = {
  compose,
  composeFromFiles
};
