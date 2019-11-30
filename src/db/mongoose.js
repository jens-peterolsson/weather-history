const mongoose = require('mongoose');

const connectionUrl = 'mongodb://127.0.0.1:27017/weather-history-api';

mongoose.connect(connectionUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});
