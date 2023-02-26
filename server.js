const { clientList, taskList } = require('./accessDatabase').lists;
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;
const ip = '127.0.0.1';

app.use(express.static('public'));
app.use(cors());

app.get('/tasks', async (req, res) => {
  const taskListData = await taskList.getData();
  res.send(taskListData);
});

app.get('/clients', async (req, res) => {
  const clientListData = await clientList.getData();
  res.send(clientListData);
})

app.listen(PORT, ip, function() {
  console.log('Server listening on port ' + PORT);
});