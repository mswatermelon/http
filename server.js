'use strict';

const http = require('http');
const port = process.env.PORT || 3000;

let dataBase = {
  'tables': {
    'id': 1,
    'count': 10
  },
  'primaryKey': 1
}

function handler(req, res) {
  console.log('Получаем данные');
  let data = '';
  req.on('data', chunk => data += chunk);
  req.on('end', () => {
    data = JSON.parse(data);
    let type = data.type,
        result = {},
        id, name, count;

    console.log(data);

    switch (type) {
      case 'register':
        name = data.name;
        count = data.count;

        if (name in dataBase) dataBase[name]['count'] += count;
        else dataBase[name] = {
          'count': count,
          'id': ++dataBase['primaryKey']
        };

        result['id'] = dataBase[name]['id'];
        result['name'] = name;
        result['count'] = dataBase[name]['count'];
        break;
      case 'add':
        id = data.id;
        count = data.count;

        for(let key in dataBase){
          if(dataBase[key]['id'] == id){
            name = key;
            dataBase[key]['count'] += count;
          }
        }

        result['id'] = dataBase[name]['id'];
        result['name'] = name;
        result['count'] = dataBase[name]['count'];

        break;
      case 'delete':
        id = data.id;
        count = data.count;

        for(let key in dataBase){
          if(dataBase[key]['id'] == id){
            name = key;
            dataBase[key]['count'] -= count;
          }
        }

        result['id'] = dataBase[name]['id'];
        result['name'] = name;
        result['count'] = dataBase[name]['count'];
        break;
      case 'get':
        result = [];

        for(let key in dataBase){
          if (key == 'primaryKey') continue;
          result.push({
            'id': dataBase[key]['id'],
            'name': key,
            'count': dataBase[key]['count']
          })
        }

        break;
    }
    res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
    console.log('Возвращаем');
    console.log(result);
    res.write(JSON.stringify(result));
    res.end();
  });
}

const server = http.createServer();
server.on('error', err => console.error(err));
server.on('request', handler);
server.on('listening', () => {
  console.log('Start HTTP on port %d', port);
});
server.listen(port);
