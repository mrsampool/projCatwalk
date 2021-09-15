const axios = require('axios');

const baseUrl = 'http://127.0.0.1:3000';

export const serverRequests = {

  getCart: () => {
    return new Promise( (resolve, reject) =>{
      axios.get( baseUrl + '/cart' )
      .then( res => resolve( res.data ) )
      .catch( err => reject(err) );
    });
  },

  addToCart: (sku_id, count) => {
    return new Promise( (resolve, reject) => {
      const item = { sku_id, count };
      axios.post( baseUrl + '/cart', item )
      .then( res => resolve( res.data ) )
      .catch( err => reject( err ) );
    });
  }

};