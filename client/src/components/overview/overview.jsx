import React from 'react';
import { ImgGallery } from './imgGallery/imgGallery';
import { QtySelector } from './qtySelector/qtySelector';
import { SizeSelector } from './sizeSelector/sizeSelector';
import { StyleSelector } from './styleSelector/styleSelector';
import { StarRating } from '../starRating/starRating';

export const Overview = (props) =>{
  const {category, name, slogan, description} = props.product;
  const {styles} = props.styles.results;
  return(
    <div id='Overview' data-testid='Overview'>

      <div>

        <span>
          <ImgGallery/>
        </span>

        <span>
          <StarRating/>
          <p id='prod-category'>{category}</p>
          <p id='prod-title'>{name}</p>
          <StyleSelector styles={styles}/>
          <div>
            <SizeSelector/>
            <QtySelector/>
          </div>
          <button id='add-cart'>ADD TO BAG</button>
        </span>

      </div>

      <div id='prod-description'>
        <p id='prod-slogan'>{slogan}</p>
        <p id='prod-slogan'>{description}</p>
      </div>

    </div>
  )
}