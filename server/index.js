// Libraries
const express = require('express');
const axios = require('axios');
const path = require('path');

// API
const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-den';
const { auth } = require('./config.js');

// Server Config
const server = express();
server.use(express.json());
server.use(express.urlencoded());
server.use(express.static( path.resolve(__dirname, '..', 'client', 'dist')) );
axios.defaults.headers.common['Authorization'] = auth;
var port = 3000;

server.use('/', (req, res, next) =>{

  console.log(`\nReceived ${req.method} request at endpoint: ${req.path}\nRequest body:`);
  console.log(req.body);
  let url = baseUrl + req.path;
  console.log(`\nSending API ${req.method} request: \n${url}`);

  axios({
    method: req.method,
    url: url,
    data: req.body
  })
  .then( apiRes => {
    console.log('\nAPI response body:');
    console.log( apiRes.data );
    res.status( apiRes.status ).send(apiRes.data);
  });

});

server.listen(port, () => {
  console.log('Server running on ', port);
  console.log('🚀🚀🚀🚀🚀🚀🚀');
})