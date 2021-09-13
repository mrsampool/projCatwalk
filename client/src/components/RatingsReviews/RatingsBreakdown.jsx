import React from 'react';
import { StarRating } from '../StarRating/StarRating.jsx';

import { reviewsList } from '../../dummyData/reviewsList';

export const RatingsBreakdown = () => {
  let length = reviewsList.results.length;
  let total = 0;

  reviewsList.results.forEach((review) => {
    total += review.rating;
  });

  let average = total / length;

  return (
    <div id='RatingBreakdown'>
      <div><p>Score: {average}</p></div>
      <StarRating />
    </div>
  );
};