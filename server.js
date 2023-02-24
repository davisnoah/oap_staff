const { clientList, taskList } = require('./list').lists;
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;

app.use(express.static('public'));
app.use(cors());

app.get('/tasks', (req, res) => {
  res.send(taskList.data);
});

app.get('/clients', (req, res) => {
  res.send(clientList.data);
})

app.listen(PORT, function() {
  console.log('Server listening on port ' + PORT);
});