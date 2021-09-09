const express = require('express');
const path = require('path');

const server = express();

server.use(express.json());
server.use(express.urlencoded());
server.use(express.static( path.resolve(__dirname, '..', 'client', 'dist')) );

var port = 3000;

server.listen(port, () => {
  console.log('Server running on ', port);
  console.log('🚀🚀🚀🚀🚀🚀🚀');
})