'use strict';

let http = require('http');

http.createServer(function (request, response) {
    response.writeHead(200);
    response.end('Hello World');
}).listen(3000);

console.log('Server is listening');
