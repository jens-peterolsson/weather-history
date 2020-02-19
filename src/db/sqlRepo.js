const Sequelize = require('sequelize');

const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASS;
const database = 'weatherdata';
const table = 'weatherdates';
const host = 'localhost';
const dialect = 'mysql';

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect
});

const model = sequelize.define(table, {
  weatherDate: { type: Sequelize.STRING, primaryKey: true },
  temperatureAverage: Sequelize.DECIMAL(8, 2),
  windSpeedAverage: Sequelize.DECIMAL(8, 2),
  rainAndSnowAmount: Sequelize.DECIMAL(8, 2),
  snowDepth: Sequelize.DECIMAL(8, 2),
  temperatureMin: Sequelize.DECIMAL(8, 2),
  temperatureMax: Sequelize.DECIMAL(8, 2)
});

async function upsert(item) {
  const entity = item;

  entity.weatherDate = item.date;
  delete entity.date;

  console.log(entity);

  await model.upsert(entity);
}

module.exports = {
  upsert
};
