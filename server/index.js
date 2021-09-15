// Libraries
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

// API
const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-den';
const { auth } = require('./config.js');
axios.defaults.headers.common['Authorization'] = auth;

// Server Config
const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded());
server.use(express.static( path.resolve(__dirname, '..', 'client', 'dist')) );
var port = 3000;

server.use('/', (req, res, next) =>{

  console.log(`\nReceived ${req.method} request at endpoint: ${req.path}\nRequest body:`);
  console.log(req.body);
  console.log('req.query', req.query);
  let url = baseUrl + req.path;
  console.log(`\nSending API ${req.method} request: \n${url}`);
  

  axios({
    method: req.method,
    url: url,
    data: req.body,
    params: req.query,
  })
  .then( apiRes => {
    console.log('\nAPI response body:');
    console.log( apiRes.data );
    res.status( apiRes.status ).send(apiRes.data);
  })
  .catch( err => res.status(500).send(err) );

});

server.listen(port, () => {
  console.log('Server running on ', port);
  console.log('🚀🚀🚀🚀🚀🚀🚀');
})