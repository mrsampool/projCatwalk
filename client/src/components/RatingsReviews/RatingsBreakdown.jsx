import React, { useContext, useEffect } from 'react';
import { StarRating } from '../StarRating/StarRating.jsx';

import { ProductContext } from '../../contexts/product-context.js';

export const RatingsBreakdown = (props) => {
  const { reviewsMetadata } = useContext(ProductContext);
  let clearFilterBtn = null;
  let average = 0;
  let totalRatingsQty = 0;
  for (let rating in reviewsMetadata.ratings) {
    totalRatingsQty += reviewsMetadata.ratings[rating];
    average += (parseInt(rating) * reviewsMetadata.ratings[rating]);
  }

  average = average / totalRatingsQty;

  const addFilter = (e) => {
    let id = e.target.id;

    let key;
    switch (id) {
      case '5stars': 
      key = '5';
      break;
      case '4stars':
        key = '4';
        break;
        case '3stars':
          key = '3';
        break;
        case '2stars':
        key = '2';
        break;
      case '1stars':
        key = '1'
        break;
      default:
        // if it's not any of these IDs, do nothing
        return;
      }

      // if the key already exists, delete it; 
      // to get toggle functionality
      if (props.filter[key]) {
        let newFilter = {...props.filter};
        delete newFilter[key];
        props.setFilter(newFilter);
        return;
      } 
      
      props.setFilter({...props.filter, [key]: true});
  };

  const clearFilters = () => {
    props.setFilter({})
  };

  if (Object.keys(props.filter).length > 0) {
    clearFilterBtn = (
      <button onClick={clearFilters} >Clear filters</button>
    );
  }
  
  return (
    <div id='RatingBreakdown' onClick={addFilter} >
      <h3>Ratings Breakdown</h3>
      {clearFilterBtn}
      <div><p>Score: {average}</p></div>
      <StarRating />
      <h5>{(reviewsMetadata.recommended['0'] / totalRatingsQty) * 100}% of reviews recommended this product</h5>
      <h5 id='5stars'>5 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['5'] ? reviewsMetadata.ratings['5'] / totalRatingsQty : 0} data-testid='starcountmeter'></meter>
      <h5 id='4stars'>4 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['4'] ? reviewsMetadata.ratings['4'] / totalRatingsQty : 0} data-testid='starcountmeter'></meter>
      <h5 id='3stars'>3 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['3'] ? reviewsMetadata.ratings['3'] / totalRatingsQty : 0} data-testid='starcountmeter'></meter>
      <h5 id='2stars'>2 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['2'] ? reviewsMetadata.ratings['2'] / totalRatingsQty : 0} data-testid='starcountmeter'></meter>
      <h5 id='1stars'>1 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['1'] ? reviewsMetadata.ratings['1'] / totalRatingsQty : 0} data-testid='starcountmeter'></meter>
      <h5>Size:</h5> <meter min='0' max='5' value={reviewsMetadata.characteristics.Size.value} data-testid='sizemeter'></meter>
      <h5>Comfort:</h5> <meter min='0' max='5' value={reviewsMetadata.characteristics.Comfort.value} data-testid='comfortmeter'></meter>

    </div>
  );
};