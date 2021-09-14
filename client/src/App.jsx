// Libraries
import React, { useState } from 'react';

// Sub-Components
import { Overview } from './components/Overview/Overview.jsx';
import { QAndA } from './components/QAndA/QAndA.jsx';
import { RatingsReviews } from './components/RatingsReviews/RatingsReviews.jsx';

//Dummy Data
import { listQuestions, answersList } from './dummyData/anwsersList';
import { productList, singleProduct, singleProductStyles } from './dummyData/productsList';
import { reviewsList } from './dummyData/reviewsList';
import { reviewsMeta } from './dummyData/reviewsMetadata';

import { ProductContextProvider, ProductContext } from './contexts/product-context.js';

export const App = () => {
  const [reviewsData, setReviewsData] = useState(reviewsList);
  const [questionsData, setQuestionsData] = useState(listQuestions);

  const changeProduct = (product_id) => {
    /* 
    axios.get('/api/example/reviews/' + product_id)
    .then(({data}) => setReviewsData(data))
    .then(() => axios.get('/api/example/questions'))
    .then(({data}) => setQuestionsData(data))
    .catch(err => console.log('Error from axios GET: ', err));
     */
    console.log('Pass me a product ID and maybe I can get all the data for it!');
    console.log('Current data:');
    console.log('reviewsData: ', reviewsData);
    console.log('questionsData: ', questionsData);
  }

  return (
    <ProductContextProvider>
      <div id='App'>
        <Overview product={singleProduct} styles={singleProductStyles}/>
        <QAndA />
        <RatingsReviews />
      </div>
    </ProductContextProvider>
  );
};