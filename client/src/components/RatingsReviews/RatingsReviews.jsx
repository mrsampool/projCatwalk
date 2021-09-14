import React, { useContext } from 'react';

import { ReviewsList } from './ReviewsList.jsx';
import { RatingsBreakdown } from './RatingsBreakdown.jsx';

import { ProductContext } from '../../contexts/product-context.js';

export const RatingsReviews = () =>{
  const {reviewsData, changeProduct } = useContext(ProductContext);

  return (
  <div id='RatingsReviews' data-testid='RatingsReviews'>
    <h3>Ratings and Reviews</h3>
    <button onClick={changeProduct}>THE BUTTON</button>
    <RatingsBreakdown />
    <ReviewsList reviewslist={reviewsData}/>
  </div>
  );
}