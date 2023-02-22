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
      .on("end", () => console.log("finish!"))
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

  add(input) {
    this.data.push(Object.assign(
      {
        id: this.data.length,
        name: null,
        balance: null,
      },
      input,
    ));
  }
}

class TaskList extends List {
  constructor(address) {
    super(address);
  }

  add(input) {
    this.data.push(Object.assign(
      {
        id: this.data.length,
        cliet_id: null,
        matter: null,
        description: null,
      }, 
      input,
    ));
  }
}

exports.lists = { 
  clientList: new ClientList(__dirname+"/database/clients.csv"), 
  taskList: new TaskList(__dirname+"/database/tasks.csv"),
};
exports.csv = { parse, stringify };