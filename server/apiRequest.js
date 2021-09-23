// Libraries
const axios = require('axios');

module.exports.forwardRequest = (req, res, next, cached) => {

  const baseUrl = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-den';

  console.log(`\nReceived ${req.method} request at endpoint: ${req.path}\nRequest body:`);
  console.log(req.body);
  console.log('req.query', req.query);

  let url = baseUrl + req.path;

  if (
    req.method === 'GET' && req.path !== '/cart'
    && cached[req.path]
    && cached[req.path][JSON.stringify(req.query)]
    && cached[req.path][JSON.stringify(req.query)][JSON.stringify(req.body)] ){
    console.log('sending cached response:');
    console.log( cached[req.path][JSON.stringify(req.query)][JSON.stringify(req.body)] );
    res.status(200).send( cached[req.path][JSON.stringify(req.query)][JSON.stringify(req.body)] );

  } else {
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

      if ( !cached[req.path] ){
        cached[req.path] = {};
      }
      if ( !cached[req.path][JSON.stringify(req.query)] ){
        cached[req.path][JSON.stringify(req.query)] = {};
      }
      if ( !cached[req.path][JSON.stringify(req.query)][JSON.stringify(req.body)] ){
        console.log('caching API response');
        cached[req.path][JSON.stringify(req.query)][JSON.stringify(req.body)] = apiRes.data;
      }

      res.status( apiRes.status ).send(apiRes.data);
    })
    .catch( err => {
      console.log(`error - ${err.response.status}`);
      console.log(`error - ${err.response.data}`);
      if (err.response.status === 429){
        console.log('setting re-request timer...');
        setTimeout( ()=>{ forwardRequest(req, res, next) }, 1000);
      } else {
        res.status(err.response.status).send(err.response.data);
      }
    });

  }
}