CREATE TABLE IF NOT EXISTS weatherdates (
    weatherDate VARCHAR(10) PRIMARY KEY,
    temperatureAverage DECIMAL(8, 2),
    windSpeedAverage DECIMAL(8, 2),
    rainAndSnowAmount DECIMAL(8, 2),
    snowDepth DECIMAL(8, 2),
    temperatureMin DECIMAL(8, 2),
    temperatureMax DECIMAL(8, 2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);