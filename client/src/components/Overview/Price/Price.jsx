//React
import React from 'react';

//Stylesheet
import './Price.css'

export const Price = (props) =>{
  const {original_price, sale_price} = props.style;

  return(
    <div data-testid='prod-price'>
      <span className={`original-price ${sale_price ? 'struck' : ''}`} >
        {original_price}
      </span>
      {
        sale_price ?
          <span className='sale-price'>
            {sale_price}
          </span>
          : null
      }
    </div>
  )
};