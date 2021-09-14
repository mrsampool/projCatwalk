import React, { useContext } from 'react';

import { ReviewsList } from './ReviewsList.jsx';
import { RatingsBreakdown } from './RatingsBreakdown.jsx';

import { ProductContext } from '../../contexts/product-context.js';

export const RatingsReviews = () =>{
  const {reviewsData, setProductID } = useContext(ProductContext);

  return (
  <div id='RatingsReviews' data-testid='RatingsReviews'>
    <h3>Ratings and Reviews</h3>
    <RatingsBreakdown />
    <ReviewsList reviewslist={reviewsData}/>
  </div>
  );
}