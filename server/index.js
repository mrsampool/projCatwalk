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
server.use(express.urlencoded({extended: true}));
var port = 3000;

// API Forwarding
server.use('/api/', (req, res, next) =>{

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
  .catch( err => res.status(err.response.status).send(err.response.data) );

});

// React App Static Files
server.get('*/bundle.js', (req, res)=>{
    res.sendFile( path.resolve(__dirname, '..', 'client', 'dist', 'bundle.js') );
});
server.get('*/bundle.css', (req, res)=>{
    res.sendFile( path.resolve(__dirname, '..', 'client', 'dist', 'bundle.css') );
});
server.get('*/reset.css', (req, res)=>{
    res.sendFile( path.resolve(__dirname, '..', 'client', 'dist', 'reset.css') );
});
server.get('*', (req, res, next) => {
  res.sendFile( path.resolve(__dirname, '..', 'client', 'dist', 'index.html') );
});

server.listen(port, () => {
  console.log('Server running on ', port);
  console.log('🚀🚀🚀🚀🚀🚀🚀');
})