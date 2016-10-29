'use strict';

const http = require('http');

let registerItem = (name, count) => {
  if (!name && !count) return;

  return {
    type: 'register',
    name: name,
    count: count
  };
}

let addItem = (id, count) => {
  if (!id && !count) return;

  return {
    type: 'add',
    id: id,
    count: count
  };
}

let deleteItem = (id, count) => {
  if (!id && !count) return;

  return {
    type: 'delete',
    id: id,
    count: count
  };
}

let getItems = () => {
  return {
    type: 'get'
  };
}

let router = {
  'register': registerItem,
  'add': addItem,
  'delete': deleteItem,
  'get': getItems,
}

let options = {
  hostname: '127.0.0.1',
  port: 3000,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

let request = http.request(options);
let key = 'register';

request.write(JSON.stringify(router[key]('chairs', 5)));
request.end();
