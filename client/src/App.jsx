// Libraries
import React from 'react';

// Sub-Components
import { Overview } from './components/Overview/Overview.jsx';
import { QAndA } from './components/QAndA/QAndA.jsx';
import { RatingsReviews } from './components/ratingsReviews/RatingsReviews.jsx';

//Dummy Data
import { listQuestions, answersList } from './dummyData/anwsersList';
import { productList, singleProduct, singleProductStyles } from './dummyData/productsList';
import { reviewsList } from './dummyData/reviewsList';
import { reviewsMeta } from './dummyData/reviewsMetadata';

export const App = () => {

  return (
    <div id='App'>
      <Overview product={singleProduct} styles={singleProductStyles}/>
      <QAndA />
      <RatingsReviews />
    </div>
  );
};