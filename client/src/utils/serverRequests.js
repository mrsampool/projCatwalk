const axios = require('axios');

const baseUrl = 'http://127.0.0.1:3000/api';

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

  getProducts: (number) => {
    return new Promise( (resolve, reject) => {
      axios.get(`${baseUrl}/products${number ? '?count=' + number : null}`)
      .then( ({data}) => resolve(data) )
      .catch( reject );
    });
  },

  getProductById: (id) => {
    return new Promise( (resolve, reject) => {
      axios.get(baseUrl + `/products/${id}`)
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
  putReviewHelpful: (review_id) => {
    return new Promise( (resolve, reject) => {
      axios.post(baseUrl + '/reviews/' + review_id +'/helpful')
      .then( ({data}) => resolve(data) )
      .catch( reject )
    });
  },
  putReviewReport: (review_id) => {
    return new Promise( (resolve, reject) => {
      axios.post(baseUrl + '/reviews/' + review_id +'/report')
      .then( ({data}) => resolve(data) )
      .catch( reject )
    });
  },

  getProductStyles: (product_id) => {
    // get a single product's styles
    return new Promise( (resolve, reject) => {
      axios.get( `${baseUrl}/products/${product_id}/styles`)
      .then( ({data}) => resolve(data) )
      .catch( reject );
    });
  },

  getRelatedProducts: (product_id) => {
    // get a single product's related products
    return new Promise( (resolve, reject) => {
      axios.get( `${baseUrl}/products/${product_id}/related`)
      .then( ({data}) => data )
      .then( productIds =>{
        let idPromises = [];
        productIds.forEach( id =>{
          idPromises.push(serverRequests.getProductById(id))
        });
        return Promise.all(idPromises)
      })
      .then( values => resolve(values))
      .catch( reject );
    });
  }

};