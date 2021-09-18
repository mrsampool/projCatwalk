import React, { useState, useEffect } from 'react';
import './ReviewsList.css';

import Review from './Review.jsx';

export const ReviewsList = function(props) {
  let showMoreBtn = null;
  let displayAmount = 0;
  let displayedReviews = [];
  const [maxVisible, setMaxVisible] = useState(2);
  const option = {
    RELEVANT: 'relevant',
    NEWEST: 'newest',
    HELPFUL: 'helpful',
  };
  
  const showMoreHandler = () => {
    setMaxVisible(maxVisible + 2);
  }

  if (maxVisible < props.reviewsdata.results.length) {
    showMoreBtn = (
      <button onClick={showMoreHandler} >More Reviews</button>
    );
    displayAmount = maxVisible;
  } else {
    displayAmount = props.reviewsdata.results.length;
  }
  
  for (let i = 0; i < displayAmount ; i++) {
    displayedReviews.push(props.reviewsdata.results[i]);
  }
  
  return (
    <div id='ReviewsList' data-testid='ReviewsList' >
      <h3>{props.reviewsdata.results.length} reviews, sorted by 
        <select name='reviewsort' id='reviewsort' value={props.sort} onChange={(e) => {props.setSort(e.target.value)}} data-testid='select' >
          <option value={option.RELEVANT} key='relevant'>Relevant</option>
          <option value={option.NEWEST} key='newest'>Newest</option>
          <option value={option.HELPFUL} key='helpful'>Helpful</option>
        </select>
      </h3>
      <div id='ReviewScroll'>
        {props.reviewsdata.results.length !== 0 ? displayedReviews.map((reviewdata) => {
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
        }) : null}
      </div>
      {showMoreBtn}
    </div>
  );
}