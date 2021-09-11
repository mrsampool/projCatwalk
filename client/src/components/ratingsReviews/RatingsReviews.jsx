import React from 'react';

import ReviewsList from './ReviewsList.jsx';
import {reviewsList} from '../../dummyData/reviewsList.js';

export const RatingsReviews = () =>{
  return (
  <div id='RatingsReviews'>
    <h3>Ratings and Reviews</h3>
    <ReviewsList review={reviewsList.results[0]}/>
  </div>
  );
}