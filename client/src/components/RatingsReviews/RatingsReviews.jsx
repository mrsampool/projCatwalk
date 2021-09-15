import React, { useContext, useState } from 'react';

import { ReviewsList } from './ReviewsList.jsx';
import { RatingsBreakdown } from './RatingsBreakdown.jsx';

import { ProductContext } from '../../contexts/product-context.js';

export const RatingsReviews = () =>{
  const { reviewsData } = useContext(ProductContext);

  let initFilter = {

  };
  const [filter, setFilter] = useState(initFilter);

  return (
  <div id='RatingsReviews' data-testid='RatingsReviews'>
    <h3>Ratings and Reviews</h3>
    <RatingsBreakdown filter={filter} setFilter={setFilter} />
    <ReviewsList reviewslist={reviewsData} filter={filter} setFilter={setFilter} />
  </div>
  );
}