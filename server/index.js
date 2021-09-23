// Libraries
const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

// API
const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-den';
const { auth } = require('./config.js');
axios.defaults.headers.common['Authorization'] = auth;
const {forwardRequest} = require('./apiRequest');

// Server Config
const server = express();
server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
var port = 3000;

// Serve Static Assets
server.use( express.static(path.join(__dirname, '..', 'client', 'dist')) )

let cached = {};

// API Forwarding
server.use('/api/', (req, res, next) => forwardRequest(req, res, next, cached));

// Cache Queries
server.get('/cache', (req, res, next) => {
  res.status(200).send(cached);
});

// Serve client app for all other routes
server.get('*', (req, res, next) => {
  res.sendFile( path.resolve(__dirname, '..', 'client', 'dist', 'index.html') );
});

server.listen(port, () => {
  console.log('Server running on ', port);
  console.log('🚀🚀🚀🚀🚀🚀🚀');
})