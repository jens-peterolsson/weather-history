"use strict";

const parser = require("./smhi-csv-data-parser");
const expect = require("chai").expect;
const fs = require("fs");

const csvData = fs.readFileSync("./testdata/kalmar-latest-months.csv", "utf8");

describe("SMHI data parser", () => {
  it("should parse file into objects", async () => {
    const parsed = await parser.parse(csvData);

    expect(parsed.length).to.equal(5);
    expect(parsed[0].Date).to.equal("2018-01-05");
    expect(parsed[4].Celcius).to.equal("7.0");
  });
});
