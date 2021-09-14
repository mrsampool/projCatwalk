//React
import React from 'react';

//Stylesheet
import './SizeSelector.css'

export const SizeSelector = (props) =>{

  let { skus } = props;

  function handleChange(e){
    console.log(e.target.value);
    props.setSize(e.target.value);
  }

  let sizes = function getSizes(skus){
    let sizes = [];
    if (skus){
      Object.keys(skus).forEach( sku =>{

        let skuData = skus[sku];

        if ( !sizes.includes( skuData.size) ) {
          if (skuData.quantity) {
            sizes.push(skus[sku].size);
          }
        }
      })
      if (sizes.length){
        sizes.unshift('Select Size');
      }
      return sizes;
    }
  }(skus);

  return(
    <select
      id='SizeSelector'
      data-testid='SizeSelector'
      disabled={!sizes || !sizes.length}
      onChange={handleChange}
    >
      {
        sizes && sizes.length ?
        sizes.map( size =>{
          return(
            <option
              value={size}
              key={`sizeOption-${size}`}
              data-testid={`sizeOption-${size}`}
            >
              {size}
            </option>
          )
        })
        :
        <option value='OUT OF STOCK'>OUT OF STOCK</option>
      }
    </select>
  )
};