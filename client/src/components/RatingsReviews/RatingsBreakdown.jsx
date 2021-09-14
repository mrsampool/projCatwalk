import React, { useContext } from 'react';
import { StarRating } from '../StarRating/StarRating.jsx';

import { ProductContext } from '../../contexts/product-context.js';

export const RatingsBreakdown = () => {
  const {reviewsData} = useContext(ProductContext);

  let length = reviewsData.results.length;
  let total = 0;

  reviewsData.results.forEach((review) => {
    total += review.rating;
  });

  let average = total / length;

  return (
    <div id='RatingBreakdown'>
      <p>Ratings Breakdown component</p>
      <div><p>Score: {average}</p></div>
      <StarRating />
    </div>
  );
};