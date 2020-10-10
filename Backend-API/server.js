const http = require('http');
const app = require('./app');

const port =    process.env.port || 3001;
console.log(port)

const server = http.createServer(app);

server.listen(port);