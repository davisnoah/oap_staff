const fs = require('fs');
const { parse, stringify } = require('./list').csv;
const { clientList, taskList } = require('./list').lists;
const express = require('express');
const app = express();

const PORT = 8080;

console.log(clientList);
console.log(taskList);

app.listen(PORT, '127.0.0.1', function() {
  console.log('Server listening on port ' + PORT);
})