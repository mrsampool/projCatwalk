const axios = require('axios');

const baseUrl = process.env.ENV === 'PROD' ?
  'http://3.101.57.130/api'
  : 'http://localhost:3000/api'

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
  getProductQuestions: (product_id, count=5) =>{
    //get one product's question list
    return new Promise((resolve, reject)=>{
      axios.get(baseUrl + '/qa/questions?product_id='+ product_id + '&count='+count)
      .then(({data})=>resolve(data))
      .catch(reject);
    });
  },
  getAnswerList: (question_id) => {
    //get answert list or particular
    return new Promise ((resolve, reject)=>{
      axios.get(baseUrl + `/qa/questions/${question_id}/answers`)
      .then(({data})=>resolve(data))
      .catch(reject);
    })
  },
  postQuestion: (formData) => {
    return new Promise( (resolve, reject) => {
      console.log('axios POST attempt: ');
      console.log(baseUrl + `/qa/questions/${formData.question_id}/answers`);
      console.log(formData);
      axios.post(baseUrl + `/qa/questions/${formData.question_id}/answers`, formData)
      .then( ({data}) => resolve(data) )
      .catch( reject )
    });
  },
  postAnswer: (formData) => {
    return new Promise( (resolve, reject) => {
      console.log('axios POST attempt: ');
      console.log(baseUrl + `/qa/questions`);
      console.log(formData);
      axios.post(baseUrl + `/qa/questions`, formData)
      .then( ({data}) => resolve(data) )
      .catch( reject )
    });
  },

  putQHelpful: (question_id) => {
    return new Promise( (resolve, reject) => {
      axios.put(baseUrl + '/qa/questions/' + question_id +'/helpful')
      .then( ({data}) => resolve(data) )
      .catch( reject )
    });
  },
  putQReport: (question_id) => {
    return new Promise( (resolve, reject) => {
      axios.put(baseUrl + '/qa/question/' + question_id +'/report')
      .then( ({data}) => resolve(data) )
      .catch( reject )
    });
  },
  putAHelpful: (answer_id) => {
    return new Promise( (resolve, reject) => {
      axios.put(baseUrl + '/qa/anwers/' + answer_id +'/helpful')
      .then( ({data}) => resolve(data) )
      .catch( reject )
    });
  },
  putAReport: (answer_id) => {
    return new Promise( (resolve, reject) => {
      axios.put(baseUrl + '/qa/anwers/' + answer_id +'/report')
      .then( ({data}) => resolve(data) )
      .catch( reject )
    });
  },


  getProductReviews: (product_id, sort = 'newest', count = 10) => {
    // get a single product's reviews
    return new Promise( (resolve, reject) => {
      axios.get( baseUrl + '/reviews?product_id=' + product_id + '&sort=' + sort + '&count=' + count )
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
      console.log('axios POST attempt: ');
      console.log(baseUrl + '/reviews');
      console.log(formData);
      axios.post(baseUrl + '/reviews', formData)
      .then( ({data}) => resolve(data) )
      .catch( reject )
    });
  },
  putReviewHelpful: (review_id) => {
    return new Promise( (resolve, reject) => {
      axios.put(baseUrl + '/reviews/' + review_id +'/helpful')
      .then( ({data}) => resolve(data) )
      .catch( reject )
    });
  },
  putReviewReport: (review_id) => {
    return new Promise( (resolve, reject) => {
      axios.put(baseUrl + '/reviews/' + review_id +'/report')
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
  },

  postInteraction: (dataObj) => {
    return new Promise( (resolve, reject) => {
      axios.post(`${baseUrl}/interactions`, dataObj)
      .catch( reject );
    })
  }

};