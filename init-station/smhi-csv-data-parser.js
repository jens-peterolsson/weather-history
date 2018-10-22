"use strict";

const csvParse = require("neat-csv");

function isDate(value) {
  if (!value) return false;

  const date = value.replace(/\-/g, "");
  const isExpectedDateFormat = date.length === 8 && !isNaN(date);

  return isExpectedDateFormat;
}

function isTemperature(value) {
  if (!value) return false;

  const asInteger = value.replace(/\./, "");
  const isInteger = value.includes(".") && !isNaN(asInteger);

  return isInteger;
}

async function parse(data) {
  const output = await csvParse(data, {
    trim: true,
    skip_empty_lines: true,
    separator: ";",
    headers: ["", "", "Representativt dygn", "Lufttemperatur"],
    mapHeaders: header => {
      if (header === "Representativt dygn") return "Date";
      if (header === "Lufttemperatur") return "Celcius";
      return "";
    }
  });

  const result = output.filter(o => isDate(o.Date) && isTemperature(o.Celcius));
  return result;
}

module.exports = {
  parse
};
