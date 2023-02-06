const fs = require('fs');
const { parse } = require('csv-parse');
const { stringify } = require('csv-stringify');
const dataAddress = __dirname+"/database/tasks.csv";

const getParsedData = (location) => {
  let parsedData = [];
  fs.createReadStream(dataAddress)
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    console.log(row);
  })
  .on("end", function () {
    console.log("finished");
  })
  .on("error", function (error) {
    console.log(error.message);
  });
  return parsedData;
}

const parsedData = getParsedData(dataAddress);