const fs = require('fs').promises;
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify');

const tasksAddress = __dirname+"/database/tasks.csv";

const parseCSV = async (location) => {
  const fileContent = await fs.readFile(location);
  const records = parse(fileContent, {columns: true});
  return records;
}

const updateCSV = (parsedData, csvAddress) => {
  stringify(parsedData, {header: true}, function (err, output) {
    fs.writeFile(csvAddress, output);
  });
}

(async function main() {
  let parsedTasks = await parseCSV(tasksAddress);
  console.log(parsedTasks);
})();