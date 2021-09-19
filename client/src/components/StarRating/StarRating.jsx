//React
import React, { useContext } from 'react';

//Stylesheet
import './StarRating.css'

import { ProductContext } from '../../contexts/product-context'

export const StarRating = (props) => {

  let rating;

  if (props.rating) {
    rating = props.rating;
  } else {
    // if no props.rating is provided, average rating for the product is used
    const { reviewsMetadata } = useContext(ProductContext);
    
    let average = 0;
    let totalRatingsQty = 0;
    for (let rating in reviewsMetadata.ratings) {
      totalRatingsQty += parseInt( reviewsMetadata.ratings[rating] );
    average += (parseInt(rating) * parseInt( reviewsMetadata.ratings[rating]) );
    }

    average = average / totalRatingsQty;
    rating = average;
  }

  return (
    <div className='StarRating' data-testid='starrating'>
      <meter min='0' max='5' value={rating} data-testid='starmeter'></meter>
    </div>
  )
};

