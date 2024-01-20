const http = require ('http');
const app = require('./app');
const port = 10000;
const server = http.createServer(app);

server.listen(port);



