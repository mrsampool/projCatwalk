import React from 'react';

import Review from './Review.jsx';

export const ReviewsList = function(props) {
  return (
    <div id='ReviewsList'>
      <p>ReviewList component</p>
      {props.reviewslist.results.map((reviewdata) => {
        return (
          <Review review={reviewdata}/>
        );
      })}
    </div>
  );
}