const http = require('http');
const port = process.env.PORT || 3000;

function handler(req, res) {
  console.log('Получаем данные');
  let data = '';
  req.on('data', chunk => data += chunk);
  req.on('end', () => {
    data = JSON.parse(data);
    console.log(data);
    res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
    res.write('OK!');
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
