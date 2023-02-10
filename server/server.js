const fs = require('fs');
const { parse } = require('csv-parse');
const { stringify } = require('csv-stringify');

class List {
  constructor(address) {
    this.address = address;
    this.getData();
  }

  getData() {
    this.data = [];
    fs.createReadStream(this.address)
      .pipe(parse({columns: true}))
      .on("data", (row) => this.data.push(row))
      .on("end", () => console.log("finish!", this.data))
      .on("error", (err) => console.error(err));
  }
  
  writeData() {
    stringify(this.data, {header: true}, function (err, output) {
      fs.writeFile(this.address, output);
    });
  }

  removeData(id) {
    this.data[id] = null;
  }
}

class ClientList extends List {
  constructor(address) {
    super(address);
  }

  addClient(name, balance) {
    this.data.push({
      id: id || this.data.length, 
      name, 
      balance: balance || 0,
    });
  }
}

class TaskList extends List {
  constructor(address) {
    super(address);
  }

  addTask(id, client_id, matter, description) {
    this.data.push({
      id: id || this.data.length,
      client_id: client_id,
      matter: matter,
      description: description,
    });
  }
}

const clientList = new ClientList(__dirname+"/database/clients.csv");
const taskList = new TaskList(__dirname+"/database/tasks.csv");