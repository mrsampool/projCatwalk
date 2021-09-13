//React
import React from 'react';

//Stylesheet
import './StarRating.css'

import {reviewsList} from '../../dummyData/reviewsList';

export const StarRating = (props) => {
  
  //calculate the average
  let length = reviewsList.results.length;
  let total = 0;
  let average;

  reviewsList.results.forEach((review) => {
    total += review.rating;
  });

  average = total / length;

  return (
    <div className='StarRating' data-testid='starrating'>
      <div data-testid='avgrating'>{average} stars</div>
      <meter min='0' max='5' value={average}></meter>
    </div>
  )
};

