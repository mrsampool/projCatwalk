import React, { useContext } from 'react';
import { StarRating } from '../StarRating/StarRating.jsx';

import { ProductContext } from '../../contexts/product-context.js';

export const RatingsBreakdown = () => {
  const {reviewsData, reviewsMetadata} = useContext(ProductContext);

  let length = reviewsData.results.length;
  let total = 0;

  reviewsData.results.forEach((review) => {
    total += review.rating;
  });

  let average = total / length;

  let totalRatingsQty = 0;
  for (let rating in reviewsMetadata.ratings) {
    totalRatingsQty += reviewsMetadata.ratings[rating];
  }
  console.log(totalRatingsQty);

  return (
    <div id='RatingBreakdown'>
      <p>Ratings Breakdown component</p>
      <div><p>Score: {average}</p></div>
      <StarRating />
      <h5>{(reviewsMetadata.recommended['0'] / totalRatingsQty) * 100}% of reviews recommended this product</h5>
      <h5>5 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['5'] / totalRatingsQty} data-testid='starmeter'></meter>
      <h5>4 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['4'] / totalRatingsQty} data-testid='starmeter'></meter>
      <h5>3 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['3'] / totalRatingsQty} data-testid='starmeter'></meter>
      <h5>2 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['2'] / totalRatingsQty} data-testid='starmeter'></meter>
      <h5>1 stars</h5> <meter min='0' max='1' value={reviewsMetadata.ratings['1'] / totalRatingsQty} data-testid='starmeter'></meter>
      <h5>Size:</h5> <meter min='0' max='5' value={reviewsMetadata.characteristics.Size.value} data-testid='sizemeter'></meter>
      <h5>Comfort:</h5> <meter min='0' max='5' value={reviewsMetadata.characteristics.Comfort.value} data-testid='comfortmeter'></meter>

    </div>
  );
};