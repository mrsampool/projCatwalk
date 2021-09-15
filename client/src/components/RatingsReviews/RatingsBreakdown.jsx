import React, { useContext } from 'react';
import { StarRating } from '../StarRating/StarRating.jsx';

import { ProductContext } from '../../contexts/product-context.js';

export const RatingsBreakdown = () => {
  const { reviewsMetadata} = useContext(ProductContext);

  let average = 0;
  let totalRatingsQty = 0;
  for (let rating in reviewsMetadata.ratings) {
    totalRatingsQty += reviewsMetadata.ratings[rating];
    average += (parseInt(rating) * reviewsMetadata.ratings[rating]);
  }

  average = average / totalRatingsQty;
  
  return (
    <div id='RatingBreakdown'>
      <p>Ratings Breakdown component</p>
      <div><p>Score: {average}</p></div>
      <StarRating />
      <h5>{(reviewsMetadata.recommended['0'] / totalRatingsQty) * 100}% of reviews recommended this product</h5>
      <h5>5 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['5'] ? reviewsMetadata.ratings['5'] / totalRatingsQty : 0} data-testid='starmeter'></meter>
      <h5>4 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['4'] ? reviewsMetadata.ratings['4'] / totalRatingsQty : 0} data-testid='starmeter'></meter>
      <h5>3 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['3'] ? reviewsMetadata.ratings['3'] / totalRatingsQty : 0} data-testid='starmeter'></meter>
      <h5>2 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['2'] ? reviewsMetadata.ratings['2'] / totalRatingsQty : 0} data-testid='starmeter'></meter>
      <h5>1 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['1'] ? reviewsMetadata.ratings['1'] / totalRatingsQty : 0} data-testid='starmeter'></meter>
      <h5>Size:</h5> <meter min='0' max='5' value={reviewsMetadata.characteristics.Size.value} data-testid='sizemeter'></meter>
      <h5>Comfort:</h5> <meter min='0' max='5' value={reviewsMetadata.characteristics.Comfort.value} data-testid='comfortmeter'></meter>

    </div>
  );
};