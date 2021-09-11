import React from 'react';

import Review from './Review.jsx';
import {reviewsList} from '../../dummyData/reviewsList.js';

export default function ReviewsList() {
  return (
    <div id='ReviewList'>
      <p>ReviewList component</p>
      <Review review={reviewsList.results[0]}/>
    </div>
  );
}