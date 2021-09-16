import React, { useState } from 'react';

import Review from './Review.jsx';

export const ReviewsList = function(props) {
  const option = {
    RELEVANT: 'relevant',
    NEWEST: 'newest',
    HELPFUL: 'helpful',
  };
  
  return (
    <div id='ReviewsList' data-testid='ReviewsList'>
      <h3>{props.reviewslist.results.length} reviews, sorted by 
        <select name='reviewsort' id='reviewsort' value={props.sort} onChange={(e) => {props.setSort(e.target.value)}} data-testid='select' >
          <option value={option.RELEVANT} >Relevant</option>
          <option value={option.NEWEST} >Newest</option>
          <option value={option.HELPFUL} >Helpful</option>
        </select>
      </h3>
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