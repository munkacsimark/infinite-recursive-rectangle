const testData = require("./test_data.json");
const draw = require("../dist/draw").default;

let COUNTER = 1;

const test = (width, height, padding, result) => {
  const drawResult = draw({ width, height, padding });
  return JSON.stringify(drawResult) === result;
};

(() =>
  testData.forEach(testCase => {
    const stringifiedResult = testCase.pixelArrayJson;
    const params = testCase.input.split(",");
    const width = parseInt(params[0]);
    const height = parseInt(params[1]);
    const padding = parseInt(params[2]);
    const testResult = test(width, height, padding, stringifiedResult);
    console.log(`Test #${COUNTER}: ${testResult ? "PASSED" : "FAILED"}`);
    ++COUNTER;
  }))();
