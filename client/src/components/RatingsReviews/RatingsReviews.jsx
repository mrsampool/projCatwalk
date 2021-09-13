import React from 'react';

import { ReviewsList } from './ReviewsList.jsx';
import { RatingsBreakdown } from './RatingsBreakdown.jsx';

import {reviewsList} from '../../dummyData/reviewsList.js';

export const RatingsReviews = () =>{
  return (
  <div id='RatingsReviews' data-testid='RatingsReviews'>
    <h3>Ratings and Reviews</h3>
    <RatingsBreakdown />
    <ReviewsList reviewslist={reviewsList}/>
  </div>
  );
}