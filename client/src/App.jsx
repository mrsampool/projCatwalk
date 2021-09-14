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

import { ProductContextProvider } from './contexts/product-context.js';

export const App = () => {
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