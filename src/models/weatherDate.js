const mongoose = require('mongoose');
const weatherValidator = require('../validators/weatherDateValidator');

const weatherDateSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!weatherValidator.isDate(value)) {
        throw new Error('Date not valid!');
      }
    }
  },
  temperatureAverage: {
    type: Number,
    default: 0.0,
    validate(value) {
      if (!weatherValidator.isCorrectNumericValue(value)) {
        throw new Error('Number not valid!');
      }
    }
  },
  windSpeedAverage: {
    type: Number,
    default: 0.0,
    validate(value) {
      if (!weatherValidator.isCorrectNumericValue(value)) {
        throw new Error('Number not valid!');
      }
    }
  },
  rainAndSnowAmount: {
    type: Number,
    default: 0.0,
    validate(value) {
      if (!weatherValidator.isCorrectNumericValue(value)) {
        throw new Error('Number not valid!');
      }
    }
  },
  snowDepth: {
    type: Number,
    default: 0.0,
    validate(value) {
      if (!weatherValidator.isCorrectNumericValue(value)) {
        throw new Error('Number not valid!');
      }
    }
  },
  temperatureMin: {
    type: Number,
    default: 0.0,
    validate(value) {
      if (!weatherValidator.isCorrectNumericValue(value)) {
        throw new Error('Number not valid!');
      }
    }
  },
  temperatureMax: {
    type: Number,
    default: 0.0,
    validate(value) {
      if (!weatherValidator.isCorrectNumericValue(value)) {
        throw new Error('Number not valid!');
      }
    }
  }
});

const WeatherDate = mongoose.model('WeatherDate', weatherDateSchema);

module.exports = WeatherDate;
