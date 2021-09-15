import React from 'react';

import Review from './Review.jsx';

export const ReviewsList = function(props) {
  return (
    <div id='ReviewsList'>
      <p>ReviewList component</p>
      {props.reviewslist.results.map((reviewdata) => {
        if(Object.keys(props.filter).length > 0) {
          // there is a filter in place, so only let those reviews through
          if(props.filter[reviewdata.rating]){
            return (
              <Review review={reviewdata} key={reviewdata.review_id}/>
            );
          }
        } else {
          return (
            <Review review={reviewdata} key={reviewdata.review_id}/>
          );
        }
      })}
    </div>
  );
}