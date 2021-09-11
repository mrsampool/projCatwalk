import React from 'react';
import { ImgGallery } from './imgGallery/imgGallery';
import { QtySelector } from './qtySelector/qtySelector';
import { SizeSelector } from './sizeSelector/sizeSelector';
import { StyleSelector } from './styleSelector/styleSelector';
import { StarRating } from '../starRating/starRating';

export const Overview = (props) =>{
  //console.log(props.product.category);
  //const {category, name} = props.product;
  return(
    <div id='Overview'>

      <div>

        <span>
          <ImgGallery/>
        </span>

        <span>
          <StarRating/>
          <p id='prod-category'></p>
          <p id='prod-title'></p>
          <StyleSelector/>
          <div>
            <SizeSelector/>
            <QtySelector/>
          </div>
          <button id='add-cart'>ADD TO BAG</button>
        </span>

      </div>

      <div id='prod-description'></div>

    </div>
  )
}