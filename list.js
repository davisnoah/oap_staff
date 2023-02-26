const fs = require('fs').promises;
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify');

class List {
  constructor(address) {
    this.address = address;
    this.getData();
  }

  async getData() {
    const fileContent = await fs.readFile(this.address);
    this.data = parse(fileContent, { columns: true });
    return this.data;
  }
  
  updateDatabase() {
    stringify(this.data, { header: true }, function (err, output) {
      fs.writeFile(this.address, output);
    });
  }

  remove(id) {
    this.data[id] = null;
  }

  add(input) {
    const record = {};
    for (let prop in this.default) {
      record[prop] = input[prop] || this.default;
    }
    this.data.push(record);
    this.updateDatabase(data);
  }

  get nextAvailablePosition() {
    let availablePosition = this.data.indexOf(null);
    if (availablePosition === -1) {
      availablePosition = this.data.length;
    }
  }
}

class ClientList extends List {
  constructor(address) {
    super(address);
  }

  get default() {
    return {
      id: this.nextAvailablePosition,
      name: null,
      balance: null,
    }
  }
}

class TaskList extends List {
  constructor(address) {
    super(address);
  }
  
  get default() {
    return {
      id: this.nextAvailablePosition,
      client_id: null,
      matter: null,
      description: null,
      location: null,
    }
  }
}

exports.lists = { 
  clientList: new ClientList(__dirname+"/database/clients.csv"), 
  taskList: new TaskList(__dirname+"/database/tasks.csv"),
};