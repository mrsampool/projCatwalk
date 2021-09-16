import React, { useContext, useState, useEffect } from 'react';
import { ReviewsList } from './ReviewsList.jsx';
import { RatingsBreakdown } from './RatingsBreakdown.jsx';
import { ProductContext } from '../../contexts/product-context.js';
import { serverRequests } from '../../utils/serverRequests.js';
let { getProductReviews } = serverRequests;
import { reviewsList } from '../../dummyData/reviewsList.js';

export const RatingsReviews = (props) =>{
  const { productID } = useContext(ProductContext);
  const [filter, setFilter] = useState({});
  const [reviewsData, setReviewsData] = useState(reviewsList);

  useEffect(() => {
    if(props.testing) return;
    getProductReviews(productID)
    .then(data => {
      setReviewsData(data); 
    })
    .catch(err => console.log('Error in RatingsReviews getProductReviews(): ', err) );
  }, [productID]);

  return (
  <div id='RatingsReviews' data-testid='RatingsReviews'>
    <h3>Ratings and Reviews</h3>
    <RatingsBreakdown filter={filter} setFilter={setFilter} />
    <ReviewsList reviewslist={reviewsData} filter={filter} setFilter={setFilter} />
  </div>
  );
}