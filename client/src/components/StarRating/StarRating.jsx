//React
import React, { useContext } from 'react';
import { Icon } from '../Icon/Icon.jsx';

//Stylesheet
import './StarRating.css'

import { ProductContext } from '../../contexts/ProductContext'

export const StarRating = (props) => {

  let rating;
  let fullStars = [];
  let emptyStars = [];
  let remainderStar = null;
  let starSize = '1rem';
  let starColor = '#DBD94E';
  

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

  for (var i = 0; i < Math.floor(rating); i++) {
    fullStars.push( <Icon type='starFull' size={starSize} fillColor={starColor} key={'starFull' + i} /> );
  }

  for (let i = 0; i < Math.floor(5 - rating); i++ ) {
    emptyStars.push( <Icon type='starEmpty' size={starSize} fillColor={starColor} key={'starEmpty' + i} /> )
  }

  let remainder = rating - Math.floor(rating);
  if (0 < remainder && remainder <= .25 ) remainderStar = (<Icon type='starOneQuart' size={starSize} fillColor={starColor} key={'starOneQuart'} />);
  if (.25 < remainder && remainder <= .50 ) remainderStar = (<Icon type='starHalf' size={starSize} fillColor={starColor} key={'starHalf'} />);
  if (.50 < remainder && remainder < 1 )  remainderStar = (<Icon type='starThreeQuart' size={starSize} fillColor={starColor} key={'starThreeQuart'} />); 

  return (
    <div className='StarRating' data-testid='starrating'>
      {fullStars}{remainderStar}{emptyStars}
    </div>
  )
};
