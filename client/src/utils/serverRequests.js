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
  },

  getProducts: () => {
    return new Promise( (resolve, reject) => {
      axios.get(baseUrl + '/products')
      .then( ({data}) => resolve(data) )
      .catch( reject );
    });
  },
  
  getProductReviews: (product_id, sort = 'newest') => {
    // get a single product's reviews
    return new Promise( (resolve, reject) => {
      axios.get( baseUrl + '/reviews?product_id=' + product_id + '&sort=' + sort )
      .then( ({data}) => resolve(data) )
      .catch( reject );
    });
  },

  getProductReviewsMeta: (product_id) => {
    return new Promise( (resolve, reject) => {
      axios.get(baseUrl + '/reviews/meta?product_id=' + product_id)
      .then( ({data}) => resolve(data) )
      .catch( reject );
    });
  },

  postReview: (formData) => {
    return new Promise( (resolve, reject) => {
      axios.post(baseUrl + '/reviews', formData)
      .then( ({data}) => resolve(data) )
      .catch( reject )
    });
  },

};